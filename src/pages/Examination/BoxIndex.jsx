import {
    Button,
    Stack,
    Typography,
    Paper,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearAnswerSheet, clearTakeExamId } from 'slices/answerSheetSlice';
import { ButtonQuestion } from './Examination.style'
import apiTakeExam from 'apis/apiTakeExam';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import FaceRecognition from './FaceRecognition';

function BoxIndex() {
    const answerSheet = useSelector(state => state.answerSheet?.result)
    const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = () => {
        apiTakeExam.submitAnswerSheet({
            takeExamId,
            answerSheet
        })
            .then(res => {
                navigate('/result-exam/' + takeExamId)
                dispatch(clearTakeExamId())
                dispatch(clearAnswerSheet())
            })
    }


    return (
        <Paper elevation={24} >
            <Stack spacing={1} p={1.5}>

                <Accordion
                    sx={{
                        boxShadow: 'none'
                    }} defaultExpanded disableGutters TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography fontSize='16px' fontWeight={600}>Danh sách câu hỏi</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{
                        padding: 0
                    }}>
                        <Grid container spacing={0.5} maxHeight={'232px'} sx={{overflowY:'scroll'}}>
                            {
                                answerSheet.map((item, index) =>
                                    <Grid key={index} xs={1.5} sm={1} md={3} lg={2.25} xl={2}>
                                        <ButtonQuestion className={`${item.isDone ? 'done' : ''} ${item.isFlag ? 'flag' : ''}`}
                                            onClick={() => document.getElementById(`question-${index}`)
                                                .scrollIntoView({ block: 'center', behavior: "smooth" })}
                                        >{index + 1}</ButtonQuestion>
                                    </Grid>)
                            }
                        </Grid>
                    </AccordionDetails>
                </Accordion>


                <Divider />
                <Stack alignItems='center'>

                    <Button onClick={handleSubmit} variant='contained'>Nộp bài</Button>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default BoxIndex