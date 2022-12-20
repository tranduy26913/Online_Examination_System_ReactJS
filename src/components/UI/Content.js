
import { Stack, styled } from "@mui/material";

export const ContentWrap= styled(Stack)(({ theme }) => ({
    width: '100%',
    borderRadius: '8px',
    padding:theme.spacing(2),
    '& img':{
        maxWidth: '100%'
    },
    '& ul':{
        padding:theme.spacing(2)
    }
}))
