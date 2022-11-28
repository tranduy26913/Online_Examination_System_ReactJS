import { useEffect,useState } from 'react'
import {
    Paper,
    Stack,
} from "@mui/material"
import TestItem from 'components/TestItem';
import Page from 'components/Page';
import { useContext } from 'react';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import EmptyList from 'components/UI/EmptyList';
const ListExaminationStudent = () => {
    const [listExam, setListExam] = useState([])
    const { courseId} = useContext(CourseContext)

    useEffect(() => {
        const getListExam = () => {
            if (!courseId) return

            apiCourse.getListExamOfCourse({ courseId })
                .then(res => {
                    setListExam(res)
                })
        }

        getListExam()

    }, [courseId])

    return (
        <Page title='Danh sách bài kiểm tra'>

            <Paper elevation={12}>
                <Stack spacing={1} p={2}>
                    {listExam.length === 0 && <EmptyList/>}
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