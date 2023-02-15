import { Policy, VMetaDecorator } from '@policy/policy';
import { byRolePolicy } from '@policy/policy/policy-helpers/by-role/by-role-policy';
import { TestAuthService } from '../../../../../../../src/app/serivce/test-auth/test-auth.service';
import { TestNested } from './nested';


@VMetaDecorator()
export class TestPolicy {

    constructor(protected auth: TestAuthService) {
    }

    @Policy(byRolePolicy(['ADMIN']))
    public test = new TestNested(this.auth);


}
