import { Request as HttpRequest } from 'express';

export default interface JwtAuthPayload {
    id: string;
    businessId: string;
}

export type AuthRequest = HttpRequest & { user: JwtAuthPayload };