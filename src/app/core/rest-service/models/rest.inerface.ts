export interface ParamsRequestInterface<T = any, D = any> {
    url?: string;
    options?: T;
    data?: D | {};
}

export type RequestDataInterface<T> = T;

export type RequestInterface<T> = ParamsRequestInterface | RequestDataInterface<T>;

