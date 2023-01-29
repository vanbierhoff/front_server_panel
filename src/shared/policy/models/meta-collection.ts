import { PolicyMetaInterface } from '../decorators/policy-derocator';
import { InstanceFromPolicyInterface } from '../decorators/to-array';


export type MetaCollection = PolicyMetaInterface[] & InstanceFromPolicyInterface[] |
    InstanceFromPolicyInterface[] | PolicyMetaInterface[];
