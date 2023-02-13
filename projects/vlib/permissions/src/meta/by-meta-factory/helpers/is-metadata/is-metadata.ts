import { INSTANCE_META, ROLE_META, TO_ARRAY_BY_ROLE } from '../../../metadata/meta-keys';
import { InstanceFromPolicyInterface, PolicyMetaInterface } from '../../../../policy';


export function isMetadata<T>(instance: T): boolean {
    if (typeof instance === 'function' || (typeof instance === 'object')) {
        if (instance?.constructor) {
            if ((Reflect as any).getMetadata(INSTANCE_META, instance.constructor)) {
                return true;
            }
        }
        if ((Reflect as any).getMetadata(INSTANCE_META, instance)) {
            return true;
        }
    }
    return false;
}

export function isInstanceFromMetadata<T>(instance: T): boolean {
    if (typeof instance === 'function' || (typeof instance === 'object')) {
        if (instance?.constructor) {
            if ((Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, instance.constructor)) {
                return true;
            }
        }
        if ((Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, instance)) {
            return true;
        }
    }
    return false;
}

export function removeFieldsWithoutMeta<T>(instance: T, skipCheck = false): Partial<T> | T {
    if (skipCheck) {
        return instance;
    }
    const metaField: PolicyMetaInterface[] = (Reflect as any).getMetadata(ROLE_META, instance.constructor);
    const metaArrayField: InstanceFromPolicyInterface[] = (Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, instance.constructor);

    for(const key in instance) {
        if (metaField.some(field => field.propertyKey === key)) {
            continue;
        }
        if (metaArrayField.some(field => field.propertyKey === key)) {
            continue;
        }
        delete instance[key];
    }

    return instance;
}


