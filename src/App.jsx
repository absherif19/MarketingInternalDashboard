import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginWrapper from "./component/Login/main";
import ProtectedRoute from "./component/ProtectedRoute";
import DashboardLayout from "./component/DashboardLayout";

function App() {
  return (
    <Router basename="/services/CorporateMarketing">
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
