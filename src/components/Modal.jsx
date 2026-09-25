import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

// Modal sobre <dialog> nativo: showModal() atrapa el foco, Esc cierra y closedby="any" cierra al hacer clic afuera
export function Modal({ open, onClose, badges, title, children }) {
  const dialogRef = useRef(null)
  const titleId   = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Fallback de light dismiss para navegadores sin soporte de closedby (Safari)
  const handleClick = (event) => {
    const dialog = dialogRef.current
    if ('closedBy' in HTMLDialogElement.prototype || event.target !== dialog) return

    const rect = dialog.getBoundingClientRect()
    const insideDialog =
      rect.top <= event.clientY && event.clientY <= rect.bottom &&
      rect.left <= event.clientX && event.clientX <= rect.right

    if (!insideDialog) dialog.close()
  }

  const close = () => dialogRef.current.close()

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleClick}
      className="m-auto w-[min(36rem,calc(100%-2rem))] max-h-[calc(100dvh-3rem)] overflow-y-auto rounded-xl border border-border bg-surface p-0 shadow-xl backdrop:bg-slate-900/50 backdrop:backdrop-blur-sm"
    >
      {open && (
        <>
          <header className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-start justify-between gap-4">
            <div className="min-w-0">
              {badges && <div className="flex flex-wrap items-center gap-2 mb-1.5">{badges}</div>}
              <h2 id={titleId} className="m-0 text-lg font-bold text-slate-900">{title}</h2>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </header>

          <div className="p-6 space-y-5">{children}</div>

          <footer className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={close}
              className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </footer>
        </>
      )}
    </dialog>
  )
}

export function StatusPill({ label, pill, dot }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </span>
  )
}

export function TagBadge({ children }) {
  return (
    <span className="px-2 py-0.5 rounded text-[11px] font-semibold uppercase bg-slate-200 text-slate-700">{children}</span>
  )
}
