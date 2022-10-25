import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import {Paper} from '@mui/material'
import apiAuth from 'apis/apiAuth'
import LoadingPage from 'components/LoadingPage'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getMessageError } from 'utils'
import { loginSuccess } from 'slices/authSlice'

function Active(props) {
    const {token} = useParams()
    const [loadingData,setLoadingData]= useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        const handleActive = ()=>{
            const params = {
                token
            }
            apiAuth.active(params).then(res=>{
                setLoadingData(false)
                toast.success("Kích hoạt thành công")
                const {message,...data} = res
                dispatch(loginSuccess(data))
                navigate('/my/profile')
            })
            .catch(err=>{
                console.log(err)
                toast.warning(getMessageError(err))
            })
        }
        handleActive()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
  return (
    <Paper >
      
        {loadingData&&
        <>
        <LoadingPage content="Đang kích hoạt tài khoản" />
        </>
      }
    </Paper>
  )
}

export default Active