export type User_id = string;
type Group_id = string;

export interface IUser {
    _id: User_id;
    type: 'user';
    name: string;
    level: number;
    groups: Group_id[];
}

export interface IState {
    users: {
        list: IUser[];
    };
}
