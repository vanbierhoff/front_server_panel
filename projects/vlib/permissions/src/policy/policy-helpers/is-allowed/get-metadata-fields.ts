import { FieldParserInterface, MetaFieldsInterface } from '../models';
import { INSTANCE_META, ROLE_META, TO_ARRAY_BY_ROLE } from '../../../meta/metadata/meta-keys';
import { MetadataInterface } from '../../decorators/fv-meta/models/metadata.interface';
import { fieldParser } from '../field-parser/field-parser';
import { InstanceFromPolicyInterface, PolicyMetaInterface } from '@policy/policy';
import { MetaCollection } from '../../models/meta-collection';


export function getMetadataFields<T extends object>(state: T, field: string): MetaFieldsInterface {
    const metaInstance: MetadataInterface[] = (Reflect as any).getMetadata(INSTANCE_META, state.constructor) ||
        (Reflect as any).getMetadata(INSTANCE_META, state);
    const metadata: FieldParserInterface = fieldParser(state, field);
    const fieldMeta: PolicyMetaInterface[] & InstanceFromPolicyInterface[] = (Reflect as any).getMetadata(ROLE_META, metadata.instanceField);
    const fieldMetaArray: PolicyMetaInterface & InstanceFromPolicyInterface[] =
        (Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, metadata.instanceField);
    const metaCollection: MetaCollection = fieldMeta || fieldMetaArray;
    if (fieldMeta && fieldMetaArray) {
        return {
            metaCollection: fieldMeta.concat(fieldMetaArray),
            metadata,
            metaInstance
        };
    }
    return {
        metaCollection,
        metadata,
        metaInstance
    };
}

