import format from 'date-fns/format'
import parse from 'date-fns/parse'
import checkIsDate from 'date-fns/isDate'
import set from 'date-fns/set'

export default function () {
  const primeDateFormat = 'dd/mm/yy'
  const appDateFormat = 'dd/MM/yyyy'
  const appDateTimeFormat = 'dd/MM/yyyy - h:mm a'

  function isDate(date: unknown) {
    return checkIsDate(date)
  }

  function formatDate(date: Date) {
    return isDate(date) ? format(date, appDateFormat) : ''
  }

  function formatDateTime(date: Date) {
    return isDate(date) ? format(date, appDateTimeFormat) : ''
  }

  function parseDate(dateStr: string) {
    return parse(dateStr, appDateFormat, new Date())
  }

  function parseDateTime(dateStr: string) {
    return parse(dateStr, appDateTimeFormat, new Date())
  }

  function removeTime(date: Date) {
    return isDate(date) ? set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 }) : date
  }

  function setEndTime(date: Date) {
    return isDate(date) ? set(date, { hours: 23, minutes: 59, seconds: 59, milliseconds: 999 }) : date
  }

  return { primeDateFormat, isDate, formatDate, formatDateTime, parseDate, parseDateTime, removeTime, setEndTime }
}
