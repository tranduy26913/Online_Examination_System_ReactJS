import {
    styled,
    InputBase,
    Switch,
    Stack,
    Paper,
    Box,
    alpha
} from '@mui/material';
import PropTypes from 'prop-types';

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
    width: '100%',
    borderRadius: '8px',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
    },

    '& .MuiBox-root': {
        width: '200px',
        height:'40px',
        paddingLeft: '12px',
        borderRadius: '8px 0 0px 8px',
        backgroundColor: `${theme.palette.primary.light}c0`,
        color: '#222',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '32px',
            borderRadius: '8px 8px 0px 0px',
        }
    },
    '& .MuiBox-root.LabelFormControl': {
        
        height:'unset'
    },
    '& .MuiFormControl-root': {
        flex: 1,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            borderRadius: '0px 0px 8px 8px',
        }
    },
    '& input': {
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
        
        height: '40px',
        border: `1px solid ${theme.palette.divider}`,
        padding: '4px 16px',
        outline: 'none',
        backgroundColor: `${theme.palette.primary.light}06`,
        fontSize: '15px',
        borderRadius: '0px 8px 8px 0px',
        '&:focus': {
            border: `2px solid ${theme.palette.primary.light}`,
            borderLeftWidth: '0',
        },
        borderLeftColor: 'transparent',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            borderRadius: '0px 0px 8px 8px',
        }
    },
    '& .MuiFormGroup-root': {
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
        flex: 1,
        border: `1px solid ${theme.palette.divider}`,
        borderLeftColor: 'transparent',
        padding: '0 12px 0 16px',
        outline: 'none',
        backgroundColor: `${theme.palette.primary.light}06`,
        fontSize: '15px',
        borderRadius: '0px 8px 8px 0px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            borderRadius: '0px 0px 8px 8px',
        }

    },
    '& .MuiFormHelperText-root': {
        color: theme.palette.error.light,
        fontSize: 13
    }
}))

export const Stack2Column = styled(Stack)(({ theme }) => ({

    [theme.breakpoints.down("sm")]: {
        flexDirection: 'column !important'
    }
    , [theme.breakpoints.up("lg")]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        '&>div': {
            flex: 1,
            width: 'calc(50% - 6px)'
        }
    },
    width: '100%',
    gap: '12px',

}))

export const PaperQuestion = styled(Paper)(({ theme }) => ({
    borderTop: `6px solid ${theme.palette.primary.light}`,
    cursor:'pointer',
    padding:theme.spacing(1),
    paddingRight:'0',
    '&.selected':{
        backgroundColor:alpha(theme.palette.primary.main,0.4),
    }
}))

export const AccordionSummaryStyle = {
    '&.Mui-expanded': {
        borderBottom: '1px dotted #bfbfbf'
    }
}

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    height: '36px',
    '& .MuiInputBase-input': {
        color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.text.primary,
        height: '38px',
        flex: '1',
        border: `2px solid transparent`,
        padding: '4px 16px',
        outline: 'none',
        backgroundColor: 'transparent',
        fontSize: '14px',
        borderRadius: '0px 8px 8px 0px',
        '&:focus': {
            border: `2px solid ${theme.palette.primary.light}`,
            borderLeftColor: 'transparent',
        }
    },
}));


export const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box pt={2}>
                    {props.children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

