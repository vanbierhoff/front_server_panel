import { FieldParserInterface, FieldParserStateInterface } from '../models';
import { getInstanceArray } from '../get-instance-array/get-instance-array';
import { TO_ARRAY_BY_ROLE } from '../../../meta/metadata/meta-keys';



/**
 * if we  want to get a  nested field =>  instance.field.nestedField, fieldParser return instance this field and itself field
 * @param  state - The entity in which we are looking for a field
 * @param  field - name field
 * @return FieldParserInterface
 */
export function fieldParser<T extends object>(state: T, field: string): FieldParserInterface {
    const REG_EXP = /(\w{1,25})?(\d{1,2)?/ig;
    let separatorResult: string[] = [];

    if (REG_EXP.test(field)) {
        separatorResult = field.match(REG_EXP)?.filter(item => !!item);
        const targetKey: string | number = separatorResult[separatorResult.length - 1];


        return {
            instanceField: getTargetField(separatorResult, {
                    parentState: state,
                    state
                },
                targetKey),
            field: separatorResult.pop()
        };
    }
    return {
        instanceField: state.constructor,
        field
    };
}

/**
 *
 * @param separatorResult - The string is split into an array of strings, each element is the level of the searched element in depth
 * @param instances: FieldParserStateInterface
 * @param targetEl - Desired end element
 * @param index - index of separatorResult
 */
export function getTargetField<T extends object>(
    separatorResult: string[], instances: FieldParserStateInterface<T>, targetEl: string | number, index = 0): object {

    if (targetEl in instances.state && index === separatorResult.length - 1) {
        if (instances.state.constructor === Array && 'metaArrayParent' in instances) {
            return getInstanceArray(instances.metaArrayParent[0], separatorResult).instance;
        }
        return instances.state.constructor;
    }

    try {
        if (targetEl in instances.state[separatorResult[index]] && index === separatorResult.length - 1) {

            if (instances.state[separatorResult[index]].constructor === Array && 'metaArrayParent' in instances.state) {
                return getInstanceArray(instances.metaArrayParent[0], separatorResult).instance;
            }
            return instances.state[separatorResult[index]].constructor;
        }
    }
    catch (e) {
        throw new Error('Field under validation does not exist or you use getInstanceByPolicy method ');
    }

    if (separatorResult[index] in instances.state) {
        // If the object (array) being checked is deep in the element tree,
        // its metadata belongs to another parent, check for the presence of meta
        const metaArrayParent = (Reflect as any).getMetadata(TO_ARRAY_BY_ROLE, instances.state.constructor) || [instances.metaArrayParent];

        return getTargetField(separatorResult, {
            state: instances.state[separatorResult[index]],
            parentState: instances.parentState,
            metaArrayParent
        }, targetEl, ++index);
    }
}
