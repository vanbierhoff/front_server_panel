import { validateMetaField } from '../../../policy';


export namespace VMetaPolicy {
    export function isAllowed<T extends object>(state: T, field: string): Promise<boolean> {
        return validateMetaField(state, field);
    }
}
