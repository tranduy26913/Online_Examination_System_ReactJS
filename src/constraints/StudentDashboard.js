import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const sidebarTab = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Thông tin tài khoản',
        link: 'profile',
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'bank-question'
    },
    {
        id: 4,
        icon: LocationOnIcon,
        text: 'Tạo đề thi',
        link: 'create-exam'
    },
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Thông tin thanh toán',
        link: 'payment'
    },
    {
        id: 6,
        icon: RateReviewIcon,
        text: 'Thông báo',
        link: 'notify'
    },
    {
        id: 7,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic'
    }
    

]

export const sidebarCourse = [
    {
        id: 1,
        icon: PersonIcon,
        text: 'Danh sách học viên',
        link: 'profile',
    },
    {
        id: 2,
        icon: NotificationsIcon,
        text: 'Danh sách khoá học',
        link: 'list-course'
    },
    {
        id: 3,
        icon: ListAltIcon,
        text: 'Ngân hàng câu hỏi',
        link: 'bank-question'
    },
    {
        id: 4,
        icon: LocationOnIcon,
        text: 'Tạo đề thi',
        link: 'create-exam'
    },
    {
        id: 5,
        icon: CreditCardIcon,
        text: 'Điểm số',
        link: 'payment'
    },
    {
        id: 6,
        icon: FavoriteIcon,
        text: 'Thống kê',
        link: 'statistic'
    }
    

]
