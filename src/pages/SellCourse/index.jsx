import { Stack, Paper, IconButton, InputBase } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiCourse from 'apis/apiCourse';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import _debounce from 'lodash/debounce';
import EmptyList from 'components/UI/EmptyList';
import CourseItem from 'components/CourseItem';
import { useQuery } from 'react-query';
function SellCourse() {
    const refreshToken = useSelector(state => state.auth?.refreshToken)

    const { data: courses } = useQuery([], apiCourse.getCourseSell)

    const navigate = useNavigate()
    
    return (
        <Stack width='100%' mb={8} alignItems='center' spacing={2} minHeight='100vh' p={2}>


            <Paper sx={{ minHeight: 'calc(100vh - 160px)', width: '100%', padding: '24px', position: 'relative' }} elevation={6}>
                <Grid container spacing={2}>
                    {
                        courses ?
                            courses.map((course, index) =>
                                <Grid xs={12} sm={6} md={4} lg={3} key={index}>
                                    <CourseItem course={course} />
                                </Grid>
                            ) :
                            <EmptyList />

                    }
                </Grid>
            </Paper>
        </Stack>
    );
}

export default SellCourse