import mongoose, { Schema } from "mongoose";


const UserSchema: Schema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true,
            unique: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        avatar: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true
    },
) ;

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;