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
import DOMPurify from 'dompurify';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'question', label: 'Câu hỏi', align: 'left' },
    { id: 'count', label: 'Tổng học viên làm', align: 'center' },
    { id: 'correct', label: 'Học viên làm đúng', align: 'center' },
    { id: 'wrong', label: 'Học viên làm sai', align: 'center' },
    { id: 'percent', label: 'Tỉ lệ đúng', align: 'center' },
];

// ----------------------------------------------------------------------


const TableQuestion = ({ questions }) => {
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questions.length) : 0;

    const filteredUsers = applySortFilter(questions, getComparator(order, orderBy), filterName, 'points');

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
                                rowCount={questions.length}
                                onRequestSort={handleRequestSort}
                            />
                            <TableBody>
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                                    const { question, tongSoHVDaLamCauHoi, soHVDaLamDung, soHVDaLamSai, status } = row;
                                    
                                    return (
                                        <TableRow
                                            hover
                                            key={question._id}
                                            tabIndex={-1}
                                        >
                                           
                                            <TableCell align="left" sx={{maxWidth:'30%',width:'30%'}}
                                             dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question.content) }}>
                                                
                                            </TableCell>
                                            <TableCell align="center">
                                                {tongSoHVDaLamCauHoi}
                                            </TableCell>
                                            <TableCell align="center">
                                                {soHVDaLamDung}
                                            </TableCell>
                                            <TableCell align="center">
                                                {soHVDaLamSai}
                                            </TableCell>
                                            <TableCell align="center">
                                                {(soHVDaLamDung*100/tongSoHVDaLamCauHoi).toFixed(2)}%
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
                    count={questions.length}
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


export default TableQuestion