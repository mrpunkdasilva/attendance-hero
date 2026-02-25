import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthTemplate    from "../../../templates/AuthTemplate/index.jsx";
import FormAuthWrapper from "../../../components/FormAuthWrapper/index.jsx";
import { registerUser } from '../../../services/authService.js';
import SwalFire from '../../../utils/SwalFire.js';

function Register() {
    const navigate = useNavigate();

    const handleRegister = async ({ email, password }) => {
        try {
            await registerUser(email, password);
            SwalFire.success("Sucesso", "Usuário registrado com sucesso! Faça login para continuar.");
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            let errorMessage = "Ocorreu um erro ao registrar. Tente novamente.";
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = "Este e-mail já está em uso.";
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = "Formato de e-mail inválido.";
            } else if (error.code === 'auth/weak-password') {
                errorMessage = "A senha deve ter pelo menos 6 caracteres.";
            }
            SwalFire.error("Erro de Registro", errorMessage);
            console.error("Firebase registration error:", error);
        }
    };

    return (
        <AuthTemplate>
            <FormAuthWrapper
                title={ "Register" }
                typeAuth={ "register" }
                action={ "POST" }
                handleFormAuth={ handleRegister }
            />
        </AuthTemplate>
    );
}

export default Register;
