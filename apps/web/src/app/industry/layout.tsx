import React from 'react';

export default function IndustryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 border-r border-slate-200 bg-white p-4 hidden md:block">
        <div className="text-xl font-bold text-indigo-600 mb-6">Industry Portal</div>
        <nav className="space-y-2 text-sm text-slate-700">
          <div>Overview</div>
          <div>Management</div>
          <div>Analytics</div>
          <div>Settings</div>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
