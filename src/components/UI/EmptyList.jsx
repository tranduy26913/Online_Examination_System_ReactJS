import React from 'react'
import { Avatar, Stack, Typography }
    from '@mui/material'
import emptyList from 'assets/img/empty-list.png'
import { Player } from '@lottiefiles/react-lottie-player'
function EmptyList(props) {
    return (
        <Stack width='100%' height='100%' p={1}
        justifyContent='center'
        alignItems={'center'}
        >
            {/* <Avatar
                sx={{ width: 140, height: 140 }}
                alt='empty-list'
                src={emptyList} /> */}
                 <Player
        autoplay
        loop
        src="https://assets1.lottiefiles.com/packages/lf20_yvs7iBiWGz.json"
        style={{ height: '146px', width: '146px' }}
      />
            <Typography>{props.text || 'Danh sách trống' }</Typography>
        </Stack>
    )
}

export default EmptyList