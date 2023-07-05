import React, { useContext } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useState } from "react";
import {
    Button,
} from "@mui/material";
import { useDispatch } from 'react-redux';
import apiCourse from 'apis/apiCourse';
import CourseContext from './CourseContext';
import FileSaver from 'file-saver';


function GetCertification() {

    const handleOpen = () => {
        apiCourse.getCertificate({courseId})
        .then(res=>{
            FileSaver.saveAs(
                res.link,
                "MyCertificate.pdf"
              );
        })
    } 
    const { courseId,  } = useContext(CourseContext)

    return (
        <>
            <Button
                variant='outlined'
                onClick={handleOpen}
                endIcon={<WorkspacePremiumIcon />}
            >Nhận chứng chỉ</Button>
        </>
    )
}

export default GetCertification