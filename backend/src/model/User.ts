import mongoose, { AnyArray, ArrayExpression, Document, Model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_F = 10

interface IUser extends Document {
    email: string
    password: string
    role: number // 0:admin, 1:teacher, 2:student
    courses: AnyArray<string> // kurzus nev??
    comparePwd: (cPass: string, callback: (error: Error | null, isMatch: boolean) => void) => void
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true
    },
    courses: {
        type: Array,
        required: true
    }
})

//hook
UserSchema.pre<IUser>('save', function(next) {
    const user = this

    //hash pwd
    bcrypt.genSalt(SALT_F, (err, salt) => {
        if (err) {
            return next(err)
        }
        bcrypt.hash(user.password, salt, (error, encrypted) => {
            if (error) {
                return next(error)
            }
            user.password = encrypted
            next()
        })
        
    })
})


UserSchema.methods.comparePwd = function(cPass: string, callback: (error: Error | null, isMatch: boolean) => void): void {
    const user = this    
    bcrypt.compare(cPass, user.password, (error, isMatch) => {
        if (error) {
            callback(error, false)
        }
        callback(null, isMatch)
    })
}

export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema)



