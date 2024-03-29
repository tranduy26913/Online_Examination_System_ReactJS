import { useState } from 'react'
import {
    Stack,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Chip,
    Box,
    Typography
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';
import { TableToolbar, TableHeadCustom } from 'components/TableCustom';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';
import ButtonExport from 'components/ButtonExport';
import { applySortFilter, getComparator } from 'components/TableCustom/FunctionHelper';
import TakeExamAction from '../TakeExamAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'score', label: 'Điểm', align: 'left' },
    { id: 'score10', label: 'Điểm (thang 10)', align: 'center' },
    { id: 'na', label: 'Thời gian thi', align: 'center' },
    { id: 'isVerified', label: 'Thời lượng', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'result', label: 'Kết quả', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'center' },
];

// ----------------------------------------------------------------------


const TableStudent = ({ exams, typeofPoint, viewPoint }) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - exams.length) : 0;

    const filteredUsers = applySortFilter(exams, getComparator(order, orderBy), filterName, 'points');

    const isUserNotFound = filteredUsers.length === 0;


    const handleData = () => {
        return filteredUsers.map(item => {
            let { points, maxPoints, startTime, submitTime, status } = item
            const duration = moment(submitTime).diff(startTime, 'minutes')
            return {
                ///'Họ và tên': name,
                'Thời gian thi': moment(startTime).format('DD-MM-YYYY HH:mm'),
                'Thời gian nộp': moment(submitTime).format('DD-MM-YYYY HH:mm'),
                'Thời lượng làm bài': `${duration} phút`,
                'Điểm': `${points}/${maxPoints}`,
                'Trạng thái': status === 'submitted' ? 'Đã nộp' : 'Chưa nộp'
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
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography></Typography>
            </Box>
            <Stack>
                <TableToolbar filterName={filterName} onFilterName={handleFilterByName}
                    ButtonCustom={ButtonExportFile} />

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
                                    const { _id: takeExamId, submitTime, startTime, points, points10, maxPoints,status } = row;
                                    let duration = moment(submitTime).diff(startTime, 'seconds')
                                    let textDuration = '0 giây'
                                    if (duration > 0) {
                                        let hours = moment.duration(duration, "seconds").hours()
                                        let minutes = moment.duration(duration, "seconds").minutes()
                                        let seconds = moment.duration(duration, "seconds").seconds()
                                        hours = hours ? `${hours} giờ ` : ''
                                        minutes = minutes ? `${minutes} phút ` : ''
                                        seconds = seconds ? `${seconds} giây` : ''
                                        textDuration = hours + minutes + seconds
                                    }
                                    return (
                                        <TableRow
                                            hover
                                            key={takeExamId}
                                            tabIndex={-1}
                                        >
                                            {viewPoint === 'no'?
                                            <TableCell align="left">Không được xem</TableCell>
                                            :<TableCell align="left">{Math.round(((points + Number.EPSILON) * 100)) / 100}/{maxPoints}</TableCell>
                                    }
                                            {viewPoint === 'no'?
                                            <TableCell align="center">Không được xem</TableCell>
                                            :<TableCell align="center">{Math.round(((points10 + Number.EPSILON) * 100)) / 100}/{10}</TableCell>
                                    }
                                            <TableCell align="center">{moment(startTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                                            <TableCell align="center">
                                                {textDuration}
                                            </TableCell>
                                            <TableCell align="center">
                                                {status === 'not submitted' ? 'Chưa nộp bài' : 'Đã nộp'}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Chip sx={{ width: '80px' }}
                                                    color={points / maxPoints < 0.5 ? 'error' : 'primary'}
                                                    label={points / maxPoints < 0.5 ? 'Chưa đạt' : 'Đạt'}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TakeExamAction takeExamId={takeExamId} />
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
                </Scrollbar>

                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={exams.length}
                    labelRowsPerPage='Số dòng mỗi trang'
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Stack>
        </>
    )
}


export default TableStudent