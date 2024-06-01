export type Omit<T, U extends keyof T> = Pick<T, Exclude<keyof T, U>>;
