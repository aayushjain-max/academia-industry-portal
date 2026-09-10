'use client';

import React, { useState, useEffect } from 'react';
import { NodePageShell } from '@/components/dashboard/node-page-shell';
import { Button, Badge, Card } from '@portal/ui';
import { Icon } from '@/components/ui/icon';
import {
  getWorkshops,
  registerForWorkshop,
  getMyWorkshopRegistrations,
  Workshop,
  WorkshopRegistration,
} from '@/features/academicians/api';
import { Loader2, Search, Calendar, Award, CheckCircle, Users, Building2, MapPin } from 'lucide-react';

export default function AcademicianWorkshopsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [wsRes, regRes] = await Promise.allSettled([
        getWorkshops(),
        getMyWorkshopRegistrations(),
      ]);

      if (wsRes.status === 'fulfilled') {
        setWorkshops(wsRes.value.results || []);
      }
      if (regRes.status === 'fulfilled') {
        setMyRegistrations(regRes.value.results || []);
      }
    } catch (err: any) {
      console.error('Failed to load workshops:', err);
      setError('Unable to load technical workshops registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRegister = async (workshopId: string) => {
    try {
      setRegisteringId(workshopId);
      setRegSuccessMessage(null);
      await registerForWorkshop(workshopId);
      setRegSuccessMessage('Registered successfully for Hands-on Workshop!');
      setTimeout(() => setRegSuccessMessage(null), 4000);
      loadData();
    } catch (err: any) {
      alert(err?.message || 'Failed to register for this workshop.');
    } finally {
      setRegisteringId(null);
    }
  };

  const registeredWorkshopIds = new Set(myRegistrations.map((r) => r.workshop));
  const organizers = Array.from(new Set(workshops.map((w) => w.organizer).filter(Boolean)));

  const filtered = workshops.filter((w) => {
    const matchSearch =
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.organizer.toLowerCase().includes(search.toLowerCase()) ||
      (w.description && w.description.toLowerCase().includes(search.toLowerCase()));

    if (filter === 'all') return matchSearch;
    if (filter === 'MY_WORKSHOPS') return matchSearch && registeredWorkshopIds.has(w.id);
    return matchSearch && (w.domain === filter || filter === 'all');
  });

  return (
    <NodePageShell
      nodeId="FAC-PORTAL // WORKSHOPS"
      nodeStatus="CENTRAL REGISTRY"
      category="EXPERT HANDS-ON WORKSHOPS & SPECIALIZED SYMPOSIA"
      title="Hands-On Technical Workshops & Symposia"
      description="Advanced hands-on technical masterclasses, lab intensives, and research symposia conducted by leading researchers, PSUs, and deep-tech practitioners."
      actions={
        <Button variant="outline" size="sm" onClick={loadData}>
          <Icon name="refresh" size={14} className="mr-1" />
          Refresh Workshops
        </Button>
      }
      kpis={[
        {
          label: 'Scheduled Workshops',
          value: String(workshops.length),
          delta: 'UPCOMING SESSIONS',
          deltaType: 'success',
          subtext: 'Engineering & Computing',
          icon: 'calendar',
        },
        {
          label: 'My Registrations',
          value: String(myRegistrations.length),
          delta: 'ATTENDING',
          deltaType: 'neutral',
          subtext: 'Confirmed Seats',
          icon: 'users',
        },
        {
          label: 'Host Organizers',
          value: String(organizers.length),
          delta: 'TOP INSTITUTES',
          deltaType: 'neutral',
          subtext: 'IITs, NITs & Core Labs',
          icon: 'building',
        },
        {
          label: 'Accreditation API',
          value: 'Eligible',
          delta: 'UGC REGULATION',
          deltaType: 'success',
          subtext: 'Category-II Points',
          icon: 'verified',
        },
      ]}
    >
      {regSuccessMessage && (
        <div className="p-3 bg-status-success/10 border border-status-success text-status-success text-xs font-mono font-bold flex items-center gap-2">
          <CheckCircle size={16} />
          {regSuccessMessage}
        </div>
      )}

      {/* Control Ribbon */}
      <div className="bg-bg-surface border border-border-strong p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs flex-wrap w-full sm:w-auto">
          {['all', 'MY_WORKSHOPS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={
                'px-3 py-1 font-label-mono text-xs uppercase border transition-colors ' +
                (filter === tab
                  ? 'bg-fg-primary text-bg-surface border-border-strong font-bold'
                  : 'bg-bg-subtle text-fg-muted border-border-hairline hover:text-fg-primary')
              }
            >
              {tab === 'all'
                ? `All Workshops (${workshops.length})`
                : `My Registrations (${myRegistrations.length})`}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Search by workshop title or organizer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 px-3 pr-8 border border-border-strong bg-bg-canvas font-body-sm text-fg-primary focus:outline-none focus:ring-2 focus:ring-border-strong"
          />
          <Search size={16} className="absolute right-2.5 top-2.5 text-fg-muted" />
        </div>
      </div>

      {/* Workshops List */}
      {loading ? (
        <div className="p-12 text-center bg-bg-surface border border-border-strong">
          <Loader2 className="w-8 h-8 animate-spin text-portal-primary mx-auto mb-3" />
          <p className="font-mono text-xs uppercase text-fg-muted">Loading Technical Workshops...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-bg-surface border border-status-danger/30 text-status-danger">
          <p className="font-mono text-sm font-bold mb-2">{error}</p>
          <Button variant="outline" size="sm" onClick={loadData}>Retry</Button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center bg-bg-surface border border-border-hairline text-fg-muted">
          <Calendar className="w-10 h-10 mx-auto mb-2 text-fg-muted opacity-40" />
          <p className="font-headline-sm text-fg-primary font-bold">No Workshops Found</p>
          <p className="font-body-sm mt-1 text-xs">No active workshops match your search filters.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setFilter('all'); setSearch(''); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="space-y-space-sm">
          {filtered.map((item) => {
            const isRegistered = registeredWorkshopIds.has(item.id);
            const userReg = myRegistrations.find((r) => r.workshop === item.id);
            const startDate = item.start_date
              ? new Date(item.start_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'TBD';
            const endDate = item.end_date
              ? new Date(item.end_date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
              : 'TBD';

            return (
              <Card key={item.id} className="hover:border-border-strong transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap font-label-mono text-xs">
                      <Badge variant={isRegistered ? 'success' : 'signal'}>
                        {isRegistered ? 'REGISTERED' : item.domain || 'WORKSHOP'}
                      </Badge>
                      <span className="font-mono text-fg-muted">#WS-{item.id.slice(0, 8).toUpperCase()}</span>
                      <span className="text-border-hairline">|</span>
                      <span className="text-fg-primary font-bold flex items-center gap-1">
                        <Building2 size={12} className="text-fg-muted" />
                        {item.organizer}
                      </span>
                    </div>

                    <h2 className="font-headline-sm text-body-lg font-bold text-fg-primary">
                      {item.title}
                    </h2>

                    {item.description && (
                      <p className="text-body-sm text-fg-muted font-sans line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center gap-space-md flex-wrap font-label-mono text-xs text-fg-muted pt-1">
                      <span>
                        DATES: <strong className="text-fg-primary">{startDate} — {endDate}</strong>
                      </span>
                      {item.capacity && (
                        <span>
                          CAPACITY: <strong className="text-fg-primary">{item.capacity} Seats</strong>
                        </span>
                      )}
                    </div>

                    {userReg && (
                      <div className="p-2 bg-bg-canvas border border-border-hairline text-xs font-mono flex items-center justify-between">
                        <span>Registration Status: <strong>{userReg.status}</strong></span>
                        {userReg.certificate_url ? (
                          <span className="text-status-success font-bold flex items-center gap-1">
                            <Award size={12} /> Certificate Issued
                          </span>
                        ) : (
                          <span className="text-fg-muted">Attendance Confirmed</span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    {isRegistered ? (
                      <Button variant="outline" size="sm" disabled>
                        <CheckCircle size={14} className="mr-1 text-status-success" />
                        Registered
                      </Button>
                    ) : (
                      <Button
                        variant="signal"
                        size="sm"
                        disabled={registeringId === item.id}
                        onClick={() => handleRegister(item.id)}
                      >
                        {registeringId === item.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Registering...
                          </>
                        ) : (
                          'Register for Workshop'
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </NodePageShell>
  );
}

