import { v4 as uuid } from "uuid";
import { IPression, IPressionInput, IPressionProvider } from "../models";
import { PressionNotExists, UserNotExists } from "../errors";

export class MemoryPressionProvider implements IPressionProvider {
    private pressions: IPression[];

    constructor() {
        this.pressions = [
            { id: uuid(), sistolic: 15, diastolic: 10, created_at: new Date().toLocaleDateString() },
        ];
    }
    async update(pression: IPression): Promise<IPression> {
        const index = this.pressions.findIndex((u) => u.id === pression.id);
        if (index < 0) {
            throw new PressionNotExists();
        }
        this.pressions[index] = pression;
        return this.pressions[index];
    }

    async delete(id: string): Promise<void> {
        const exist = this.pressions.find((p) => p.id === id);
        if (!exist) {
            throw new UserNotExists();
        }
        this.pressions = this.pressions.filter((p) => p.id !== id);
    }

    async create(pression: IPressionInput): Promise<IPression> {
        const p = { id: uuid(), created_at: new Date().toLocaleDateString(), ...pression } as IPression;
        this.pressions.push(p);
        return p;
    }

    async list(): Promise<IPression[]> {
        return this.pressions;
    }

}