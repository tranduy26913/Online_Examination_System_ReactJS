import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const DASHBOARD_TEACHER = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: 'profile',
        list: ['profile'],
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course',
        list: ['list-course','create-course'],
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'question-bank',
        list: ['question-bank'],
    },
   
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: 'payment',
        list: ['payment']
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Thông báo',
        link: 'notify',
        list: ['notify']
    },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic']
    }
]
export const DASHBOARD_STUDENT = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: 'profile',
        list: ['profile'],
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course',
        list: ['list-course','create-course'],
    },
   
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: 'payment',
        list: ['payment']
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Thông báo',
        link: 'notify',
        list: ['notify']
    },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic']
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
        ]
    },
    {
        id: 2,
        icon: PersonIcon,
        text: 'Danh sách học viên',
        link: 'manage-student',
        list: ['manage-student'],
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'question-bank',
        list: ['question-bank']
    },
    {
        id: 6,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
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
            'create-exam',
            'edit-exam',
            'detail-exam',
        ]
    },
    {
        id: 2,
        icon: PersonIcon,
        text: 'Danh sách học viên',
        link: 'manage-student',
        list: ['manage-student'],
    },
    {
        id: 6,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic',
        list: ['statistic'],
    }
    

]
