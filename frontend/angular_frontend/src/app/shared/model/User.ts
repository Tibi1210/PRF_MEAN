export interface User {
    name: string
    email: string
    password: string
    role?: number
    courses?: Array<string>
}