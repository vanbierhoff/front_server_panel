import { checkRestrictionsPolicy, getMetadataFields } from '@policy/policy';


export function validateMetaField<T extends object>(state: T, field: string): Promise<boolean> {
    const metaFields = getMetadataFields(state, field);
    return checkRestrictionsPolicy(metaFields.metadata, metaFields.metaCollection, metaFields.metaInstance);
}
