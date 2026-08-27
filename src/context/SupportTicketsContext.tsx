// SupportTicketsContext.tsx — shared state for contact-form inquiries
import { createContext, useContext, useMemo, useState, useEffect, type ReactNode } from 'react';
import { contactApi, type ContactSubmission } from '@/services/api';
import { type ProductKey, type TicketStatus } from '@/data/supportTickets';

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: ProductKey;
  subject: string;
  message: string;
  receivedAt: string;
  status: TicketStatus;
  read: boolean;
}

interface SupportTicketsContextValue {
  tickets: SupportTicket[];
  unreadCount: number;
  loading: boolean;
  markRead: (id: string) => void;
  markAllRead: () => void;
  setStatus: (id: string, status: TicketStatus) => void;
  refresh: () => void;
}

const SupportTicketsContext = createContext<SupportTicketsContextValue | null>(null);

function mapSubmission(sub: ContactSubmission): SupportTicket {
  const statusMap: Record<string, TicketStatus> = {
    NEW: 'new',
    IN_PROGRESS: 'open',
    RESOLVED: 'resolved',
    ARCHIVED: 'resolved',
  };
  return {
    id: sub.id,
    name: sub.name,
    email: sub.email,
    phone: sub.phone ?? '',
    product: (sub.product as ProductKey) || 'metadev',
    subject: sub.subject,
    message: sub.message,
    receivedAt: sub.createdAt,
    status: statusMap[sub.status] ?? 'new',
    read: sub.read,
  };
}

export function SupportTicketsProvider({ children }: { children: ReactNode }) {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await contactApi.list();
      const data = res.data.data as unknown as ContactSubmission[];
      setTickets(data.map(mapSubmission));
    } catch {
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const markRead = async (id: string) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, read: true } : t)));
    try {
      await contactApi.update(id, { read: true });
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    setTickets((prev) => prev.map((t) => ({ ...t, read: true })));
    for (const t of tickets.filter((t) => !t.read)) {
      try { await contactApi.update(t.id, { read: true }); } catch { /* ignore */ }
    }
  };

  const setStatus = async (id: string, status: TicketStatus) => {
    const apiStatus = status === 'open' ? 'IN_PROGRESS' : status.toUpperCase();
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status, read: true } : t)),
    );
    try {
      await contactApi.update(id, { status: apiStatus, read: true });
    } catch { /* ignore */ }
  };

  const value = useMemo<SupportTicketsContextValue>(
    () => ({
      tickets,
      unreadCount: tickets.filter((t) => !t.read).length,
      loading,
      markRead,
      markAllRead,
      setStatus,
      refresh: fetchTickets,
    }),
    [tickets, loading],
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
