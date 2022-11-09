import { useRef, useEffect } from 'react';
import * as faceapi from "face-api.js";
import { Box } from '@mui/material';

function FaceRecognition() {
    const videoRef = useRef();
    const canvasRef = useRef();
    const intervalRef = useRef();
    useEffect(() => {
        startVideo();
        videoRef && loadModels();
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

    const faceDetection = async () => {
        intervalRef.current =  setInterval(async () => {
            const detections = await faceapi.detectAllFaces
                (videoRef.current, new faceapi.TinyFaceDetectorOptions())
            canvasRef.current.innerHtml = faceapi.
                createCanvasFromMedia(videoRef.current);
            faceapi.matchDimensions(canvasRef.current, {
                width: 240,
                height: 180,
            })
            const resized = faceapi.resizeResults(detections, {
                width: 240,
                height: 180,
            });
            if(resized.length !== 0){
                console.log(resized[0]._score)
            }
            // to draw the detection onto the detected face i.e the box
            faceapi.draw.drawDetections(canvasRef.current, resized);
            //to draw the the points onto the detected face
            // faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
            // //to analyze and output the current expression by the detected face
            // faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        }, 200)
    }
    useEffect(()=>{
        return ()=>{
            clearInterval(intervalRef.current)
        }
    },[])
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