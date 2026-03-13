import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* SIDEBAR - This will now show properly */}
      <Sidebar />

      {/* MAIN */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        overflow: 'hidden'
      }}>
        <Navbar />

        <div style={{
          flex: 1,
          padding: '24px',
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}