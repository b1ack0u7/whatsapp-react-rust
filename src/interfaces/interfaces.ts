import { EAlert, EChatOptions } from "./enums";

export interface IAlert {
  alertType: EAlert;
  message?: string;
  dismissTime?: number;
}

export interface IApp {
  chatOption: EChatOptions;
  currentAlert?: IAlert;
  isLoading: {
    chats: boolean, 
    rehydrate: boolean
  };
  loggedInRecently: boolean
  logoutRequested: boolean;
  queueAlert: IAlert[];
  sideBarChats: IGroupChat[];
  sidebarMenuIsShown: boolean;
}

export interface IChat extends IGroupChat, ISingleChat {
  messages?: IUser[];
}

export interface IGroupChat {
  id?: string;
  creationDate?: string;
  groupName?: string;
  photoURL?: string;
  lastMessage?: IMessage;
  participants?: IUser[];
}

export interface IMessage {
  id?: string;
  idGroup?: string;
  message?: string;
  sender?: IUser
  timestamp?: string;
}

export interface IRequest<T> {
  success: boolean;
  response: T;
  reason?: T;
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

export interface IUser {
  id?: string;
  chatGroups?: string[];
  email?: string;
  photoURL?: string;
  friendList?: IUser[];
  friendRequest?: IUser[];
  messages?: IMessage[];
  name?: string;
}