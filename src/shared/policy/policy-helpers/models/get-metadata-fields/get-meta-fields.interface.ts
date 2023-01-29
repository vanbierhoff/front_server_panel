import { FieldParserInterface } from '@shared/decorators/policy-derocator/policy-helpers/models/field-parser/field-parser.interface';
import { MetaCollection } from '@shared/decorators/models/meta-collection';
import { MetadataInterface } from '@shared/decorators/fv-meta/models/metadata.interface';

export interface MetaFieldsInterface {
    metadata: FieldParserInterface;
    metaCollection: MetaCollection;
    metaInstance: MetadataInterface;
}
