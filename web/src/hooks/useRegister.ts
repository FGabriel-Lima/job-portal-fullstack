import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { api } from '../services/api';

export function useRegister() {
  // 1. Todos os estados ficam escondidos aqui
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 2. A função de negócio completa
  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      setLoading(false);
      return;
    }

    try {
      await api.post('/auth/register', { name, email, password });
      alert('Cadastro realizado com sucesso! Redirecionando...');
      navigate('/login');
    } catch (err) {
      if (isAxiosError(err)) {
        if (err.response?.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('Ocorreu um erro ao tentar se conectar com o servidor.');
        }
      } else {
        setError('Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  }

  // 3. Exportamos apenas o que a interface visual vai precisar "plugar"
  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    error,
    loading,
    handleRegister
  };
}