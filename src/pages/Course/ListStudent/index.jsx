import { useEffect, useState, useCallback } from 'react'
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
    Avatar,
    Typography,
    Chip
} from "@mui/material"
import TableMoreMenu from './component/TableMoreMenu'
import { TableToolbar, TableHeadCustom } from 'components/TableCustom'
import { useContext } from 'react';
import CourseContext from '../LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';
import { onValue, ref } from 'firebase/database';
import { database } from 'config/firebaseConfig';
import AddStudent from './component/AddStudent';
import Page from 'components/Page';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import { applySortFilter, getComparator } from 'components/TableCustom/FunctionHelper';
import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'fullname', label: 'Họ và tên', align: 'left' },
    { id: 'gender', label: 'Giới tính', align: 'center' },
    { id: 'birthday', label: 'Ngày sinh', align: 'center' },
    { id: 'numofexam', label: 'Số đề đã làm', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'right' },
];

// ----------------------------------------------------------------------


const ListStudent = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [students, setStudents] = useState([])
    const [status, setStatus] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const { courseId } = useContext(CourseContext)
    const role = useSelector(state => state.setting.role)

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

    const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName, 'fullname');

    const isUserNotFound = filteredUsers.length === 0;

    const loadListStudent = useCallback(() => {//lấy danh sách bài kiểm tra
        const params = {
            courseId
        }
        setLoadingData(true)
        apiCourse.getListStudentOfCourse(params)
            .then(res => {
                setStudents(res?.reverse() || [])
                setStatus(res.map(item => false))
            })
            .finally(() => setLoadingData(false))
    }, [courseId])

    useEffect(() => {
        try {
            students.forEach(item => {
                const { _id } = item
                if (_id) {
                    let userStatusDatabaseRef = ref(database, '/status/' + _id);//định nghĩa ref status của 1 user trên firebase
                    onValue(userStatusDatabaseRef, (snapshot) => {

                        let index = students.findIndex(item => item._id === _id)
                        
                        setStatus(preState => {
                            let newStatus = [...preState]
                            if (snapshot.val())
                                newStatus[index] = snapshot.val().state === 'online'
                            else
                                newStatus[index] = false
                                console.log(newStatus)
                            return newStatus
                        })
                    })
                }
            })
        }
        catch (err) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [students])
    //Effect
    useLayoutEffect(() => {

        if (!courseId) return
        loadListStudent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId])

    const ButtonCustom = () => {
        return (
            <AddStudent reloadList={loadListStudent} />
        )
    }
    return (
        <Page title='Danh sách học viên'>
            <Box width={'100%'}>
                <Paper elevation={24}>

                    <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                        ButtonCustom={role==='teacher'?ButtonCustom:null} />
                    <Box px={2}>

                        <TableContainer>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={students.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>

                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const { _id, fullname, birthday, gender, count, avatar } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"

                                            // selected={isItemSelected}
                                            >
                                                <TableCell sx={{ width: '25%' }} component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2} pl={1.5}>
                                                        <Avatar alt={fullname} src={avatar} />
                                                        <Typography >
                                                            {fullname}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ width: '15%' }} align="center">{gender === 'female' ? "Nữ" : "Nam"}</TableCell>
                                                <TableCell sx={{ width: '15%' }} align="center">{moment(birthday).format("DD/MM/YYYY")}</TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">{count}</TableCell>
                                                <TableCell sx={{ width: '15%' }} align="center">
                                                    <Chip size="small"
                                                        label={status[index] ? 'Đang hoạt động' : "Không hoạt động"}
                                                        color={status[index] ? 'primary' : 'error'}
                                                    />

                                                </TableCell>
                                                <TableCell sx={{ width: '10%' }} align="right">
                                                    <TableMoreMenu studentId={_id} reloadList={loadListStudent} />
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
                        count={students.length}
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


export default ListStudent