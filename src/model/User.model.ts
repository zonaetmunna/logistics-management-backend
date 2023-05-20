import mongoose, { Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isStrongPassword from "validator/lib/isStrongPassword";
import isURL from "validator/lib/isURL";

enum UserRole {
    Buyer = "buyer",
    StoreManager = "store-manager",
    Admin = "admin",
}

enum Division {
    Dhaka = "dhaka",
    Rajshahi = "rajshahi",
    Chattogram = "chattogram",
    Sylhet = "sylhet",
    Khulna = "khulna",
    Barishal = "barishal",
    Rangpur = "rangpur",
    Mymensingh = "mymensingh",
}

export interface IUser extends Document {
    email: string;
    password: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emergencyContactNumber?: string;
    shippingAddress?: string;
    division: Division;
    imageURL?: string;
    status: "active" | "inactive" | "blocked";
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        email: {
            type: String,
            validate: [isEmail, "Provide a valid Email"],
            trim: true,
            lowercase: true,
            unique: true,
            required: [true, "Email address is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: (value: string) =>
                    isStrongPassword(value, {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1,
                        minSymbols: 1,
                    }),
                message: "Password is not strong enough.",
            },
        },
        role: {
            type: String,
            enum: Object.values(UserRole),
            default: UserRole.Buyer,
        },
        firstName: {
            type: String,
            required: [true, "Please provide a first name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a last name"],
            trim: true,
            minLength: [3, "Name must be at least 3 characters."],
            maxLength: [100, "Name is too large"],
        },
        contactNumber: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => isMobilePhone(value),
                message: "Please provide a valid phone number",
            },
        },
        emergencyContactNumber: {
            type: String,
            unique: true,
            validate: {
                validator: (value: string) => isMobilePhone(value),
                message: "Please provide a valid phone number",
            },
        },
        shippingAddress: String,
        division: {
            type: String,
            required: true,
            lowercase: true,
            enum: Object.values(Division),
            message: "{VALUE} is not a correct division!",
        },
        imageURL: {
            type: String,
            validate: [isURL, "Please provide a valid URL"],
        },
        status: {
            type: String,
            default: "active",
            enum: ["active", "inactive", "blocked"]
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;