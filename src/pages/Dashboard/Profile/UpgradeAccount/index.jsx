import React from 'react'
import { toast } from 'react-toastify';
import apiProfile from "apis/apiProfile";
import ConfirmButton from 'components/ConfirmDialog';
import useProfile from 'hooks/useProfile';
import { getMessageError } from 'utils';

const UpgradeAccount = (props) => {
    const {refreshProfile}  = useProfile()
    const handlePayment = () => {
        const id = toast.loading("Đang nâng cấp")
        apiProfile
            .upgradeAccount()
            .then((response) => {

                toast.update(id, { type: 'success', render: 'Nâng cấp thành công' , isLoading: false,autoClose:1200});
                refreshProfile()

            })
            .catch((error) => {
                toast.update(id, { type: 'success', render: getMessageError(error) , isLoading: false,autoClose:1200});

            })
    };

    return (
        <>
            <ConfirmButton title="Nâng cấp tài khoản"
                textConfirm='Nâng cấp'
                handleFunc={handlePayment}
                description="Xác nhận dùng 50.000 xu để nâng cấp tài khoản?"
                size="small" variant="outlined">
                Nâng cấp
            </ConfirmButton>
            
        </>
    );
}

export default UpgradeAccount