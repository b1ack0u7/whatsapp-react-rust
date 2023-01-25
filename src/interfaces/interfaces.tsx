
export interface IUser {
  id?: string;
  name?: string;
}

export interface ISidebar {
  sidebarInfoIsShown: boolean;
  sidebarMenuIsShown: boolean;
}

export interface IGroupChat {
  idGroup?: string;
  creationDate?: string;
  groupName?: string;
  participants?: [{
    id: string,
    name: string
  }];
}

export interface ISingleChat {
  idSingle?: string;
  creationDate?: string;
  participant?: {
    id: string,
    name: string
  }
}

export interface IChat extends IGroupChat, ISingleChat {
  messages?: unknown
}