import { PressionService } from "../services";
import { FilePressionProvider } from "../providers";
import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import { IPressionProvider } from "../models";
import { FullStackException } from "../errors";

export class PressionController {
    private provider: IPressionProvider;
    private service: PressionService;

    constructor() {
        this.provider = new FilePressionProvider();
        this.service = new PressionService(this.provider);
    }

    public list = async (req: Request, res: Response) => {
        res.status(StatusCodes.OK).json(await this.service.list());
    }

    public create = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.CREATED).json(await this.service.create(req.body));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public update = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.update(req.body));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            res.status(StatusCodes.OK).json(await this.service.delete(req.params.id));
        } catch (error) {
            if (error instanceof FullStackException) {
                res.status(error.errorCode).json(error);
            }
        }
    }
}