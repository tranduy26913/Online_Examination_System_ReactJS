import { useRef, useEffect, useLayoutEffect, useState } from 'react';
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
    const [countTime, setCountTime] = useState(0)
    const [face, setFace] = useState(0)
    const [countFace, setCountFace] = useState(0)

    const answerSheet = useSelector(state => state.answerSheet?.result)
    const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
    const step = 500
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

        return () => {
            if (videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop())
                clearInterval(intervalRef.current)
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((currentStream) => {
                videoRef.current.srcObject = currentStream;
            }).catch((err) => {
                toast.warning("Vui lòng bật camera để tiếp tục thi!")
                navigate('/')
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
        if (time > 5000) {
            setTime(0)
            toast.warning(`Không phát hiện khuôn mặt quá 5 giây lần ${countTime + 1}`)
            setCountTime(prev => prev + 1)
            if (countTime + 1 > 5) {
                toast.warning('Không phát hiện khuôn mặt quá 5 lần. Bài thi tự động nộp')
                handleSubmit()
            }
        }
        if(face > 5000){
            setFace(0)
            toast.warning(`Phát hiện nhiều khuôn mặt quá 5 giây lần ${countFace + 1}`)
            setCountFace(prev => prev + 1)
            if (countFace + 1 > 5) {
                toast.warning('Phát hiện nhiều khuôn mặt quá 5 lần. Bài thi tự động nộp')
                handleSubmit()
            }
        }
    },[countTime, countFace, face, time])

    const faceDetection = async () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(async () => {
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
            if (resized.length !== 0) {
                setTime(0)
                if (resized.length > 1) {
                    setFace(prev => prev + step)
                }
                else {
                    setFace(0)
                }
            }
            else {
                setTime(prev => prev + step)
            }
            
            // to draw the detection onto the detected face i.e the box
            faceapi.draw.drawDetections(canvasRef.current, resized);
            //to draw the the points onto the detected face
            // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            // //to analyze and output the current expression by the detected face
            // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }, step)
    }

    return (
        <>
            <Box sx={{ width: '240px', height: '180px', position: 'relative' }}>
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