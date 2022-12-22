import {
    Stack,
    Typography,
    Box,
    Button,
    Paper,
} from '@mui/material'
import CreateQuestion from 'components/Question/CreateQuestion'
import {
    PaperQuestion,

} from './MUI'
import { useCallback, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import ExamContext from '../ExamContext';
import ConfirmButton from 'components/ConfirmDialog';
import apiQuestion from 'apis/apiQuestion';
import { toast } from 'react-toastify';
import { deleteQuestion } from 'slices/userSlice';

const styleStack = {
    overflowY: 'scroll',
    height: '100%',
    padding: '0 8px'
}
function ListQuestion() {
    const { examId, reloadExam, status } = useContext(ExamContext) || { status: 'public' }
    const QUESTIONS = useSelector(state => state.user.questions)
    const [idQuestion, setIdQuestion] = useState('')
    const [questionSelect, setQuestionSelect] = useState(null)
    const dispatch = useDispatch()

    const handleDeleteQuestion = useCallback((questionId) => {
        const params = {
            examId,
            questionId
        }
        const id = toast.loading("Đang xoá...")
        apiQuestion.deleteQuestion(params)
            .then(res => {
                reloadExam()
                dispatch(deleteQuestion(questionId))
                toast.update(id, { render: 'Xoá câu hỏi thành công', isLoading: false, type: 'success', autoClose: 1200 })
            })
            .catch(err => {
                console.log(err)
                toast.update(id, { render: 'Xoá câu hỏi không thành công', isLoading: false, type: 'warning', autoClose: 1200 })
            })
    }, [examId, reloadExam])

    const handleSelectQuestionEdit = useCallback((value) => {
        setIdQuestion(value)
        let question = QUESTIONS.find(item => item.id === value)
        console.log(question)
        if (question)
            setQuestionSelect(question)
        else
            setQuestionSelect(null)
    }, [QUESTIONS])



    return (
        <>
            <Paper elevation={12}>
                <Stack p={2} direction={'row'} height={'90vh'} spacing={2}>
                    <Stack flex={1} height='100%'>
                        <Button
                        variant='text'
                             onClick={() => handleSelectQuestionEdit('')}>
                            Thêm câu hỏi mới
                        </Button>
                        <Stack spacing={1} sx={styleStack}>

                            {
                                QUESTIONS.map((item, index) =>
                                    <PaperQuestion
                                        onClick={() => handleSelectQuestionEdit(item.id)}
                                        key={item.id}
                                        className={`${item.id === idQuestion ? 'selected' : ''}`}
                                        elevation={4} >
                                        <Stack
                                            direction={'row'}
                                            justifyContent='space-between'
                                            alignItems='center'>
                                            <Typography>Câu hỏi {index + 1}</Typography>
                                            {status === 'private' &&
                                                <ConfirmButton
                                                    title={'Xoá câu hỏi'}
                                                    description='Bạn có chắc chắn muốn xoá câu hỏi này khỏi đề thi'
                                                    handleFunc={() => handleDeleteQuestion(item.id)}
                                                    color='error'>
                                                    Xoá
                                                </ConfirmButton>
                                            }
                                        </Stack>
                                    </PaperQuestion>
                                )
                            }
                        </Stack>
                    </Stack>

                    <Box flex={4} overflow='scroll'>
                        <CreateQuestion
                            isEdit={idQuestion && true}
                            id={idQuestion}
                            examId={examId}
                            handleSelectQuestion={handleSelectQuestionEdit}
                            question={questionSelect} />
                    </Box>

                </Stack>
            </Paper>

        </>
    )
}

ListQuestion.propTypes = {}

export default memo(ListQuestion)
