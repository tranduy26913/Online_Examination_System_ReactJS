import apiProfile from "apis/apiProfile";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { setUserInfo } from "slices/userSlice";

export default function useProfile(){
    const dispatch = useDispatch()
    
    const {mutate:refreshProfile} = useMutation(apiProfile.getUserInfo,{
        onSuccess(data){
             dispatch(setUserInfo(data))
        }
    })
    
    return {refreshProfile}
}