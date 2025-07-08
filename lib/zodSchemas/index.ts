// Export all authentication schemas
export {
    loginSchema,
    signUpSchema,
    passwordResetSchema,
    newPasswordSchema,
    type LoginFormData,
    type SignUpFormData,
    type PasswordResetFormData,
    type NewPasswordFormData,
} from './auth';

// Export all user schemas
export {
    userProfileSchema,
    userSettingsSchema,
    type UserProfileFormData,
    type UserSettingsFormData,
} from './user';

// Export all streak schemas
export {
    createStreakSchema,
    updateStreakSchema,
    logStreakActivitySchema,
    type CreateStreakFormData,
    type UpdateStreakFormData,
    type LogStreakActivityFormData,
} from './streak';

// Re-export commonly used Zod utilities
export { z } from 'zod';
