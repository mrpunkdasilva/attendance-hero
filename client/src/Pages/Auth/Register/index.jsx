import { useState } from "react";
import IconSentinel from "../../../utils/IconSentinel.jsx";
import AuthTemplate from "../../../Templates/AuthTemplate/index.jsx";
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
