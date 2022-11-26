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
    Button,
} from "@mui/material"
import { TableToolbar, TableHeadCustom } from 'components/TableCustom'
import { useContext } from 'react';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';
import Page from 'components/Page';
import LoadingRoller from 'components/LoadingPage/LoadingRoller';
import { useParams } from 'react-router-dom';
import apiSubmission from 'apis/apiSubmission';
import ChangePoint from './component/ChangePoint';
import { calcDurationTime } from 'utils/formatTime';
import CourseContext from 'pages/Course/LayoutCourse/CourseContext';
import apiSubmitAssignment from 'apis/apiSubmitassignment';
import ButtonExport from 'components/ButtonExport';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'fullname', label: 'Họ và tên', align: 'left' },
    { id: 'submitTime', label: 'Thời gian nộp', align: 'center' },
    { id: 'points', label: 'Điểm', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'right' },
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

const ListSubmission = () => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [submissions, setSubmissions] = useState([])
    const [loadingData, setLoadingData] = useState(false)
    const { courseId } = useContext(CourseContext)
    const { slug } = useParams()

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - submissions.length) : 0;

    const filteredUsers = applySortFilter(submissions, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;

    const loadListSubmission = useCallback(() => {//lấy danh sách bài nộp
        const params = {
            slug
        }
        setLoadingData(true)
        apiSubmitAssignment.getSubmitAssignmentBySlug(params)
            .then(res => {

                setSubmissions(res?.reverse() || [])
            })
            .finally(() => setLoadingData(false))
    }, [slug])


    //Effect
    useEffect(() => {

        if (!slug) return
        loadListSubmission()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])

    const handleData = () => {
        return filteredUsers.map(item => {
            let { fullname, points, maxPoints, submitTime, endTime } = item
            let diffTime = 0
            let duration = ''
            let status = 'Chưa nộp'
            if (submitTime) {
                diffTime = moment(endTime).diff(submitTime, 'seconds')
                duration = (diffTime >= 0 ? 'Nộp sớm ' : 'Nộp trễ ') + calcDurationTime(Math.abs(diffTime))
                status = 'Đã nộp'
            }
            return {
                'Họ và tên': fullname,
                'Thời gian nộp': status === 'Đã nộp' && moment(submitTime).format("LLLL"),
                'Điểm': (points===null || points === undefined)?'Chưa chấm điểm':`${points}/${maxPoints}`,
                'Trạng thái': status === 'Đã nộp' ? duration : 'Chưa nộp'
            }
        })
    }

    const ButtonExportFile = () => {
        return (
            <ButtonExport variant='outlined' dataExport={handleData()}>
            </ButtonExport>
        )
    }
    return (
        <Page title='Danh sách học viên'>
            <Box width={'100%'}>
                <Paper elevation={24}>

                    <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                        ButtonCustom={ButtonExportFile} />
                    <Box px={2}>

                        <TableContainer>
                            <Table sx={{ minWidth: 800 }}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={submissions.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>

                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const { id, fullname, avatar, points, maxPoints, submitTime, endTime } = row;
                                        let diffTime = 0
                                        let duration = ''
                                        let status = 'Chưa nộp'
                                        if (submitTime) {
                                            diffTime = moment(endTime).diff(submitTime, 'seconds')
                                            duration =(diffTime >= 0 ? 'Nộp sớm ' : 'Nộp trễ ') + calcDurationTime(Math.abs(diffTime))
                                            status = 'Đã nộp'
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell sx={{ width: '25%', paddingLeft: 2 }} component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2} pl={1.5}>
                                                        <Avatar alt={fullname} src={avatar} />
                                                        <Typography >
                                                            {fullname}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">{status === 'Đã nộp' && moment(submitTime).format("LLLL")}</TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">
                                                    {(points === null || points === undefined) ? 'Chưa chấm điểm' :
                                                        `${points}/${maxPoints}`
                                                    }

                                                </TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">
                                                    {status === 'Đã nộp' ? duration : 'Chưa nộp'}
                                                </TableCell>

                                                <TableCell sx={{ width: '15%' }} align="right">
                                                    {status === 'Đã nộp' &&
                                                        <ChangePoint maxPoints={maxPoints} submitAssignmentId={id} reloadList={loadListSubmission} />}
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
                        count={submissions.length}
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

export default ListSubmission