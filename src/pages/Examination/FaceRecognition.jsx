import { useRef, useEffect, useLayoutEffect, useState } from 'react';
import * as faceapi from "face-api.js";
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function FaceRecognition({ countOutFace, increaseCountOutFace, handleCreateLog, handleSubmit }) {
    const videoRef = useRef();
    const canvasRef = useRef();
    const intervalRef = useRef();
    const [time, setTime] = useState(0)
    const step = 500
    const navigate = useNavigate()
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
            //faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            // faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            // faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            //faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(() => {
            faceDetection();
        })
    };

    useEffect(() => {
        if (time > 5000) {
            setTime(0)
            toast.warning(`Không phát hiện hoặc phát hiện nhiều khuôn mặt quá 5 giây lần ${countOutFace + 1}`)
            handleCreateLog(
                `Không phát hiện hoặc phát hiện nhiều khuôn mặt quá 5 giây lần ${countOutFace + 1}`
            )
            increaseCountOutFace();
            if (countOutFace + 1 > 5) {
                toast.warning('Không phát hiện hoặc phát hiện nhiều khuôn mặt quá 5 lần. Bài thi tự động nộp')
                handleSubmit()
            }
        }
    }, [countOutFace, time, increaseCountOutFace])

    const faceDetection = async () => {
        clearInterval(intervalRef.current)
        intervalRef.current = setInterval(async () => {
            const detections = await faceapi.detectAllFaces
                (videoRef.current, new faceapi.TinyFaceDetectorOptions())
            //(videoRef.current).withFaceLandmarks(true).withFaceDescriptors()
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
            if (resized.length !== 1) {
                setTime(prev => prev + step)
            }
            else {
                setTime(0);
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