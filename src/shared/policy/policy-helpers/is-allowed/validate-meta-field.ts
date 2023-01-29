import { getMetadataFields } from './get-metadata-fields';
import { checkRestrictionsPolicy } from './check-restrictions-policy';


export function validateMetaField<T>(state: T, field: string): Promise<boolean> {
    const metaFields = getMetadataFields(state, field);
    return checkRestrictionsPolicy(metaFields.metadata, metaFields.metaCollection, metaFields.metaInstance);
}
