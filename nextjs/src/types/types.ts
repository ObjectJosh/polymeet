export interface UserForm {
    firstName: string;
    lastName: string;
    email: string;
}

export interface FormProps {
    formId: string;
    userForm: UserForm;
    forNewUser: boolean;
}

export interface UsersType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Users {
    users: UsersType[];
}

export interface UserProps {
    user: UsersType;
}

export interface ServerSideProps {
    params: {
        id: string;
    };
}

export type TResponse = {
    ok: boolean;
    status: number | undefined;
    json: () => Promise<any>;
};

export type App = {
    Component: any;
    pageProps: any;
};

export type FormError = Omit<UserForm, ''>;

export type ApiWithIdParam = { params: { id: string } };

export type IError = {
    success: boolean,
    message: string
}
