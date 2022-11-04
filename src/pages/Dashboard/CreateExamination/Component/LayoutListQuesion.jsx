import {
    Box,
    Paper,
    Tab,
    AppBar,
    Tabs,
    Typography,
} from '@mui/material'
import { useTheme } from '@mui/system';
import {
    TabPanel

} from './MUI'
import { useState } from 'react'
import { memo } from 'react';
import QuestionInQuestionBank from './QuestionInQuestionBank';
import ListQuestion from './ListQuestion';


function LayoutListQuestion(props) {
    const theme = useTheme()
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => setValue(newValue)



    return (
        <>
            <Paper sx={{ marginBottom: '12px' }}>
                <Typography align='center' fontSize='20px' fontWeight={600} sx={{ color: theme.palette.primary.main }}>Danh sách câu hỏi</Typography>
            </Paper>
            <Box>
                <AppBar position="static" sx={{ backgroundColor: theme.palette.background.paper }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Nhập thủ công" {...a11yProps(0)} />
                        <Tab label="Dùng ngân hàng câu hỏi" {...a11yProps(1)} />
                        <Tab label="Dùng file câu hỏi" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ListQuestion/>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <QuestionInQuestionBank/>
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                    Item Three
                </TabPanel>
            </Box>


        </>
    )
}

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

LayoutListQuestion.propTypes = {}

export default memo(LayoutListQuestion)
