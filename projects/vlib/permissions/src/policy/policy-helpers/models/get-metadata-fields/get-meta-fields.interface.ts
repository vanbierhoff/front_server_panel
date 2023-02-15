import { FieldParserInterface } from '../field-parser/field-parser.interface';
import { MetaCollection } from '../../../models/meta-collection';
import { MetadataInterface } from '../../../decorators/fv-meta/models/metadata.interface';


export interface MetaFieldsInterface {
    metadata: FieldParserInterface;
    metaCollection: MetaCollection;
    metaInstance: MetadataInterface[];
}
