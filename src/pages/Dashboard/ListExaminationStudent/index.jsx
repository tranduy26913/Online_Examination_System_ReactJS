import { useLayoutEffect,useContext, useState } from 'react'
import {
    Paper,
    Stack,
} from "@mui/material"
import TestItem from 'components/TestItem';
import Page from 'components/Page';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import EmptyList from 'components/UI/EmptyList';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
const ListExaminationStudent = () => {
    const [listExam, setListExam] = useState([])
    const { courseId } = useContext(CourseContext)
    const [loadingData, setLoadingData] = useState(false)
    useLayoutEffect(() => {
        const getListExam = () => {
            if (!courseId) return
            setLoadingData(true)
            apiCourse.getListExamOfCourse({ courseId })
                .then(res => {
                    setListExam(res)
                })
                .finally(() => setLoadingData(false))
        }

        getListExam()

    }, [courseId])

    return (
        <Page title='Danh sách bài kiểm tra'>

            <Paper elevation={12}>
                <Stack spacing={1.5} p={2}>
                    {loadingData ? <LoadingRoller /> :
                        listExam.length === 0 && <EmptyList />}
                    {
                        listExam.map(item =>
                            <TestItem key={item.id} data={item} />
                        )
                    }
                </Stack>
            </Paper>
        </Page>
    )
}


export default ListExaminationStudent