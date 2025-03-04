import {useRef} from 'react';
import "./styles/main.scss";
import usePasswordVisibility from "./hooks/usePasswordVisibility.js";
import useHandleValidateForm from "./hooks/useHandleValidateForm.js"

const FormAuthWrapper = ({title, typeAuth, action, handleFormAuth}) => {
    const [iconPassword, showPassword, togglePasswordVisibility] = usePasswordVisibility();
    const formRef = useRef(null);

    return (
        <div className="form-auth-wrapper auth-login">
            <h1>
                {title}
            </h1>

            <div className={"separator"}></div>

            <form
                action={action}
                className="form-control"
                onSubmit={() => handleFormAuth(formRef)}
                ref={formRef}
            >
                <p>
                    <small>
                        * Todos os campos com asteriscos são obrigatórios.
                    </small>
                </p>

                <div className={"container-wrapper"}>
                    {
                        typeAuth === "register" && (
                            <div className="form-group">
                                <label htmlFor="name">* Nome</label>
                                <input
                                    className="input-field"
                                    type="text"
                                    placeholder="Nome"
                                    name="name"
                                    required
                                    pattern="[a-zA-Z\s]{5,}"
                                    title="Por favor, informe um nome válido."
                                />
                            </div>
                        )
                    }
                    <div className="form-group">
                        <label htmlFor="name">* E-mail</label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="E-mail"
                            name="email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}"
                            title="Por favor, informe um e-mail válido."
                        />
                    </div>
                    <div className="form-group-password">
                        <label htmlFor="name">* Password</label>
                        <div className={"group"}>
                            <input
                                className="input-field"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Senha"
                                required
                                pattern="(?=.*[a-zA-Z])(?=.*\d).{8,}"
                                title="Senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número."
                            />
                            <button
                                className="btn-visibility-password"
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                    className="icon-interface"
                                    src={iconPassword} alt="Icone de mostrar a senha"
                                />
                            </button>
                        </div>

                    </div>

                </div>

                <button
                    type="submit"
                    className="btn-auth-primary"
                    disabled={false}
                    onClick={(event) => {
                        event.preventDefault();
                        useHandleValidateForm(formRef, typeAuth)
                    }}
                >
                    {typeAuth.toLowerCase() === "login" ? "Login" : "Sign up"}
                </button>


                <div className={"separator"}></div>

                <a
                    href={`/${typeAuth.toLowerCase() === "login" ? "register" : "login"}`}
                    type={"button"}
                    className={"btn-auth-secondary"}
                >
                    {typeAuth.toLowerCase() === "login" ? "Sign up" : "Login"}
                </a>
            </form>
        </div>
    );
};

export default FormAuthWrapper;
