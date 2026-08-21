// ProductFinanceLedger.tsx — double-entry ledger visualization for MetaLedger (Finance)
import type { LucideIcon } from "lucide-react";
import { DollarSign, TrendingUp, Shield, FileText, ArrowUpRight, ArrowDownLeft, Minimize2, Clock, CheckCircle } from "lucide-react";
import styles from "./ProductFinanceLedger.module.css";

interface ProductFinanceLedgerProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const LEDGER_ENTRIES = [
  { id: "TXN-001", date: "2024-01-15", account: "Revenue: SaaS Subscriptions", debit: 0, credit: 45200, type: "credit", status: "posted" },
  { id: "TXN-002", date: "2024-01-15", account: "Accounts Receivable", debit: 45200, credit: 0, type: "debit", status: "posted" },
  { id: "TXN-003", date: "2024-01-14", account: "Expense: AWS Infrastructure", debit: 12800, credit: 0, type: "debit", status: "posted" },
  { id: "TXN-004", date: "2024-01-14", account: "Cash: Operating Account", debit: 0, credit: 12800, type: "credit", status: "posted" },
  { id: "TXN-005", date: "2024-01-13", account: "Revenue: Professional Services", debit: 0, credit: 28500, type: "credit", status: "posted" },
  { id: "TXN-006", date: "2024-01-13", account: "Accounts Receivable", debit: 28500, credit: 0, type: "debit", status: "pending" },
  { id: "TXN-007", date: "2024-01-12", account: "Expense: Payroll", debit: 85000, credit: 0, type: "debit", status: "posted" },
  { id: "TXN-008", date: "2024-01-12", account: "Cash: Payroll Account", debit: 0, credit: 85000, type: "credit", status: "posted" },
];

const ACCOUNT_BALANCES = [
  { name: "Cash & Equivalents", balance: 2450000, type: "asset", change: "+12.5%" },
  { name: "Accounts Receivable", balance: 890000, type: "asset", change: "+8.2%" },
  { name: "Revenue", balance: 3200000, type: "revenue", change: "+23.1%" },
  { name: "Operating Expenses", balance: 1450000, type: "expense", change: "-5.3%" },
  { name: "Payroll Liabilities", balance: 320000, type: "liability", change: "+2.1%" },
  { name: "Tax Payable", balance: 180000, type: "liability", change: "-1.8%" },
];

const FINANCIAL_KPIS = [
  { label: "Monthly Recurring Revenue", value: "$385K", icon: TrendingUp, trend: "+18.2%", color: "rgb(16, 185, 129)" },
  { label: "Net Cash Flow", value: "+$142K", icon: DollarSign, trend: "+45%", color: "rgb(34, 197, 94)" },
  { label: "Days Sales Outstanding", value: "23 days", icon: FileText, trend: "-4 days", color: "rgb(99, 102, 241)" },
  { label: "Compliance Score", value: "99.2%", icon: Shield, trend: "+0.3%", color: "rgb(245, 158, 11)" },
];

const CHART_DATA = [
  { month: "Jul", revenue: 320, expenses: 180, cashflow: 140 },
  { month: "Aug", revenue: 345, expenses: 195, cashflow: 150 },
  { month: "Sep", revenue: 380, expenses: 210, cashflow: 170 },
  { month: "Oct", revenue: 355, expenses: 200, cashflow: 155 },
  { month: "Nov", revenue: 410, expenses: 225, cashflow: 185 },
  { month: "Dec", revenue: 385, expenses: 215, cashflow: 170 },
];

export function ProductFinanceLedger({ icon: Icon, name, features }: ProductFinanceLedgerProps) {
  const totalDebits = LEDGER_ENTRIES.reduce((sum, e) => sum + e.debit, 0);
  const totalCredits = LEDGER_ENTRIES.reduce((sum, e) => sum + e.credit, 0);
  const maxChartValue = Math.max(...CHART_DATA.map(d => Math.max(d.revenue, d.expenses, d.cashflow)));

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerIcon}>
            <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <div>
            <span className={styles.headerLabel}>{name} General Ledger</span>
            <span className={styles.headerSubtitle}>Double-Entry Accounting Engine</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnIcon} title="New Entry">
            <FileText size={16} strokeWidth={2} />
          </button>
          <button className={styles.btnIcon} title="Reconcile">
            <Shield size={16} strokeWidth={2} />
          </button>
          <button className={styles.btnIcon} title="Export">
            <ArrowUpRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className={styles.kpiBar}>
        {FINANCIAL_KPIS.map((kpi, i) => (
          <div
            key={kpi.label}
            className={styles.kpiCard}
            style={{
              animationDelay: `${i * 0.06}s`,
              background: `linear-gradient(150deg, color-mix(in srgb, var(--color-surface) 94%, ${kpi.color} 6%), var(--color-surface))`,
              borderColor: `rgba(15, 15, 32, 0.15)`,
            }}
          >
            <span
              className={styles.kpiIcon}
              style={{
                background: `linear-gradient(135deg, ${kpi.color}, color-mix(in srgb, ${kpi.color} 70%, transparent))`,
              }}
            >
              <kpi.icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </div>
            <span className={styles.kpiTrend}>{kpi.trend}</span>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Ledger Entries */}
        <div className={styles.ledgerPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Journal Entries</span>
            <div className={styles.trialBalance}>
              <span className={`${styles.balanceItem} ${styles.debit}`}>Dr: ${totalDebits.toLocaleString()}</span>
              <span className={`${styles.balanceItem} ${styles.credit}`}>Cr: ${totalCredits.toLocaleString()}</span>
              <span className={`${styles.balanceItem} ${styles.balanced}`}>&#10003; Balanced</span>
            </div>
          </div>
          <div className={styles.ledgerTable}>
            <div className={styles.tableHeader}>
              <span>Date</span>
              <span>Account</span>
              <span className={styles.debitHeader}>Debit</span>
              <span className={styles.creditHeader}>Credit</span>
              <span>Status</span>
            </div>
            <div className={styles.tableBody}>
              {LEDGER_ENTRIES.map((entry, i) => (
                <div
                  key={entry.id}
                  className={styles.tableRow}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <span className={styles.cellDate}>{entry.date}</span>
                  <span className={styles.cellAccount}>{entry.account}</span>
                  <span className={`${styles.cellAmount} ${styles.debit}`}>
                    {entry.debit > 0 ? `$${entry.debit.toLocaleString()}` : "—"}
                  </span>
                  <span className={`${styles.cellAmount} ${styles.credit}`}>
                    {entry.credit > 0 ? `$${entry.credit.toLocaleString()}` : "—"}
                  </span>
                  <span className={styles.cellStatus} data-status={entry.status}>
                    {entry.status === "posted" ? (
                      <>
                        <CheckCircle size={10} strokeWidth={2} aria-hidden="true" />
                        Posted
                      </>
                    ) : (
                      <>
                        <Clock size={10} strokeWidth={2} aria-hidden="true" />
                        Pending
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Chart & Accounts */}
        <div className={styles.rightPanel}>
          {/* Mini Chart */}
          <div className={styles.chartPanel}>
            <div className={styles.chartHeader}>
              <span>Revenue vs Expenses (6M)</span>
              <div className={styles.chartLegend}>
                <span className={styles.legendItem} style={{ background: "rgb(16, 185, 129)" }}>Revenue</span>
                <span className={styles.legendItem} style={{ background: "rgb(239, 68, 68)" }}>Expenses</span>
                <span className={styles.legendItem} style={{ background: "rgb(34, 197, 94)" }}>Cash Flow</span>
              </div>
            </div>
            <svg className={styles.chartSvg} viewBox="0 0 320 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revenue-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(16, 185, 129)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="expense-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(239, 68, 68)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="cashflow-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((ratio, i) => (
                <line
                  key={i}
                  x1="40"
                  y1={140 - ratio * 100}
                  x2="300"
                  y2={140 - ratio * 100}
                  className={styles.gridLine}
                />
              ))}
              {/* Revenue Area */}
              <path
                d={CHART_DATA.map((d, i) => {
                  const x = 40 + i * 52;
                  const y = 140 - (d.revenue / maxChartValue) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' L 300 140 L 40 140 Z'}
                className={styles.revenueArea}
              />
              {/* Expenses Area */}
              <path
                d={CHART_DATA.map((d, i) => {
                  const x = 40 + i * 52;
                  const y = 140 - (d.expenses / maxChartValue) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' L 300 140 L 40 140 Z'}
                className={styles.expenseArea}
              />
              {/* Cashflow Line */}
              <path
                d={CHART_DATA.map((d, i) => {
                  const x = 40 + i * 52;
                  const y = 140 - (d.cashflow / maxChartValue) * 100;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                className={styles.cashflowLine}
              />
              {/* Data points */}
              {CHART_DATA.map((d, i) => (
                <g key={`point-${i}`}>
                  <circle
                    cx={40 + i * 52}
                    cy={140 - (d.revenue / maxChartValue) * 100}
                    r="4"
                    className={styles.dataPoint}
                    style={{ fill: "rgb(16, 185, 129)", animationDelay: `${i * 0.1}s` }}
                  />
                  <circle
                    cx={40 + i * 52}
                    cy={140 - (d.expenses / maxChartValue) * 100}
                    r="4"
                    className={styles.dataPoint}
                    style={{ fill: "rgb(239, 68, 68)", animationDelay: `${i * 0.1}s` }}
                  />
                  <circle
                    cx={40 + i * 52}
                    cy={140 - (d.cashflow / maxChartValue) * 100}
                    r="4"
                    className={styles.dataPoint}
                    style={{ fill: "rgb(34, 197, 94)", animationDelay: `${i * 0.1}s` }}
                  />
                  <text
                    x={40 + i * 52}
                    y={158}
                    className={styles.monthLabel}
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Account Balances */}
          <div className={styles.accountsPanel}>
            <span className={styles.panelTitle}>Account Balances</span>
            <div className={styles.accountList}>
              {ACCOUNT_BALANCES.map((acc, i) => (
                <div
                  key={acc.name}
                  className={styles.accountRow}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className={styles.accountInfo}>
                    <span className={styles.accountType} data-type={acc.type}>
                      {acc.type === "asset" && <ArrowUpRight size={10} strokeWidth={2} />}
                      {acc.type === "liability" && <ArrowDownLeft size={10} strokeWidth={2} />}
                      {acc.type === "revenue" && <TrendingUp size={10} strokeWidth={2} />}
                      {acc.type === "expense" && <Minimize2 size={10} strokeWidth={2} />}
                    </span>
                    <span className={styles.accountName}>{acc.name}</span>
                  </div>
                  <div className={styles.accountBalance}>
                    <span className={styles.balanceAmount}>${acc.balance.toLocaleString()}</span>
                    <span className={`${styles.balanceChange} ${acc.change.startsWith("+") ? styles.positive : styles.negative}`}>{acc.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.featuresStrip}>
        {features.slice(0, 5).map((feature, i) => (
          <div
            key={feature}
            className={styles.featureChip}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className={styles.chipDot} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}