import * as Yup from 'yup'
export const schema = Yup.object().shape({
  fullname: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(8,"Họ và tên ít nhất 8 kí tự"),
  email: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    "Vui lòng nhập email hợp lệ")
    .min(8,"Email ít nhất 8 kí tự"),
  username: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(5,"Tên đăng nhập ít nhất 5 kí tự"),
  password: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
    "Mật khẩu ít nhất 8 kí tự, có chứa chữ in hoa, in thường, số"),
    cfPassword: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .oneOf([Yup.ref("password")], "Mật khẩu không trùng khớp")
})
