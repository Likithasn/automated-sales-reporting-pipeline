function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value ?? 0);
}

export default function SummaryCards({ summary }) {
  if (!summary) return null;

  const cards = [
    { label: 'Total Orders', value: summary.totalOrders },
    { label: 'Units Sold', value: summary.totalUnitsSold },
    { label: 'Total Revenue', value: formatCurrency(summary.totalRevenue) },
    { label: 'Unique Customers', value: summary.uniqueCustomers },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card) => (
        <div className="summary-card" key={card.label}>
          <div className="summary-card-value">{card.value}</div>
          <div className="summary-card-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}
