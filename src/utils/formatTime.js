import { format, formatDistanceToNow } from 'date-fns';
import moment from 'moment';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function calcDurationTime(diff) {
  diff = Math.abs(diff)
  let duration = moment.duration(diff, 'seconds')
  let years = duration.years()
  let months = duration.months()
  let days = duration.days()
  let hours = duration.hours()
  let minutes = duration.minutes()
  let seconds = duration.seconds()
  return `${years? years + ' năm ':''}${months?months + ' tháng ':''}${days?days + ' ngày ':''}`
  +  `${hours? hours + ' giờ ':''}${minutes?minutes + ' phút ':''}${seconds + ' giây '}`
}
