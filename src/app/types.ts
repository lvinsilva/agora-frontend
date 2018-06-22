
export interface User  {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
}

export interface Query {
    allUsers: User[];
}
