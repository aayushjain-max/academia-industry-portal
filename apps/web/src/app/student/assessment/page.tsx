'use client';

import React, { useState } from 'react';
import { Badge, Button } from '@portal/ui';
import { Play, Check, X, Clock, Terminal } from 'lucide-react';

export default function StudentAssessmentPage() {
  const [activeTab, setActiveTab] = useState<'problem' | 'submissions'>('problem');
  const [selectedLanguage, setSelectedLanguage] = useState('Python 3.12');
  const [code, setCode] = useState(`import asyncio

async def handle_high_throughput_stream(batch_records: list[dict]) -> dict:
    """
    SIH-2024 Benchmark Task:
    Process incoming sensor telemetry batches asynchronously.
    Filter out corrupted frames (checksum mismatch) and compute moving average.
    """
    valid_records = []
    for record in batch_records:
        # Checksum validation
        if record.get("checksum_valid", False):
            valid_records.append(record["metric_val"])
            
    if not valid_records:
        return {"processed": 0, "avg_telemetry": 0.0}
        
    avg = sum(valid_records) / len(valid_records)
    return {
        "processed": len(valid_records),
        "avg_telemetry": round(avg, 2),
        "status": "VALIDATED"
    }
`);

  const [testResults, setTestResults] = useState<{ name: string; passed: boolean; latency: string }[] | null>(null);
  const [running, setRunning] = useState(false);
  const [submittedScore, setSubmittedScore] = useState<string | null>(null);

  const handleRunTests = () => {
    setRunning(true);
    setTimeout(() => {
      setTestResults([
        { name: 'Test Case 1: Standard Batch Telemetry (50k records)', passed: true, latency: '12ms' },
        { name: 'Test Case 2: Corrupted Frame Identification', passed: true, latency: '15ms' },
        { name: 'Test Case 3: Zero-division Boundary Condition', passed: true, latency: '4ms' },
        { name: 'Test Case 4: Concurrent Memory Spike Stress Test', passed: true, latency: '28ms' },
      ]);
      setRunning(false);
    }, 1200);
  };

  const handleSubmitEvaluation = () => {
    handleRunTests();
    setTimeout(() => {
      setSubmittedScore('98.4% SCORE // BENCHMARK EXCEEDED');
    }, 1500);
  };

  return (
    <div className="space-y-space-md">
      {/* Top Telemetry Header */}
      <div className="bg-bg-surface border-2 border-border-strong p-space-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 bg-accent-signal text-fg-primary flex items-center justify-center font-bold text-base border border-border-strong shrink-0">
            <Terminal size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2 font-label-mono text-[10px] text-fg-muted uppercase">
              <span className="w-2 h-2 bg-status-success rounded-full" />
              <span>PROCTORED TERMINAL // SESSION: EVAL-8042-PRO</span>
              <span>•</span>
              <span className="text-status-success font-semibold">CAMERA ACTIVE</span>
            </div>
            <h1 className="font-headline-md text-headline-sm uppercase font-extrabold text-fg-primary">
              Distributed Systems Async Stream Assessment
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-space-sm self-start md:self-auto font-mono text-xs">
          <div className="px-3 py-1.5 bg-neutral-900 text-accent-signal border border-neutral-800 flex items-center gap-1.5 font-bold">
            <Clock size={14} />
            <span>44:18 REMAINING</span>
          </div>
          <Badge variant="signal">PROCTORED</Badge>
        </div>
      </div>

      {submittedScore && (
        <div className="p-space-md bg-green-50 border-2 border-status-success flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 font-label-mono text-xs text-status-success font-bold">
            <Check size={18} />
            <span>EXAMINATION EVALUATED: {submittedScore}</span>
          </div>
          <span className="font-label-mono text-xs text-fg-primary font-bold">
            CREDENTIAL MINTED TO SKILL PASSPORT
          </span>
        </div>
      )}

      {/* Main Assessment Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
        {/* Left 5 Cols: Problem Description & Constraints */}
        <div className="lg:col-span-5 bg-bg-surface border border-border-strong p-space-md space-y-space-md">
          <div className="border-b border-border-hairline pb-2 flex justify-between items-center">
            <span className="font-label-mono text-xs text-fg-muted uppercase">
              PROBLEM SPECIFICATION // PS-094
            </span>
            <span className="font-label-mono text-xs text-status-warning font-semibold">DIFFICULTY: HARD</span>
          </div>

          <div>
            <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary mb-2">
              High-Throughput Async Telemetry Ingestion
            </h2>
            <p className="font-body-sm text-xs text-fg-secondary leading-relaxed">
              Industrial sensors in automotive telemetry streams generate variable batches containing noisy corrupted frames. 
              Implement an asynchronous pipeline handler to validate cryptographic checksums and compute rolling averages without blocking the main event loop.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="font-label-mono text-fg-muted uppercase block text-[10px]">CONSTRAINTS:</span>
            <ul className="list-disc pl-5 space-y-1 text-fg-secondary text-[11px]">
              <li>Time Complexity: Must process 50,000 records in &lt; 50ms</li>
              <li>Space Complexity: Zero auxiliary memory allocations over 10MB</li>
              <li>Corrupted frames with <code className="bg-bg-subtle px-1">checksum_valid=False</code> must be dropped silently</li>
            </ul>
          </div>

          <div className="p-3 bg-bg-subtle border border-border-hairline font-mono text-[11px] space-y-1">
            <span className="text-fg-muted uppercase block text-[10px]">SAMPLE INPUT:</span>
            <pre className="text-fg-primary overflow-x-auto text-[10px]">
{`[
  {"metric_val": 42.5, "checksum_valid": true},
  {"metric_val": 99.0, "checksum_valid": false},
  {"metric_val": 47.5, "checksum_valid": true}
]`}
            </pre>
            <span className="text-fg-muted uppercase block text-[10px] pt-1">EXPECTED OUTPUT:</span>
            <pre className="text-status-success text-[10px]">
{`{"processed": 2, "avg_telemetry": 45.0, "status": "VALIDATED"}`}
            </pre>
          </div>
        </div>

        {/* Right 7 Cols: Interactive Code Editor & Test Runner */}
        <div className="lg:col-span-7 space-y-space-md">
          <div className="bg-neutral-950 border-2 border-border-strong text-white p-space-md">
            {/* Editor Control Bar */}
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-accent-signal inline-block" />
                <span className="font-label-mono text-xs text-white font-bold uppercase">
                  SANDBOX EXECUTION RUNNER
                </span>
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 text-accent-signal font-mono text-xs px-2 py-1 outline-none"
              >
                <option>Python 3.12</option>
                <option>Golang 1.22</option>
                <option>C++20 (GCC 14)</option>
                <option>Rust 1.78</option>
              </select>
            </div>

            {/* Code Input Area */}
            <textarea
              rows={13}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 p-3 font-mono text-xs text-neutral-200 focus:outline-none focus:border-accent-signal resize-none leading-relaxed"
              spellCheck={false}
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-neutral-800">
              <div className="text-[10px] font-mono text-neutral-400">
                CONTAINER: SANDBOX-LINUX-SANDBOX-04 // MEM: 64MB
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={running}
                  onClick={handleRunTests}
                  className="text-white border-neutral-700 hover:bg-neutral-800 font-label-mono text-xs"
                >
                  <Play size={14} className="mr-1" />
                  <span>{running ? 'Executing...' : 'Run Test Cases'}</span>
                </Button>
                <Button
                  variant="signal"
                  size="sm"
                  disabled={running}
                  onClick={handleSubmitEvaluation}
                  className="font-label-mono text-xs font-bold"
                >
                  <Check size={14} className="mr-1" />
                  <span>Submit Solution</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Test Case Execution Output Terminal */}
          {testResults && (
            <div className="bg-bg-surface border-2 border-border-strong p-space-md space-y-2 animate-fade-in font-mono text-xs">
              <div className="flex items-center justify-between border-b border-border-hairline pb-2">
                <span className="font-label-mono text-xs font-bold uppercase text-fg-primary">
                  TEST SUITE DIAGNOSTIC RESULTS
                </span>
                <span className="text-status-success font-bold">4 / 4 PASSED</span>
              </div>
              <div className="space-y-1.5">
                {testResults.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2 border border-border-hairline bg-bg-canvas flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-status-success">✓</span>
                      <span className="text-fg-primary">{t.name}</span>
                    </div>
                    <span className="text-fg-muted font-label-mono text-[10px]">{t.latency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
