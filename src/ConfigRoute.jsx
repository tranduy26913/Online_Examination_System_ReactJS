import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "pages/Dashboard/Profile";
import ListCourse from "pages/Dashboard/ListCourse";
import ListExaminationStudent from "pages/Dashboard/ListExaminationStudent";
import CreateExamination from "pages/Dashboard/CreateExamination";
import ListExaminationTeacher from "pages/Dashboard/TeacherDashboard/ListExamination";
import Test from "pages/Test";
import CreateCourse from "pages/Dashboard/TeacherDashboard/CreateCourse";
function ConfigRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* Routing customer account */}
      <Route path="student" element={<Dashboard />} >
        <Route path="profile" element={<Profile />} />
        <Route path="list-course" element={<ListCourse />} />
        <Route path="course/list-test" element={<ListExaminationStudent />} />
        <Route path="create-exam" element={<CreateExamination />} />
      </Route>
      <Route path="teacher" element={<Dashboard />} >
        <Route path="profile" element={<Profile />} />
        <Route path="list-course" element={<ListCourse />} />
        <Route path="course/list-test" element={<ListExaminationTeacher />} />
        <Route path="create-exam" element={<CreateExamination />} />
        <Route path="create-course" element={<CreateCourse />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="test/:id" element={<Test />} />



    </Routes>
  );
}

export default ConfigRoute;
