import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getCurrentUser} from '@logic/store';
import {first, map} from 'rxjs/operators';
import {User} from '@logic/models/user';
import {PermissionsUtil} from '@logic/utils/permissions.util';

export class PermissionGuard {
    public static guards = [];

    public static forPermission(permission: string) {

        @Injectable()
        class WrappedPermissionGuard implements CanActivate {
            constructor(private store: Store<{}>) {
            }

            canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
                return this.store.pipe(
                    select(getCurrentUser),
                    first(),
                    map((user: User) => {
                        if (user && PermissionsUtil.canAccess(user.permissions, permission)) {
                            return true;
                        }
                        return false;
                    })
                );
            }

        }

        this.guards.push(WrappedPermissionGuard);
        return WrappedPermissionGuard;
    }
}
