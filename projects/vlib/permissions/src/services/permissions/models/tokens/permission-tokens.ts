import { InjectionToken } from '@angular/core';
import { PermissionServiceInterface } from '../permissions.interface';


export const V_PERMISSION = new InjectionToken<object>('fvPermission');

export const V_PERMISSIONS_SERVICE = new InjectionToken<PermissionServiceInterface>('fvPermissionService');
