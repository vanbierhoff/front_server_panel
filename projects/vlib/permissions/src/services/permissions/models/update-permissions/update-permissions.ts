import { Subject } from 'rxjs';
import { InjectionToken } from '@angular/core';


export const UPDATE_PERMISSION_TOKEN = new InjectionToken<Subject<void>>('updatePermission');

export const UPDATE_PERMISSION = new Subject<void>();
