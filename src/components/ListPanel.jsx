import { Children } from 'react'

export function ListPanel({ icon: Icon, title, meta, emptyMessage, children }) {
  const isEmpty = Children.count(children) === 0

  return (
    <section className="bg-surface rounded-xl border border-border overflow-hidden shadow-sm mb-7">
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between gap-3 bg-slate-50/50">
        <div className="flex items-center gap-2">
          <Icon className="text-slate-700" size={18} aria-hidden="true" />
          <h2 className="m-0 text-sm font-bold text-slate-800">{title}</h2>
        </div>
        <span className="text-xs text-slate-400">{meta}</span>
      </div>

      {isEmpty ? (
        <p className="px-5 py-6 text-sm text-muted">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-slate-100">{children}</ul>
      )}
    </section>
  )
}

// Toda la fila es clickeable; en pantallas chicas el texto hace wrap y "Ver detalle" baja debajo del detalle
export function ListPanelItem({ leading, title, badge, description, onClick }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="group w-full text-left px-5 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 hover:bg-slate-50/80 focus-visible:bg-slate-50/80 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent transition-colors cursor-pointer"
      >
        <span className="flex items-start sm:items-center gap-3.5 min-w-0">
          {leading}
          <span className="min-w-0">
            <span className="flex flex-wrap sm:flex-nowrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-semibold text-slate-900 group-hover:text-accent transition-colors sm:truncate">{title}</span>
              {badge}
            </span>
            <span className="block text-xs text-slate-500 mt-0.5 sm:truncate">{description}</span>
          </span>
        </span>
        {/* Con ícono a la izquierda, se alinea con el texto (40px del ícono + 14px de gap - 12px de padding) */}
        <span
          className={`self-start sm:self-auto sm:ml-0 ${leading ? 'ml-[42px]' : '-ml-3'} text-xs font-semibold text-accent group-hover:text-blue-700 px-3 py-1.5 rounded-lg group-hover:bg-blue-50 transition-colors shrink-0`}
        >
          Ver detalle
        </span>
      </button>
    </li>
  )
}
