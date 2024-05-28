import Form from '../components/Form';

const NewUser = () => {
    const userForm = {
        first_name: '',
        last_name: '',
        email: '',
    };

    return <Form formId='add-user-form' userForm={userForm} forNewUser />;
};

export default NewUser;
