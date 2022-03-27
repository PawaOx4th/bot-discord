import {
  ICheckServer,
  IResServer,
  IServerStatusName
} from "./interface/IResServer"
import dayjs from "dayjs"
import { WebhookClient, MessageEmbed, ColorResolvable } from "discord.js"
import utc from "dayjs/plugin/utc"
import tz from "dayjs/plugin/timezone"
import cron from "node-cron"
import axios from "axios"
import * as dotenv from "dotenv"
import { getServerStatus } from "./utils/getServerServices"
import { sendWithWebhook } from "./utils/discordInstance"

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
