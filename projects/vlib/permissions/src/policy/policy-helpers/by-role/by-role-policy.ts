export type InstanceWithUserRoles = {
    user: {
        roles: string[];
    };
}


export function byRolePolicy<T extends InstanceWithUserRoles>(conditionRoles: string[]):
    (target: object, instance: Record<string, T>, propertyKey: string) => boolean {
    return (target: object, instance: Record<string, T>, propertyKey: string): boolean => {
        let authService: InstanceWithUserRoles;

        Object.keys(instance).some(key => {
            if ('user' in instance[key] && 'roles' in instance[key].user) {
                authService = instance[key];
                return true;
            }
        });
        if (!authService) {
            throw new Error('AuthService non-existent');
        }
        /// CHECK FOR AUTH SERVICE IN INSTANCE
        if (Array.isArray(authService.user.roles)) {
            return authService.user.roles.some(userRole => conditionRoles.some(roleUser => userRole === roleUser));
            // searching first coincidence of roles in arrays.
        }
        throw new Error('user roles not array');
    };
}


