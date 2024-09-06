//-------------------------------- Users -----------------------------------//
export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: string;
    logged: boolean;
}

export interface IUserInput {
    name: string;
    email: string;
    password: string;
}

export interface IUserLoginInput {
    email: string;
    password: string;
}

//-------------------------------- Pressions -----------------------------------//
export interface IPression {
    id: string;
    sistolic: number;
    diastolic: number;
    created_at: string;
}

export interface IPressionInput {
    sistolic: number;
    diastolic: number;
}

//-------------------------------- Stores -----------------------------------//
export interface IUserStore {
    users: IUser[];
    user: IUser;
    setUsers: (users: IUser[]) => void;
    setUser: (user: IUser) => void;
    removeUser: (id: string) => void;
}

export interface IPressionsStore {
    pressions: IPression[];
    pression: IPression;
    setPressions: (pressions: IPression[]) => void;
    setPression: (pression: IPression) => void;
    removePression: (id: string) => void;
}

export interface IDialogStore {
    opened: boolean;
    open: () => void;
    close: () => void;
}

export abstract class IUserProvider {
    abstract list(): Promise<IUser[]>;
    abstract create(user: IUserInput): Promise<IUser>;
    abstract delete(id: string): Promise<void>;
    abstract update(user: IUser): Promise<IUser>;
    abstract login(user: IUserLoginInput): Promise<IUser>;
}

export abstract class IPressionProvider {
    abstract list(): Promise<IPression[]>;
    abstract create(pression: IPressionInput): Promise<IPression>;
    abstract delete(id: string): Promise<void>;
    abstract update(pression: IPression): Promise<IPression>;
}