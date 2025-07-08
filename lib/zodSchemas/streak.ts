import { z } from 'zod';

// Create streak schema
export const createStreakSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    category: z
        .enum(['health', 'fitness', 'learning', 'productivity', 'mindfulness', 'other'])
        .default('other'),
    frequency: z.enum(['daily', 'weekly', 'monthly']).default('daily'),
    goal: z.number().min(1, 'Goal must be at least 1').max(365, 'Goal must be less than 365 days'),
    startDate: z.date().optional(),
    reminderTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)')
        .optional(),
});

// Update streak schema
export const updateStreakSchema = z.object({
    title: z
        .string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters')
        .optional(),
    description: z.string().max(500, 'Description must be less than 500 characters').optional(),
    category: z
        .enum(['health', 'fitness', 'learning', 'productivity', 'mindfulness', 'other'])
        .optional(),
    frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
    goal: z
        .number()
        .min(1, 'Goal must be at least 1')
        .max(365, 'Goal must be less than 365 days')
        .optional(),
    reminderTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time (HH:MM)')
        .optional(),
});

// Log streak activity schema
export const logStreakActivitySchema = z.object({
    streakId: z.string().min(1, 'Streak ID is required'),
    date: z.date().default(() => new Date()),
    notes: z.string().max(200, 'Notes must be less than 200 characters').optional(),
    completed: z.boolean().default(true),
});

// Type exports
export type CreateStreakFormData = z.infer<typeof createStreakSchema>;
export type UpdateStreakFormData = z.infer<typeof updateStreakSchema>;
export type LogStreakActivityFormData = z.infer<typeof logStreakActivitySchema>;
