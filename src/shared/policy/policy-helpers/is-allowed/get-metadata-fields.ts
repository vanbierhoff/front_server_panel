import { PolicyMetaInterface } from '@shared/decorators';
import { FieldParserInterface } from '@shared/decorators/policy-derocator/policy-helpers/models/field-parser/field-parser.interface';
import { fieldParser } from '@shared/decorators/policy-derocator/policy-helpers/field-parser/field-parser';
import { InstanceFromPolicyInterface } from '@shared/decorators/to-array/models/instance-from-policy.interface';
import { INSTANCE_META, ROLE_META, TO_ARRAY_BY_ROLE } from '@shared/constant';
import { MetadataInterface } from '@shared/decorators/fv-meta/models/metadata.interface';
import { MetaCollection } from '@shared/decorators/models/meta-collection';
import {
    MetaFieldsInterface
} from '@shared/decorators/policy-derocator/policy-helpers/models/get-metadata-fields/get-meta-fields.interface';


export function getMetadataFields<T>(state: T, field: string): MetaFieldsInterface {
    const metaInstance: MetadataInterface = Reflect.getMetadata(INSTANCE_META, state.constructor || state);
    const metadata: FieldParserInterface = fieldParser(state, field);
    const fieldMeta: PolicyMetaInterface[] & InstanceFromPolicyInterface[] = Reflect.getMetadata(ROLE_META, metadata.instanceField);
    const fieldMetaArray: PolicyMetaInterface & InstanceFromPolicyInterface[] =
        Reflect.getMetadata(TO_ARRAY_BY_ROLE, metadata.instanceField);
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

