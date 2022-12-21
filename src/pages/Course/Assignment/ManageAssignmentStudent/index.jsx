import { useEffect, useLayoutEffect, useState } from 'react'
import {
    Paper,
    Stack,
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import Page from 'components/Page';
import { useContext } from 'react';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import AssignmentItem from './AssignmentItem';
import apiAssignment from 'apis/apiAssignment';
import EmptyList from 'components/UI/EmptyList';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
const ListAssignmentStudent = () => {
    const [listAssignment, setListAssignment] = useState([])
    const [loadingData, setLoadingData] = useState(true)
    const { courseId } = useContext(CourseContext)
    useLayoutEffect(() => {
        const getListAssignment = () => {
            if (!courseId) return
            setLoadingData(true)
            apiAssignment.getAssignmentsByCourseOfStudent({ courseId })
                .then(res => {
                    setListAssignment(res)
                })
                .finally(() => setLoadingData(false))
        }

        getListAssignment()

    }, [courseId])

    return (
        <Page title='Danh sách bài tập'>
            <Stack>

                <Paper elevation={12}>
                    <Grid container p={2} spacing={2}>
                        {loadingData ? <LoadingRoller /> :
                            listAssignment.length === 0 && <EmptyList />}
                        {
                            listAssignment.map(item =>
                                <Grid key={item._id} item xs={12} sm={6} md={4} lg={3}>
                                    <AssignmentItem key={item.id} data={item} />
                                </Grid>
                            )
                        }
                    </Grid>
                </Paper>
            </Stack>
        </Page>
    )
}

export default ListAssignmentStudent