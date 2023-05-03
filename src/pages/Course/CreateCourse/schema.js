import * as Yup from 'yup'
export const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(5,"Tên khoá học ít nhất 5 kí tự"),
  description: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(10,"Mô tả khoá học ít nhất 10 kí tự"),
  pin: Yup
    .string()
    .min(5,"Mật khẩu tham gia khoá học có ít nhất 5 kí tự"),
  isSell: Yup
    .boolean().default(false),
  price: Yup
    .number()
    .min(1000,"Giá khoá học phải lớn hơn 1000VND"),
  status: Yup
    .boolean()
    
})
