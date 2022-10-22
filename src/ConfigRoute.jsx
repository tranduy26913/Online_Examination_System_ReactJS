import Page404 from 'components/ErrorPage/Page404';
import LoadingPage from 'components/LoadingPage';
import MaintenancePage from 'components/MaintenancePage';
import LayoutCourse from 'pages/Course/LayoutCourse';
import StatisticExam from 'pages/Dashboard/StatisticExam';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard"

import { sidebarCourse,sidebarTab } from "constraints/StudentDashboard";
const Home = lazy(() => import("./pages/Home"));
//const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("pages/Dashboard/Profile"));
const ListCourse = lazy(() => import("pages/Course/ListCourse"));
const ListExaminationStudent = lazy(() => import("pages/Dashboard/ListExaminationStudent"));
const CreateExamination = lazy(() => import("pages/Dashboard/CreateExamination"));
const ChangePassword = lazy(() => import("pages/Dashboard/Profile/ChangePassword"));
const ListExaminationTeacher = lazy(() => import("pages/Dashboard/TeacherDashboard/ListExamination"));
const Examination = lazy(() => import("pages/Examination"));
const ListStudent = lazy(() => import("pages/Dashboard/TeacherDashboard/ListStudent"));
const CreateCourse = lazy(() => import("pages/Dashboard/TeacherDashboard/CreateCourse"));
const Active = lazy(() => import("pages/Active"));
const BankQuestion = lazy(() => import("pages/Dashboard/BankQuestion"));
const ResultPayment = lazy(() => import("pages/ResultPayment"));

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
    path:'list-course/list-exam',
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
  {
    path:'statistic-exam',
    component:StatisticExam
  },
  {
    path:'profile/change-password',
    component:ChangePassword
  },
]

const COURSE_TEACHER = [
  {
    path:'create-exam',
    component:CreateExamination
  },
  {
    path:'manage-exam',
    component:ListExaminationTeacher
  },
  {
    path:'manage-student',
    component:ListStudent
  },
  {
    path:'bank-question',
    component:BankQuestion
  },
  {
    path:'notify',
    component:MaintenancePage
  },
  {
    path:'statistic',
    component:MaintenancePage
  },
  {
    path:'statistic-exam',
    component:StatisticExam
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
          <Route path="my" element={<Dashboard sidebarTab={sidebarTab}/>} >
            {
              TEACHER.map(item=>
                <Route key={item.path} path={item.path} element={makeLoading(<item.component />)} />)
            }
            <Route path='detail-exam' element={makeLoading(<CreateExamination isEdit={true} />)} />
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="course/:slug" element={<LayoutCourse />} >
            {
              COURSE_TEACHER.map(item=>
                <Route key={item.path} path={item.path} element={makeLoading(<item.component />)} />)
            }
             
          </Route>
          <Route path="list-course" element={<ListCourse />} />
          <Route path="register" element={<Register />} />
          <Route path="exam/:examId" element={<Examination />} />
          <Route path="loading" element={<LoadingPage />} />
          <Route path="aboutus" element={<MaintenancePage />} />
          <Route path="result" element={<MaintenancePage />} />
          <Route path="result-payment" element={<ResultPayment />} />
          <Route path="active/:token" element={<Active />} />
          <Route path="review-exam/:id" element={<MaintenancePage />} />
          <Route path="/*" element={<Page404 />} />


        </Routes>
      </Suspense>
  );
}

export default ConfigRoute;
