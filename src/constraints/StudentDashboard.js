import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';
/* eslint-disable */
export const DASHBOARD_TEACHER = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: 'profile',
        list: ['profile'],
        regex:'^\/my\/profile\/?'
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course',
        list: ['list-course','create-course'],

        regex:'^\/my\/(list|edit|create)-course\/*.*$'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'question-bank',
        list: ['question-bank'],
        regex:'^\/my\/question-bank\/?'
    },
   
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: 'payment',
        list: ['payment'],
        regex:'^\/my\/payment\/?$'
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Thông báo',
        link: 'notify',
        list: ['notify'],
        regex:'^\/my\/notify\/?$'
    },
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
        text: 'Thông tin tài khoản',
        link: 'profile',
        list: ['profile'],
        regex:'^\/my\/profile\/?'
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course',
        list: ['list-course'],
        regex:'^\/my\/list-course\/?'
    },
   
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: 'payment',
        list: ['payment'],
        regex:'^\/my\/payment\/?$'
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Thông báo',
        link: 'notify',
        list: ['notify'],
        regex:'^\/my\/notify\/?$'
    },
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
        icon: NotificationsIcon,
        text: 'Danh sách đề thi',
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
        icon: PersonIcon,
        text: 'Danh sách học viên',
        link: 'manage-student',
        list: ['manage-student'],
        regex:'^\/course\/.*(\\\d)\/manage-student\/?'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'question-bank',
        list: ['question-bank'],
        regex:'^\/course\/.*(\\d)\/question-bank\/?'
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
export const SIDEBAR_COURSE_STUDENT = [
    
    {
        id: 1,
        icon: NotificationsIcon,
        text: 'Danh sách đề thi',
        link: 'manage-exam',
        list:[
            'manage-exam',
        ],
        regex:'^\/course\/.*(\\d)\/manage-exam\/?'
    },
    {
        id: 2,
        icon: PersonIcon,
        text: 'Danh sách học viên',
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
