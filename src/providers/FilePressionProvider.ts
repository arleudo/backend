import { v4 as uuid } from "uuid";
import * as fs from "fs";
import { IPression, IPressionInput, IPressionProvider } from "../models";
import { UserNotExists, PressionNotExists } from "../errors";

const FILE_PATH = "assets/pressions.json";

export class FilePressionProvider implements IPressionProvider {
    private pressions: IPression[];

    constructor() {
        this.pressions = this.loadFromFile();
    }

    private loadFromFile(): IPression[] {
        try {
            const data = fs.readFileSync(FILE_PATH, "utf-8");
            return JSON.parse(data) as IPression[];
        } catch (error) {
            return [];
        }
    }

    private saveToFile(): void {
        fs.writeFileSync(FILE_PATH, JSON.stringify(this.pressions, null, 2), "utf-8");
    }

    async update(pression: IPression): Promise<IPression> {
        const index = this.pressions.findIndex((u) => u.id === pression.id);
        if (index < 0) {
            throw new PressionNotExists();
        }
        this.pressions[index] = pression;
        this.saveToFile();
        return this.pressions[index];
    }

    async delete(id: string): Promise<void> {
        const exist = this.pressions.find((p) => p.id === id);
        if (!exist) {
            throw new UserNotExists();
        }
        this.pressions = this.pressions.filter((p) => p.id !== id);
        this.saveToFile();
    }

    async create(pression: IPressionInput): Promise<IPression> {
        const p = { id: uuid(), created_at: new Date().toLocaleString(), ...pression } as IPression;
        this.pressions.push(p);
        this.saveToFile();
        return p;
    }

    async list(): Promise<IPression[]> {
        return this.pressions;
    }
}
