import { ChatOptions } from "./enums";

export interface IRequest<T> {
  success: boolean;
  response: T;
  reason?: T;
}

export interface IApp {
  sidebarMenuIsShown: boolean;
  chatOption: ChatOptions;
  isLoading: boolean;
  logoutRequested: boolean;
  sideBarChats: IGroupChat[];
}

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  chatGroups?: string[];
  friendList?: IUser[];
  messages?: IMessage[];
}

export interface IMessage {
  id?: string;
  idGroup?: string;
  message?: string;
  timestamp?: string;
  sender?: IUser
}

export interface IGroupChat {
  id?: string;
  creationDate?: string;
  groupName?: string;
  participants?: IUser[];
  lastMessage?: IMessage;
}

export interface ISingleChat {
  id?: string;
  creationDate?: string;
  participant?: IUser;
}

export interface ISocket {
  roomId: string;
  dataTransport: unknown;
}

export interface IChat extends IGroupChat, ISingleChat {
  messages?: IUser[];
}