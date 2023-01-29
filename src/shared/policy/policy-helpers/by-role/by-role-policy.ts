export interface InstanceFormByRole {
    auth?: any;
}


export function byRolePolicy<T extends InstanceFormByRole>(conditionRoles: string[]):
    (target: object, instance: T, propertyKey: string) => boolean {
    return (target: object, instance: T, propertyKey: string): boolean => {
        let authService: any;
        Object.keys(instance).forEach(key => {
            if ('user' in instance[key] && 'roles' in instance[key].user) {
                authService = instance[key];
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


