export type User_id = string;
type Group_id = string;

export interface IUser {
    _id: User_id;
    type: 'user';
    name: string;
    level: number;
    groups: Group_id[];
    last_login: Date;
    last_active: Date;
    online: boolean;
    location: string;
    password: string;
}

export interface IState {
    users: {
        list: IUser[];
        ui: IUsersUI;
        me: IUser;
    };
}

export interface IUsersUI {
    selected_users: string[];
}
