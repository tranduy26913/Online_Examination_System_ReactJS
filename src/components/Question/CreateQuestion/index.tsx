import {
  Stack,
  Button,
  TextField,
  Paper,
  Box,
  styled,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CheckIcon from '@mui/icons-material/Check';
import { useTheme } from '@mui/system';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
type Props = {
  id: string;
  edit: boolean;
  question?: string;
  answers?: {
    id: string;
    content: string;
  }[];
}


type PropsCheck = {
  isCheck: boolean;
}

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

const BoxCheck: React.FC<PropsCheck> = ({ isCheck }) => {
  const theme = useTheme()
  return (
    <Stack
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
        backgroundColor: isCheck ? theme.palette.primary.main : '#fff'
      }}>
      <CheckIcon
        sx={{
          color: isCheck ? '#fff' : theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}
const BoxDelete: React.FC = () => {
  const theme = useTheme()
  return (
    <Stack
      justifyContent={'center'} alignItems='center'
      sx={{
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '4px',
      }}>
      <DeleteOutlineIcon
        sx={{
          color: theme.palette.primary.main,
          fontSize: '18px'
        }} />
    </Stack>
  )
}
const CreateQuestion: React.FC<Props> = (props) => {
  const isEdit = props.edit
  const [question, setQuestion] = useState<string>(props.question ? props.question : '')
  const [answers, setAnswers] = useState<{ id: string; content: string }[]>(props.answers ? props.answers : [])
  return (
    <Paper elevation={12}>

      <Stack spacing={1.5} mb={2} p={2}>
        <Typography fontWeight={600} mb={1}>Nhập nội dung câu hỏi</Typography>
        <CKEditor
          editor={ClassicEditor}
          data=""
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        {
          isEdit ?
            answers.map((item, index) =>
              <Stack direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

                <TextField variant='standard' size='small' fullWidth label={`Đáp án ${alphabet[index]}`} value={item.content} />
                <BoxCheck isCheck={false} />
                <BoxDelete />
              </Stack>) :
            <Stack direction={'row'} width={'100%'} alignItems='flex-end' spacing={2}>

              <TextField variant='standard' size='small' fullWidth label='Đáp án A' />
              <BoxCheck isCheck={false} />
              <BoxDelete />
            </Stack>
        }

        <Stack direction='row' justifyContent='center' >
          <Button variant='outlined'>Thêm đáp án</Button></Stack>
        <Stack direction={'row'} spacing={1.5} justifyContent='flex-end'>
          <Button variant='contained' color='error'>Huỷ</Button>
          <Button variant='contained' color='warning'>Làm mới</Button>
          <Button variant='contained'>Tạo câu hỏi</Button>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default CreateQuestion