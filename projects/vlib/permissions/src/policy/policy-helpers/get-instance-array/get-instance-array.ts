import { InstanceFromPolicyInterface } from '../../decorators/to-array';


export function getInstanceArray(policyList: InstanceFromPolicyInterface[] | InstanceFromPolicyInterface, separatorResults: string[]): InstanceFromPolicyInterface {
    let instanceArray: InstanceFromPolicyInterface;

    if (!Array.isArray(policyList)) {
        return policyList;
    }

    policyList.some((policyItem: InstanceFromPolicyInterface) => {
        if ((policyItem?.parentField === separatorResults[separatorResults.length - 2])) {
            instanceArray = policyItem;
            return true;
        }

    });


    return instanceArray;
}
