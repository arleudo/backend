import { IUser, IUserInput, IUserProvider } from "../models";

export class UserService {
    private provider: IUserProvider;

    constructor(provider: IUserProvider) {
        this.provider = provider;
    }

    public list = async () => {
        return await this.provider.list()
    }

    public create = async (user: IUserInput) => {
        return await this.provider.create(user);
    }

    public update = async (user: IUser) => {
        return await this.provider.update(user);
    }

    public delete = async (id: string) => {
        return await this.provider.delete(id);
    }
}