import Checker from "../../../utils/Check.js";

const useHandleValidateForm = ( formRef, typeAuth ) => {
    const form = formRef;
    const inputsForm = form.current.getElementsByTagName( "input" );
    let inputsUsed = {
        email : false, password : false, name : false,
    };
    let input = {};

    inputsUsed.email = inputsForm.email;
    inputsUsed.password = inputsForm.password;

    if ( Checker.checkInputIsEmpty( { name : "e-mail", value : inputsUsed.email.value } ) ) return;
    if ( Checker.checkInputIsEmpty( { name : "senha", value : inputsUsed.password.value } ) ) return;

    if ( typeAuth === "register" ) {
        inputsUsed.name = inputsForm.name;
        if ( Checker.checkInputIsEmpty( { name : "nome", value : inputsUsed.name.value } ) ) return;

        Checker.checkEmail( inputsUsed.email );
        Checker.checkPassword( inputsUsed.password );
        Checker.checkName( inputsUsed.name );
    }

    if ( typeAuth === "login" ) {
        Checker.checkEmail( inputsUsed.email );
        Checker.checkPassword( inputsUsed.password );
    }

}

export default useHandleValidateForm;
