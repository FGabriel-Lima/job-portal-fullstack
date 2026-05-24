import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AdminRepository } from '../repositories/admin.repository.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const AdminService = {
  async register(name: string, email: string, passwordRaw: string) {
    //Verifica se o e-mail já está em uso
    const adminExists = await AdminRepository.findByEmail(email);
    if (adminExists) {
      throw new Error('E-mail já cadastrado.');
    }

    //Criptografa a senha (Hash)
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(passwordRaw, saltRounds);

    //Salva no banco
    const newAdmin = await AdminRepository.create({
      name,
      email,
      password: passwordHash,
    });

    // Remove a senha do retorno por segurança
    const { password, ...adminWithoutPassword } = newAdmin;
    return adminWithoutPassword;
  },

  async login(email: string, passwordRaw: string) {
    //Busca o admin pelo e-mail
    const admin = await AdminRepository.findByEmail(email);
    if (!admin) {
      throw new Error('Credenciais inválidas.');
    }

    //Compara a senha digitada com o Hash do banco
    const isPasswordValid = await bcrypt.compare(passwordRaw, admin.password);
    if (!isPasswordValid) {
      throw new Error('Credenciais inválidas.');
    }

    //Gera o Token JWT (válido por 1 dia)
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    const { password, ...adminWithoutPassword } = admin;
    return { admin: adminWithoutPassword, token };
  },
};