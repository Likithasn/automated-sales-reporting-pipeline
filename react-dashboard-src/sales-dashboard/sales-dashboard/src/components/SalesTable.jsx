export default function SalesTable({ sales }) {
  if (!sales || sales.length === 0) {
    return <p className="empty-state">No sales rows yet.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Region</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.orderId}>
              <td>{sale.orderId}</td>
              <td>{new Date(sale.orderDate).toLocaleDateString('en-IN')}</td>
              <td>{sale.customerName}</td>
              <td>{sale.product}</td>
              <td>{sale.category}</td>
              <td>{sale.quantity}</td>
              <td>{sale.unitPrice.toLocaleString('en-IN')}</td>
              <td>{sale.region}</td>
              <td>{(sale.totalAmount ?? 0).toLocaleString('en-IN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
