import IconSentinel from "../../../assets/utils/IconSentinel.jsx";
import AuthTemplate from "../../../Templates/AuthTemplate/index.jsx";
import { useState } from "react";
import FormAuthWrapper from "../../../components/FormAuthWrapper/index.jsx";


function Login() {
    const [ iconPassword, setIconPassword ] = useState( IconSentinel.getIcon( "eye-closed.svg" ) );

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
