import { Component, OnInit } from '@angular/core';
import { TestService } from './serivce/test.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'server_panel';

    constructor(private test: TestService) {
    }


    ngOnInit(): void {
        this.test.get().subscribe(data => console.log(data));
    }
}
