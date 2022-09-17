import {
    styled,
    FormGroup,
    InputBase,
    Switch,
    Stack,
    Paper
} from '@mui/material';

export const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 20,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(22px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 16,
        height: 16,
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.divider : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export const StackLabel = styled(Stack)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    width:'100%',
    borderRadius: '8px',
    height: '38px',
    flexDirection: 'row',
    backgroundColor:`${theme.palette.primary.light}18`,
    '& .MuiBox-root': {
        width: '200px',
        paddingLeft: '12px',
        height: '100%',
        borderRadius:'8px 0 0px 8px',
        backgroundColor: `${theme.palette.primary.light}a0`,
        display: 'flex',
        alignItems: 'center'
    },
    '& .MuiFormGroup-root': {
        paddingLeft: '16px'
    },
    '& input':{
        color: theme.palette.mode === 'dark' ? '#fff':theme.palette.text.primary,
        height:'38px',
        flex:'1',
        border:`2px solid transparent`,
        padding:'4px 16px',
        outline:'none',
        backgroundColor:'transparent',
        fontSize:'14px',
        borderRadius:'0px 8px 8px 0px',
        '&:focus':{
            border:`2px solid ${theme.palette.primary.light}`,
            borderLeftColor:'transparent',
        }
    }
}))

export const Stack2Column = styled(Stack)({
    flexDirection:'row',
    width:'100%',
    gap:'12px'
})

export const PaperQuestion = styled(Paper)(({ theme }) => ({
    borderTop: `6px solid ${theme.palette.primary.light}`
}))

export const AccordionSummaryStyle = {
    '&.Mui-expanded': {
        borderBottom: '1px dotted #bfbfbf'
    }
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    flex:1,
    height:'36px',
    '& .MuiInputBase-input': {
      borderRadius: 4,
      width:'100%',
      position: 'relative',
      backgroundColor: 'transparent',
      //border: '1px solid #ced4da',
      fontSize: 14,
      padding: '4px 26px 4px 16px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        //boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));