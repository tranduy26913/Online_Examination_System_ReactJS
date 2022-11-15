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
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import LoadingButton from 'components/LoadingButton';
const alpha = Array.from(Array(10)).map((e, i) => i + 97);
const alphabet = alpha.map((x) => String.fromCharCode(x));

function QuestionInFile() {
    const { examId } = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questionsInFile)
    const [idQuestion, setIdQuestion] = useState('')
    const [expanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            dispatch(clearQuestionInFile())
            d.forEach((raw, index) => {

                let content = `<p>${raw['question']}</p>`
                let maxPoints = Number.isNaN(Number(raw['point'])) ? 0 : Number(raw['point'])
                let isCorrect = raw['isCorrect'] || 'a'
                let type = (isCorrect && isCorrect.split(',').length > 1) ? 'multi' : 'single'
                let answers = []
                let image = raw['image'] || ''
                if (image)
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
                if (answers.length === 0)
                    answers.push({
                        id: 0,
                        content: 'Đáp án a',
                        isCorrect: true,
                    })
                dispatch(addQuestionInFile({
                    id: index,
                    content,
                    type,
                    maxPoints,
                    answers
                }))

            })
        });
    };
    const readWord = (e) => {

       /// console.log('showfile', e)
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), { delimiters: { start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j' } });
            var text = doc.getFullText();

            let regex = new RegExp('Câu \\d*\:{1}')
            let raws = text.split(regex)
            raws.shift() //xoá phần tử đầu của mảng
            dispatch(clearQuestionInFile())
            raws.forEach((raw,index)=>{
                
                let content = ''
                let answers = []
                let arrWithContent = raw.split('_Điểm tối đa:')
                content =  `<p>${arrWithContent[0].trim()}</p>`

                arrWithContent = arrWithContent[1].split('_Đáp án:')
                let maxPoints =  Number(arrWithContent[0]) || 1

                let arrAnswerRaw = arrWithContent[1].split('A. ')
                let corrects = arrAnswerRaw[0].toUpperCase()

                for(let i=1;i<alphabet.length;i++){
                    if(!arrAnswerRaw[1])
                        break
                    arrAnswerRaw = arrAnswerRaw[1].split(`${alphabet[i].toUpperCase()}. `)
                    if(arrAnswerRaw[0]!== ''){
                        answers.push({
                            id: i,
                            content: arrAnswerRaw[0].trim(),
                            isCorrect: corrects.includes(alphabet[i-1].toUpperCase()),
                        })
                    }
                }
                const listCorrect =corrects.split(',')
                console.log({
                    id: index,
                    content,
                    type: (listCorrect.length >1 && listCorrect[1])?'multi':'single',
                    maxPoints,
                    answers
                })
                dispatch(addQuestionInFile({
                    id: index,
                    content,
                    type: (listCorrect.length >1 && listCorrect[1])?'multi':'single',
                    maxPoints,
                    answers
                }))
            })
        };
        reader.readAsBinaryString(e.target.files[0]);

    };

    const handleCreateQuestionWithFile = () => {
        setIsLoading(true)
        apiQuestion.createQuestionByFile({
            examId,
            questions: QUESTIONS
        })
            .then(res => {
                QUESTIONS.forEach(element => {
                    dispatch(addQuestion(element))
                });
                toast.success('Thêm câu hỏi thành công')
                dispatch(clearQuestionInFile())
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(()=>{
                setIsLoading(false)
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
                <Button variant='contained' component="label" width='160px'
                    endIcon={<UploadIcon />}
                >
                    Chọn File word
                    <input hidden type="file" onInput={readWord}
                    //onChange={handleChooseImage} 
                    />
                </Button>
                {QUESTIONS.length !== 0 && 
                <LoadingButton loading={isLoading} variant='contained' onClick={handleCreateQuestionWithFile}>Thêm câu hỏi</LoadingButton>}
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