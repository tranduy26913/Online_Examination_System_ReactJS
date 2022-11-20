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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'fullname', label: 'Họ và tên', align: 'left' },
    { id: 'submitTime', label: 'Thời gian nộp', align: 'center' },
    { id: 'point', label: 'Điểm', align: 'center' },
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
    const [submissions, setSubmissions] = useState(Samples)
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
        apiSubmission.getListSubmissionByAssignment(params)
            .then(res => {
                setSubmissions(res?.reverse() || [])
            })
            .finally(() => setLoadingData(false))
    }, [slug])

    
    //Effect
    useEffect(() => {

        if (!slug) return
        //loadListSubmission()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug])

    const ButtonCustom = () => {
        return (
            <Button variant='outlined'>Tải về</Button>
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
                                    rowCount={submissions.length}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>

                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                        const { _id, fullname, point, maxPoints, submitTime,endTime } = row;
                                        let diffTime = 0
                                        let duration = 'Nộp sớm 0 giây'
                                        let status = 'Chưa nộp'
                                        if(submitTime){
                                            diffTime = moment(submitTime).diff(endTime,'seconds')
                                            duration = diffTime>=0 ? 'Nộp sớm ':'Nộp trễ ' + calcDurationTime(Math.abs(diffTime))
                                            status = 'Đã nộp'
                                        }
                                        return (
                                            <TableRow
                                                hover
                                                key={_id}
                                                tabIndex={-1}
                                                role="checkbox"
                                            >
                                                <TableCell sx={{ width: '15%',paddingLeft:2 }} component="th" scope="row" padding="none">
                                                  
                                                            {fullname}
                                                </TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">{moment(submitTime).format("DD/MM/YYYY HH:mm:ss A")}</TableCell>
                                                <TableCell sx={{ width: '20%' }} align="center">
                                                    {point === null ? 'Chưa chấm điểm':
                                                    `${point}/${maxPoints}`
                                                    }
                                                    
                                                </TableCell>
                                                <TableCell sx={{ width: '25%' }} align="center">
                                                    {duration}
                                                </TableCell>
                                                
                                                <TableCell sx={{ width: '20%' }} align="right">
                                                    {status === 'Đã nộp' && 
                                                    <ChangePoint id={_id} reloadList={loadListSubmission}/>}
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
                                                {loadingData ? <LoadingRoller/>:<EmptyList />}
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

const Samples =[
    {
        _id:'dđ',
        fullname:'Trần Duy',
        submitTime:moment().add(1,'days').toDate().toISOString(),
        endTime:moment().toDate().toISOString(),
        maxPoints:10,
        point:0
    },
    {
        _id:'dđc',
        fullname:'Trần Duy 2',
        submitTime:moment().subtract(1,'days').subtract(7500,'seconds').toDate().toISOString(),
        endTime:moment().toDate().toISOString(),
        maxPoints:10,
        point:null
    }
]


export default ListSubmission