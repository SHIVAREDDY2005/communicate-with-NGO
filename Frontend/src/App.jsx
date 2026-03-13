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
import Messages from "./pages/volunteer/Messages";

/* COMMON */
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* NGO ROUTES */}

      <Route
        path="/ngo-dashboard"
        element={
          <ProtectedRoute allowedRole="ngo">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-opportunity"
        element={
          <ProtectedRoute allowedRole="ngo">
            <CreateOpportunity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-opportunities"
        element={
          <ProtectedRoute allowedRole="ngo">
            <MyOpportunities />
          </ProtectedRoute>
        }
      />
      <Route
  path="/applicants"
  element={
    <ProtectedRoute allowedRole="ngo">
      <Applicants />
    </ProtectedRoute>
  }
/>

      {/* ✅ FIXED APPLICANTS ROUTE */}
      <Route
        path="/applicants/:id"
        element={
          <ProtectedRoute allowedRole="ngo">
            <Applicants />
          </ProtectedRoute>
        }
      />

      {/* ✅ EDIT OPPORTUNITY ROUTE */}
      <Route
        path="/edit-opportunity/:id"
        element={
          <ProtectedRoute allowedRole="ngo">
            <EditOpportunity />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ngo-profile"
        element={
          <ProtectedRoute allowedRole="ngo">
            <NGOProfile />
          </ProtectedRoute>
        }
      />

      {/* VOLUNTEER ROUTES */}

      <Route
        path="/volunteer-dashboard"
        element={
          <ProtectedRoute allowedRole="volunteer">
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/ngo-messages"
  element={
    <ProtectedRoute>
      <NGOMessages />
    </ProtectedRoute>
  }
/>

      <Route
        path="/opportunities"
        element={
          <ProtectedRoute allowedRole="volunteer">
            <Opportunities />
          </ProtectedRoute>
        }
      />

      <Route
        path="/opportunity/:id"
        element={
          <ProtectedRoute allowedRole="volunteer">
            <OpportunityDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute allowedRole="volunteer">
            <MyApplications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunteer-profile"
        element={
          <ProtectedRoute allowedRole="volunteer">
            <VolunteerProfile />
          </ProtectedRoute>
        }
      />
     <Route
  path="/messages"
  element={
    <ProtectedRoute>
      <Messages />
    </ProtectedRoute>
  }
/>
  
      

    </Routes>
  );
}

export default App;