import { PermissionService } from './permissions.service';
import { TestBed } from '@angular/core/testing';
import { V_PERMISSION } from './models/tokens/permission-tokens';
import { TestPolicy } from '@policy/services/permissions/tests/test-policy';
import { TestAuthService } from '../../../../../../src/app/serivce/test-auth/test-auth.service';
import { TestRoleList } from '@policy/services/permissions/tests/test-role-list';
import { UPDATE_PERMISSION_TOKEN } from '@policy/services/permissions/models/update-permissions/update-permissions';
import { Subject } from 'rxjs';



describe('Permissions Service', () => {
    let permissionService: PermissionService;
    const fakeAuthService = jasmine.createSpyObj('AuthorizationService', ['user']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            providers: [
                {provide: TestAuthService, useValue: fakeAuthService},

                {provide: UPDATE_PERMISSION_TOKEN, useValue: new Subject()},

                {provide: TestPolicy, useValue: TestPolicy},
                PermissionService,
                {
                    provide: V_PERMISSION,
                    useFactory: (auth: TestAuthService) => new TestPolicy(auth),
                    deps: [TestAuthService]
                }
            ]
        });

        Object.defineProperty(fakeAuthService, 'user', {
            value: {
                roles: []
            }
        });

        fakeAuthService.user = {
            roles: [TestRoleList.ADMIN, TestRoleList.SUPER_USER]
        };

        fakeAuthService.__proto__ = TestAuthService;
        permissionService = TestBed.inject(PermissionService);

    });


    it('should be available test.arrayNestedContains.contains[1] (result => true)', async () => {
        const result = await permissionService.isAllowed('test.arrayNestedContains.contains[1]');
        expect(result).toBeTrue();
    });


    it('should be available test.arrayNested(result => true)', async () => {
        const result = await permissionService.isAllowed('test.arrayNested[0]');
        expect(result).toBeTrue();
    });

    it('should be available test.forAll (result => true)', async () => {
        const result = await permissionService.isAllowed('test.forAll');
        expect(result).toBeTrue();
    });

    it('should be not available (result => false)', async () => {
        fakeAuthService.user.roles = [TestRoleList.SUPER_USER];
        const result = await permissionService.isAllowed('test.testing');
        expect(result).toBeFalse();
    });

    it('arrayNested should not be exist for USER role', async () => {
        fakeAuthService.user.roles = [TestRoleList.SUPER_USER];
        const result: any = await permissionService.getInstanceByPolicyWithKey<TestPolicy>('test');
        expect(result?.testing).toBeFalsy();
    });

    it('should be not available for SUPER_USER test.arrayNestedContains.contains[2] (result => false)', async () => {
        fakeAuthService.user.roles = [TestRoleList.SUPER_USER];
        const result = await permissionService.isAllowed('test.arrayNestedContains.contains[2]');
        expect(result).toBeFalse();
    });

    it('forAll should not be exist for empty role', async () => {
        fakeAuthService.user.roles = [];
        const result: any = await permissionService.getInstanceByPolicyWithKey<TestPolicy>('test');
        expect(result?.forAll).toBeFalsy();
    });

    it('should be error => Field under validation does not exist or you use getInstanceByPolicy method', async () => {
        try {
            // We get non-existent field
            const result = await permissionService.isAllowed('menu.payments.nonExisted').catch(e => e);
        }
        catch (e) {
            const regexp = /Field under validation does not exist or you use getInstanceByPolicy method/ig;
            // @ts-ignore
            expect(regexp.test(e)).toBeTrue();
        }
    });
});
