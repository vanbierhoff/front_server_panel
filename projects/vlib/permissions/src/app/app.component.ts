import { Component, OnInit } from '@angular/core';
import { INSTANCE_META } from '@policy/meta/metadata/meta-keys';
import { TestPolicy } from '@policy/services/permissions/tests/test-policy';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    ngOnInit() {
        console.log((Reflect as any).getMetadata(INSTANCE_META, TestPolicy));
    }

}
