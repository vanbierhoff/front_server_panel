import { FormMetaOptionsInterface } from '../models/form-meta-options.interface';
import { INSTANCE_META, ROLE_META, TO_ARRAY_BY_ROLE } from '../../../metadata/meta-keys';
import { PolicyMetaInterface } from '@policy/policy';
import { isInstanceFromMetadata, isMetadata } from '../is-metadata/is-metadata';
import { createArrayFromInstance } from '@policy/meta/by-meta-factory';
import { createMetaInstance } from '../create-meta-instance';
import cloneDeep from 'lodash/cloneDeep';


export function getInstanceFromMeta<T extends object>(instance: T, options: FormMetaOptionsInterface): T {
    // Need deep clone for save chain prototype
    const cloneInstance = cloneDeep(instance);

    const rolesMetadata: PolicyMetaInterface[] = (Reflect as any).getMetadata(ROLE_META, instance.constructor);
    const metaInstance = (Reflect as any).getMetadata(INSTANCE_META, instance.constructor) || (Reflect as any).getMetadata(INSTANCE_META, instance);
    const metaOptions: FormMetaOptionsInterface = {
        instancePolicy: options?.instancePolicy || metaInstance,
        byRole: options?.byRole || false
    };


    if (isInstanceFromMetadata(instance)) {
        createArrayFromInstance((Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, instance.constructor),
            cloneInstance, metaInstance, metaOptions);
    }
    if (isMetadata(instance) && rolesMetadata) {
        createMetaInstance<T>(rolesMetadata, cloneInstance, metaInstance, metaOptions);
        return cloneInstance;
    }

    if (isMetadata(instance) || isInstanceFromMetadata(instance)) {
        return cloneInstance;
    }
    console.error('Instance doesn\'t have meta  decorator');
}
