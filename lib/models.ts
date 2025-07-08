import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema);
