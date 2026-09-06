/**
 * Industry Readiness Index & Assessment Scoring Module
 * Ported and adapted for academia-industry-portal
 */

import {
  CareerRole,
  StudentSkillGapItem,
  GapAnalysisResult,
  ReadinessScoreResult,
  ActionPlanItem,
  ActionPlanResult,
} from '@/types/student-features';

export interface QuestionEvaluationItem {
  questionId: string;
  skillTag: string;
  category: 'technical' | 'soft' | 'aptitude';
  selectedOption: number;
  correctOption: number;
}

export interface SkillScoreSummary {
  skillTag: string;
  category: 'technical' | 'soft' | 'aptitude';
  correctCount: number;
  totalCount: number;
  score: number; // 0.0 - 10.0 scale
}

export interface AssessmentScoringResult {
  overallScore: number; // 0.0 - 10.0 scale
  scorePercentage: number; // 0 - 100%
  totalQuestions: number;
  totalCorrect: number;
  skillBreakdown: SkillScoreSummary[];
}

/**
 * Calculates overall test and per-skill scores from evaluated questions.
 */
export function calculateAssessmentScores(
  items: QuestionEvaluationItem[]
): AssessmentScoringResult {
  if (!items || items.length === 0) {
    return {
      overallScore: 0,
      scorePercentage: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      skillBreakdown: [],
    };
  }

  const skillMap = new Map<
    string,
    {
      category: 'technical' | 'soft' | 'aptitude';
      correct: number;
      total: number;
    }
  >();

  let totalCorrect = 0;

  for (const item of items) {
    const isCorrect = item.selectedOption === item.correctOption;
    if (isCorrect) {
      totalCorrect++;
    }

    const current = skillMap.get(item.skillTag) || {
      category: item.category,
      correct: 0,
      total: 0,
    };

    current.total += 1;
    if (isCorrect) {
      current.correct += 1;
    }

    skillMap.set(item.skillTag, current);
  }

  const skillBreakdown: SkillScoreSummary[] = [];

  const entries = Array.from(skillMap.entries());
  for (const [skillTag, data] of entries) {
    const rawScore = (data.correct / data.total) * 10;
    const roundedScore = Math.round(rawScore * 10) / 10;

    skillBreakdown.push({
      skillTag,
      category: data.category,
      correctCount: data.correct,
      totalCount: data.total,
      score: roundedScore,
    });
  }

  skillBreakdown.sort((a, b) => a.skillTag.localeCompare(b.skillTag));

  const overallRaw = (totalCorrect / items.length) * 10;
  const overallScore = Math.round(overallRaw * 10) / 10;
  const scorePercentage = Math.round((totalCorrect / items.length) * 100);

  return {
    overallScore,
    scorePercentage,
    totalQuestions: items.length,
    totalCorrect,
    skillBreakdown,
  };
}

/**
 * Calculates Skill Gaps against a benchmark role.
 */
export function calculateSkillGaps(
  targetRole: CareerRole,
  studentSkills: Record<string, number>
): GapAnalysisResult {
  const benchmarkMap = targetRole.benchmark_skills || {};
  const gaps: StudentSkillGapItem[] = [];

  for (const [skill, reqScore] of Object.entries(benchmarkMap)) {
    const required = Number(reqScore);
    const current = studentSkills[skill.toLowerCase()] ?? studentSkills[skill] ?? 0;
    const gap = Number(Math.max(0, required - current).toFixed(1));

    let severity: 'Critical' | 'Moderate' | 'Met' = 'Met';
    if (gap >= 3.0) {
      severity = 'Critical';
    } else if (gap > 0) {
      severity = 'Moderate';
    }

    gaps.push({
      skill,
      current_score: current,
      required_score: required,
      gap,
      severity,
    });
  }

  const severityOrder = { Critical: 0, Moderate: 1, Met: 2 };
  gaps.sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity] || b.gap - a.gap);

  return {
    targetRoleId: targetRole.id,
    targetRoleTitle: targetRole.title,
    gaps,
  };
}

/**
 * Computes the Multi-Factor Career Readiness Score (IRI).
 */
export function calculateReadinessIndex(
  targetRole: CareerRole,
  studentSkills: Record<string, number>,
  attemptedSkillTags: string[]
): ReadinessScoreResult {
  const benchmarkMap = targetRole.benchmark_skills || {};
  const benchmarkEntries = Object.entries(benchmarkMap);

  if (benchmarkEntries.length === 0) {
    return {
      overallScore: 0,
      skillReadiness: 0,
      assessmentCoverage: 0,
      consistency: 0,
      tier: 'NOVICE',
    };
  }

  // 1. Skill Readiness (0-100)
  let totalAchieved = 0;
  let totalRequired = 0;
  for (const [skill, reqScore] of benchmarkEntries) {
    const current = studentSkills[skill.toLowerCase()] ?? studentSkills[skill] ?? 0;
    totalAchieved += Math.min(current, Number(reqScore));
    totalRequired += Number(reqScore);
  }
  const skillReadiness = totalRequired > 0 ? Math.round((totalAchieved / totalRequired) * 100) : 0;

  // 2. Assessment Coverage (0-100)
  const attemptedSet = new Set(attemptedSkillTags.map((s) => s.toLowerCase()));
  const coveredCount = benchmarkEntries.filter(([skill]) => attemptedSet.has(skill.toLowerCase())).length;
  const assessmentCoverage = Math.round((coveredCount / benchmarkEntries.length) * 100);

  // 3. Consistency (0-100)
  let gapPenalty = 0;
  for (const [skill, reqScore] of benchmarkEntries) {
    const current = studentSkills[skill.toLowerCase()] ?? studentSkills[skill] ?? 0;
    const diff = Number(reqScore) - current;
    if (diff > 3.0) gapPenalty += 15;
    else if (diff > 1.5) gapPenalty += 5;
  }
  const consistency = Math.max(0, 100 - gapPenalty);

  const overall = Math.round(
    skillReadiness * 0.6 + assessmentCoverage * 0.25 + consistency * 0.15
  );

  let tier: ReadinessScoreResult['tier'] = 'NOVICE';
  if (overall >= 80) tier = 'ADVANCED_EXPERT';
  else if (overall >= 65) tier = 'INDUSTRY_READY';
  else if (overall >= 40) tier = 'DEVELOPING';

  return {
    overallScore: overall,
    skillReadiness,
    assessmentCoverage,
    consistency,
    tier,
  };
}

/**
 * Generates an Action Plan based on evaluated skill gaps.
 */
export function generateActionPlan(
  targetRoleTitle: string,
  gaps: StudentSkillGapItem[]
): ActionPlanResult {
  const plan: ActionPlanItem[] = gaps.map((gapItem) => {
    if (gapItem.severity === 'Critical') {
      return {
        focus_area: gapItem.skill,
        gap_severity: 'Critical',
        milestone: `Reach minimum score of ${gapItem.required_score}/10 in ${gapItem.skill}`,
        recommended_actions: [
          `Complete foundational track on ${gapItem.skill}`,
          `Take the verified ${gapItem.skill} diagnostic test`,
          `Build 1 capstone project implementing ${gapItem.skill}`,
        ],
        estimated_time_to_close: '2-3 weeks',
      };
    } else if (gapItem.severity === 'Moderate') {
      return {
        focus_area: gapItem.skill,
        gap_severity: 'Moderate',
        milestone: `Close ${gapItem.gap}pt delta in ${gapItem.skill}`,
        recommended_actions: [
          `Review advanced patterns and case studies for ${gapItem.skill}`,
          `Submit code review artifact on ${gapItem.skill}`,
        ],
        estimated_time_to_close: '1 week',
      };
    } else {
      return {
        focus_area: gapItem.skill,
        gap_severity: 'Met',
        milestone: `Maintain verified proficiency (${gapItem.current_score}/10)`,
        recommended_actions: [
          `Demonstrate skill in portfolio capstone`,
          `Eligible for industry endorsement`,
        ],
        estimated_time_to_close: 'Target Met',
      };
    }
  });

  return {
    targetRoleTitle,
    source: 'fallback',
    plan,
  };
}
