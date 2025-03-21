import Checker from "../../../utils/Checker.js";

/**
 * This function handles form validation for user authentication.
 * It checks if the required fields are filled and validates the email and password based on the specified authentication type.
 *
 * @param {React.RefObject<HTMLFormElement>} formRef - A reference to the form element.
 * @param {string} typeAuth - The type of authentication ("register" or "login").
 *
 * @returns {void}
 */
const useHandleValidateForm = ( formRef, typeAuth ) => {
    const form = formRef;
    const inputsForm = form.current.getElementsByTagName( "input" );
    let inputsUsed = {
        email : false, password : false, name : false,
    };

    inputsUsed.email = inputsForm.email;
    inputsUsed.password = inputsForm.password;

    if ( Checker.checkInputIsEmpty( { name : "e-mail", value : inputsUsed.email.value } ) ) return;
    if ( Checker.checkInputIsEmpty( { name : "senha", value : inputsUsed.password.value } ) ) return;

    if ( typeAuth === "register" ) {
        inputsUsed.name = inputsForm.name;
        if ( Checker.checkInputIsEmpty( { name : "nome", value : inputsUsed.name.value } ) ) return;

        Checker.checkName( inputsUsed.name );
        Checker.checkEmail( inputsUsed.email );
        Checker.checkPassword( inputsUsed.password );
    }

    if ( typeAuth === "login" ) {
        Checker.checkEmail( inputsUsed.email );
        Checker.checkPassword( inputsUsed.password );
    }

}

export default useHandleValidateForm;