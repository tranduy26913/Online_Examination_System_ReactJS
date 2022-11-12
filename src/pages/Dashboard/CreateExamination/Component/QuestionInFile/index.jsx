import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import React, { useCallback, useContext, useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload'
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import {
    PaperQuestion,
    AccordionSummaryStyle,
} from '../MUI'
import CreateQuestion from './CreateQuestion';
import DetailQuestion from './DetailQuestion';
import { addQuestion, addQuestionInFile, clearQuestionInFile } from 'slices/userSlice';
import ExamContext from '../../ExamContext';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import apiQuestion from 'apis/apiQuestion';
const alpha = Array.from(Array(10)).map((e, i) => i + 97);
const alphabet = alpha.map((x) => String.fromCharCode(x));

function QuestionInFile() {
    const { examId } = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questionsInFile)
    console.log(QUESTIONS)
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch()

    const handleChangeQuestion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleSelectQuestionEdit = useCallback((value) => setIdQuestion(value), [])
    const handleChooseImage = (e) => {
        if (e.target.files.length !== 0) {
            readExcel(e.target.files[0])
        }
    }
    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            let questions = d.map((raw, index) => {

                let content = `<p>${raw['question']}</p>`
                let maxPoints = Number.isNaN(Number(raw['point'])) ? 0 : Number(raw['point'])
                let type = raw['type']
                let isCorrect = raw['isCorrect']
                let answers = []
                let image = raw['image'] || ''
                if(image)
                    content += `<p><img class="image_resized" style="width:400px;" src="${image}"></p>`
                alphabet.forEach((item, index) => {
                    let answer = {}
                    if (raw[item] !== undefined && raw[item] !== '') {
                        answer.id = index
                        answer.content = raw[item]
                        answer.isCorrect = isCorrect.includes(item)
                        answers.push(answer)
                    }
                })
                dispatch(addQuestionInFile({
                    id: index,
                    
                    content,
                    type,
                    maxPoints,
                    answers
                }))
                return {
                    id: index,
                    content,
                    type,
                    maxPoints,
                    answers,
                    image
                }
            })
        });
    };

    const handleCreateQuestionWithFile = ()=>{
        apiQuestion.createQuestionByFile({
            examId,
            questions:QUESTIONS
        })
        .then(res=>{
            QUESTIONS.forEach(element => {
                dispatch(addQuestion(element))
            });
            toast.success('Thêm câu hỏi thành công')
            dispatch(clearQuestionInFile())
        })
        .catch(err=>{
            toast.warning(getMessageError(err))
        })
    }
    return (
        <Paper>
            <Stack direction='row' spacing={2} p={2}>
                <Button variant='contained' component="label" width='160px'
                    endIcon={<UploadIcon />}
                >
                    Chọn File
                    <input hidden type="file" onInput={handleChooseImage}
                    //onChange={handleChooseImage} 
                    />
                </Button>
        {QUESTIONS.length !== 0 &&<Button variant='contained' onClick={handleCreateQuestionWithFile}>Thêm câu hỏi</Button>}
            </Stack>
            <Stack spacing={1.5} p={2}>
                {
                    QUESTIONS.map((item, index) =>
                        item &&
                        <PaperQuestion key={item.id} elevation={12} >
                            <Accordion expanded={item.id === expanded} onChange={handleChangeQuestion(item.id)}>
                                <AccordionSummary sx={AccordionSummaryStyle}
                                    expandIcon={<ExpandMoreIcon />}
                                ><Typography>Câu hỏi {index + 1}</Typography>

                                </AccordionSummary>
                                <AccordionDetails>
                                    {idQuestion === item.id ?
                                        <CreateQuestion isEdit={true} id={idQuestion} examId={examId}
                                            handleSelectQuestion={handleSelectQuestionEdit}
                                            question={item} /> :
                                        <DetailQuestion id={item.id}
                                            examId={examId}
                                            question={item}
                                            handleEdit={handleSelectQuestionEdit} />}
                                </AccordionDetails>
                            </Accordion>
                        </PaperQuestion>

                    )
                }
                
            </Stack>
        </Paper>
    )
}

export default QuestionInFile