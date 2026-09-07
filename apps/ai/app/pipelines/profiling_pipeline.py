from app.services.skill_profiling.service import SkillProfilingService
from app.schemas.requests import AssessmentSubmission

class ProfilingPipeline:
    def run(self, submission: AssessmentSubmission):
        return SkillProfilingService.profile_assessment(submission)
