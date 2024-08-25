import {useState} from "react";
import IconSentinel from "../../../assets/utils/IconSentinel.jsx";
import AuthTemplate from "../../../Templates/AuthTemplate/index.jsx";
// TODO: transformar isso => formAuthWrapper em um component para usar no Login também
function Register() {
    const [iconPassword, setIconPassword] = useState(IconSentinel.getIcon("eye-closed.svg"));

    return (
        <AuthTemplate>
            <div className="form-auth-wrapper auth-login">
                <h1>
                    Cadastrar
                </h1>

                <hr/>

                <form action="POST" className="form-control">
                    <div className="form-group">
                        <input
                            className="input-field"
                            type="text"
                            placeholder="Nome"
                            name="name"
                            required
                            pattern="[a-zA-Z\s]+"
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
                            onClick={() => {
                                const passwordInput = document.querySelector("input[name='password']");
                                let statusVisibilityPassword;

                                if (passwordInput.type === "password") {
                                    statusVisibilityPassword = "text";
                                    setIconPassword(IconSentinel.getIcon("eye-open.svg"));
                                } else {
                                    statusVisibilityPassword = "password";
                                    setIconPassword(IconSentinel.getIcon("eye-closed.svg"));
                                }

                                passwordInput.type = statusVisibilityPassword;
                            }}
                        >
                            <img
                                className="icon-interface"
                                src={iconPassword} alt="Icone de mostrar a senha"
                            />
                        </button>
                    </div>
                </form>
            </div>
        </AuthTemplate>
    );
}

export default Register;