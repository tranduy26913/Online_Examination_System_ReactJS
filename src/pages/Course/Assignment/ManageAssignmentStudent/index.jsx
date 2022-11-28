import { useEffect, useState } from 'react'
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
const ListAssignmentStudent = () => {
    const [listAssignment, setListAssignment] = useState([])
    const { courseId } = useContext(CourseContext)

    useEffect(() => {
        const getListAssignment = () => {
            if (!courseId) return

            apiAssignment.getAssignmentsByCourseOfStudent({ courseId })
                .then(res => {
                    setListAssignment(res)
                })
        }

        getListAssignment()

    }, [courseId])

    return (
        <Page title='Danh sách bài tập'>
            <Stack>

                <Paper elevation={12}>
                    <Grid container p={2} spacing={2}>
                        {listAssignment.length === 0 && <EmptyList />}
                        {
                            listAssignment.map(item =>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
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