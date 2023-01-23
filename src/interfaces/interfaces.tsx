
export interface IUser {
  id?: string;
  name?: string;
}

export interface ISidebar {
  sidebarInfoIsShown: boolean;
  sidebarMenuIsShown: boolean;
}

export interface IChatInfo extends ISidebar {
  idGroup?: string;
  creationDate?: string;
  groupName?: string;
  participants?: {
    id: string,
    name: string
  };
}