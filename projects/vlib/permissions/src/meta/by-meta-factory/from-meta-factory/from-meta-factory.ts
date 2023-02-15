import { getInstanceFromMeta, removeFieldsWithoutMeta } from '../helpers';


export namespace FromMetaFactory {
    export function getInstance<T extends object>(instance: T): T {
        return removeFieldsWithoutMeta(getInstanceFromMeta(instance, {byRole: false}), true) as T;
    }

    export function getInstanceByRole<T extends object>(instance: T): Partial<Partial<T[keyof T]>> | T {
        return removeFieldsWithoutMeta(getInstanceFromMeta(instance, {byRole: true}));
    }
}
