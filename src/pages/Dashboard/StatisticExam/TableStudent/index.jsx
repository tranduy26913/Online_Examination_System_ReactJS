import { useEffect, useState } from 'react'
import {
    Stack,
    Chip,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    IconButton,
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Label from 'components/Label';
import SearchNotFound from 'components/SearchNotFound';
import { TableToolbar, TableMoreMenu } from 'components/TableCustom';
import TableHeadCustom from './TableHeadCustom';
import { useParams } from 'react-router-dom';
import apiStatistic from 'apis/apiStatistic';
import { useSelector } from 'react-redux';
import TakeExamAction from '../TakeExamAction';
import moment from 'moment';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên đề thi', alignRight: false },
    { id: 'na', label: 'Điểm', alignRight: false },
    { id: 'role', label: 'Lần thi', alignRight: false },
    { id: 'isVerified', label: 'Thời lượng', alignRight: false },
    { id: 'status', label: 'Thời gian nộp', alignRight: false },
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

const TableStudent = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [exams, setExams] = useState(tests)
    const { slug } = useParams()//lấy slug exam
    const role = useSelector(state => state.setting.role)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (event) => setFilterName(event.target.value);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tests.length) : 0;

    const filteredUsers = applySortFilter(exams, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    useEffect(() => {
        const getStatistic = () => {
            const params = { examSlug:slug }
            let response = null
            if (role === 'student') {
                response = apiStatistic.getStatisticExamByStudent(params)
            }
            else {
                response = apiStatistic.getStatisticExamByTeacher(params)
            }
            response.then(res => {
                setExams(res)
            })
        }
        getStatistic()
    }, [role, slug])


    return (

        <Stack>
            <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                button={{ display: "Xuất File Excel", path: '/teacher/create-exam' }} />

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
                                const { id: takeExamId, slug: slugExam, name, submitTime, startTime,points,maxPoints } = row;
                                const duration = moment(submitTime).diff(startTime,'minutes')
                                return (
                                    <TableRow
                                        hover
                                        key={takeExamId}
                                        tabIndex={-1}
                                    >

                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="center">{points}/{maxPoints}</TableCell>
                                        <TableCell align="center">{moment(startTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                                        <TableCell align="center">{duration} phút</TableCell>
                                        <TableCell align="center">
                                            {submitTime}
                                        </TableCell>

                                        <TableCell align="right">
                                            <TakeExamAction takeExamId={takeExamId}/>
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
                count={tests.length}
                labelRowsPerPage='Số dòng mỗi trang'
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    )
}

const tests = [
    {
        id: '1',
        name: "Bài kiểm tra số 1",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    },
    {
        id: '2',
        name: "Bài kiểm tra số 2",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    },
    {
        id: '3',
        name: "Bài kiểm tra số 3",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    },
    {
        id: '4',
        name: "Bài kiểm tra số 3",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    },
    {
        id: '5',
        name: "Bài kiểm tra số 3",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        submitTime: new Date().toLocaleString(),
        duration: 30,
        points: 10,
        turns: 10
    }
]

export default TableStudent