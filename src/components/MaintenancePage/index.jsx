import React from 'react'
import {
    Box, Typography
} from '@mui/material'
import './MaintenancePage.scss'
function MaintenancePage() {
    return (
        <Box class="maintenance">
            <Box class="maintenance_contain">
                <img src="https://demo.wpbeaveraddons.com/wp-content/uploads/2018/02/main-vector.png" alt="maintenance" />
                <Typography fontSize='20px' fontWeight='600' align='center'>TẠM THỜI CHƯA CÓ SẴN</Typography>
                <Typography fontSize='42px' fontWeight='600' align='center'>Tính năng đang trong quá trình phát triển</Typography>
                <Box width='60%'>
                    <Typography fontSize='18px' align='center'>
                        Tính năng đang được đội ngũ phát triển tích cực thực hiện. Vui lòng truy cập lại sau. Xin cảm ơn !!!
                    </Typography>

                </Box>

            </Box>
        </Box>
    )
}

export default MaintenancePage