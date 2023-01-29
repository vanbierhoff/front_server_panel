import { MetadataInterface } from './models/metadata.interface';
import { addMetaField } from '../../helpers/add-meta-field';


export function FvMetaDecorator(): any {
    return (target: any, propertyKey: string, _: PropertyDescriptor): any => {

        return class extends target {
            constructor(...args: any[]) {
                super(...args);

                const metaField: MetadataInterface = {
                    fvMetaInstance: this
                };

                addMetaField(target, INSTANCE_META, metaField, {
                    notUseConstructor: true
                });
            }
        };
    };
}
