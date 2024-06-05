import Form from '../components/Form';

const NewUser = () => {
    const userForm = {
        firstName: '',
        lastName: '',
        email: '',
    };

    return <Form formId='add-user-form' userForm={userForm} forNewUser />;
};

export default NewUser;
