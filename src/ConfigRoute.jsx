import LoadingPage from 'components/LoadingPage';
import MaintenancePage from 'components/MaintenancePage';
import React, { Suspense, lazy } from 'react';
import { Route, Routes,Router } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("pages/Dashboard/Profile"));
const ListCourse = lazy(() => import("pages/Dashboard/ListCourse"));
const ListExaminationStudent = lazy(() => import("pages/Dashboard/ListExaminationStudent"));
const CreateExamination = lazy(() => import("pages/Dashboard/CreateExamination"));
const ListExaminationTeacher = lazy(() => import("pages/Dashboard/TeacherDashboard/ListExamination"));
const Test = lazy(() => import("pages/Test"));
const CreateCourse = lazy(() => import("pages/Dashboard/TeacherDashboard/CreateCourse"));
const BankQuestion = lazy(() => import("pages/Dashboard/BankQuestion"));
function ConfigRoute() {
  return (
      <Suspense fallback={<LoadingPage/>}>
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
            <Route path=":slug/list-exam" element={<ListExaminationTeacher />} />
            <Route path="create-exam" element={<CreateExamination />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="bank-question" element={<BankQuestion />} />
            <Route path="payment" element={<MaintenancePage />} />
            <Route path="notify" element={<MaintenancePage />} />
            <Route path="statistic" element={<MaintenancePage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="test/:id" element={<Test />} />
          <Route path="loading" element={<LoadingPage />} />



        </Routes>
      </Suspense>
  );
}

export default ConfigRoute;
