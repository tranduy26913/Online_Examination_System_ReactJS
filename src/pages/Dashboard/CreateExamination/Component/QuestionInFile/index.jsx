import { Box, Button, Paper, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useCallback, useContext, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
import * as XLSX from "xlsx";
import { useDispatch, useSelector } from 'react-redux';
import {
    PaperQuestion,
} from '../MUI'
import CreateQuestion from './CreateQuestion';
import { addQuestionInFile, clearQuestionInFile, deleteQuestionInFile } from 'slices/userSlice';
import ExamContext from '../../ExamContext';
import { toast } from 'react-toastify';
import { getMessageError } from 'utils';
import apiQuestion from 'apis/apiQuestion';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import LoadingButton from 'components/LoadingButton';
import * as FileSaver from 'file-saver';
import templateWord from 'assets/file/word.docx'
import templateExcel from 'assets/file/excel.xlsx'
import AnimationIcon from 'components/UI/AnimationIcon';
import ConfirmButton from 'components/ConfirmDialog';
const alpha = Array.from(Array(10)).map((e, i) => i + 97);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const styleStack = {
    overflowY: 'auto',
    height: '100%',
    padding: '8px'
}

function QuestionInFile() {
    const { examId, reloadExam, status } = useContext(ExamContext)
    const QUESTIONS = useSelector(state => state.user.questionsInFile)
    const [idQuestion, setIdQuestion] = useState('')
    //const [expanded, setExpanded] = useState(false);
    const [questionSelect, setQuestionSelect] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()
    const theme = useTheme()
    const user = useSelector(state => state.user?.info)
    const screenSM = useMediaQuery(theme.breakpoints.up('sm'));
    // const handleChangeQuestion = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };
    const handleSelectQuestionEdit = useCallback((value) => {
        setIdQuestion(value)
        let question = QUESTIONS.find(item => item.id === value)
        if (question)
            setQuestionSelect(question)
        else
            setQuestionSelect(null)
    }, [QUESTIONS])
    const handleChooseFile = (e) => {
        if (e.target.files.length !== 0) {
            const file = e.target.files[0]
            const name = e.target.files[0].name;
            const lastDot = name.lastIndexOf('.');

            const ext = name.substring(lastDot + 1);
            if (ext === 'docx' || ext === 'doc')
                readWord(file)
            else if (ext === 'xlsx')
                readExcel(file)
            else {
                toast.warning("Vui lòng chọn đúng định dạng .docx, .doc hoặc .xlsx")
            }
            e.target.value = null
        }
    }
    const lockUpload = () => {
        toast.info("Vui lòng nâng cấp lên tài khoản PREMIUM để dùng tính năng này")
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
    const readWord = (file) => {

        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target.result;
            var doc = new Docxtemplater(new PizZip(content), { paragraphLoop: true, linebreaks: true, delimiters: { start: '12op1j2po1j2poj1po', end: 'op21j4po21jp4oj1op24j' } });
            var text = doc.getFullText();

            let regex = new RegExp('Câu \\d*:{1}')
            let raws = text.split(regex)

            raws.shift() //xoá phần tử đầu của mảng
            dispatch(clearQuestionInFile())
            raws.forEach((raw, index) => {
                try {

                    let content = ''
                    let answers = []
                    let arrWithContent = raw.split('_Điểm tối đa:')
                    content = `<p>${arrWithContent[0].trim()}</p>`

                    arrWithContent = arrWithContent[1].split('_Đáp án:')
                    let maxPoints = Number(arrWithContent[0]) || 1

                    let arrAnswerRaw = arrWithContent[1].split('A:')
                    let corrects = arrAnswerRaw[0].toUpperCase()

                    for (let i = 1; i < alphabet.length; i++) {
                        if (!arrAnswerRaw[1])
                            break
                        arrAnswerRaw = arrAnswerRaw[1].split(`${alphabet[i].toUpperCase()}:`)
                        if (arrAnswerRaw[0] !== '') {
                            answers.push({
                                id: i,
                                content: arrAnswerRaw[0].trim(),
                                isCorrect: corrects.includes(alphabet[i - 1].toUpperCase()),
                            })
                        }
                    }
                    const listCorrect = corrects.split(',')

                    dispatch(addQuestionInFile({
                        id: index,
                        content,
                        type: (listCorrect.length > 1 && listCorrect[1]) ? 'multi' : 'single',
                        maxPoints,
                        answers
                    }))
                }
                catch {

                }
            })
        };
        reader.readAsBinaryString(file)

    };

    const handleCreateQuestionWithFile = () => {
        setIsLoading(true)
        apiQuestion.createQuestionByFile({
            examId,
            questions: QUESTIONS
        })
            .then(res => {
                toast.success('Thêm câu hỏi thành công')
                dispatch(clearQuestionInFile())
                reloadExam()
            })
            .catch(err => {
                toast.warning(getMessageError(err))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }
    const handleDownfile = (file, filename) => {
        FileSaver.saveAs(file, 'template.docx');
    }

    const handleDeleteQuestion = useCallback((id) => {
        try {
            dispatch(deleteQuestionInFile(id))
            toast.success("Xoá thành công")
        }
        catch (err) {
            toast.warning("Có lỗi xảy ra!")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Paper>
            <Stack direction='row' spacing={2} p={2}>
                <Button variant='contained' component="label" width='160px' color='success'
                    onClick={() => handleDownfile(templateExcel, 'excel.xlsx')}
                    endIcon={<DownloadIcon />}
                >
                    Tải mẫu Excel
                </Button>
                <Button variant='contained' component="label" width='160px' color='success'
                    endIcon={<DownloadIcon />}
                    onClick={() => handleDownfile(templateWord, 'template.docx')}
                >
                    Tải mẫu Word
                </Button>
                {
                    status === 'private' &&
                    <Button variant='contained' component="label" width='160px'
                        endIcon={<AnimationIcon src="https://assets7.lottiefiles.com/packages/lf20_rZQs81.json"
                            style={{ height: '30px', width: '30px' }} />}
                        onClick={(!user?.premium) ? lockUpload : null}
                    >
                        Tải lên File
                        {user?.premium &&
                            <input hidden type="file" onInput={handleChooseFile} />
                        }
                    </Button>
                }

                {QUESTIONS.length !== 0 &&
                    <LoadingButton loading={isLoading} variant='contained' onClick={handleCreateQuestionWithFile}>Thêm câu hỏi</LoadingButton>}
            </Stack>
            {
                QUESTIONS.length !== 0 &&
                <>

                    <Typography color='primary' align='center' fontSize='20px'>Xem trước kết quả</Typography>
                    <Stack p={2} direction={'row'} height={'calc(100vh - 120px)'} spacing={2}>
                        <Stack flex={1} spacing={1} height='100%'>
                            <Typography fontWeight={600} align='center'>Danh sách</Typography>
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
                                                {screenSM && 'Câu hỏi '}{index + 1}

                                                <ConfirmButton
                                                    title={'Xoá câu hỏi'}
                                                    description='Bạn có chắc chắn muốn xoá câu hỏi này khỏi đề thi'
                                                    handleFunc={() => handleDeleteQuestion(item.id)}
                                                    color='error'
                                                    sx={{ minWidth: '40px' }}>
                                                    Xoá
                                                </ConfirmButton>

                                            </Stack>
                                        </PaperQuestion>
                                    )
                                }
                            </Stack>
                        </Stack>

                        <Box flex={{ xs: 2, md: 3, lg: 4 }} sx={{ overflowY: 'auto' }}>
                            <CreateQuestion
                                isEdit={true}
                                id={idQuestion}
                                handleSelectQuestion={handleSelectQuestionEdit}
                                question={questionSelect} />
                        </Box>

                    </Stack>
                </>
            }
            {/* <Stack spacing={1.5} p={2}>

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

            </Stack> */}
        </Paper>
    )
}

export default QuestionInFile