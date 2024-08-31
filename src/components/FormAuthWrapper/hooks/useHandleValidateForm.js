import SwalFire from "../../../utils/SwalFire.js";

const useHandleValidateForm = ( formRef, typeAuth ) => {
    const form = formRef;
    const inputsForm = form.current.getElementsByTagName( "input" );
    let inputsUsed = {
        email : false,
        password : false,
        name : false,
    };

    inputsUsed.email = inputsForm.email;
    inputsUsed.password = inputsForm.password;

    // TODO: CHECK EMAIL AND PASSWORD IS EMPTY
    if ( inputsForm.email.value === "" || inputsForm.email.value === "" ) {
        SwalFire.error("Atenção", "Os campos são de preenchimento obrigatorio")
    }

    // TODO: VALIDATION REGISTER
    if ( typeAuth === "register" ) {
        inputsUsed.name = inputsForm.name;
    }

    // TODO: VALIDATION LOGIN
    if ( typeAuth === "login" ) {

    }
}

export default useHandleValidateForm;