export class PermissionsUtil {

    public static canAccess(permissions: string[], requiredPermission: string) {
        if (permissions.indexOf(requiredPermission) !== -1) {
            return true;
        }
        const splitted = requiredPermission.split('.');
        let permissionChecked = '';
        for (const fragment of splitted) {
            if (permissions.indexOf(permissionChecked + '*') !== -1) {
                return true;
            }
            permissionChecked += fragment + '.';
        }
        return false;
    }

}
