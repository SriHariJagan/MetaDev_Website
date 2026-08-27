// Support.tsx — Support Center: contact-form inquiries from the website
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LifeBuoy, Mail, Phone, Search } from 'lucide-react';
import {
  PRODUCT_META,
  formatDateTime,
  timeAgo,
  type ProductKey,
  type TicketStatus,
} from '@/data/supportTickets';
import { useSupportTickets } from '@/context/SupportTicketsContext';
import { DashModal, EmptyState, PageHead } from './_shared';

const STATUS_BADGE: Record<TicketStatus, string> = {
  new: 'dash-badge dash-badge--blue',
  open: 'dash-badge dash-badge--amber',
  resolved: 'dash-badge dash-badge--green',
};

const STATUS_LABEL: Record<TicketStatus, string> = {
  new: 'New',
  open: 'Open',
  resolved: 'Resolved',
};

export function SupportPage() {
  const { tickets, markRead, setStatus } = useSupportTickets();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [productFilter, setProductFilter] = useState<'' | ProductKey>('');
  const [statusFilter, setStatusFilter] = useState<'' | TicketStatus>('');

  const paramId = searchParams.get('ticket');
  const activeId = selectedId ?? paramId;
  const selected = tickets.find((t) => t.id === activeId) ?? null;

  const closeDetail = () => {
    setSelectedId(null);
    if (paramId) setSearchParams({}, { replace: true });
  };

  const openTicket = (id: string) => {
    setSelectedId(id);
    markRead(id);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets
      .filter((t) => (productFilter ? t.product === productFilter : true))
      .filter((t) => (statusFilter ? t.status === statusFilter : true))
      .filter((t) =>
        q
          ? [t.name, t.email, t.subject, t.message].some((v) =>
              v.toLowerCase().includes(q),
            )
          : true,
      )
      .sort(
        (a, b) =>
          new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime(),
      );
  }, [tickets, search, productFilter, statusFilter]);

  const counts = useMemo(
    () => ({
      total: tickets.length,
      new: tickets.filter((t) => t.status === 'new').length,
      open: tickets.filter((t) => t.status === 'open').length,
      resolved: tickets.filter((t) => t.status === 'resolved').length,
    }),
    [tickets],
  );

  const stats = [
    { label: 'Total Inquiries', value: counts.total, color: '#6366f1' },
    { label: 'New', value: counts.new, color: '#2563eb' },
    { label: 'Open', value: counts.open, color: '#d97706' },
    { label: 'Resolved', value: counts.resolved, color: '#059669' },
  ];

  return (
    <>
      <PageHead
        title="Support Center"
        subtitle="Inquiries received from the website contact form"
      />

      <div className="dash-stats">
        {stats.map((s) => (
          <div key={s.label} className="dash-stat" style={{ cursor: 'default' }}>
            <div
              className="dash-stat__accent"
              style={{ background: `linear-gradient(90deg, ${s.color}, ${s.color}55)` }}
            />
            <div className="dash-stat__top">
              <div>
                <p className="dash-stat__label">{s.label}</p>
                <p className="dash-stat__value">{s.value}</p>
              </div>
              <div className="dash-stat__icon" style={{ background: `${s.color}14` }}>
                <LifeBuoy size={16} style={{ color: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dash-toolbar">
        <div className="dash-search">
          <Search size={14} className="dash-search__icon" />
          <input
            className="dash-input"
            placeholder="Search name, email, subject…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="dash-select"
          style={{ width: 160 }}
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value as '' | ProductKey)}
        >
          <option value="">All Products</option>
          {(Object.keys(PRODUCT_META) as ProductKey[]).map((key) => (
            <option key={key} value={key}>
              {PRODUCT_META[key].label}
            </option>
          ))}
        </select>
        <select
          className="dash-select"
          style={{ width: 130 }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as '' | TicketStatus)}
        >
          <option value="">All Status</option>
          <option value="new">New</option>
          <option value="open">Open</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <section className="dash-card">
        {filtered.length === 0 ? (
          <EmptyState
            icon={<LifeBuoy size={28} />}
            message="No inquiries match your filters."
          />
        ) : (
          <div style={{ padding: 8 }}>
            {filtered.map((ticket) => {
              const product = PRODUCT_META[ticket.product];
              const Icon = product.icon;
              return (
                <div
                  key={ticket.id}
                  className="dash-list__item"
                  style={{ alignItems: 'flex-start', cursor: 'pointer' }}
                  onClick={() => openTicket(ticket.id)}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `${product.color}14`,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={15} style={{ color: product.color }} />
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 7,
                        flexWrap: 'wrap',
                      }}
                    >
                      {!ticket.read && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: '50%',
                            background: '#6366f1',
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: ticket.read ? 600 : 700,
                          color: '#0f172a',
                        }}
                      >
                        {ticket.subject}
                      </span>
                      <span
                        className="dash-chip"
                        style={{ color: product.color, background: `${product.color}12` }}
                      >
                        {product.label}
                      </span>
                      <span className={STATUS_BADGE[ticket.status]}>
                        {STATUS_LABEL[ticket.status]}
                      </span>
                    </div>
                    <p
                      className="dash-table__cellsub"
                      style={{
                        marginTop: 3,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ticket.name} · {ticket.email}
                    </p>
                    <p
                      className="dash-muted"
                      style={{
                        marginTop: 2,
                        fontSize: 12,
                        color: '#64748b',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ticket.message}
                    </p>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p className="dash-muted" style={{ fontSize: 11.5 }}>
                      {timeAgo(ticket.receivedAt)}
                    </p>
                    <p className="dash-mono dash-muted" style={{ fontSize: 10.5 }}>
                      {ticket.id}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selected && (
        <DashModal title={`Inquiry ${selected.id}`} onClose={closeDetail}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#0f172a' }}>
                {selected.subject}
              </h3>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                {(() => {
                  const product = PRODUCT_META[selected.product];
                  const Icon = product.icon;
                  return (
                    <span
                      className="dash-chip"
                      style={{ color: product.color, background: `${product.color}12` }}
                    >
                      <Icon size={11} style={{ marginRight: 4 }} />
                      {product.label}
                    </span>
                  );
                })()}
                <span className={STATUS_BADGE[selected.status]}>
                  {STATUS_LABEL[selected.status]}
                </span>
                <span className="dash-muted" style={{ fontSize: 11.5 }}>
                  {formatDateTime(selected.receivedAt)}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
                background: '#f8fafc',
                border: '1px solid #eef1f6',
                borderRadius: 12,
                padding: 14,
              }}
            >
              <div>
                <p className="dash-table__cellsub">From</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {selected.name}
                </p>
              </div>
              <div>
                <p className="dash-table__cellsub">Product</p>
                <p style={{ margin: '2px 0 0', fontSize: 13, fontWeight: 600, color: '#0f172a' }}>
                  {PRODUCT_META[selected.product].label}
                </p>
              </div>
              <div>
                <p className="dash-table__cellsub">Email</p>
                <a
                  href={`mailto:${selected.email}`}
                  style={{
                    margin: '2px 0 0',
                    fontSize: 13,
                    color: '#4f46e5',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Mail size={12} /> {selected.email}
                </a>
              </div>
              <div>
                <p className="dash-table__cellsub">Phone</p>
                <a
                  href={`tel:${selected.phone.replace(/\s/g, '')}`}
                  style={{
                    margin: '2px 0 0',
                    fontSize: 13,
                    color: '#4f46e5',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 5,
                  }}
                >
                  <Phone size={12} /> {selected.phone}
                </a>
              </div>
            </div>

            <div>
              <p className="dash-table__cellsub" style={{ marginBottom: 6 }}>
                Message
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: 13.5,
                  lineHeight: 1.7,
                  color: '#334155',
                  background: '#f8fafc',
                  border: '1px solid #eef1f6',
                  borderRadius: 12,
                  padding: 14,
                }}
              >
                {selected.message}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="dash-table__cellsub">Status</span>
                <select
                  className="dash-select"
                  value={selected.status}
                  onChange={(e) =>
                    setStatus(selected.id, e.target.value as TicketStatus)
                  }
                >
                  <option value="new">New</option>
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              {selected.status !== 'resolved' && (
                <button
                  type="button"
                  className="dash-btn dash-btn--primary"
                  onClick={() => setStatus(selected.id, 'resolved')}
                >
                  Mark Resolved
                </button>
              )}
            </div>
          </div>
        </DashModal>
      )}
    </>
  );
}

export default SupportPage;
