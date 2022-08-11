
export interface SignToken {
  access_token: string,
  refresh_token: string
}

export interface BotFields {
  id?: number,
  name:string,
  url: string,
  users_url: string,
  hash: string
}

export interface MessageFields {
  id?: number,
  creater?: number,
  message_url:string,
  name: string,
  date: Date,
}

export interface ItemFields {
  id?: number,
  creater?: number,
  fullname:string,
  username: string,
  message_id: number,
  chat_id: number
}
