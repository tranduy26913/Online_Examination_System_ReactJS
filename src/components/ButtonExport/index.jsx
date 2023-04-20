import React from 'react'
import { Button } from '@mui/material'
import { Player } from '@lottiefiles/react-lottie-player';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { toast } from 'react-toastify';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

function ButtonExport({ dataExport, fileName = 'Dữ liệu' }) {
  const user = useSelector(state => state.user?.info)
  const exportToCSV = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(dataExport);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    let data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }
  const handleClick = () => {
    if (!user?.premium) {
      toast.info('Vui lòng nâng cấp lên tài khoản PREMIUM để thực hiện thao tác')
      return
    }
    exportToCSV()
  }
  return (
    <Button
      variant='contained'
      onClick={handleClick}
      startIcon={<SaveAltIcon />}
      endIcon={<Player
        autoplay
        loop
        src="https://assets7.lottiefiles.com/packages/lf20_rZQs81.json"
        style={{ height: '36px', width: '36px' }}
      />}> Xuất File</Button >
  )
}

export default ButtonExport