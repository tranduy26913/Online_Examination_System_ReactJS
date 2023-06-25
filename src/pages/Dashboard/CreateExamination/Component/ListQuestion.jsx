import {
    Stack,
    Typography,
    Box,
    Button,
    Paper,
    Divider,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
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
    overflowY: 'auto',
    height: '100%',
    padding: '8px'
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
                toast.update(id, { render: 'Xoá câu hỏi không thành công', isLoading: false, type: 'warning', autoClose: 1200 })
            })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [examId, reloadExam])

    const handleSelectQuestionEdit = useCallback((value) => {
        setIdQuestion(value)
        let question = QUESTIONS.find(item => item.id === value)

        if (question)
            setQuestionSelect(question)
        else
            setQuestionSelect(null)
    }, [QUESTIONS])

    return (
        <>
            <Paper elevation={12}>
                <Stack p={2} direction={'row'} height={'calc(100vh - 100px)'}
                //spacing={2}
                >
                    <Stack
                        flex={1}
                        spacing={1}
                        height='100%'>
                        <Typography fontWeight={600} align='center'>Danh sách</Typography>

                        {
                            status === 'private' && <Button
                                variant='contained'
                                startIcon={<AddIcon />}
                                mb={1}
                                onClick={() => handleSelectQuestionEdit('')}>
                                Thêm câu hỏi
                            </Button>
                        }
                        <Divider />
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
                    {/* <Divider color='primary' orientation="vertical" flexItem /> */}
                    <Box flex={{ xs: 2, md: 3, lg: 4 }}
                        sx={{ overflowY: 'auto' }}>
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
