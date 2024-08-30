import IconSentinel from "../../../assets/utils/IconSentinel.jsx";
import AuthTemplate from "../../../Templates/AuthTemplate/index.jsx";
import { useState } from "react";


function Login() {
    const [ iconPassword, setIconPassword ] = useState( IconSentinel.getIcon( "eye-closed.svg" ) );

    return (
        <AuthTemplate>

            // TODO: Create component FormAuthWrapper
            <div className="form-auth-wrapper auth-login">
                <h1>
                    Login
                </h1>

                <hr/>

                <form action="POST" className="form-control">
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
                            type="password"
                            placeholder="Senha"
                            name="password"
                            required
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            title="Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
                        />

                        <button
                            className="btn-visibility-password"
                            type="button"
                            onClick={ () => {
                                const passwordInput = document.querySelector( "input[name='password']" );
                                let statusVisibilityPassword;

                                if ( passwordInput.type === "password" ) {
                                    statusVisibilityPassword = "text";
                                    setIconPassword( IconSentinel.getIcon( "eye-open.svg" ) );
                                } else {
                                    statusVisibilityPassword = "password";
                                    setIconPassword( IconSentinel.getIcon( "eye-closed.svg" ) );
                                }

                                passwordInput.type = statusVisibilityPassword;
                            } }
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
                        onClick={ (event) => {
                            // TODO: Implementar a função de login
                            event.preventDefault();
                            alert( "Login efetuado com sucesso!" );
                        } }
                    >
                        Entrar
                    </button>

                    <hr className="separator"/>

                    <button
                        type={"button"}
                        className={"btn-auth-secondary"}
                        onClick={( event ) => {
                            // TODO: Implementar a função de redirecionamento para a tela de cadastro
                            event.preventDefault();
                            alert( "Você será redirecionado para a tela de cadastro." );
                        }}
                    >
                        Criar conta
                    </button>
                </form>
            </div>
        </AuthTemplate>
    );
}


export default Login;