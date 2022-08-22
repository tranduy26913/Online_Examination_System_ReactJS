import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Routing customer account */}
        <Route path="student/*" element={<StudentDashboard />} />

    </Routes>
  );
}

export default ConfigRoute;
