import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, Typography } from '@mui/material'
import moment from 'moment';
import React, { useRef, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarSchedule() {
    const [open, setOpen] = React.useState(true);
    const [scroll, setScroll] = React.useState('body');
    const [activities, setActivities] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
        //setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
        console.log('d')
    };



    const mark = [
        {
            id: 1,
            date: '06-03-2023',
            activities: [{
                title: "Bài kiểm tra 1",
                url: ''
            }]
        },
        {
            id: 2,
            date: '08-03-2023',
            activities: [{
                title: "Bài kiểm tra 2",
                url: ''
            },
            {
                title: "Bài kiểm tra 3",
                url: ''
            }]
        },
    ]

    const handleClickDay = (value) => {

        const content = mark.find(x => x.date === moment(value).format("DD-MM-YYYY"))
        if (content) {
            setActivities(content.activities)
            handleClickOpen('body')

        }
    }
    return (
        <Box>
            <Paper>
                <Calendar
                    style={{ height: 500 }}
                    //onChange={this.onChange}
                    //value={this.state.date}
                    tileClassName={({ date, view }) => {
                        if (mark.find(x => x.date === moment(date).format("DD-MM-YYYY"))) {
                            return 'highlight'
                        }
                    }}

                    onClickDay={handleClickDay}

                    tileDisabled={({ date }) => date.getDay() === 0}

                    /*maxDate={new Date(2020, 1, 0)}</div>*/
                    minDate={
                        new Date()
                    }
                >
                </Calendar>

            </Paper>
            <Dialog
                sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                maxWidth="xs"
                open={open}
                onClose={handleClose}
                scroll={scroll}
            >
                <DialogTitle align='center'>Các hoạt động</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <Stack>
                        {activities
                            .map(
                                (item) => <Typography key={item.title}>{item.title}</Typography>
                            )}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button> */}
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default CalendarSchedule