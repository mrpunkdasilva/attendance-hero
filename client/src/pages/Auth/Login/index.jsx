import AuthTemplate    from "../../../templates/AuthTemplate/index.jsx";
import FormAuthWrapper from "../../../components/FormAuthWrapper/index.jsx";


function Login() {
    return (
        <AuthTemplate>
            <FormAuthWrapper
                title={"Login"}
                typeAuth={"login"}
                action={"POST"}
                handleFormAuth={()=> alert("asdasd")}
            />
        </AuthTemplate>
    );
}


export default Login;
