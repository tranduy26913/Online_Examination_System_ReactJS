import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Test from "pages/Test";
function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Routing customer account */}
        <Route path="student/*" element={<StudentDashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="test/:id" element={<Test />} />
        


    </Routes>
  );
}

export default ConfigRoute;
