import Page404 from 'components/ErrorPage/Page404';
import LoadingPage from 'components/LoadingPage';
import MaintenancePage from 'components/MaintenancePage';
import LayoutCourse from 'pages/Course/LayoutCourse';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Dashboard from "pages/Dashboard"

import { DASHBOARD_STUDENT, DASHBOARD_TEACHER } from "constraints/StudentDashboard";
import { useSelector } from 'react-redux';
const Home = lazy(() => import("./pages/Home"));
//const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const Register = lazy(() => import("./components/Register"));
const Profile = lazy(() => import("pages/Dashboard/Profile"));
const ListCourse = lazy(() => import("pages/Course/ListCourse"));
const ListExaminationStudent = lazy(() => import("pages/Dashboard/ListExaminationStudent"));
const CreateExamination = lazy(() => import("pages/Dashboard/CreateExamination"));
const ChangePassword = lazy(() => import("pages/Dashboard/Profile/ChangePassword"));
const ListExaminationTeacher = lazy(() => import("pages/Course/ListExamination"));
const Examination = lazy(() => import("pages/Examination"));
const ListStudent = lazy(() => import("pages/Course/ListStudent"));
const CreateCourse = lazy(() => import("pages/Course/CreateCourse"));
const Active = lazy(() => import("pages/Active"));
const QuestionBank = lazy(() => import("pages/Dashboard/QuestionBank"));
const QuestionBankDetail = lazy(() => import("pages/Dashboard/QuestionBankDetail"));
const ResultPayment = lazy(() => import("pages/ResultPayment"));
const ResetPassword = lazy(() => import("pages/ResetPassword"));
const StatisticExam = lazy(() => import("pages/Course/StatisticExam"));
const ResultExamination = lazy(() => import("pages/ResultExamination"));
const ReviewExamination = lazy(() => import("pages/ReviewExamination"));
const ManageFile = lazy(() => import("pages/Course/ManageFile"));
const CreateAssignment = lazy(() => import("pages/Course/Assignment/CreateAssignment"));
const SubmitAssignment = lazy(() => import("pages/Course/Assignment/SubmitAssignment"));
const ManageAssignment = lazy(() => import("pages/Course/Assignment/ManageAssignment"));
const ManageAssignmentStudent = lazy(() => import("pages/Course/Assignment/ManageAssignmentStudent"));
const ViewAssignmentSubmission = lazy(() => import("pages/Course/Assignment/ViewAssignmentSubmission"));

const makeLoading = (component) => <Suspense fallback={<LoadingPage />}>{component}</Suspense>

const TEACHER = [
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'list-course',
    component: ListCourse
  },
  {
    path: 'create-exam',
    component: CreateExamination
  },
  {
    path: 'list-course/create-course',
    component: CreateCourse
  },
  {
    path: 'question-bank',
    component: QuestionBank
  },
  {
    path: 'question-bank/:slug',
    component: QuestionBankDetail
  },
  {
    path: 'payment',
    component: MaintenancePage
  },
  {
    path: 'notify',
    component: MaintenancePage
  },
  {
    path: 'statistic',
    component: MaintenancePage
  },
  {
    path: 'statistic-exam',
    component: StatisticExam
  },
  {
    path: 'profile/change-password',
    component: ChangePassword
  },
]

const STUDENT = [
  {
    path: 'profile',
    component: Profile
  },
  {
    path: 'list-course',
    component: ListCourse
  },
  {
    path: 'payment',
    component: MaintenancePage
  },
  {
    path: 'notify',
    component: MaintenancePage
  },
  {
    path: 'statistic',
    component: MaintenancePage
  },
  {
    path: 'profile/change-password',
    component: ChangePassword
  },
]

const COURSE_TEACHER = [
  {
    path: 'create-exam',
    component: CreateExamination
  },
  {
    path: 'index',
    component: ListExaminationTeacher
  },
  {
    path: 'manage-exam',
    component: ListExaminationTeacher
  },
  {
    path: 'manage-student',
    component: ListStudent
  },
  {
    path: 'manage-assignment',
    component: ManageAssignment
  },
  {
    path: 'create-assignment',
    component: CreateAssignment
  },
  {
    path: 'assignment-submission/:slug',
    component: ViewAssignmentSubmission
  },
  {
    path: 'manage-file',
    component: ManageFile
  },
  {
    path: 'question-bank',
    component: QuestionBank
  },
  {
    path: 'statistic',
    component: MaintenancePage
  },
  {
    path: 'statistic-exam/:slug',
    component: StatisticExam
  },
]

const COURSE_STUDENT = [
  {
    path: 'manage-exam',
    component: ListExaminationStudent
  },
  {
    path: 'index',
    component: ListExaminationStudent
  },
  {
    path: 'manage-assignment',
    component: ManageAssignmentStudent
  },
  {
    path: 'submit-assignment/:slug',
    component: SubmitAssignment
  },
  {
    path: 'manage-student',
    component: ListStudent
  },
  {
    path: 'statistic',
    component: MaintenancePage
  },
  {
    path: 'statistic-exam/:slug',
    component: StatisticExam
  },
]
function ConfigRoute() {
  const role = useSelector(state => state.setting.role) || 'student'
  const [dashboardComponents, setDashboardComponents] = useState(role === 'student' ?STUDENT : TEACHER)
  const [courseComponents, setCourseComponents] = useState(role === 'student' ?COURSE_STUDENT:COURSE_TEACHER)
  const [sidebarTab,setSidebarTab] = useState(role === 'student' ?DASHBOARD_STUDENT:DASHBOARD_TEACHER)
  useEffect(() => {
    if (role === 'teacher') {
      setDashboardComponents(TEACHER)
      setCourseComponents(COURSE_TEACHER)
      setSidebarTab(DASHBOARD_TEACHER)
    }
    else {
      setDashboardComponents(STUDENT)
      setCourseComponents(COURSE_STUDENT)
      setSidebarTab(DASHBOARD_STUDENT)
    }

  }, [role])

  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Routing customer account */}

        <Route path="my" element={<Dashboard sidebarTab={sidebarTab} />} >
          {
            dashboardComponents.map(item =>
              <Route key={item.path} path={item.path} element={makeLoading(<item.component />)} />)
          }
          <Route path="list-course/edit-course/:courseId" element={<CreateCourse isEdit={true} />} ></Route>
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="course/:courseId" element={<LayoutCourse />} >
          {
            courseComponents.map(item => {
              if (item.path === 'index')
                return <Route key={item.path} index element={makeLoading(<item.component/>)} />
              else
                return <Route key={item.path} path={item.path} element={makeLoading(<item.component />)} />
          })
        }
          <Route path='detail-exam/:examSlug' element={makeLoading(<CreateExamination isEdit={true} />)} />
          <Route path='assignment/:slug' element={makeLoading(<CreateAssignment isEdit={true} />)} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="exam/:examId" element={<Examination />} />
        <Route path="aboutus" element={<MaintenancePage />} />
        <Route path="result-exam/:takeExamId" element={<ResultExamination />} />
        <Route path="result-payment" element={<ResultPayment />} />
        <Route path="active/:token" element={<Active />} />
        <Route path="review-exam/:takeExamId" element={<ReviewExamination />} />
        <Route path="reset-password/:token" element={<ResetPassword />} />
        <Route path="/*" element={<Page404 />} />


      </Routes>
    </Suspense>
  );
}

export default ConfigRoute;
