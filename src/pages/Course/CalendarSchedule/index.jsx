import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Stack, Typography } from '@mui/material'
import apiLessons from 'apis/apiLessons';
import moment from 'moment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import React, { useEffect,  useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarSchedule() {
    const [open, setOpen] = React.useState(false);
    //const [scroll, setScroll] = React.useState('body');
    const scroll = 'body'
    const [activities, setActivities] = useState([])
    const [mark, setMark] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
        //setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getMark = () => {
            apiLessons.getCalendar()
                .then(res => {
                    if (Array.isArray(res))
                        setMark(res)
                })
        }
        getMark()
    }, [])



    const handleClickDay = (value) => {

        const content = mark.find(x => x.date === moment(value).format("YYYY-MM-DD"))
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
                        if (mark.find(x => x.date === moment(date).format("YYYY-MM-DD"))) {
                            return 'highlight'
                        }
                    }}

                    onClickDay={handleClickDay}

                    tileDisabled={({ date }) => date.getDay() === 0}

                /*maxDate={new Date(2020, 1, 0)}</div>*/
                // minDate={
                //     new Date()ff
                // }
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
                                (item) =>
                                    <>
                                        <Box mb={1}>
                                            <Typography fontWeight={500}  key={item.name}>
                                                <AssignmentIcon color='primary'sx={{ marginRight:'8px',transform: 'translateY(6px)' }} />
                                                {item.nameCourse}: {item.name}
                                            </Typography>
                                            <Stack ml={4}>
                                                <Typography>Sự kiện: {item.type === 'exam' ? 'Bài kiểm tra' : 'Bài tập'}</Typography>

                                                <Typography>
                                                    Ngày bắt đầu:{moment(item.startTime).format('DD/MM/YYYY hh:mm')}
                                                </Typography>
                                                <Typography>
                                                    Ngày kết thúc:{moment(item.endTime).format('DD/MM/YYYY hh:mm')}
                                                </Typography>
                                            </Stack>

                                        </Box>
                                        <Divider />
                                    </>
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