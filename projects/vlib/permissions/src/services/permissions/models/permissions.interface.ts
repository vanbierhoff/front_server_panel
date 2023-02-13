export interface PermissionServiceInterface {
    isAllowed<T>(field: string): Promise<boolean>;

    getInstanceByRole<T = any>(): object | T;

    getInstance<T = any>(): object | T;

    update(): void;
}
