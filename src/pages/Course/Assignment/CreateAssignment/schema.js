import moment from 'moment';
import * as Yup from 'yup'
export const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(5, "Tên bài tập ít nhất 5 kí tự"),
    maxPoints: Yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required('Vui lòng nhập vào trường này')
    .min(0, "Điểm phải lớn hơn 0"),
  startTime: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .test("startTime", "Ngày không hợp lệ",
      function (value) {
        return moment(value, "YYYY-MM-DDTHH:mm").isValid();
      })
  ,
  endTime: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .test("endTimeValid", "Ngày không hợp lệ",
      function (value) {
        return moment(value, "YYYY-MM-DDTHH:mm").isValid();
      })
    .test("endTime", "Thời gian bắt đầu phải sau thời điểm này",
      function (value) {
        return moment().diff(moment(value, "YYYY-MM-DDTHH:mm"), "minutes") < 0;
      })
    .test(
      'endTime2',
      "Thời gian kết thúc phải lớn hơn thời gian làm bài",
      function (value) {
        const { startTime } = this.parent
        return moment(startTime, "YYYY-MM-DDTHH:mm").isValid() === false ?
          schema : moment(value).diff(moment(startTime, "YYYY-MM-DDTHH:mm"), "minutes") >= 1
      },
    ),
 

})
