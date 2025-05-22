import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginWrapper from './component/Login/main';
import Main from "./component/Main";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <Router basename="/services/CorporateMarketing">
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
