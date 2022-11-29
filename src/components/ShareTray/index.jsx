import { Button, Dialog, DialogContent, DialogTitle, Divider, Slide, Stack } from '@mui/material'
import React, { forwardRef, useState } from 'react'
import {
    FacebookIcon,
    LinkedinIcon,
    RedditIcon,
    TelegramIcon,
    TwitterIcon,
    FacebookShareButton,
    LinkedinShareButton,
    RedditShareButton,
    TwitterShareButton,
    TelegramShareButton
} from 'react-share';
// ----------------------------------------------------------------------
const Transition = forwardRef(function transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function ShareTray({ url, title,quote , text, ...others }) {
    const [dialog, setDialog] = useState(false)
    const handleClose = () => setDialog(false)
    const handleOpen = () => setDialog(true)
    return (
        <>
            <Button onClick={handleOpen}
                {...others}
            >{text}</Button>

            <Dialog
                open={dialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle align='center' color='primary'>{"Chia sẻ"}</DialogTitle>
                {/* <Divider/> */}
                <DialogContent>
                    <Stack direction='row' spacing={1} flexWrap='wrap'>
                        <FacebookShareButton
                            url={'https://oes.vercel.app/course/6/manage-assignment'}
                            quote={quote}>
                            <FacebookIcon
                                size={48}
                                round />
                        </FacebookShareButton>
                        <TwitterShareButton
                            url={'https://oes.vercel.app/course/6/manage-assignment'}
                            title={title}>
                            <TwitterIcon
                                size={48}
                                round />
                        </TwitterShareButton>
                        <LinkedinShareButton
                            url={'https://oes.vercel.app/course/6/manage-assignment'}
                            title={title}>
                            <LinkedinIcon
                                size={48}
                                round />
                        </LinkedinShareButton>
                        <TelegramShareButton
                            url={'https://oes.vercel.app/course/6/manage-assignment'}
                            title={title}>
                            <TelegramIcon
                                size={48}
                                round />
                        </TelegramShareButton>
                        <RedditShareButton
                            url={'https://oes.vercel.app/course/6/manage-assignment'}
                            title={title}>
                            <RedditIcon
                                size={48}
                                round />
                        </RedditShareButton>
                    </Stack>
                </DialogContent>

            </Dialog>
        </>
    )
}

export default ShareTray