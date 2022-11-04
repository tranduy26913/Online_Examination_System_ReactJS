import {
    Box,
    Stack,
    Paper,
    AccordionSummary,
    AccordionDetails,
    Accordion,
    styled,
    Typography,
    MenuItem,
    FormControl,
    FormControlLabel,
    Select,
    Checkbox,
    Button,
    FormGroup,
    Switch,
    ListItemText
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    AccordionSummaryStyle,
    StackLabel,
    BootstrapInput,
    Stack2Column,

} from './MUI'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { memo } from 'react';
import apiQuestionBank from 'apis/apiQuestionBank';
import ExamContext from '../ExamContext';
const BoxAnswer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    gap: '10px'
  }))
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



function QuestionInQuestionBank(props) {
    const examId = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questions)
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = useState(false);

    const handleChangeQuestion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [questionsQB, setQuestionsQB] = useState([])
    const [isLimit, setIsLimit] = useState(true)//giới hạn số lần thi
    const [limit, setLimit] = useState(0)//Số lần được phép thi tối đa
    const onChangeLimit = (event) => setLimit(Number(event.target.value |= 0))

    const [questionBanks, setQuestionBanks] = useState([]);
    const [selectedQB, setSelectedQB] = useState([]);

    const handleChangeQB = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedQB(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        const loadQB = () => {
            apiQuestionBank.getQuestionBanks()
                .then(res => {
                    setQuestionBanks(res)
                })
        }
        loadQB()
    }, [])
    useEffect(() => {
        const loadQuestionsInQB = () => {
            apiQuestionBank.getQuestionsByListQB({ arrSlug: selectedQB })
                .then(res => {
                    setQuestionsQB(res)
                })
        }
        loadQuestionsInQB()
    }, [selectedQB])
    return (
        <>
            <Paper elevation={24}>
                <Stack spacing={2} p={2} pt={4}>
                    <FormControl sx={{ flex: 1 }}>
                        <StackLabel>
                            <Box>Chọn ngân hàng câu hỏi</Box>
                            <Select
                                multiple
                                value={selectedQB}
                                onChange={handleChangeQB}
                                input={<BootstrapInput />}
                                renderValue={(selected) => selected.map(item => {
                                    let qb = questionBanks.find(e => e.slug === item)
                                    return qb.name
                                }).join(', ')}
                                MenuProps={MenuProps}
                            >
                                {questionBanks.map((item) => (
                                    <MenuItem key={item.slug} value={item.slug}>
                                        <Checkbox checked={selectedQB.indexOf(item.slug) > -1} />
                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </StackLabel>
                    </FormControl>
                    <Stack2Column>

                        <StackLabel>
                            <Box>Chọn ngẫu nhiên</Box>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Switch checked={isLimit} onChange={() => setIsLimit(!isLimit)} />} />
                            </FormGroup>
                        </StackLabel>

                        {
                            isLimit &&
                            <StackLabel>
                                <Box>Số câu hỏi cần chọn</Box>
                                <input value={limit}
                                    type='number' min={1}
                                    onInput={onChangeLimit} />
                            </StackLabel>
                        }
                    </Stack2Column>

                    <Stack spacing={1}>
                        {
                            QUESTIONS.map((question, index) =>
                            question &&
                                <Stack direction='row' alignItems='center' justifyContent='space-between'>
                                    <Checkbox defaultChecked />
                                    <Accordion sx={{ flex: 1 }} 
                                    key={question.id} expanded={question.id === expanded} 
                                    onChange={handleChangeQuestion(question.id)}>
                                        <AccordionSummary sx={AccordionSummaryStyle}
                                            expandIcon={<ExpandMoreIcon />}
                                        ><Typography>Câu hỏi {index + 1}</Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Stack spacing={0.5}>
                                                <Typography>
                                                    {question.content}
                                                </Typography>
                                                {
                                                    question.answers.map(item =>
                                                        <BoxAnswer key={item.id}><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color={item.isCorrect ? 'success' : 'error'} />{item.content}</BoxAnswer>
                                                    )
                                                }
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Stack>
                            )
                        }
                    </Stack>
                    <Button>Tạo câu hỏi</Button>
                </Stack>
            </Paper>
        </>
    )
}

QuestionInQuestionBank.propTypes = {}

export default memo(QuestionInQuestionBank)
