import { Box, Divider, InputBase, Paper, Stack, TextField, styled, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Configuration, OpenAIApi } from "openai";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import DirectionsIcon from '@mui/icons-material/Directions';
import TerminalIcon from '@mui/icons-material/Terminal';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import ChatGPT_Logo from 'assets/img/ChatGPT_logo.webp'
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from 'slices/chatgptSlice';
function ChatGPT() {
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    //const [openai, setOpenai] = useState()
    const chats = useSelector(state => state.chatgpt?.chats) || []
    const dispatch = useDispatch()
    const theme = useTheme()

    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    useEffect(() => {

    }, [])
    const openai = new OpenAIApi(configuration);

    const handleSendChat = () => {
        let newChat = {
            sender: 'own',
            content: input
        }
        dispatch(addChat(newChat))
        setIsLoading(true)
        setInput('')
        openai.createChatCompletion({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": input }]
        })
            .then(res => {
                setIsLoading(false)
                let newChat = {
                    sender: 'gpt',
                    content: res.data.choices[0].message.content
                }
                dispatch(addChat(newChat))
            })
    }

    return (
        <Stack width='100%'>
            <Paper elevation={12}
                sx={{ margin: '10px 24px' }}>
                <Stack minHeight="calc(100vh - 78px)" maxHeight={'calc(100vh - 78px)'}
                    width={{
                        xs: '100%',
                        md: '90%',
                        lg: '80%'
                    }}
                    m='0 auto' p={2}>
                    <Typography color='primary' fontWeight={600} fontSize='26px' textAlign='center'>CHAT GPT</Typography>
                    <Divider />
                    <Stack direction='column-reverse' flex={1} pr={2} mb={1} sx={{
                        overflowY: 'auto'
                    }}>
                        {isLoading &&
                            <Box sx={{ transform: 'scale(0.5)' }}>
                                <LoadingMessage content='ChatGPT đang trả lời. Vui lòng đợi' />
                            </Box>
                        }
                        {chats.map(chat => <Stack direction='row' py={1} sx={{

                        }}>
                            {
                                chat.sender === 'gpt' ? <Box px={1.5} py={0.25} ml={0.25}>
                                    {/* <SettingsIcon /> */}
                                    <img src={ChatGPT_Logo} width={'24px'} />
                                </Box> :
                                    <Box px={1.5} py={0.25} ml={0.25}>
                                        <PersonIcon />
                                    </Box>
                            }
                            <Box p='4px 12px' sx={{
                                borderRadius: '6px',
                                backgroundColor: chat.sender === 'own' ? `${theme.palette.primary.main}a0`
                                    : `${theme.palette.primary.main}18`
                            }} >
                                <Typography>{chat.content}</Typography>
                            </Box>
                        </Stack>
                        )}


                    </Stack>

                    <Paper
                        component="form"
                        elevation={12}
                        className={'chat'}
                        sx={{
                            p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%',
                            border: `2px solid #ffffff00`,
                            '&:focus-within': {
                                border: `2px solid ${theme.palette.primary.main}80`
                            }
                        }}
                    >
                        {/* <IconButton sx={{ p: '10px' }} > */}
                        <TerminalIcon color="primary" sx={{ margin: '0 10px' }} />
                        {/* </IconButton> */}
                        <Divider sx={{ height: 28 }} orientation="vertical" />
                        <InputBase
                            maxRows={4}
                            multiline
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Nhập điều bạn muốn hỏi ChatGPT"
                        />
                        {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton> */}
                        <Divider sx={{ height: 28 }} orientation="vertical" />
                        <IconButton
                            onClick={handleSendChat}
                            color="primary" sx={{ p: '10px' }}>
                            <SendIcon />
                        </IconButton>
                    </Paper>
                </Stack>
            </Paper>
        </Stack>
    )
}



const Roller = styled(Box)(({ theme }) => ({
    '&:before,&:last-child:before': {
        content: '""',
        display: 'block',
        width: '15px',
        height: '15px',
        background: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
        borderRadius: '50%',
    }
}))
const LoadingMessage = (props) => {
    const [dot, setDot] = useState('.')
    useEffect(() => {
        const id = setInterval(
            setDot(prev => {
                if (prev.length === 3)
                    return ''
                return prev + '.'
            }),
            500
        )
        return () => {
            clearInterval(id)
        }
    }, [])
    return (<Stack
        sx={{ position: 'relative' }}
        width='100%' minWidth='500px' height='100%' minHeight='100px' justifyContent='center' alignItems='center'>
        <div className="loader-wrapper">
            <div className="loader">
                <Roller className="roller"></Roller>
                <Roller className="roller"></Roller>
            </div>

            <div id="loader2" className="loader">
                <Roller className="roller"></Roller>
                <Roller className="roller"></Roller>
            </div>

            <div id="loader3" className="loader">
                <Roller className="roller"></Roller>
                <Roller className="roller"></Roller>
            </div>

        </div>
        <Typography fontSize='28px' align='center'>{props.content || 'Đang tải dữ liệu'}{dot}</Typography>

    </Stack>)
}

export default ChatGPT