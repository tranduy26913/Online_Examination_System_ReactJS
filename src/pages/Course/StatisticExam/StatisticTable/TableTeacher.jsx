import {  useState } from 'react'
import {
    Stack,
    Button,
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    Chip
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { TableToolbar, TableHeadCustom } from 'components/TableCustom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TakeExamAction from '../TakeExamAction';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên người thi', align: 'left' },
    { id: 'point', label: 'Điểm', align: 'center' },
    { id: 'startTime', label: 'Thời gian thi', align: 'center' },
    { id: 'duration', label: 'Thời lượng', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'result', label: 'Kết quả', align: 'center' },
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
        return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

const TableTeacher = ({ exams }) => {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(10);

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

    const filteredUsers = applySortFilter(exams, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;



    const exportToCSV = () => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const fileName = 'Dữ liệu bài thi'
        let data = filteredUsers.map(item => {
            let { name, points, maxPoints, startTime, submitTime, status } = item
            const duration = moment(submitTime).diff(startTime, 'minutes')
            return {
                'Họ và tên': name,
                'Thời gian thi': moment(startTime).format('DD-MM-YYYY HH:mm'),
                'Thời gian nộp': moment(submitTime).format('DD-MM-YYYY HH:mm'),
                'Thời lượng làm bài': `${duration} phút`,
                'Điểm': `${points}/${maxPoints}`,
                'Trạng thái': status === 'submitted' ? 'Đã nộp' : 'Chưa nộp'
            }
        })
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    const ButtonExportFile = () => {
        return (
            <Button variant='outlined' onClick={exportToCSV}>
                Xuất File Excel
            </Button>
        )
    }
    return (

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
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const { _id: takeExamId, name, submitTime, startTime, points, maxPoints, status } = row;
                                const duration = moment(submitTime).diff(startTime, 'minutes')
                                
                                return (
                                    <TableRow
                                        hover
                                        key={takeExamId}
                                        tabIndex={-1}
                                    >

                                        <TableCell align="left">{name}</TableCell>
                                        <TableCell align="center">{Math.round(((points + Number.EPSILON) * 100)) / 100}/{maxPoints}</TableCell>
                                        <TableCell align="center">{moment(startTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                                        <TableCell align="center">{duration} phút</TableCell>
                                        <TableCell align="center">
                                            {status === 'not submitted' ? 'Chưa nộp bài' : 'Đã nộp'}
                                        </TableCell>
                                        <TableCell align="center">
                                            <Chip
                                            color={points/maxPoints <5 ?'error':'primary'}
                                            label={points/maxPoints <5 ? 'Chưa đạt' : 'Đạt'}
                                            />
                                        </TableCell>

                                        <TableCell align="right">
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
    )
}


export default TableTeacher