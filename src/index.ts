import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import * as dotenv from "dotenv"
import cron from "node-cron"
import { onAlertMeeting, sendWithWebhook } from "./utils/discordInstance"
import { getServerStatus } from "./utils/getServerServices"
import express, { Application, Request, Response } from "express"
import { generateDay } from "./utils/helper"

const app: Application = express()

app.get("/", (req: Request, res: Response) => {
  return res.send({
    date: dayjs().tz("Asia/Bangkok").format("YYYY/MM/DD HH:mm")
  })
})

dotenv.config()
dayjs.extend(utc)
dayjs.extend(tz)

let history: string | null = ""

let isStart = true

// sendWithWebhook("Start", { color: "YELLOW" })
// cron.schedule("* * * * *", async () => {
//   const respose = await getServerStatus()
//   const day = dayjs().format("HH:mm:ss DD/MM/YYYY")

//   if (isStart) {
//     history = respose.status
//     isStart = !isStart
//     respose.status === "OK"
//       ? await sendWithWebhook(`🏃‍♂️ [${day}] Server is : OK`, {
//           color: "GREEN"
//         })
//       : await sendWithWebhook(`📢 [${day}] Server is : DOWN`, {
//           color: "RED"
//         })
//   } else {
//     if (respose.status === "OK" && respose.status != history) {
//       await sendWithWebhook(`🏃‍♂️ [${day}] Server is : OK`, {
//         color: "GREEN"
//       })
//       history = respose.status
//     } else if (respose.status === "DOWN" && respose.status != history) {
//       await sendWithWebhook(`📢 [${day}] Server is : DOWN`, {
//         color: "RED"
//       })
//       history = respose.status
//     } else {
//       console.log("🚌 NEXT..")
//     }
//   }
// })

cron.schedule(
  "25 15 * * 1-5",
  () => {
    const day = generateDay()

    onAlertMeeting()
  },
  {
    scheduled: true,
    timezone: "Asia/Bangkok"
  }
)

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log("✅ Server has started !!!")
  console.log(`${process.env.MESSAGE || `Local computer`}`)
})
