import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export default function SalesTrend({ dailySales }) {
  if (!dailySales || dailySales.length === 0) {
    return <p className="empty-state">No trend data yet.</p>;
  }

  const chartData = dailySales.map((d) => ({
    ...d,
    label: formatDate(d.orderDate),
  }));

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(value) => value.toLocaleString('en-IN')} />
          <Line
            type="monotone"
            dataKey="totalRevenue"
            stroke="#4f46e5"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
