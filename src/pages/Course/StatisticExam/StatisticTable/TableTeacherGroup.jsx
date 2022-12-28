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
    Typography,
    Avatar
} from "@mui/material"
import Scrollbar from 'components/Scrollbar';

import { TableToolbar, TableHeadCustom } from 'components/TableCustom';
import TakeExamAction from '../TakeExamAction';
import moment from 'moment';
import EmptyList from 'components/UI/EmptyList';
import ButtonExport from 'components/ButtonExport';
import { applySortFilter, getComparator } from 'components/TableCustom/FunctionHelper';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên người thi', align: 'left' },
    { id: 'point', label: 'Điểm', align: 'center' },
    { id: 'startTime', label: 'Thời gian thi', align: 'center' },
    { id: 'duration', label: 'Thời lượng', align: 'center' },
    { id: 'status', label: 'Trạng thái', align: 'center' },
    { id: 'result', label: 'Kết quả', align: 'center' },
    { id: 'action', label: 'Thao tác', align: 'center' },
];

// ----------------------------------------------------------------------

function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}

const TableTeacherGroup = ({ exams, typeofPoint }) => {
    exams = groupBy(exams, exam => exam.name);
    let groupExams = []
    exams.forEach(item => {
        let arrPoint = item.map(e => e.points)
        
        let points = 0
        if (typeofPoint === 'max')
            points = Math.max(...arrPoint)
        else if (typeofPoint === 'avg')
            points = arrPoint.reduce((p, c) => p + c, 0) / arrPoint.length;
        else
            points = arrPoint[0]

        console.log(arrPoint)
        groupExams.push({
            ...item[0],
            points
        })
    })
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - groupExams.length) : 0;

    const filteredUsers = applySortFilter(groupExams, getComparator(order, orderBy), filterName, 'name');

    const isUserNotFound = filteredUsers.length === 0;

    const handleData = () => {
        return filteredUsers.map(item => {
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
    }

    const ButtonExportFile = () => {
        return (
            <ButtonExport variant='outlined' dataExport={handleData()}>
            </ButtonExport>
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
                            rowCount={groupExams.length}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                const { _id: takeExamId, userAvatar,name, submitTime, startTime, points, maxPoints, status } = row;
                                const duration = moment(submitTime).diff(startTime, 'minutes')

                                return (
                                    <TableRow
                                        hover
                                        key={takeExamId}
                                        tabIndex={-1}
                                    >
                                        <TableCell width='20%' align="left">
                                            <Stack direction='row' alignItems='center' spacing={1}>
                                                <Avatar alt={name} src={userAvatar} />
                                                <Typography>
                                                    {name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="center">{Math.round(((points + Number.EPSILON) * 100)) / 100}/{maxPoints}</TableCell>
                                        <TableCell align="center">{moment(startTime).format('DD/MM/YYYY HH:mm')}</TableCell>
                                        <TableCell align="center">{duration} phút</TableCell>
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
                count={groupExams.length}
                labelRowsPerPage='Số dòng mỗi trang'
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    )
}


export default TableTeacherGroup