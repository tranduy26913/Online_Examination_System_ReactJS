import { useEffect,useState } from 'react'
import {
    Box,
    Paper,
    Stack,
    Typography
} from "@mui/material"
import TestItem from 'components/TestItem';
import Page from 'components/Page';
import { useContext } from 'react';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
const ListExaminationStudent = () => {
    const [listExam, setListExam] = useState([])
    const { courseId, id: courseObjid } = useContext(CourseContext)

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

const tests = [
    {
        name: "Bài kiểm tra số 1",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 2",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    }
]

export default ListExaminationStudent