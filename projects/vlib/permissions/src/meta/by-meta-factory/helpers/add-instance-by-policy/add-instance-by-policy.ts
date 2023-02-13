import { PolicyMetaInterface } from '../../../../policy';
import { MetadataInterface } from '../../../../policy/decorators/fv-meta/models/metadata.interface';


export function addInstanceByPolicy<T>(this: any, role: PolicyMetaInterface, instance: Record<string, T>, key: string,
                                       instancePolicy: MetadataInterface[], arrayInstance?: Array<T>): void {
    if (role.policyFn.call(this, role.target, instancePolicy[0].fvMetaInstance, role.propertyKey)) {
        if (arrayInstance) {
            arrayInstance.push(instance[key] ?? null);
            return;
        }
        instance[key] = instance[key] ?? null;
        return;
    }
    delete instance[key];
}
