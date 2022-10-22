import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';

// const CircularLoading = styled(CircularProgress)(({ theme }) => ({
//     color:'#fff',
//   }));

const style = {
    color:'#fff',
    marginRight:'6px'
}

const LoadingButton = props => {
    const {  loading,children,onClick, ...other } = props;
    const handleOnClick = ()=>{
        if(loading){
            toast.warning("Tác vụ đang được thực hiện. Vui lòng không thao tác quá nhanh!")
            return
        }
        onClick()
    }
    return (
        <Button {...other} onClick={handleOnClick}>
            {loading && <CircularProgress size={20} sx={style}/>} {children}
        </Button>
    );
}


LoadingButton.defaultProps = {
    loading: false,
};

LoadingButton.propTypes = {
    loading: PropTypes.bool,
};

export default LoadingButton;