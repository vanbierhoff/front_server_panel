import { InstanceFromPolicyInterface } from '../decorators/to-array';
import { PolicyMetaInterface } from '../decorators';


export type MetaCollection = PolicyMetaInterface[] & InstanceFromPolicyInterface[] |
    InstanceFromPolicyInterface[] | PolicyMetaInterface[];
