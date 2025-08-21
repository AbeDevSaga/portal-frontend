"use server"

export interface Base {
    id?: string,
    version?: string,
    requesttime?: Date | null,
    metadata?: {},
}