import {useState} from 'react'
import {
    Stack,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@mui/material'
function Payment() {
    const [type, setType] = useState('vnpay')
    const handleChangeType = (e) => {
        setType(e.target.value)
    }
    return (
        <>
            <Stack width='100%' minHeight='100vh' justifyContent='center'>

                <FormControl>
                    <FormLabel>Loại hình thanh toán</FormLabel>
                    <RadioGroup
                        name="payment"
                        value={type}
                        onChange={handleChangeType}
                        row
                    >
                        <FormControlLabel value="STUDENT" control={<Radio />} label="Học sinh" />
                        <FormControlLabel value="TEACHER" control={<Radio />} label="Giáo viên" />
                    </RadioGroup>
                </FormControl>
            </Stack>

        </>
    )
}

export default Payment