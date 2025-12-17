import TokenService from '../Service/TokenService';
import type { Request, Response } from "express";
import handleError from '../Lib/Error/Handle';

class TokenController {
    private service: TokenService;

    public constructor() {
        this.service = new TokenService();
    }
}

export default TokenController;