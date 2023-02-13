import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TestService } from './serivce/test.service';
import { V_PERMISSION, V_PERMISSIONS_SERVICE } from '@policy/services/permissions/models/tokens/permission-tokens';
import { InstanceWithUserRoles } from '@policy/policy/policy-helpers/by-role/by-role-policy';
import { TestPolicy } from '../../projects/vlib/permissions/src/services/permissions/tests/test-policy';
import { PermissionService } from '@policy/services/permissions/permissions.service';
import {
    UPDATE_PERMISSION,
    UPDATE_PERMISSION_TOKEN
} from '@policy/services/permissions/models/update-permissions/update-permissions';
import { TestAuthService } from './serivce/test-auth/test-auth.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        TestService,
        {
            provide: V_PERMISSION,
            useFactory: (auth: InstanceWithUserRoles) => new TestPolicy(auth),
            deps: [TestAuthService]
        },
        {
            provide: V_PERMISSIONS_SERVICE,
            useClass: PermissionService
        },

        {
            provide: UPDATE_PERMISSION_TOKEN,
            useValue: UPDATE_PERMISSION
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
