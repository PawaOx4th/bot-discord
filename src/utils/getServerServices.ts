import axios from "axios"
import { ICheckServer, IResServer } from "../interface/IResServer"

export async function getServerStatus(): Promise<ICheckServer> {
  const hasRerturn: ICheckServer = {
    status: null
  }
  if (!process.env.SERVER) {
    hasRerturn.status = null
  } else {
    try {
      const response = await axios.get<IResServer>(process.env.SERVER)
      console.log("😸 Response : ", response.data.message)
      hasRerturn.status = "OK"
      hasRerturn.data = response.data
    } catch (error) {
      console.log("❌ Error :")
      hasRerturn.status = "DOWN"
    }
  }

  return hasRerturn
}
