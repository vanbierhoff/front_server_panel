export interface PolicyMetaInterface {
    target: object;
    propertyKey: string;
    policyFn: (...args) => boolean;

}
