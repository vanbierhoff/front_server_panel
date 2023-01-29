import { InstanceFromPolicyInterface } from '../../decorators/to-array';


export function getInstanceArray(policyList: InstanceFromPolicyInterface[], separatorResults: string[]): InstanceFromPolicyInterface {
    let instanceArray: InstanceFromPolicyInterface;

    policyList.some((policyItem: InstanceFromPolicyInterface) => {
        if ((policyItem?.parentField === separatorResults[separatorResults.length - 2])) {
            instanceArray = policyItem;
            return true;
        }
    });


    return instanceArray;
}
