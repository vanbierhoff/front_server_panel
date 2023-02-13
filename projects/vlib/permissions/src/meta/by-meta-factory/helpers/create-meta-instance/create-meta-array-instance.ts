import { PolicyMetaInterface } from '../../../../policy';
import { MetadataInterface } from '../../../../policy/decorators/fv-meta/models/metadata.interface';
import { FormMetaOptionsInterface } from '../models/form-meta-options.interface';
import { ROLE_META } from '../../../metadata/meta-keys';
import { isMetadata } from '../is-metadata/is-metadata';
import { addInstanceByPolicy } from '../add-instance-by-policy/add-instance-by-policy';
import { createMetaInstance } from './create-meta-instance';


export function createMetaArrayInstance<T extends object>(rolesMetadata: PolicyMetaInterface[], instance: T & keyof T,
                                                          instancePolicy: MetadataInterface[], options: FormMetaOptionsInterface): Array<T> {
    const arrayInstance: Array<T> = [];
    rolesMetadata.forEach(role => {
        const key = role.propertyKey;

        if (isMetadata(instance[key])) {
            // create nested instance
            instance[key] = createMetaInstance((Reflect as any).getMetadata(ROLE_META, instance[key]['constructor']),
                instance[key], options.instancePolicy || instancePolicy) ?? null;
            return;
        }

        if (options?.byRole) {
            // searching first coincidence of roles in arrays.
            addInstanceByPolicy(role, instance, key, options?.instancePolicy || instancePolicy, arrayInstance);
        }

        if (!options?.byRole) {
            if (arrayInstance) {
                arrayInstance.push(instance[key] ?? null);
                return;
            }
        }
    });

    return arrayInstance;
}
