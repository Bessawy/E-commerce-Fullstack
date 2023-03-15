

export type UserType = {
    id: number,
    name: string,
    role: "customer"|"admin",
    email: string,
    password: string,
    avatar: string
}

export interface CreateUserType{
    name: string,
    email: string,
    password: string,
    avatar: URL
}

export interface UserOptionalType{
    avatar?: string
    id?: number,
    name?: string,
    role?: "customer"|"admin",
    email?: string,
    password?: string
}

