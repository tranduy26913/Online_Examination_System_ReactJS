import { useRef, useEffect ,useLayoutEffect, useState} from 'react';
import * as faceapi from "face-api.js";
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { clearAnswerSheet, clearTakeExamId } from 'slices/answerSheetSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import apiTakeExam from 'apis/apiTakeExam';

function FaceRecognition() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const intervalRef = useRef();
    const [time, setTime] = useState(0)
    const [count, setCount] = useState(0)

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
    useLayoutEffect(() => {
        startVideo();
        videoRef && loadModels();

        return ()=>{
           videoRef.current.srcObject.getTracks().forEach(track => track.stop())
            clearInterval(intervalRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            }).catch((err) => {
                console.error(err)
            });
    }
    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            //faceapi.nets.mtcnn.loadFromUri('/models'),
            // faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
            faceDetection();
        })
    };

    useEffect(()=>{
        // console.log(time)
        // console.log('count:'+count)
        if(time > 5000){
            setTime(0)
            toast.warning(`Không phát hiện khuôn mặt quá 5 giây lần ${count+1}`)
            setCount(prev => prev+ 1)
            if(count+1 > 5){
                toast.warning('Không phát hiện khuôn mặt quá 5 lần. Bài thi tự động nộp')
                handleSubmit()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[time,count])

    const faceDetection = async () => {
        intervalRef.current =  setInterval(async () => {
            const detections = await faceapi.detectAllFaces
                (videoRef.current, new faceapi.TinyFaceDetectorOptions())
            canvasRef.current.innerHtml = faceapi
                .createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: 240,
                height: 180,
            })
            const resized = faceapi.resizeResults(detections, {
                width: 240,
                height: 180,
            });
            console.log('run')
            if(resized.length !== 0){
                console.log(resized[0]._score)
                setTime(0)
            }
            else{
                setTime(prev=>prev+1000)
            }
            // to draw the detection onto the detected face i.e the box
            faceapi.draw.drawDetections(canvasRef.current, resized);
            //to draw the the points onto the detected face
            // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            // //to analyze and output the current expression by the detected face
            // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }, 1000)
    }
    
    return (
        <>
            <Box sx={{ width: '240px',height:'180px', position: 'relative' }}>
                <video crossOrigin='anonymous' style={{ width: '100%', height: '100%' }} ref={videoRef} autoPlay>
                </video>
                <canvas ref={canvasRef} width="240" height="180"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 2
                    }} />
            </Box>

        </>
    )
}

export default FaceRecognition