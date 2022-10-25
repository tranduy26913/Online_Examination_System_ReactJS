import React from 'react'
import { Avatar, Stack, Typography }
    from '@mui/material'
import emptyList from 'assets/img/empty-list.png'
function EmptyList() {
    return (
        <Stack width='100%' height='100%' p={1}
        justifyContent='center'
        alignItems={'center'}
        >
            <Avatar
                sx={{ width: 140, height: 140 }}
                alt='empty-list'
                src={emptyList} />
            <Typography>Danh sách trống</Typography>
        </Stack>
    )
}

export default EmptyList