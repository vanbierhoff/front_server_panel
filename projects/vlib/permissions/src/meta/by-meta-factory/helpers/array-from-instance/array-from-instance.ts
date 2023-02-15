import { MetadataInterface } from '@policy/policy/decorators/fv-meta/models/metadata.interface';
import { FormMetaOptionsInterface } from '../models/form-meta-options.interface';
import { isMetadata, removeFieldsWithoutMeta } from '../is-metadata/is-metadata';
import { getInstanceFromMeta } from '@policy/meta/by-meta-factory';
import { ROLE_META } from '../../../metadata/meta-keys';
import { createMetaArrayInstance } from '../create-meta-instance';
import { InstanceFromPolicyInterface } from '@policy/policy';


export function createArrayFromInstance<T extends object>(instanceMeta: InstanceFromPolicyInterface[], instance: any,
                                                          instancePolicy: MetadataInterface[], options?: FormMetaOptionsInterface): T {

    instanceMeta.forEach(item => {
        for(const nestedKey in instance[item.propertyKey]) {
            if (isMetadata(instance[item.propertyKey][nestedKey])) {
                instance[item.propertyKey][nestedKey] =
                    removeFieldsWithoutMeta(getInstanceFromMeta(instance[item.propertyKey][nestedKey], options));
            }
        }

        if (isMetadata(item.instance)) {
            if (item.parentField) {
                instance[item.propertyKey][item.parentField] = createMetaArrayInstance((Reflect as any).getMetadata(ROLE_META,
                    item.instance), new item.instance(), instancePolicy, options);
                return;
            }
            instance[item.propertyKey] = createMetaArrayInstance((Reflect as any).getMetadata(ROLE_META,
                item.instance), new item.instance(), instancePolicy, options);
        }
    });
    return instance;
}
