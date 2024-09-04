import { FullStackException } from "./FullStackException";
import { StatusCodes } from "http-status-codes";

export class PressionNotExists extends FullStackException {
    constructor() {
        super(StatusCodes.NOT_FOUND, "PressionNotExists", "Pressão não existe");
    }
}