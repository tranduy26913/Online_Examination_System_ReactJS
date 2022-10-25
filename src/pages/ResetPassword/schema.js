import * as Yup from 'yup'
export const schema = Yup.object().shape({
  newPassword: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      "Mật khẩu ít nhất 8 kí tự, có chứa chữ in hoa, in thường, số"),
  cfPassword: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .oneOf([Yup.ref("newPassword")], "Mật khẩu không trùng khớp")
})
