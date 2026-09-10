import { useEffect, useState } from 'react';
import { getAllSales, getSalesSummary, getSalesByRegion, getSalesByDate, getPipelineStatus } from './api';
import SummaryCards from './components/SummaryCards';
import RegionBreakdown from './components/RegionBreakdown';
import SalesTrend from './components/SalesTrend';
import SalesTable from './components/SalesTable';
import PipelineStatus from './components/PipelineStatus';

export default function App() {
  const [summary, setSummary] = useState(null);
  const [regions, setRegions] = useState([]);
  const [dailySales, setDailySales] = useState([]);
  const [sales, setSales] = useState([]);
  const [pipelineFiles, setPipelineFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [summaryData, regionData, dailyData, salesData, pipelineData] = await Promise.all([
          getSalesSummary(),
          getSalesByRegion(),
          getSalesByDate(),
          getAllSales(),
          getPipelineStatus(),
        ]);
        setSummary(summaryData);
        setRegions(regionData);
        setDailySales(dailyData);
        setSales(salesData);
        setPipelineFiles(pipelineData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Sales Reporting Dashboard</h1>
        <p className="app-subtitle">Automated Sales Reporting Pipeline — live view</p>
      </header>

      {loading && <p className="status-message">Loading dashboard data…</p>}

      {error && (
        <p className="status-message error">
          Couldn't reach the API at http://localhost:5080 — make sure the SalesApi project
          is running. ({error})
        </p>
      )}

      {!loading && !error && (
        <>
          <SummaryCards summary={summary} />

          <div className="dashboard-grid">
            <section className="dashboard-panel">
              <h2>Revenue by Region</h2>
              <RegionBreakdown regions={regions} />
            </section>

            <section className="dashboard-panel">
              <h2>Pipeline File Status</h2>
              <PipelineStatus files={pipelineFiles} />
            </section>
          </div>

          <section className="dashboard-panel" style={{ marginBottom: 16 }}>
            <h2>Revenue Trend Over Time</h2>
            <SalesTrend dailySales={dailySales} />
          </section>

          <section className="dashboard-panel">
            <h2>All Orders</h2>
            <SalesTable sales={sales} />
          </section>
        </>
      )}
    </div>
  );
}
