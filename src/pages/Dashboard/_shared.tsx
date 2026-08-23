import { useEffect, useState, useCallback, type ReactNode } from 'react';
import { X } from 'lucide-react';

export function DashModal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="dash-modal-overlay" onClick={onClose}>
      <div className="dash-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="dash-modal__header">
          <h2 className="dash-modal__title">{title}</h2>
          <button className="dash-rowaction" onClick={onClose} aria-label="Close">
            <X size={15} />
          </button>
        </div>
        <div className="dash-modal__body">{children}</div>
      </div>
    </div>
  );
}

export function PageHead({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="dash-pagehead">
      <div>
        <h1 className="dash-pagehead__title">{title}</h1>
        {subtitle && <p className="dash-pagehead__sub">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ icon, message }: { icon?: ReactNode; message: string }) {
  return (
    <div className="dash-table__empty">
      {icon}
      {message}
    </div>
  );
}
