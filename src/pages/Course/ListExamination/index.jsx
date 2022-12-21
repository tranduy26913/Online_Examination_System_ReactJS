import { useCallback, useLayoutEffect, useState } from 'react'
import {
    Box,
    Stack,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Paper,
    Chip,
    Button
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';
import { TableToolbar, TableHeadCustom } from 'components/TableCustom';
import { useContext } from 'react';
import CourseContext from '../LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import { Link } from 'react-router-dom';
import EmptyList from 'components/UI/EmptyList';
import Page from 'components/Page';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import TableMoreMenu from './TableMoreMenu';
import { applySortFilter, getComparator } from 'components/TableCustom/FunctionHelper';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên đề thi', align: 'left' },
    { id: 'count', label: 'Số lượt làm bài', align: 'center' },
    { id: 'numberofQuestions', label: 'Số lượng câu hỏi', align: 'center' },
    { id: 'maxTimes', label: 'Thời lượng', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'center' },
];

// ----------------------------------------------------------------------

const ListExaminationTeacher = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [exams, setExams] = useState([])
    const [loadingData, setLoadingData] = useState(true)
    const { courseId } = useContext(CourseContext)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => {
        setFilterName(event.target.value);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - exams.length) : 0;

    const filteredUsers = applySortFilter(exams, getComparator(order, orderBy), filterName, 'name');

    const isUserNotFound = filteredUsers.length === 0;

    //Effect
    useLayoutEffect(() => {
        loadListExam()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId])

    const loadListExam = useCallback(() => {//lấy danh sách bài kiểm tra
        const params = {
            courseId
        }
        setLoadingData(true)
        apiCourse.getListExamOfCourse(params)
            .then(res => {
                setExams(res?.reverse() || [])
            })
            .finally(()=>setLoadingData(false))
    },[courseId])

    const ButtonCreateExam = () => {
        return (
            <Link to={`/course/${courseId}/create-exam`}>
                <Button variant='outlined'>
                    Tạo đề thi
                </Button>
            </Link>
        )
    }
    return (
        <Page title="Danh sách bài kiểm tra">

            <Box >
                <Stack spacing={1}>
                    <Paper elevation={24}>
                        <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                            ButtonCustom={ButtonCreateExam} />

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800, padding: '0 12px' }}>
                                <Table>
                                    <TableHeadCustom
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={exams.length}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            const { id: idExam, slug: slugExam, name, count, status, numberofQuestions, maxTimes } = row;
                                            if(!idExam) return <></>
                                            return (
                                                <TableRow
                                                    hover
                                                    key={idExam}
                                                    tabIndex={-1}
                                                >

                                                    <TableCell align="left">{name}</TableCell>
                                                    <TableCell align="center">{count}</TableCell>
                                                    <TableCell align="center">{numberofQuestions}</TableCell>
                                                    <TableCell align="center">{maxTimes} phút</TableCell>
                                                    <TableCell align="center">
                                                        <Chip size="small"
                                                            color={status === 'public' ? 'primary' : 'warning'}
                                                            label={status === 'public' ? 'Đã xuất bản' :
                                                                status === 'private' ? 'Chưa xuất bản' : 'Đã đóng'}
                                                        />
                                                    </TableCell>

                                                    <TableCell align="right" sx={{width:'10%'}}>
                                                        <TableMoreMenu slug={slugExam} reloadList={loadListExam}/>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                        {emptyRows > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>

                                    {isUserNotFound && (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                    {loadingData?<LoadingRoller/>:<EmptyList />}                                                   
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            labelRowsPerPage='Số dòng mỗi trang'
                            count={exams.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Stack>
            </Box>
        </Page>
    )
}


export default ListExaminationTeacher