import { z } from 'zod';

// User profile update schema
export const userProfileSchema = z.object({
    userName: z
        .string()
        .min(1, 'Username is required')
        .min(2, 'Username must be at least 2 characters')
        .max(50, 'Username must be less than 50 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
    avatar: z.string().url('Please enter a valid URL').optional(),
});

// User settings schema
export const userSettingsSchema = z.object({
    notifications: z.object({
        email: z.boolean(),
        push: z.boolean(),
        sms: z.boolean(),
    }),
    privacy: z.object({
        profileVisibility: z.enum(['public', 'private', 'friends']),
        showEmail: z.boolean(),
        showActivity: z.boolean(),
    }),
    preferences: z.object({
        theme: z.enum(['light', 'dark', 'system']),
        language: z.string(),
        timezone: z.string(),
    }),
});

// Type exports
export type UserProfileFormData = z.infer<typeof userProfileSchema>;
export type UserSettingsFormData = z.infer<typeof userSettingsSchema>;
