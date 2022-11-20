import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from '@mui/icons-material/ListAlt';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
// import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SchoolIcon from '@mui/icons-material/School';
/* eslint-disable */
export const DASHBOARD_TEACHER = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Tài khoản',
        link: 'profile',
        list: ['profile'],
        regex:'^\/my\/profile\/?'
    },
    {
        id: 2,
        icon: SchoolIcon,
        text: 'Khoá học',
        link: 'list-course',
        list: ['list-course','create-course'],

        regex:'^\/my\/(list|edit|create)-course\/*.*$'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'N.hàng Câu Hỏi',
        link: 'question-bank',
        list: ['question-bank'],
        regex:'^\/my\/question-bank\/?'
    },
   
    // {
    //     id: 5,
    //     icon: CreditCardIcon,
    //     text: 'Thông tin thanh toán',
    //     link: 'payment',
    //     list: ['payment'],
    //     regex:'^\/my\/payment\/?$'
    // },
    // {
    //     id: 6,
    //     icon: NotificationsIcon,
    //     text: 'Thông báo',
    //     link: 'notify',
    //     list: ['notify'],
    //     regex:'^\/my\/notify\/?$'
    // },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
        regex:'^\/my\/statistic\/?$'
    }
]
export const DASHBOARD_STUDENT = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Tài khoản',
        link: 'profile',
        list: ['profile'],
        regex:'^\/my\/profile\/?'
    },
    {
        id: 2,
        icon: SchoolIcon,
        text: 'Khoá học',
        link: 'list-course',
        list: ['list-course'],
        regex:'^\/my\/list-course\/?'
    },
   
    // {
    //     id: 5,
    //     icon: CreditCardIcon,
    //     text: 'Thanh toán',
    //     link: 'payment',
    //     list: ['payment'],
    //     regex:'^\/my\/payment\/?$'
    // },
    // {
    //     id: 6,
    //     icon: NotificationsIcon,
    //     text: 'Thông báo',
    //     link: 'notify',
    //     list: ['notify'],
    //     regex:'^\/my\/notify\/?$'
    // },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
        regex:'^\/my\/statistic\/?$'
    }
]

export const SIDEBAR_COURSE_TEACHER = [
    
    {
        id: 1,
        icon: TipsAndUpdatesIcon,
        text: 'Đề thi',
        link: 'manage-exam',
        list:[
            'manage-exam',
            'create-exam',
            'edit-exam',
            'detail-exam',
        ],
        regex:'^\/course\/.*(\\\d)\/(manage|create|detail|edit)-exam\/?'
    },
    {
        id: 2,
        icon: AssignmentTurnedInIcon,
        text: 'Bài tập',
        link: 'manage-assignment',
        
        regex:'^\/course\/.*(\\\d)\/(manage-assignment|create-assignment|assignment|assignment-submission)\/?'
    },
    {
        id: 3,
        icon: PersonIcon,
        text: 'Học viên',
        link: 'manage-student',
        list: ['manage-student'],
        regex:'^\/course\/.*(\\\d)\/manage-student\/?'
    },
    {
        id: 4,
        icon: ListAltIcon,
        text: 'N.hàng câu hỏi',
        link: 'question-bank',
        list: ['question-bank'],
        regex:'^\/course\/.*(\\d)\/question-bank\/?'
    },
    {
        id: 5,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
        regex:'^\/course\/.*(\\d)\/statistic-exam\/?'
    }
    

]
export const SIDEBAR_COURSE_STUDENT = [
    
    {
        id: 1,
        icon: TipsAndUpdatesIcon,
        text: 'Đề thi',
        link: 'manage-exam',
        list:[
            'manage-exam',
        ],
        regex:'^\/course\/.*(\\d)\/manage-exam\/?'
    },
    {
        id: 2,
        icon: AssignmentTurnedInIcon,
        text: 'Bài tập',
        link: 'manage-assignment',
        
        regex:'^\/course\/.*(\\\d)\/(manage-assignment|create-assignment|assignment|assignment-submission)\/?'
    },
    {
        id: 3,
        icon: PersonIcon,
        text: 'Học viên',
        link: 'manage-student',
        list: ['manage-student'],
        regex:'^\/course\/.*(\\d)\/manage-student\/?'
    },
    {
        id: 6,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
        regex:'^\/course\/.*(\\d)\/statistic-exam\/?'
    }
    
]
