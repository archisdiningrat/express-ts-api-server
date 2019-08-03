import { Router } from 'express';

declare module '*.json' {
    const value: any;
    export default value;
}

export interface IObject { 
    [s: string]: any; 
}

export interface IMeta {
    page: number;
    limit: number;
    total_page: number;
    total_data: number;
}

export interface IContext {
    username: string;
    user_id: string;
}

export interface IData {
    query: any;
    params: any;
    body: any;
}

export interface IRefreshToken {
    token: string;
    valid_until: string;
}

export interface ITokens {
    token: string;
    refresh_token: IRefreshToken;
}

export interface ICredential {
    username: string;
    password: string;
}

export interface ITokenable {
    user_id: string;
}

export interface IHttpError {
    message: string;
    name: string;
    status: number;
    data?: object;
}
