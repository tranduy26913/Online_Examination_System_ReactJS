import React from 'react'
import {
    Box,
    Card,
    Button,
    CardMedia,
    Stack,
    Typography
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SendIcon from '@mui/icons-material/Send';
const ListCourse: React.FC = () => {
    document.title = "Danh sách khoá học"
    return (
        <Box>
            <Grid container spacing={1}>
                {
                    [1, 2, 3].map(item =>
                        <Grid key={item} lg={3} md={3} xs={6}>
                            <Card sx={{ maxWidth: 345 ,border:"1px solid #00e67660"}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg"
                                    alt="green iguana"
                                />
                                    <Typography color="primary" variant="h5" component="div" 
                                    sx={{
                                        textAlign:"center"
                                    }}>
                                        Học Máy
                                    </Typography>
                                <Stack
                                p='0.5rem 1rem'
                                 direction='row'
                                  justifyContent="center"
                                  spacing={2}>
                                    <Button 
                                    variant="outlined"
                                      size="small"
                                      endIcon={<AssignmentIcon/>}
                                      >Chi tiết</Button>
                                    <Button variant="outlined" size="small"
                                     endIcon={<SendIcon/>}>Chia sẽ</Button>
                                </Stack>
                            </Card>
                        </Grid>)
                }
            </Grid>
        </Box>
    )
}

export default ListCourse