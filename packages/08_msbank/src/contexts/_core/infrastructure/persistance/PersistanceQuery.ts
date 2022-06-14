export type PersistanceQuery<T> = { [key in keyof T]?: T[key] };
