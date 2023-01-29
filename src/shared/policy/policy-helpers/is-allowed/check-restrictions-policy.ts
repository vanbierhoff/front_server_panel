import { FieldParserInterface } from '@shared/decorators/policy-derocator/policy-helpers/models/field-parser/field-parser.interface';
import { MetaCollection } from '@shared/decorators/models/meta-collection';
import { MetadataInterface } from '@shared/decorators/fv-meta/models/metadata.interface';
import some from 'lodash/some';


export function checkRestrictionsPolicy<T>(metadata: FieldParserInterface,
                                           metaCollection: MetaCollection, metaInstance: MetadataInterface): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        const REG_EXP = /\d/ig;
        if (REG_EXP.test(metadata.field)) {
            res(metaCollection[+metadata.field].policyFn.bind(this,
                metaCollection[+metadata.field].target, metaInstance[0].fvMetaInstance, metadata.field)());
        }


        some(metaCollection, (fvMetaInstance, index) => {
            if (fvMetaInstance.propertyKey === metadata.field) {
                res(fvMetaInstance.policyFn.bind(this, metaCollection[index].target, metaInstance[0].fvMetaInstance, metadata.field)());
            }
        });
        throw new Error('state or field does not exist');

    });
}
