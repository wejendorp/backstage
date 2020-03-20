import { FC } from 'react';
declare type User = {
    gender: string;
    name: {
        title: string;
        first: string;
        last: string;
    };
    location: object;
    email: string;
    login: object;
    dob: object;
    registered: object;
    phone: string;
    cell: string;
    id: {
        name: string;
        value: string;
    };
    picture: {
        medium: string;
    };
    nat: string;
};
declare type DenseTableProps = {
    users: User[];
};
export declare const DenseTable: FC<DenseTableProps>;
declare const ExampleFetchComponent: FC<{}>;
export default ExampleFetchComponent;
