import dayjs from "dayjs"
import tz from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import * as dotenv from "dotenv"
import cron from "node-cron"
import { sendWithWebhook } from "./utils/discordInstance"
import { getServerStatus } from "./utils/getServerServices"

dotenv.config()
dayjs.extend(utc)
dayjs.extend(tz)

let history: string | null = ""

let isStart = true

sendWithWebhook("Start", { color: "YELLOW" })
cron.schedule("* * * * *", async () => {
  // console.log("🆑 Activated")
  const respose = await getServerStatus()

  if (isStart) {
    history = respose.status
    isStart = !isStart
    respose.status === "OK"
      ? await sendWithWebhook(`🏃‍♂️ Server is : OK`, {
          color: "GREEN"
        })
      : await sendWithWebhook(`📢 Server is : DOWN`, {
          color: "RED"
        })
  } else {
    if (respose.status === "OK" && respose.status != history) {
      await sendWithWebhook(`🏃‍♂️ Server is : OK`, {
        color: "GREEN"
      })
      history = respose.status
    } else if (respose.status === "DOWN" && respose.status != history) {
      await sendWithWebhook(`📢 Server is : DOWN`, {
        color: "RED"
      })
      history = respose.status
    } else {
      console.log("🚌 NEXT..")
    }
  }
})
