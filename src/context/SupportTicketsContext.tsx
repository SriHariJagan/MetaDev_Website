// SupportTicketsContext.tsx — shared state for contact-form inquiries
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { SAMPLE_TICKETS, type SupportTicket, type TicketStatus } from '@/data/supportTickets';

interface SupportTicketsContextValue {
  tickets: SupportTicket[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllRead: () => void;
  setStatus: (id: string, status: TicketStatus) => void;
}

const SupportTicketsContext = createContext<SupportTicketsContextValue | null>(null);

export function SupportTicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>(SAMPLE_TICKETS);

  const value = useMemo<SupportTicketsContextValue>(
    () => ({
      tickets,
      unreadCount: tickets.filter((t) => !t.read).length,
      markRead: (id) =>
        setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, read: true } : t))),
      markAllRead: () => setTickets((prev) => prev.map((t) => ({ ...t, read: true }))),
      setStatus: (id, status) =>
        setTickets((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status, read: true } : t)),
        ),
    }),
    [tickets],
  );

  return (
    <SupportTicketsContext.Provider value={value}>
      {children}
    </SupportTicketsContext.Provider>
  );
}

export function useSupportTickets(): SupportTicketsContextValue {
  const ctx = useContext(SupportTicketsContext);
  if (!ctx) throw new Error('useSupportTickets must be used within SupportTicketsProvider');
  return ctx;
}
