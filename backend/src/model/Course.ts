import mongoose, { AnyArray, Document, Model, Schema } from 'mongoose'

// nevet, leírást, ütemtervet, diákok limitjét, tanár nevét, státusz
interface ICourse extends Document {
    title: string
    description: string
    roadmap: string
    limit: number
    students: AnyArray<string> //usename??
    teacher: string
    active: number
}

const CourseSchema: Schema<ICourse> = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    roadmap: {
        type: String,
        required: true
    },
    limit: {
        type: Number,
        required: true
    },
    teacher: {
        type: String,
        required: true
    },
    active: {
        type: Number,
        required: true
    },
    students: {
        type: Array,
        required: true
    }
})


export const Course: Model<ICourse> = mongoose.model<ICourse>("Course", CourseSchema)



