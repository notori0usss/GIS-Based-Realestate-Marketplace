const date = (date) => {
  const timestamp = new Date(timestampStr)

  const year = timestamp.getUTCFullYear()
  const month = timestamp.getUTCMonth() + 1
  const day = timestamp.getUTCDate()

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`
  return formattedDate
}
export default date
