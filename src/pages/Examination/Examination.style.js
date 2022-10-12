import {
    Box,
    Button
} from "@mui/material"
import { styled} from '@mui/material/styles';

export const ButtonQuestion = styled(Button)(({ theme }) => ({
    borderRadius: '6px',
    //padding:'8px',
    width: '100%',
    height:'54px',
    minWidth: 'unset',
    minHeight: 'unset',
    fontWeight:600,
    //paddingBottom:'50%',
    color:  `${theme.palette.mode==='dark'?theme.palette.common.white:theme.palette.common.black}`,
    border: '2px solid #999',
    borderBottomWidth:'20px',
    '&.done': {
        borderColor: `${theme.palette.primary.main}cc`,
        color: `${theme.palette.primary.main}`,
        backgroundColor: `${theme.palette.primary.light}40`
    },
    '&.flag':{
        borderColor: `${theme.palette.error.main}`,
        color: `${theme.palette.error.main}`,
        backgroundColor: `${theme.palette.error.light}20`
    }
}));
export const BoxTime = styled(Box)(({ theme }) => ({
    borderRadius: '2px',
    color: theme.palette.primary.main,
    fontWeight: 600,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '0.5rem 1rem',
    position: 'fixed',
    right: '2rem',
    bottom: '2rem',
    fontSize: '16px',
}))