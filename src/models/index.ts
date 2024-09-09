import { Pression, User } from "@prisma/client";

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
    abstract list(): Promise<User[] | null>;
    abstract create(user: IUserInput): Promise<User | null>;
    abstract delete(id: string): Promise<void>;
    abstract update(user: User): Promise<User | null>;
    abstract login(user: IUserLoginInput): Promise<User | null>;
    abstract logout(id: string): Promise<void>;
}

export abstract class IPressionProvider {
    abstract list(): Promise<Pression[] | null>;
    abstract create(pression: IPressionInput): Promise<Pression | null>;
    abstract delete(id: string): Promise<void>;
    abstract update(pression: Pression): Promise<Pression | null>;
}