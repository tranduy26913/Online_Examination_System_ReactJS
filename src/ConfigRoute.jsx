import LoadingPage from 'components/LoadingPage';
import MaintenancePage from 'components/MaintenancePage';
import React, { Suspense, lazy } from 'react';
import { Route, Routes,Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
const Home = lazy(() => import("./pages/Home"));
//const Dashboard = lazy(() => import("./pages/Dashboard"));
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

const makeLoading = (component) => <Suspense fallback={<LoadingPage/>}>{component}</Suspense>

const TEACHER = [
  {
    path:'profile',
    component:Profile
  },
  {
    path:'list-course',
    component:ListCourse
  },
  {
    path:':slug/list-exam',
    component:ListExaminationTeacher
  },
  {
    path:'create-exam',
    component:CreateExamination
  },
  {
    path:'create-course',
    component:CreateCourse
  },
  {
    path:'bank-question',
    component:BankQuestion
  },
  {
    path:'payment',
    component:MaintenancePage
  },
  {
    path:'notify',
    component:MaintenancePage
  },
  {
    path:'statistic',
    component:MaintenancePage
  },
]
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
            {
              TEACHER.map(item=>
                <Route key={item.path} path={item.path} element={makeLoading(<item.component />)} />)
            }
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="test/:id" element={<Test />} />
          <Route path="loading" element={<LoadingPage />} />
          <Route path="aboutus" element={<MaintenancePage />} />



        </Routes>
      </Suspense>
  );
}

export default ConfigRoute;
