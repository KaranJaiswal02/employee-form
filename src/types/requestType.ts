import { NextApiRequest } from "next";

export interface AuthenticatedNextApiRequest extends NextApiRequest {
    userId?: string;
    role?: string;
}