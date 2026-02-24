import AuthTemplate    from "../../../templates/AuthTemplate/index.jsx";
import FormAuthWrapper from "../../../components/FormAuthWrapper/index.jsx";

function Register() {
    return (
        <AuthTemplate>
            <FormAuthWrapper
                title={ "Register" }
                typeAuth={ "register" }
                action={ "POST" }
                handleFormAuth={ () => alert( "asdasd" ) }
            />
        </AuthTemplate>
    );
}

export default Register;
