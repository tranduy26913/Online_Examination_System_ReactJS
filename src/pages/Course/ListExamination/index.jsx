import { useEffect, useState } from 'react'
import {
    Box,
    Stack,
    Checkbox,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Paper
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';
import Label from 'components/Label';
import SearchNotFound from 'components/SearchNotFound';
import { TableToolbar, TableMoreMenu } from 'components/TableCustom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useContext } from 'react';
import CourseContext from '../LayoutCourse/CourseContext';
import apiCourse from 'apis/apiCourse';
import TableHeadCustom from './component/TableHeadCustom';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên đề thi', alignRight: false },
    { id: 'count', label: 'Số lượt làm bài', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'isVerified', label: 'Verified', alignRight: false },
    { id: 'status', label: 'Trạng thái', alignRight: false },
    { id: '' },
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
        return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const ListExaminationTeacher = () => {
    document.title = "Danh sách bài kiểm tra"
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exams, setExams] = useState([])
    const {id} = useContext(CourseContext)

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

    const filteredUsers = applySortFilter(exams, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    //Effect
    useEffect(() => {
        const loadListExam = () => {//lấy danh sách bài kiểm tra
            const params = {
                courseId:id
            }
            apiCourse.getListExamOfCourse(params)
                .then(res=>{
                    setExams(res)
                })
        }
        loadListExam()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    return (
        <Box >
            <Stack spacing={1}>
                <Paper elevation={24}>
                    <TableToolbar  filterName={filterName} onFilterName={handleFilterByName}
                        button={{ display: "Tạo đề kiểm tra", path: 'create-exam' }} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
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
                                        const { id, name, count, status, company, avatarUrl, isVerified } = row;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                            >
                                                
                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{count}</TableCell>
                                                <TableCell align="left">{}</TableCell>
                                                <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                                <TableCell align="left">
                                                    <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                                        status
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <TableMoreMenu id={id}
                                                        menu={[
                                                            {
                                                                isLink: true,
                                                                link: '/teacher/statistic-exam',
                                                                icon: BarChartIcon,
                                                                func: null,
                                                                display: 'Thống kê'
                                                            },
                                                            {
                                                                isLink: true,
                                                                link: `/teacher/detail-exam?examId=${id}`,
                                                                icon: EditIcon,
                                                                func: null,
                                                                display: 'Sửa'
                                                            },
                                                            {
                                                                isLink: false,
                                                                link: '/',
                                                                icon: DeleteForeverIcon,
                                                                func: null,
                                                                display: 'Xoá'
                                                            },
                                                        ]} />
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
                                                <SearchNotFound searchQuery={filterName} />
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
                        count={exams.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Stack>
        </Box>
    )
}


export default ListExaminationTeacher