import React, { useRef } from 'react';
import usePasswordVisibility from "./hooks/usePasswordVisibility.js";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useHandleValidateForm from "./hooks/useHandleValidateForm.js";

const FormAuthWrapper = ( { title, typeAuth, action, handleFormAuth } ) => {
    const [ iconPassword, showPassword, togglePasswordVisibility ] = usePasswordVisibility();
    const formRef = useRef( null );

    const MySwal = withReactContent( Swal );
    MySwal.fire( {
        title : <p>Hello World</p>,
        didOpen : () => {
            // `MySwal` is a subclass of `Swal` with all the same instance & static methods
            MySwal.fire( {
                icon : "error",
                title : "Atenção",
                text : "Este é um teste de formulário de login.",
                confirmButtonText : "Continuar",
                showCancelButton : false,
                showCloseButton : false,
            } )
        },
    } );

    return (
        <div className="form-auth-wrapper auth-login">
            <h1>
                { title }
            </h1>

            <hr className={ "separator" }/>

            <form
                action={ action }
                className="form-control"
                onSubmit={ handleFormAuth }
                ref={ formRef }
            >
                <div className="form-group">
                    <input
                        className="input-field"
                        type="text"
                        placeholder="Nome"
                        name="name"
                        required
                        pattern="[a-zA-Z\s-09]+"
                        title="Por favor, informe um nome válido."
                    />
                </div>
                <div className="form-group">
                    <input
                        className="input-field"
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        title="Por favor, informe um e-mail válido."
                    />
                </div>
                <div className="form-group">
                    <input
                        className="input-field"
                        type={ showPassword ? "password" : "text" }
                        name="password"
                        placeholder="Senha"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
                    />

                    <button
                        className="btn-visibility-password"
                        type="button"
                        onClick={ togglePasswordVisibility }
                    >
                        <img
                            className="icon-interface"
                            src={ iconPassword } alt="Icone de mostrar a senha"
                        />
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn-auth-primary"
                    disabled={ false }
                    onClick={ ( event ) => {
                        // TODO: Implementar a função de login
                        // event.preventDefault();
                        alert( "Login efetuado com sucesso!" );
                    } }
                >
                    { typeAuth.toLowerCase() === "login" ? "Login" : "Criar conta" }
                </button>

                <hr className={ "separator" }/>

                <button
                    type={ "button" }
                    className={ "btn-auth-secondary" }
                    onClick={ () => useHandleValidateForm( formRef ) }
                >
                    { typeAuth.toLowerCase() !== "login" ? "Login" : "Criar conta" }
                </button>
            </form>
        </div>
    );
};

export default FormAuthWrapper;