import {
    Paper,
    Card,
    CardContent,
    Button,
    Typography,
    Stack,
    Divider
} from '@mui/material'
import AssignmentIcon from '@mui/icons-material/Assignment'
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useCallback, useState } from 'react'
import { useEffect } from 'react';
import apiQuestionBank from 'apis/apiQuestionBank';
import Grid from '@mui/material/Unstable_Grid2';
import CreateQuestionBank from './CreateQuestionBank';
import { Link } from 'react-router-dom';
import EmptyList from 'components/UI/EmptyList';
import Page from 'components/Page';


const QuestionBank = () => {
    const [questionBanks, setQuestionBanks] = useState([])

    useEffect(() => {
        const loadList = () => {
            reloadList()
        }
        loadList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const reloadList = useCallback(() => {
        apiQuestionBank.getQuestionBanks()
            .then(res => {
                setQuestionBanks(res)
            })
    }, [])

    // const handleDeleteQB = (slug) => {
    //     apiQuestionBank.deleteQuestionBank({ slug })
    //         .then(res => {
    //             toast.success("Xoá thành công")
    //             reloadList()
    //         })
    // }
    return (
        <Page title='Ngân hàng câu hỏi'>

        <Paper>
            <Stack spacing={1} p={2}>
                <Stack direction='row' justifyContent='flex-end' mb={1}>
                    <CreateQuestionBank variant='outlined' reloadList={reloadList} />
                </Stack>
                <Divider />
                <Grid container spacing={2}>
                    {questionBanks.length === 0 && <EmptyList />}
                    {questionBanks.map(item =>
                        <Grid key={item.id}xs={12} sm={6} md={4} lg={3} sx={{display:'flex'}}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" minHeight={48} className='text-overflow-2-lines '>
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <Divider />
                                <Stack 
                                direction='row' flexWrap='wrap'
                                justifyContent='space-evenly' gap={0.5} py={0.75}>
                                    <Link to={`/my/question-bank/${item.slug}`}>
                                        <Button variant='outlined' sx={{ width: '100px' }} size="small"
                                        endIcon={<AssignmentIcon/>}>Chi tiết</Button>
                                    </Link>
                                    <CreateQuestionBank slug={item.slug} edit={true} reloadList={reloadList} 
                                     variant='outlined' sx={{ width: '100px' }} size="small"
                                     endIcon={<EditIcon/>}>
                                        Sửa
                                        </CreateQuestionBank>
                                    <Button variant='outlined' sx={{ width: '100px' }} size="small"
                                    endIcon={<DeleteForeverIcon/>}>Xoá</Button>
                                </Stack>
                            </Card>
                        </Grid>
                    )
                    }
                </Grid>
            </Stack>
        </Paper>
        </Page>

    )
}


export default QuestionBank
