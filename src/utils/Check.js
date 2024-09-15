import SwalFire from "./SwalFire.js";

class Checker {
     checkInputIsEmpty = ( input ) => {
        if ( input.value === "" || input.value === null ) {
            SwalFire.error( "Atenção", `O campo ${ input.name } é de preenchimento obrigatorio` )
            return true;
        }
        return false;
    };

     checkEmail = ( input ) => {
        if ( !input.checkValidity() ) {
            SwalFire.error( "Atenção", `E-mail invalido` );
            return;
        }
    };

     checkPassword = ( input ) => {
        if ( !input.checkValidity() ) {
            SwalFire.error( "Atenção", `Senha invalida. Deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.` );
            return;
        }
    };

     checkName = ( input ) => {
        if ( !input.checkValidity() ) {
            SwalFire.error( "Atenção", "Nome invalido" );
            return;
        }
    };
}

export default new Checker();
