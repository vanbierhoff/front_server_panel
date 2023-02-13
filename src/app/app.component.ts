import { Component, Inject } from '@angular/core';
// import 'reflect-metadata';
import { V_PERMISSIONS_SERVICE } from '@policy/services/permissions/models/tokens/permission-tokens';
import { PermissionService } from '@policy/services/permissions/permissions.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        @Inject(V_PERMISSIONS_SERVICE) private permissions: PermissionService
    ) {
    }

    title = 'policy';

}
