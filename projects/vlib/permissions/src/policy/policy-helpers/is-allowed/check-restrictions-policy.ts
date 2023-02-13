import { FieldParserInterface } from '../models';
import { MetaCollection } from '../../models/meta-collection';
import { MetadataInterface } from '../../decorators/fv-meta/models/metadata.interface';


export function checkRestrictionsPolicy<T>(this: any, metadata: FieldParserInterface,
                                           metaCollection: MetaCollection, metaInstance: MetadataInterface[]): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
        const REG_EXP = /\d/ig;
        if (REG_EXP.test(metadata.field)) {
            res(metaCollection[+metadata.field].policyFn.bind(this,
                metaCollection[+metadata.field].target, metaInstance[0].fvMetaInstance, metadata.field)());
        }


        metaCollection.some((fvMetaInstance, index) => {
            if (fvMetaInstance.propertyKey === metadata.field) {
                res(fvMetaInstance.policyFn.bind(this, metaCollection[index].target, metaInstance[0].fvMetaInstance, metadata.field)());
            }
        });
        throw new Error('state or field does not exist');

    });
}
