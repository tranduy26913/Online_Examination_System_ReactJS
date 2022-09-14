import * as Yup from 'yup'
export const schema = Yup.object().shape({
  username: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(8,"Tên đăng nhập ít nhất 8 kí tự"),
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
