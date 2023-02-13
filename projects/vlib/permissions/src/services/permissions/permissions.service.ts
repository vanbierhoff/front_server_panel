import { Observable, Observer, Subject } from 'rxjs';
import { VMetaPolicy } from '../../meta/v-policy';
import { FromMetaFactory } from '../../meta/by-meta-factory';
import { V_PERMISSION } from './models/tokens/permission-tokens';
import { PermissionServiceInterface } from './models/permissions.interface';
import { UPDATE_PERMISSION_TOKEN } from './models/update-permissions/update-permissions';
import { Inject, Injectable, OnDestroy } from '@angular/core';


@Injectable()
export class PermissionService<T extends object = any> implements OnDestroy, PermissionServiceInterface {

    constructor(
        @Inject(V_PERMISSION) private permissions: T & T[keyof T],
        @Inject(UPDATE_PERMISSION_TOKEN) private updatePermission: Subject<void>
        // protected auth: InstanceWithUserRoles
    ) {
        this.init();
    }

    public $change: Observable<void>;
    private observer: Observer<void>;

    private permissionInstance: T;

    private updatePermission$: Subject<void> = this.updatePermission;

    init(): void {
        this.permissionInstance = this.getInstance();

        this.$change = new Observable<void>(observer => {
            this.observer = observer;
        });

        this.updatePermission$.subscribe(() => {
            if (this.observer) {
                this.observer.next();
            }
        });
    }

    public isAllowed<T>(field: string): Promise<boolean> {
        return VMetaPolicy.isAllowed(this.permissionInstance, field);
    }

    public getInstanceByRole<T>(): Partial<T> {
        return FromMetaFactory.getInstanceByRole(this.permissions) as Partial<T>;
    }

    public getInstanceByPolicyWithKey<T extends object>(key: string): Partial<Partial<T[keyof T]>> {
        if (key in this.permissions) {
            return FromMetaFactory.getInstanceByRole(this.permissions[key]);
        }
        throw new Error(`Failed to get bar entity with key `);
    }

    public getInstance(): T {
        return FromMetaFactory.getInstance(this.permissions) as T;
    }

    public getInstanceByPolicy<T>(key: string): Record<string, T[keyof T]> {
        if (key in this.permissions) {
            return FromMetaFactory.getInstance(this.permissions[key]);
        }
    }

    public update(): void {
        this.updatePermission$.next();
    }

    ngOnDestroy(): void {
        this.updatePermission$.unsubscribe();
    }

}


