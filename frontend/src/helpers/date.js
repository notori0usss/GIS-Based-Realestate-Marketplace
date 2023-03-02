import moment from "moment"
const dateFormat = (isoDate) => {
  const dateMoment = moment(isoDate)
  const year = dateMoment.year()
  const month = dateMoment.month() + 1 // moment.js months are 0-based
  const day = dateMoment.date()
  return `${day}/${month}/${year}`
}
export default dateFormat
