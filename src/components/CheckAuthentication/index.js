import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { logoutSuccess } from 'slices/authSlice'
import { toast } from 'react-toastify'
import jwt_decode from 'jwt-decode'
import apiProfile from 'apis/apiProfile'
import { clearUserInfo, fetchingInfo, setUserInfo } from 'slices/userSlice'
import { useState } from 'react'

const privatePath = [
    '/my/', '/admin/', '/payment',
    '/course/',
    '/exam/', '/result-exam/', '/review-exam'
]

function CheckAuthentication(props) {
    const user = useSelector(state => state.user.info)
    const refreshToken = useSelector(state => state.auth.refreshToken)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    useLayoutEffect(() => {
        const check = () => {
            const isPrivate = privatePath.findIndex(e => location.pathname.includes(e)) >= 0 ? true : false
            if (isPrivate) {
                setLoading(true)
            }
            if (refreshToken) {
                const tokenDecode = jwt_decode(refreshToken)
                let date = new Date();
                if (tokenDecode.exp < date.getTime() / 1000) {
                    toast.warning("Phiên làm việc của bạn đã hết. Vui lòng đăng nhập lại")
                    dispatch(logoutSuccess())
                    if (isPrivate)
                        navigate('/')
                }
                //setLoading(false)
                if (!user) {
                    dispatch(fetchingInfo())
                    apiProfile.getUserInfo()
                        .then(res => {
                            dispatch(setUserInfo(res))
                        })
                        // .catch(err=>{
                        //     navigate('/')
                        // })
                        .finally(() => setLoading(false))
                }
                else {
                    setLoading(false)
                }
            }
            else {
                dispatch(clearUserInfo())
                if (isPrivate) {
                    toast.warning("Vui lòng đăng nhập để thực hiện thao tác này")
                    navigate('/')
                }
                setLoading(false)
            }
        }
        check()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshToken, location.pathname])

    return (
        <>
            {
                // loading ?
                //     <LoadingPage content='Đang tải dữ liệu...' />
                //     : props.children
                // loading && <OverlayLoading content='Đang tải dữ liệu...' />
            }
            {props.children}
        </>
    )
}

export default CheckAuthentication