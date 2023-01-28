export interface IRequest<T> {
  success: boolean;
  response: T;
  reason?: T;
}

export interface ISidebar {
  sidebarInfoIsShown: boolean;
  sidebarMenuIsShown: boolean;
}

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  chatGroups?: string[];
  messages?: IMessage[];
}

export interface IMessage {
  id?: string;
  message?: string;
  timestamp?: Date,
  sender?: IUser
}

export interface IGroupChat {
  id?: string;
  creationDate?: string;
  groupName?: string;
  participants?: [{
    id: string,
    name: string
  }];
  message?: IMessage;
}

export interface ISingleChat {
  id?: string;
  creationDate?: string;
  participant?: {
    id: string,
    name: string
  }
}

export interface IChat extends IGroupChat, ISingleChat {
  messages?: unknown;
}