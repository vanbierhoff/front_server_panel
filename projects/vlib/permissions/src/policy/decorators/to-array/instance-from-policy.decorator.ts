import { InstanceFromPolicyInterface } from './models/instance-from-policy.interface';
import { PolicyMetaInterface } from '../policy-derocator';
import { addMetaField } from '../../helpers/add-meta-field';
import { ROLE_META, TO_ARRAY_BY_ROLE } from '../../../meta/metadata/meta-keys';


export function InstanceFromPolicy<T>(instance: T, fn: (...args: any) => boolean, parentField?: string): any {
    return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

        const metadata: InstanceFromPolicyInterface = {
            target,
            propertyKey,
            parentField,
            instance: instance.constructor,
            policyFn: fn
        };

        const policyMetadata: PolicyMetaInterface = {
            target,
            propertyKey,
            policyFn: fn
        };

        addMetaField<InstanceFromPolicyInterface>(target, TO_ARRAY_BY_ROLE, metadata);
        addMetaField<PolicyMetaInterface>(target, ROLE_META, policyMetadata);

    };
}
