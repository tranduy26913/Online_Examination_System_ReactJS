import { Typography, Button, Stack, Card, CardMedia, Paper, IconButton, InputBase } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AssignmentIcon from '@mui/icons-material/Assignment'
import SendIcon from '@mui/icons-material/Send'
import ShareTray from 'components/ShareTray';
import apiCourse from 'apis/apiCourse';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import _debounce from 'lodash/debounce';
import EmptyList from 'components/UI/EmptyList';
import CourseItem from 'components/CourseItem';
import Page from 'components/Page';

function SearchCourse() {
    const [courses, setCourses] = useState([])
    const [value, setValue] = useState('');
    const refreshToken = useSelector(state => state.auth?.refreshToken)

    const debounceFn = useCallback(_debounce(handleDebounceFn, 500), []);

    function handleDebounceFn(inputValue) {
        apiCourse.getSearchCourse({ search: inputValue })
            .then((res) => {
                if (Array.isArray(res)) {
                    setCourses(res)
                }
            })
            .catch(err => {
                setCourses([])
            })
    }

    function handleChange(event) {
        setValue(event.target.value);
        debounceFn(event.target.value);
    };
    function handleClickSearch(event) {
        debounceFn(value);
    };
    const navigate = useNavigate()
    useEffect(() => {
        debounceFn(value)
    }, [])

    return (
        <Page title="Tìm kiếm khoá học">

            <Stack width='100%' mb={8} alignItems='center' spacing={2} minHeight='100vh' p={2}>

                <Stack width='50%'>
                    <Paper
                        component="div"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
                    >
                        <InputBase
                            type='text'
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tên khoá học"
                            value={value}
                            onChange={handleChange}
                        />
                        <IconButton onClick={handleClickSearch} type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>

                    </Paper>
                </Stack>
                <Paper sx={{ minHeight: 'calc(100vh - 160px)', width: '100%', padding: '24px', position: 'relative' }} elevation={6}>
                    <Grid container spacing={2}>
                        {
                            courses.length === 0 ?
                                <EmptyList />
                                :
                                courses.map((course, index) =>
                                    <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                        <CourseItem course={course} />
                                    </Grid>

                                )}
                    </Grid>


                </Paper>
            </Stack>
        </Page>
    );
}

export default SearchCourse