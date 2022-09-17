import {useState} from 'react'
import { sentenceCase } from 'change-case';
import {
    Box,
    Button,
    Stack,
    Checkbox,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Avatar,
    Paper
} from "@mui/material"
import Grid from '@mui/material/Unstable_Grid2';
import SendIcon from '@mui/icons-material/Send';
import Scrollbar from 'components/Scrollbar';
import Label from 'components/Label';
import SearchNotFound from 'components/SearchNotFound';
import { TableHeadCustom, TableToolbar, TableMoreMenu } from 'components/TableCustom';



// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Tên đề thi', alignRight: false },
    { id: 'na', label: 'Company', alignRight: false },
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

    const [selected, setSelected] = useState([]);

    const [orderBy, setOrderBy] = useState('name');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = tests.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tests.length) : 0;

    const filteredUsers = applySortFilter(tests, getComparator(order, orderBy), filterName);

    const isUserNotFound = filteredUsers.length === 0;
    return (
        <Box className='listtest'>
            <Paper elevation={24}>

            <Stack direction='row' className='listtest__course'>
                <Box className='listtest__wrap-img'>
                    <img src="https://sandla.org/wp-content/uploads/2021/08/english-e1629469809834.jpg" />
                </Box>
                <Stack spacing={1} className='listtest__wrap-info'>
                    <Typography
                        fontSize={'18px'}
                        color='primary'
                        className='listtest__course-name'>Khoá học: Học máy </Typography>
                    <Typography className='listtest__course-desc'>Cuộc thi học thuật trực tuyến </Typography>
                    <Typography className='listtest__course-desc'>Số lượng bài kiểm tra: 8</Typography>
                    <Stack flex={1} justifyContent='flex-end' alignItems='flex-start'>
                        <Button
                            variant='outlined'
                            endIcon={<SendIcon />}
                        >Chia sẻ</Button>
                    </Stack>
                </Stack>
            </Stack>
            </Paper>
            <Stack spacing={1}>
                <Paper elevation={24}>
                    <TableToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName}
                    button={{display:"Tạo đề kiểm tra",path:'/teacher/create-exam'}} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tests.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                        const isItemSelected = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                                </TableCell>
                                                {/* <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={name} src={avatarUrl} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {name}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell> */}
                                                <TableCell align="left">{name}</TableCell>
                                                <TableCell align="left">{company}</TableCell>
                                                <TableCell align="left">{role}</TableCell>
                                                <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                                <TableCell align="left">
                                                    <Label variant="ghost" color={(status === 'banned' && 'error') || 'success'}>
                                                        status
                                                    </Label>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <TableMoreMenu />
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

const tests = [
    {
        name: "Bài kiểm tra số 1",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 2",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    },
    {
        name: "Bài kiểm tra số 3",
        start: new Date(),
        duration: 30,
        numberQuestion: 10,
        turns: 10
    }
]

export default ListExaminationTeacher