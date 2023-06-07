import React, { useContext, useEffect } from 'react'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { useState } from "react";
import { toast } from 'react-toastify';
import {
    Dialog,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from "@mui/material";
import apiProfile from "apis/apiProfile";
import LoadingButton from 'components/LoadingButton';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'slices/userSlice';
import apiCourse from 'apis/apiCourse';
import CourseContext from './CourseContext';
import {Document, Page, pdfjs} from 'react-pdf';
import ex from 'assets/file/ex.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function GetCertification() {

    const [uploading, setUploading] = useState(false);
    const [open, setOpen] = useState(false)
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
    const [urlCertificate, setUrlCertificate] = useState(ex)

    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const dispatch = useDispatch()
    const { courseId,  } = useContext(CourseContext)

    const handleUpgrade = () => {
        setUploading(true)
        apiProfile.updateRole()
            .then((response) => {
                if(response.user)
                    dispatch(setUserInfo(response.user))
                toast.success(response.message)
            })
            .catch((error) => {
                console.log(error.response)
                toast.error(error.response);
            })
            .finally(() => {
                setOpen(false)
                setUploading(false)
            })
    };

    useEffect(()=>{
        apiCourse.getCertificate({courseId})
        .then(res=>{
            //setUrlCertificate(res.link)
        })
    },[])
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
    return (
        <>
            <Button
                variant='outlined'
                onClick={handleOpen}
                endIcon={<WorkspacePremiumIcon />}
            >Nhận chứng chỉ</Button>

<Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nâng cấp lên tài khoản giáo viên</DialogTitle>
                <DialogContent>
                <Document file={urlCertificate} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={1} />
      </Document>
                </DialogContent>
                <DialogActions>
                    <Button  variant='contained' onClick={handleClose}>Huỷ</Button>
                    <LoadingButton variant='contained' loading={uploading} onClick={handleUpgrade}>Nâng cấp</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default GetCertification