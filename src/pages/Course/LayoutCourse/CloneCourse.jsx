import React, { useContext } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useState } from "react";
import {
    Button,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import apiCourse from 'apis/apiCourse';
import CourseContext from './CourseContext';
import ConfirmButton from 'components/ConfirmDialog';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function CloneCourse() {

    const { id:courseId,  } = useContext(CourseContext)
    const navigate = useNavigate();
    const handleClonCourse = () => {
        const id = toast.loading("Đang xử lý")
        apiCourse.postCloneCourse({ courseId })
            .then(res => {
                console.log(res)
                toast.update(id, { render: 'Sao chép thành công', autoClose: 1200, isLoading: false, type: 'info' })
                navigate(`/course/${res.course?.courseId}`)

            })
            .catch(() => {
                toast.update(id, { render: 'Sao chép không thành công', autoClose: 1200, isLoading: false, type: 'info' })
            })
    }

    return (
        <>
            <ConfirmButton
                variant='outlined'
                handleFunc={handleClonCourse}
                title={"Sao chép khoá học"}
                textConfirm='Sao chép'
                description={"Bạn có muốn sao chép tất cả nội dung của khoá học tạo thành 1 khoá học mới không?"}
                endIcon={<WorkspacePremiumIcon />}
            >Sao chép khoá học</ConfirmButton>

        </>
    )
}

export default CloneCourse