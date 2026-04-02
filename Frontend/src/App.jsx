import { Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* NGO */
import Dashboard from "./pages/ngo/Dashboard";
import CreateOpportunity from "./pages/ngo/CreateOpportunity";
import MyOpportunities from "./pages/ngo/MyOpportunities";
import Applicants from "./pages/ngo/Applicants";
import NGOProfile from "./pages/ngo/NGOProfile";
import EditOpportunity from "./pages/ngo/EditOpportunity";
import NGOMessages from "./pages/ngo/Messages";

/* VOLUNTEER */
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import Opportunities from "./pages/volunteer/Opportunities";
import OpportunityDetails from "./pages/volunteer/OpportunityDetails";
import MyApplications from "./pages/volunteer/MyApplications";
import VolunteerProfile from "./pages/volunteer/VolunteerProfile";
import VolunteerMessages from "./pages/volunteer/Messages";

/* COMMON */
import ProtectedRoute from "./components/common/ProtectedRoute";
import TeamMembers from "./pages/ngo/TeamMembers";
import SettingsPage from "./pages/common/Settings";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={
        <ProtectedRoute><SettingsPage /></ProtectedRoute>
      } />

      {/* ── NGO ROUTES ── */}
      <Route path="/ngo-dashboard" element={
        <ProtectedRoute allowedRole="ngo"><Dashboard /></ProtectedRoute>
      } />
      <Route path="/ngo-team" element={
      <ProtectedRoute allowedRole="ngo"><TeamMembers /></ProtectedRoute>
      } />
      <Route path="/create-opportunity" element={
        <ProtectedRoute allowedRole="ngo"><CreateOpportunity /></ProtectedRoute>
      } />
      <Route path="/my-opportunities" element={
        <ProtectedRoute allowedRole="ngo"><MyOpportunities /></ProtectedRoute>
      } />
      <Route path="/applicants" element={
        <ProtectedRoute allowedRole="ngo"><Applicants /></ProtectedRoute>
      } />
      <Route path="/applicants/:id" element={
        <ProtectedRoute allowedRole="ngo"><Applicants /></ProtectedRoute>
      } />
      <Route path="/edit-opportunity/:id" element={
        <ProtectedRoute allowedRole="ngo"><EditOpportunity /></ProtectedRoute>
      } />
      <Route path="/ngo-profile" element={
        <ProtectedRoute allowedRole="ngo"><NGOProfile /></ProtectedRoute>
      } />
      {/* ✅ Fixed: NGO messages now correctly role-guarded */}
      <Route path="/ngo-messages" element={
        <ProtectedRoute allowedRole="ngo"><NGOMessages /></ProtectedRoute>
      } />

      {/* ── VOLUNTEER ROUTES ── */}
      <Route path="/volunteer-dashboard" element={
        <ProtectedRoute allowedRole="volunteer"><VolunteerDashboard /></ProtectedRoute>
      } />
      <Route path="/opportunities" element={
        <ProtectedRoute allowedRole="volunteer"><Opportunities /></ProtectedRoute>
      } />
      <Route path="/opportunity/:id" element={
        <ProtectedRoute allowedRole="volunteer"><OpportunityDetails /></ProtectedRoute>
      } />
      <Route path="/my-applications" element={
        <ProtectedRoute allowedRole="volunteer"><MyApplications /></ProtectedRoute>
      } />
      <Route path="/volunteer-profile" element={
        <ProtectedRoute allowedRole="volunteer"><VolunteerProfile /></ProtectedRoute>
      } />
      {/* ✅ Fixed: Volunteer messages correctly role-guarded */}
      <Route path="/messages" element={
        <ProtectedRoute allowedRole="volunteer"><VolunteerMessages /></ProtectedRoute>
      } />

    </Routes>
  );
}

export default App;
