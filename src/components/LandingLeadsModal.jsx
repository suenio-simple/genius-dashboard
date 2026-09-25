import { ExternalLink, Mail, MessageSquare, Phone } from 'lucide-react'
import { useLandingLeads } from '../hooks/landingLeads.hook'
import { formatDate, formatDateTime, formatNumber } from '../utils/format'
import { Modal, StatusPill, TagBadge } from './Modal'

export const LANDING_STATUS_STYLES = {
  active:   { label: 'Activa',   pill: 'bg-emerald-100 text-emerald-800', dot: 'bg-emerald-500' },
  paused:   { label: 'Pausada',  pill: 'bg-amber-100 text-amber-800',     dot: 'bg-amber-500' },
  draft:    { label: 'Borrador', pill: 'bg-slate-100 text-slate-600',     dot: 'bg-slate-400' },
  closed:   { label: 'Cerrada',  pill: 'bg-slate-200 text-slate-700',     dot: 'bg-slate-500' },
}

function LeadItem({ lead }) {
  return (
    <li className="px-3.5 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
        <span className="text-sm font-semibold text-slate-900">{lead.name}</span>
        <time dateTime={lead.createdAt} className="text-[11px] text-slate-400 font-mono">
          {formatDateTime(lead.createdAt)}
        </time>
      </div>
      <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
        <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 min-w-0 hover:text-accent">
          <Mail size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
          <span className="truncate">{lead.email}</span>
        </a>
        {lead.phone && (
          <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 hover:text-accent">
            <Phone size={14} className="shrink-0 text-slate-400" aria-hidden="true" />
            <span className="font-mono">{lead.phone}</span>
          </a>
        )}
      </div>
      {lead.message && (
        <p className="m-0 mt-1.5 flex items-start gap-1.5 text-xs text-slate-500 italic">
          <MessageSquare size={14} className="shrink-0 mt-px text-slate-400" aria-hidden="true" />
          {lead.message}
        </p>
      )}
    </li>
  )
}

function LeadsList({ status, leads }) {
  if (status === 'loading') return <p className="m-0 px-3.5 py-6 text-sm text-muted">Cargando leads...</p>
  if (status === 'error')   return <p className="m-0 px-3.5 py-6 text-sm text-rose-600">No se pudieron cargar los leads.</p>
  if (leads.length === 0)   return <p className="m-0 px-3.5 py-6 text-sm text-muted">Esta landing todavía no recibió leads.</p>

  return (
    <ul className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
      {leads.map((lead) => <LeadItem key={lead.id} lead={lead} />)}
    </ul>
  )
}

export default function LandingLeadsModal({ landing, onClose }) {
  const { status: leadsStatus, leads } = useLandingLeads(landing?.id ?? null)
  const status = landing && (LANDING_STATUS_STYLES[landing.status] ?? LANDING_STATUS_STYLES.draft)
  const fields = landing?.fields ?? {}

  return (
    <Modal
      open={Boolean(landing)}
      onClose={onClose}
      badges={landing && (
        <>
          <TagBadge>Template #{landing.templateId}</TagBadge>
          <StatusPill {...status} />
        </>
      )}
      title={landing?.name}
    >
      {landing && (
        <>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100">
            <div>
              <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Leads</dt>
              <dd className="text-base font-bold text-slate-900 mt-0.5">{formatNumber(landing.leadCount)}</dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Fecha del evento</dt>
              <dd className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {fields.eventDate ? formatDate(fields.eventDate) : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Creada</dt>
              <dd className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {formatDate(landing.createdAt.slice(0, 10))}
              </dd>
            </div>
          </dl>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-2">
            <div>
              <p className="m-0 text-sm font-semibold text-slate-900">{fields.title}</p>
              {fields.subtitle && <p className="m-0 mt-0.5 text-slate-500">{fields.subtitle}</p>}
            </div>
            {fields.ctaUrl && (
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-slate-200/60 pt-2">
                <span className="font-medium text-slate-500">Botón: {fields.ctaText}</span>
                <a
                  href={fields.ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 min-w-0 font-medium text-accent hover:text-blue-700"
                >
                  <span className="truncate">{fields.ctaUrl}</span>
                  <ExternalLink size={12} className="shrink-0" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          <section className="rounded-lg border border-slate-200 overflow-hidden">
            <h3 className="m-0 px-3.5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-800">
              Leads recibidos
            </h3>
            <LeadsList status={leadsStatus} leads={leads} />
          </section>
        </>
      )}
    </Modal>
  )
}
