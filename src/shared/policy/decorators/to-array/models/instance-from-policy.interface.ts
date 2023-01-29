export interface InstanceFromPolicyInterface {
    target: object;
    propertyKey: string;
    parentField?: string;
    instance: ConstructableInstance | any;
    policyFn: (...args) => boolean;
}

export type ConstructableInstance<T = any> = new (...args: any[]) => T;
