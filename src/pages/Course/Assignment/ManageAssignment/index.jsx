import { useEffect, useState, useCallback } from 'react'
import {
    Box,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Paper,
    Button,
    Chip
} from "@mui/material"
import TableMoreMenu from './component/TableMoreMenu'
import { TableToolbar, TableHeadCustom } from 'components/TableCustom'
import { useContext } from 'react';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';
import Page from 'components/Page';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import apiAssignment from 'apis/apiAssignment';
import { Link } from 'react-router-dom';
import { applySortFilter, getComparator } from 'components/TableCustom/FunctionHelper';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên bài tập', align: 'left' },
    //{ id: 'numberofSubmission', label: 'Ngày sinh', align: 'center' },
    { id: 'startTime', label: 'Thời gian bắt đầu', align: 'center' },
    { id: 'endTime', label: 'Thời gian kết thúc', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'center' },
];

// ----------------------------------------------------------------------

const ManageAssignment = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('updatedAt');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [assignments, setAssignments] = useState([])
    const [loadingData, setLoadingData] = useState(false)
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assignments.length) : 0;

    const filteredUsers = applySortFilter(assignments, getComparator(order, orderBy), filterName,'name');

    const isUserNotFound = filteredUsers.length === 0;

    const loadListAssignment = useCallback(() => {//lấy danh sách bài kiểm tra
        const params = {
            courseId
        }
        setLoadingData(true)
        apiAssignment.getAssignmentsByCourseOfTeacher(params)
            .then(res => {
                setAssignments(res?.reverse() || [])
            })
            .finally(() => setLoadingData(false))
    }, [courseId])


    //Effect
    useEffect(() => {
        if (!courseId) return
        loadListAssignment()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId])

    const ButtonCustom = () => {
        return (
            <Link to={`/course/${courseId}/create-assignment`}>
                <Button variant='outlined'>Tạo bài tập</Button>
            </Link>
        )
    }
    return (
        <Page title='Danh sách học viên'>
            <Box width={'100%'}>
                <Paper elevation={24}>

                    <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                        ButtonCustom={ButtonCustom} />
                    <Box px={2}>

                        <TableContainer>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={assignments.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>

                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const { id, slug, name, startTime, endTime, status } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell sx={{ width: '20%', paddingLeft: 2 }} component="th" scope="row" padding="none">
                                                    {name}
                                                </TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">{moment(startTime).format("DD/MM/YYYY HH:mm A")}</TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">{moment(endTime).format("DD/MM/YYYY HH:mm A")}</TableCell>

                                                <TableCell sx={{ width: '20%' }} align="center">
                                                    <Chip size="small"
                                                        label={status === 'private' ? 'Chưa xuất bản' : status === 'public' ? "Đang mở" : "Đã đóng"}
                                                        color={status === 'private' ? 'warning' : status === 'public' ? "primary" : "grey"}
                                                    />

                                                </TableCell>
                                                <TableCell sx={{ width: '10%' }} align="right">
                                                    <TableMoreMenu id={id} assignmentSlug={slug} reloadList={loadListAssignment} />
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
                                                {loadingData ? <LoadingRoller /> : <EmptyList />}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={assignments.length}
                        labelRowsPerPage='Số dòng trên trang'
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </Page>
    )
}

export default ManageAssignment