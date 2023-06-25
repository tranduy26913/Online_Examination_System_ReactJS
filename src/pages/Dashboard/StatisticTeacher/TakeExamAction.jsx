import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Tooltip,
    useMediaQuery,
    useTheme
} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import apiTakeExam from 'apis/apiTakeExam';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
function TakeExamAction({ takeExamId }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [logs, setLogs] = useState([])
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        const GetLogs = () => {
            apiTakeExam.getLogs({ takeExamId })
                .then(res => {
                    setLogs(res.logs)
                })
        }
        GetLogs()
    }, [takeExamId])
    return (
        <>
            <Tooltip title='Chi tiết'>
                <IconButton onClick={handleClickOpen}>
                    <InfoIcon color='primary' width={20} height={20} />
                </IconButton>

            </Tooltip>
            <Tooltip title='Chi tiết'>
                <Link to={`/review-exam/${takeExamId}`}>
                    <IconButton onClick={handleClickOpen}>
                        <PreviewIcon color='primary' width={20} height={20} />
                    </IconButton>
                </Link>

            </Tooltip>

            {open && <Dialog
                open={open}
                fullScreen={fullScreen}
                fullWidth={true}
                maxWidth={'md'}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Hoạt động trong lúc làm bài thi</DialogTitle>
                <DialogContent sx={{ overflow: 'hidden', height: 480 }}>
                    <TableContainer sx={{ maxHeight: 350, width: '100%' }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            sx={{ backgroundColor: theme.palette.background.paper, minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {logs
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((log,index) => {
                                        const { action, time, _id } = log
                                        return (

                                            <TableRow hover role="checkbox" tabIndex={-1} key={_id}>
                                                <TableCell align='left'>
                                                   {index}
                                                </TableCell>
                                                <TableCell align='left'>
                                                   {action}
                                                </TableCell>
                                                <TableCell align='left'>
                                                   {moment(time).format('DD/MM/YYYY hh:mm A')}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        labelRowsPerPage='Số dòng mỗi trang'
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </DialogContent>
                
            </Dialog>}
        </>
    )
}

const columns = [
    { id: 'index', label: 'STT', minWidth: 100 },
    { id: 'action', label: 'Hành động', minWidth: 200 },
    {
        id: 'time',
        label: 'Thời gian',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
];

function createData(name, code, population, size) {
    return { name, code, population };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

TakeExamAction.propTypes = {}

export default TakeExamAction
