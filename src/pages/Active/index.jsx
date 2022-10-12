import { useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom'
import {Paper} from '@mui/material'
import apiAuth from 'apis/apiAuth'

function Active(props) {
    const {token} = useParams()
    const [loadingData,setLoadingData]= useState(true)
    const [msg,setMsg]=useState("")
    const [count,setCount] = useState(0)
    const navigate = useNavigate()

    useEffect(async()=>{
        const params = {
            key:token
        }
        apiAuth.activeAccount(params).then(res=>{
            setLoadingData(false)
            setMsg("Kích hoạt thành công")
            setCount(5);
        })
        .catch(err=>{
            console.log(err)
            setMsg("Kích hoạt không thành công")
        })
    },[token])

    useEffect(async()=>{
        if(loadingData)
            return
        setTimeout(()=>{
            if(count>0){
                setCount(pre =>pre-1)
                console.log(count)
            }
            else{
                navigate("/")
            }
        },1000)
    },[count])
    
  return (
    <Paper >
      
        {loadingData?
        <>
        <LoadingData/>
        <div className='d-flex mt-2'><h4>Đang kích hoạt tài khoản</h4></div>
        </>
        :
        <>
            <div className='d-flex mt-2'><h4>{msg}</h4></div>
            <span>Sẽ chuyển đến trang chủ trong {count} giây</span>
        </>
      }
    </Paper>
  )
}

export default Active