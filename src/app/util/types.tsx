export type Fragment<T> = { [P in keyof T]?: T[P] };
