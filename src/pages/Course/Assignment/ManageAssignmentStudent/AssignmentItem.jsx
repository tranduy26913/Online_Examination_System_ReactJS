import { useContext } from 'react'
import {
    Stack,
    Typography,
    Divider,
    Box,
    alpha
} from "@mui/material"
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { styled, useTheme } from '@mui/material/styles';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext'
const StackContainer = styled(Stack)(({ theme }) => ({
    borderRadius: '8px',
    border: `1px solid ${theme.palette.primary.main}`,
    backgroundColor:alpha(theme.palette.primary.light,0.2)
}))

const AssignmentItem = (props) => {
    const theme = useTheme()
    const { data } = props
    const { courseId } = useContext(CourseContext)
    return (
        <Link to={`/course/${courseId}/submit-assignment/${data.slug}`}>
            <StackContainer justifyContent={'space-between'} p={1}>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <AssignmentTurnedInIcon color='primary'/>
                    <Typography className='text-overflow-2-lines' lineHeight={2.5} fontSize="16px">
                        {data.name}
                    </Typography>
                </Stack>
                <Divider sx={{ backgroundColor: theme.palette.primary.light }} />
                <Box py={1}>
                    <Typography fontSize="14px"> <strong>Mở: </strong>
                        {data?.startTime && moment(data.startTime).format('DD-MM-YYYY HH:mm A')}</Typography>
                    <Typography fontSize="14px"><strong>Đóng: </strong>
                        {data?.endTime && moment(data.endTime).format('DD-MM-YYYY HH:mm A')}</Typography>
                </Box>

            </StackContainer >
        </Link>
    )
}

export default AssignmentItem