import React, { useState } from 'react';
import usePasswordVisibility from "./hooks/usePasswordVisibility.js";

const FormAuthWrapper = ( { title, typeAuth, handleFormAuth } ) => {
    const [iconPassword, showPassword, togglePasswordVisibility ] = usePasswordVisibility();

    return (
        <div className="form-auth-wrapper auth-login">
            <h1>
                { title }
            </h1>

            <hr/>

            <form
                action="POST"
                className="form-control"
                onSubmit={ handleFormAuth }
            >
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
                        type={showPassword? "password" : "text"}
                        name="password"
                        placeholder="Senha"
                        required
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
                    />

                    <button
                        className="btn-visibility-password"
                        type="button"
                        onClick={togglePasswordVisibility}
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
                        event.preventDefault();
                        alert( "Login efetuado com sucesso!" );
                    } }
                >
                    Entrar
                </button>

                <hr className="separator"/>

                <button
                    type={ "button" }
                    className={ "btn-auth-secondary" }
                    onClick={ ( event ) => {
                        // TODO: Implementar a função de redirecionamento para a tela de cadastro
                        alert( "Você será redirecionado para a tela de cadastro." );
                    } }
                >
                    Criar conta
                </button>
            </form>
        </div>
    );
};

export default FormAuthWrapper;