import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

// const CircularLoading = styled(CircularProgress)(({ theme }) => ({
//     color:'#fff',
//   }));

const style = {
    color:'#fff',
    marginRight:'6px'
}

const LoadingButton = props => {
    const {  loading,children, ...other } = props;
    return (
        <Button {...other}>
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