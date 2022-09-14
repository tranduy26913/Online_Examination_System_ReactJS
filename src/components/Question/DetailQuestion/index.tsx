import {
  Stack,
  Button,
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary, AccordionDetails, styled
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React from 'react'

const PaperQuestion = styled(Paper)(({ theme }) => ({
  borderTop: `6px solid ${theme.palette.primary.light}`
}))
const BoxAnswer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  gap: '10px'
}))

const AccordionSummaryStyle = {
  '&.Mui-expanded': {
    borderBottom: '1px dotted #bfbfbf'
  }
}

type Props = {
  handleEdit:(value:string)=>void;
  id:string;
}
const DetailQuestion: React.FC<Props> = (props) => {

  const onClickEdit = ()=>{
    props.handleEdit(props.id)
  }
  return (
    <PaperQuestion elevation={12} >
      <Accordion>
        <AccordionSummary sx={AccordionSummaryStyle}
          expandIcon={<ExpandMoreIcon />}
        ><Typography>Câu hỏi 1</Typography>

        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={0.5}>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </Typography>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='success' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <BoxAnswer><CheckCircleOutlineIcon sx={{ fontSize: '22px' }} color='error' />Đáp án 1</BoxAnswer>
            <Stack direction='row' justifyContent={'flex-end'}>
              <Button onClick={onClickEdit} startIcon={<BorderColorIcon/>}>Sửa</Button>
              <Button startIcon={<DeleteForeverIcon/>}>Xoá</Button>
            </Stack>
          </Stack>

        </AccordionDetails>
      </Accordion>
    </PaperQuestion>
  )
}

export default DetailQuestion