import { PressionNotExists } from "../errors";
import { Pression, PrismaClient } from '@prisma/client';
import { IPressionInput, IPressionProvider } from "../models";

export class PrismaPressionProvider implements IPressionProvider {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async update(pression: Pression): Promise<Pression | null> {
        const found = this.prisma.pression.findFirst({ where: { id: pression.id } });
        if (!found) {
            throw new PressionNotExists();
        }
        this.prisma.pression.update({ where: { id: pression.id }, data: pression })
        return found;
    }

    async delete(id: string): Promise<void> {
        const found = this.prisma.pression.findFirst({ where: { id } });
        if (!found) {
            throw new PressionNotExists();
        }
        this.prisma.user.delete({ where: { id } })
    }

    async create(pression: IPressionInput): Promise<Pression> {
        const created = await this.prisma.pression.create({ data: pression });
        return created;
    }

    async list(): Promise<Pression[]> {
        return await this.prisma.pression.findMany();
    }
}