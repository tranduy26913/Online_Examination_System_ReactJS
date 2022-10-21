import * as Yup from 'yup'
export const schema = Yup.object().shape({
  fullname: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(5,"Họ và tên ít nhất 5 kí tự"),
  school: Yup
    .string(),
  phone: Yup
    .string()
    .matches(/^$|((0[3|5|7|8|9])+([0-9]{8}))\b/,
    "Số điện thoại không hợp lệ"),
  address: Yup
    .string()
})
