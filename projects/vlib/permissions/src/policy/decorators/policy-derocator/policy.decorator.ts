import { addMetaField } from '../../helpers/add-meta-field';
import { PolicyMetaInterface } from './models/policy-meta.interface';
import { ROLE_META } from '../../../meta/metadata/meta-keys';




export function Policy(fn: (...args: any[]) => boolean): any {
    return (target: object, propertyKey: string, _: PropertyDescriptor): any => {

        const rolesField: PolicyMetaInterface = {
            target,
            propertyKey,
            policyFn: fn
        };

        addMetaField<PolicyMetaInterface>(target, ROLE_META, rolesField);
    };
}
