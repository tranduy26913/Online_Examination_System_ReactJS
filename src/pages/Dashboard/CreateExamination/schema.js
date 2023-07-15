import moment from 'moment';
import * as Yup from 'yup'
export const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Vui lòng nhập vào trường này')
    .min(5, "Tên kiểm tra ít nhất 5 kí tự"),
  pinExam: Yup
    .string(),
  attemptsAllowed: Yup
    .number()
    .required('Vui lòng nhập vào trường này')
    .min(1, "Số lần thi ít nhất là 1"),
    allowOutTab: Yup
    .number()
    .required('Vui lòng nhập vào trường này')
    .min(1, "Số lượt cho phép thoát Tab ít nhất là 1"),
    allowOutFace: Yup
    .number()
    .required('Vui lòng nhập vào trường này')
    .min(1, "Số lượt cho phép thoát Camera ít nhất là 1"),
  // numberofQuestions: Yup
  //   .number()
  //   .required('Vui lòng nhập vào trường này')
  //   .min(1, "Số câu hỏi ít nhất là 1"),
  maxTimes: Yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .required('Vui lòng nhập vào trường này')
    .min(1, "Thời lượng làm bài ít nhất là 1 phút"),
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
    // .test("endTime", "Thời gian bắt đầu phải sau thời điểm này",
    //   function (value) {
    //     return moment().diff(moment(value, "YYYY-MM-DDTHH:mm"), "minutes") < 0;
    //   })
    .test(
      'endTime2',
      "Thời gian kết thúc phải lớn hơn thời gian làm bài",
      function (value) {
        const { startTime, maxTimes } = this.parent
        return moment(startTime, "YYYY-MM-DDTHH:mm").isValid() === false ?
          schema : moment(value).diff(moment(startTime, "YYYY-MM-DDTHH:mm").add(maxTimes, 'minutes'), "minutes") >= 1
      },
    ),
  // description: Yup
  //   .string()
  //   .required('Vui lòng nhập vào trường này')
  //   .min(10,"Mô tả bài kiểm tra ít nhất 10 kí tự"),

})
