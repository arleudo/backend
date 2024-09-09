import { v4 as uuid } from "uuid";
import { IUserInput, IUserLoginInput, IUserProvider } from "../models";
import { UserAlreadyExists, UserNotExists } from "../errors";
import { UserLoginError } from "../errors/UserLoginError";
import { User } from "@prisma/client";

export class MemoryUserProvider implements IUserProvider {
    private users: User[];

    constructor() {
        this.users = [
            { id: "1", name: "Arleudo", email: "arleudo", password: "senha", created_at: new Date(), logged: false },
            { id: "2", name: "Eugenia", email: "eugenia", password: "senha", created_at: new Date(), logged: false },
            { id: "3", name: "Adriana", email: "adiana", password: "senha", created_at: new Date(), logged: false }];
    }
    async logout(id: string): Promise<void> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index == -1) {
            throw new UserNotExists();
        }
        this.users[index].logged = false;
    }
    async login(user: IUserLoginInput): Promise<User> {
        const index = this.users.findIndex((u) => u.email === user.email && u.password === user.password);
        if (index == -1) {
            throw new UserLoginError();
        }
        this.users[index].logged = true;
        return this.users[index];
    }
    async update(user: User): Promise<User> {
        const index = this.users.findIndex((u) => u.email === user.email);
        if (index < 0) {
            throw new UserNotExists();
        }
        this.users[index] = user;
        return this.users[index];
    }

    async delete(id: string): Promise<void> {
        const exist = this.users.find((u) => u.id === id);
        if (!exist) {
            throw new UserNotExists();
        }
        this.users = this.users.filter((u) => u.id !== id);
    }

    async create(user: IUserInput): Promise<User> {
        const exist = this.users.find((u) => u.email === user.email);
        if (!exist) {
            const u = { id: uuid(), created_at: new Date(), ...user } as User;
            this.users.push(u);
            return u;
        }
        throw new UserAlreadyExists();
    }

    async list(): Promise<User[]> {
        return this.users;
    }

}