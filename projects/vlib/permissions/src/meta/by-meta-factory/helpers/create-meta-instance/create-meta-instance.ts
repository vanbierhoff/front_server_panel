import { PolicyMetaInterface } from '../../../../policy';
import { MetadataInterface } from '../../../../policy/decorators/fv-meta/models/metadata.interface';
import { isMetadata } from '../is-metadata/is-metadata';
import { getInstanceFromMeta } from '../get-instance/get-instance-from-meta';
import { addInstanceByPolicy } from '../add-instance-by-policy/add-instance-by-policy';


export function createMetaInstance<T extends object>(rolesMetadata: PolicyMetaInterface[], instance: T & keyof T,
                                                     instancePolicy: MetadataInterface[], options?: any): T {
    rolesMetadata.forEach(role => {
        const key = role.propertyKey;

        if (isMetadata(instance[key])) {
            // create nested instance
            instance[key] = getInstanceFromMeta(instance[key], options) ?? null;
            return;
        }

        if (options?.byRole) {
            addInstanceByPolicy(role, instance, key, options?.instancePolicy || instancePolicy);
        }
        if (!options?.byRole) {
            instance[key] = instance[key] ?? null;
        }
    });

    return instance;
}
