import React, {useRef} from 'react';
import "./styles/main.scss";
import usePasswordVisibility from "./hooks/usePasswordVisibility.js";
import useHandleValidateForm from "./hooks/useHandleValidateForm.js"
import { FcGoogle } from 'react-icons/fc'; // Import Google icon from react-icons/fc
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons for password visibility

const FormAuthWrapper = ({title, typeAuth, action, handleFormAuth, handleGoogleLogin}) => {
    const [IconComponent, showPassword, togglePasswordVisibility] = usePasswordVisibility();
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
                onSubmit={(event) => {
                    event.preventDefault();
                    const formData = new FormData(formRef.current);
                    const email = formData.get('email');
                    const password = formData.get('password');
                    handleFormAuth({ email, password });
                }}
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
                        <label htmlFor="email">* E-mail</label>
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
                        <label htmlFor="password">* Password</label>
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
                                <IconComponent size={24} />
                            </button>
                        </div>

                    </div>

                </div>

                <button
                    type="submit"
                    className="btn-auth-primary"
                    disabled={false}
                >
                    {typeAuth.toLowerCase() === "login" ? "Login" : "Sign up"}
                </button>


                {handleGoogleLogin && (
                    <>
                        <div className={"separator"}></div> {/* Add a separator before Google button */}
                        <button
                            type="button"
                            className="btn-auth-google"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle size={24} style={{ marginRight: '10px' }} /> {/* Using FcGoogle icon */}
                            Login with Google
                        </button>
                    </>
                )}

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
