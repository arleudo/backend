import { IPression, IPressionInput, IPressionProvider } from "../models";

export class PressionService {
    private provider: IPressionProvider;

    constructor(provider: IPressionProvider) {
        this.provider = provider;
    }

    public list = async () => {
        return await this.provider.list()
    }

    public create = async (pression: IPressionInput) => {
        return await this.provider.create(pression);
    }

    public update = async (pression: IPression) => {
        return await this.provider.update(pression);
    }

    public delete = async (id: string) => {
        return await this.provider.delete(id);
    }
}