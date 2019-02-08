import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';

export class PermissionGuard {
    public static guards = [];

    public static forPermission(permission: string) {

        @Injectable()
        class WrappedPermissionGuard implements CanActivate {
            constructor() { //todo add store
            }

            canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
                //todo get permissions list from store
                console.log('permissions checked');
                const usersPermissions = ['test.test'];
                return usersPermissions.includes(permission);
            }

        }

        this.guards.push(WrappedPermissionGuard);
        return WrappedPermissionGuard;
    }
}
