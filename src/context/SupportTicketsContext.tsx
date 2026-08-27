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
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const [ticketsRes, countRes] = await Promise.all([
        contactApi.list(),
        contactApi.unreadCount(),
      ]);
      const data = ticketsRes.data.data as unknown as ContactSubmission[];
      setTickets(data.map(mapSubmission));
      setUnreadCount((countRes.data.data as { count: number }).count);
    } catch {
      setTickets([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const markRead = async (id: string) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, read: true } : t)));
    setUnreadCount((prev) => Math.max(0, prev - 1));
    try {
      await contactApi.markRead(id);
    } catch { /* ignore */ }
  };

  const markAllRead = async () => {
    const unreadIds = tickets.filter((t) => !t.read).map((t) => t.id);
    setTickets((prev) => prev.map((t) => ({ ...t, read: true })));
    setUnreadCount(0);
    for (const id of unreadIds) {
      try { await contactApi.markRead(id); } catch { /* ignore */ }
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
      unreadCount,
      loading,
      markRead,
      markAllRead,
      setStatus,
      refresh: fetchTickets,
    }),
    [tickets, unreadCount, loading],
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
