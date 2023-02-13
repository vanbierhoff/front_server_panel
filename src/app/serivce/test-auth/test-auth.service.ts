import { Injectable } from '@angular/core';
import { InstanceWithUserRoles } from '@policy/policy/policy-helpers/by-role/by-role-policy';


@Injectable({
    providedIn: 'root'
})
export class TestAuthService implements InstanceWithUserRoles {

    constructor() {
    }

    get user() {
        return {
            roles: ['ADMIN']
        };
    }

}

