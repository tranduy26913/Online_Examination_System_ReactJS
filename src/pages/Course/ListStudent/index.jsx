import { useEffect, useState } from 'react'
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
import Label from 'components/Label';
import { useDispatch } from 'react-redux';
import TableMoreMenu from './component/TableMoreMenu'
import TableToolbar from './component/TableToolbar'
import { useContext } from 'react';
import CourseContext from '../LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import moment from 'moment';
import { useCallback } from 'react';
import TableHeadCustom from './component/TableHeadCustom';
import EmptyList from 'components/UI/EmptyList';
import { onValue, ref } from 'firebase/database';
import { database } from 'config/firebaseConfig';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'fullname', label: 'Họ và tên', alignRight: 'left' },
    { id: 'gender', label: 'Giới tính', alignRight: 'center' },
    { id: 'birthday', label: 'Ngày sinh', alignRight: 'center' },
    { id: 'numofexam', label: 'Số đề đã làm', alignRight: 'center' },
    { id: 'status', label: 'Trạng thái', alignRight: 'center' },
    { id: 'action', label: 'Thao tác', alignRight: 'right' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_user) => _user.fullname.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const ListStudent = () => {
    document.title = "Danh sách học sinh"
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [students, setStudents] = useState([])
    const [status, setStatus] = useState([])
    const dispatch = useDispatch()

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

    const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const loadListStudent = useCallback(() => {//lấy danh sách bài kiểm tra
        const params = {
            courseId
        }
        apiCourse.getListStudentOfCourse(params)
            .then(res => {
                setStudents(res)
                setStatus(res.map(item=>false))
            })
    }, [courseId])

    useEffect(() => {
        try {
            students.forEach(item => {
                const { _id, ...data } = item
                if (_id) {
                    let userStatusDatabaseRef = ref(database, '/status/' + _id);//định nghĩa ref status của 1 user trên firebase
                    onValue(userStatusDatabaseRef, (snapshot) => {
                        let newStatus =[...status]
                        let index = students.findIndex(item=>item._id === _id)
                        if(snapshot.val())
                            newStatus[index] = snapshot.val().state === 'online'
                        else   
                         newStatus[index] = false
                        setStatus(newStatus)
                    })
                }
            })
        }
        catch (err) {

        }
    }, [students])
    //Effect
    useEffect(() => {

        if (!courseId) return
        loadListStudent()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId])
    return (
        <Box width={'100%'}>
            <Paper elevation={24}>

                <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                    reloadList={loadListStudent} />
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

                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                    const { _id, fullname, birthday,gender, count, avatar, isVerified } = row;

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
                                            <Chip  size="small" 
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
                                            <EmptyList />
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
    )
}


export default ListStudent