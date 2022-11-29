import apiTakeExam from 'apis/apiTakeExam'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearAnswerSheet, clearTakeExamId } from 'slices/answerSheetSlice'
import { BoxTime } from './Examination.style'

function CountDown({endTime}) {
    const [countDown, setCountDown] = useState({ hour: 0, minute: 0, second: 0 })
    const takeExamId = useSelector(state => state.answerSheet?.takeExamId)
    const answerSheet = useSelector(state => state.answerSheet?.result)
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
    useEffect(() => {

        if (!endTime) return
        var x = setInterval(function () {
            // Get today's date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = endTime - now;
            //console.log(distance)
            // Time calculations for days, hours, minutes and seconds
            setCountDown({
                hour: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minute: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                second: Math.floor((distance % (1000 * 60)) / 1000)
            })
            if (distance < 0) {
                clearInterval(x);
                handleSubmit();
            }
        }, 1000);
        return () => clearInterval(x);
    }, [endTime])
    return (
        <BoxTime>
            {(countDown.hour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:
            {(countDown.minute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}:
            {(countDown.second).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}
        </BoxTime>
    )
}

export default memo(CountDown)