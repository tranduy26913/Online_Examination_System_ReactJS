import { Box, Button, FormControl, FormControlLabel, FormGroup, FormHelperText, Paper, Stack, Switch, Typography } from '@mui/material'
import { useTheme } from '@mui/system';
import moment from 'moment'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import apiAssignment from 'apis/apiAssignment';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import { useForm, Controller } from 'react-hook-form'
import LoadingButton from 'components/LoadingButton';
import { getMessageError } from 'utils';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { MyUploadAdapter } from 'config/MyCustomUploadAdapterPlugin';
import { Stack2Column, StackLabel } from 'pages/Dashboard/CreateExamination/Component/MUI';
import apiLessons from 'apis/apiLessons';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';
function CreateLesson({getData}) {
    const [content, setContent] = useState('')
    const [isAdd, setIsAdd] = useState(false)
    
    const [isPublic, setIsPublic] = useState(true)
    const accessToken = useSelector(state => state.auth.accessToken)
    const [loading, setLoading] = useState(false)

    const { courseId, id: courseObjId } = useContext(CourseContext)

    const { handleSubmit, setValue, control } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
        reValidateMode: "onChange",
        defaultValues: {
            name: "",
            startTime: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
            endTime: moment(new Date()).add(10, 'minutes').format("YYYY-MM-DDTHH:mm")
        }
    });

    const onClickAdd = () => {
        setIsAdd(true)
    }

    const hideEditor = () => setIsAdd(false)

    
    const createLesson = (data) => {
        const {name, startTime, endTime }= data
        const params = {
            courseId:courseObjId,
            name,
            content,
            startTime,
            endTime,
            status: isPublic ? 'public' : 'private'
        }
        setLoading(true)
        apiLessons.createLesson(params)
        .then(res=>{
            toast.success("Thêm thành công")
            setIsAdd(false)
            getData()
        })
        .catch(err=>{
            toast.warning("Thêm không thành công")
        })
        .finally(()=>setLoading(false))
    }
    return (
        <Box spacing={2}>
            {isAdd ?
                <Stack spacing={2}>
                    <Stack2Column>

                        <StackLabel>
                            <Box>Tiêu đề nội dung</Box>
                            <FormControl>
                                <Controller
                                    name={"name"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input
                                                {...field}
                                            />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </StackLabel>
                        <StackLabel>
                            <Box>Hiện nội dung</Box>
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Switch checked={isPublic}
                                        onChange={() => setIsPublic(!isPublic)} />} />
                            </FormGroup>
                        </StackLabel>
                    </Stack2Column>

                    <Stack2Column>
                        <StackLabel>
                            <Box>Thời gian bắt đầu</Box>
                            <FormControl>
                                <Controller
                                    name={"startTime"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input type='datetime-local'
                                                {...field}

                                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>


                        </StackLabel>
                        <StackLabel>
                            <Box>Thời gian kết thúc</Box>
                            <FormControl>
                                <Controller
                                    name={"endTime"}
                                    control={control}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <input type='datetime-local'
                                                {...field}
                                                min="1997-01-01T00:00" max="2030-12-31T00:00"
                                                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}" />
                                            {error && <FormHelperText>{error.message}</FormHelperText>}
                                        </>
                                    )}
                                />
                            </FormControl>
                        </StackLabel>
                    </Stack2Column>
                    <Box>
                        <CKEditor
                            editor={DecoupledEditor}
                            data={content}
                            config={{
                                mediaEmbed: {
                                    previewsInData: true,
                                }
                            }}
                            onReady={editor => {

                                editor.ui
                                    .getEditableElement()
                                    .parentElement.insertBefore(
                                        editor.ui.view.toolbar.element,
                                        editor.ui.getEditableElement()
                                    );
                                editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                                    return new MyUploadAdapter(loader, accessToken);
                                };
                            }}
                            onChange={(event, editor) => {
                                setContent(editor.getData());
                            }}
                        />
                    </Box>

                    <Stack direction='row' justifyContent='flex-end'>
                        <LoadingButton variant='contained'
                         loading={loading} 
                         onClick={handleSubmit(createLesson)}>Thêm</LoadingButton>
                        <Button variant='contained'
                        onClick={hideEditor}>Huỷ</Button>
                    </Stack>
                </Stack>
                :
                <Stack direction={'row'} justifyContent={'center'}>
                    <Button variant='contained' onClick={onClickAdd}>Thêm nội dung</Button>
                </Stack>
            }

        </Box>
    )
}

export default CreateLesson