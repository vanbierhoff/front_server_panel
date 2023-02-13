import { InstanceFromPolicy, Policy, VMetaDecorator } from '@policy/policy';
import { byRolePolicy } from '@policy/policy/policy-helpers/by-role/by-role-policy';
import { TestAuthService } from '../../../../../../../src/app/serivce/test-auth/test-auth.service';
import { TestRoleList } from '@policy/services/permissions/tests/test-role-list';


@VMetaDecorator()
export class ArrayTestNested {

    constructor() {
    }

    @Policy(byRolePolicy([TestRoleList.SUPER_USER]))
    public arrayOne = {};

    @Policy(byRolePolicy([TestRoleList.ADMIN]))
    public arrayTwoSuper = {};

    @Policy(byRolePolicy([TestRoleList.ADMIN]))
    public arrayThreeSuper = {};
}



@VMetaDecorator()
export class TestNested {

    constructor(protected auth: TestAuthService) {
    }

    @Policy(byRolePolicy([TestRoleList.ADMIN]))
    public testing = {};

    @Policy(byRolePolicy([TestRoleList.ADMIN, TestRoleList.SUPER_USER]))
    public forAll = {};

    @InstanceFromPolicy(new ArrayTestNested(), (byRolePolicy([TestRoleList.SUPER_USER])))
    public arrayNested = {};


    @InstanceFromPolicy(new ArrayTestNested(), (byRolePolicy([TestRoleList.ADMIN])), 'contains')
    public arrayNestedContains = {};
}

