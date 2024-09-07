import { IUserInput, IUserLoginInput, IUserProvider } from "../models";
import { UserAlreadyExists, UserNotExists } from "../errors";
import { UserLoginError } from "../errors/UserLoginError";
import { PrismaClient, User } from '@prisma/client';

export class PrismaUserProvider implements IUserProvider {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }
    async login(user: IUserLoginInput): Promise<User | null> {
        const found = await this.prisma.user.findFirst({
            where: { email: user.email, password: user.password }
        });
        if (!found) {
            throw new UserLoginError();
        }
        await this.prisma.user.update({
            where: {
                email: user.email
            }, data: {
                logged: true
            }
        });
        found.logged = true;
        return found;
    }
    async update(user: User): Promise<User | null> {
        const found = await this.prisma.user.findFirst({ where: { id: user.id } });
        if (!found) {
            throw new UserNotExists();
        }
        this.prisma.user.update({ where: { id: user.id }, data: user })
        return found;
    }

    async delete(id: string): Promise<void> {
        const found = await this.prisma.user.findFirst({ where: { id } });
        if (!found) {
            throw new UserNotExists();
        }
        this.prisma.user.delete({ where: { id } })
    }

    async create(user: IUserInput): Promise<User> {
        const found = await this.prisma.user.findFirst({ where: { email: user.email } });
        if (!found) {
            const created = await this.prisma.user.create({ data: user });
            return created;
        }
        throw new UserAlreadyExists();
    }

    async list(): Promise<User[]> {
        return await this.prisma.user.findMany();
    }
}