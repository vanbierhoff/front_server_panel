import { AddMetaOptionsInterface } from '../decorators/fv-meta/models/add-meta-options.interface';
import 'reflect-metadata';


export function addMetaField<Meta>(target: object, metaKey: string, metadata: Meta, options?: AddMetaOptionsInterface): void {
    const usedTarget = options?.notUseConstructor ? target : target.constructor;

    // getMeta
    const fieldList: Meta[] = (Reflect as any).getMetadata(metaKey,
        usedTarget);

    // if not meta - created
    if (!fieldList) {
        const newFieldList = [];
        newFieldList.push(metadata);
        (Reflect as any).defineMetadata(metaKey, newFieldList, usedTarget);
        return;
    }

    // If there is data, add a new field
    if (fieldList) {
        fieldList.push(metadata);
        (Reflect as any).defineMetadata(metaKey, fieldList, usedTarget
        );
        return;
    }
}
