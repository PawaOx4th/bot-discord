import dayjs from "dayjs"

export function generateDay() {
  return dayjs().format("HH:mm:ss DD/MM/YYYY")
}
