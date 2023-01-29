import { InstanceFromPolicyInterface } from '../../../decorators/to-array';


export interface FieldParserStateInterface<T> {
    parentState: T;
    state: any;
    metaArrayParent?: InstanceFromPolicyInterface[][];
}
