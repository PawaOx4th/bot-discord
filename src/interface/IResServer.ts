export interface IResServer {
  uptime: number
  message: string
  timestamp: number
}

export type IServerStatusName = "OK" | "DOWN" | null

export interface ICheckServer {
  status: IServerStatusName
  data?: IResServer | null
}
