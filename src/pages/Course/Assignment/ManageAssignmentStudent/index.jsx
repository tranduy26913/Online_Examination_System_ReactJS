import { useEffect,useState } from 'react'
import {
    Paper,
    Stack,
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2'
import Page from 'components/Page';
import { useContext } from 'react';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import AssignmentItem from './AssignmentItem';
import moment from 'moment';
import apiAssignment from 'apis/apiAssignment';
const ListAssignmentStudent = () => {
    const [listAssignment, setListAssignment] = useState(Samples)
    const { courseId} = useContext(CourseContext)

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


const Samples = [
    {
        id:'123',
        slug:1,
        name:'Bài tập 1',
        numberofSubmission:4,
        startTime:moment().subtract(2,'days').toDate().toISOString(),
        endTime:moment().add(5,'days').toDate().toISOString(),
        status:'private',
    },
    {
        id:'1234',
        slug:1,
        name:'Bài tập 2',
        numberofSubmission:4,
        startTime:moment().subtract(2,'days').toDate().toISOString(),
        endTime:moment().add(5,'days').toDate().toISOString(),
        status:'public',
    },
    {
        id:'12356',
        slug:1,
        name:'Bài tập 3',
        numberofSubmission:4,
        startTime:moment().subtract(2,'days').toDate().toISOString(),
        endTime:moment().add(5,'days').toDate().toISOString(),
        status:'close',
    },
    {
        id:'123536',
        slug:1,
        name:'Bài tập 4',
        numberofSubmission:4,
        startTime:moment().subtract(2,'days').toDate().toISOString(),
        endTime:moment().add(5,'days').toDate().toISOString(),
        status:'close',
    },
    {
        id:'121356',
        slug:1,
        name:'Bài tập 5',
        numberofSubmission:4,
        startTime:moment().subtract(2,'days').toDate().toISOString(),
        endTime:moment().add(5,'days').toDate().toISOString(),
        status:'close',
    },
]


export default ListAssignmentStudent