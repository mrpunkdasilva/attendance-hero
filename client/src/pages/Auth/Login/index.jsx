import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTemplate    from "../../../templates/AuthTemplate/index.jsx";
import FormAuthWrapper from "../../../components/FormAuthWrapper/index.jsx";
import { loginUser, loginWithGoogle } from '../../../services/authService.js';
import SwalFire from '../../../utils/SwalFire.js';
import { FEATURES } from '../../../config/features.js';
// No longer need to import GoogleLogo here as it's handled by FormAuthWrapper

function Login() {
    const navigate = useNavigate();

    const handleLogin = async ({ email, password }) => {
        if (!FEATURES.ENABLE_EMAIL_PASSWORD_AUTH) return;
        try {
            await loginUser(email, password);
            SwalFire.success("Sucesso", "Login realizado com sucesso!");
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            let errorMessage = "Ocorreu um erro ao fazer login. Verifique suas credenciais.";
            if (error.code === 'auth/invalid-email') {
                errorMessage = "Formato de e-mail inválido.";
            } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                errorMessage = "E-mail ou senha incorretos.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMessage = "Muitas tentativas de login. Tente novamente mais tarde.";
            }
            SwalFire.error("Erro de Login", errorMessage);
            console.error("Firebase login error:", error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            SwalFire.success("Sucesso", "Login com Google realizado com sucesso!");
            navigate('/'); // Redirect to home after successful login
        } catch (error) {
            let errorMessage = "Ocorreu um erro ao fazer login com Google. Tente novamente.";
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = "O popup de login foi fechado.";
            } else if (error.code === 'auth/cancelled-popup-request') {
                errorMessage = "Requisição de popup cancelada. Tente novamente.";
            } else if (error.code === 'auth/configuration-not-found') {
                errorMessage = "Erro de configuração do Firebase. Verifique o console do Firebase (provedor Google, domínios autorizados).";
            }
            SwalFire.error("Erro de Login com Google", errorMessage);
            console.error("Firebase Google login error:", error);
        }
    };

    return (
        <AuthTemplate>
            <FormAuthWrapper
                title={"Login"}
                typeAuth={"login"}
                action={"POST"}
                handleFormAuth={handleLogin}
                handleGoogleLogin={handleGoogleLogin} // Pass the Google login handler
            />
        </AuthTemplate>
    );
}

export default Login;