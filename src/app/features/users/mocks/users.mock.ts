import { User, PhoneType } from '../models/user.model';
export const usersMock: User[] = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joaosilva@email.com',
    cpf: '123.456.789-00',
    telefone: '11987654321',
    tipoTelefone: PhoneType.CELULAR,
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    email: 'mariaoliveira@email.com',
    cpf: '987.654.321-00',
    telefone: '1134567890',
    tipoTelefone: PhoneType.RESIDENCIAL,
  },
  {
    id: 3,
    nome: 'Carlos Pereira',
    email: 'carlospereira@email.com',
    cpf: '456.789.123-00',
    telefone: '11912345678',
    tipoTelefone: PhoneType.CELULAR,
  },
  {
    id: 4,
    nome: 'Ana Santos',
    email: 'anasantos@email.com',
    cpf: '789.123.456-00',
    telefone: '1123456789',
    tipoTelefone: PhoneType.RESIDENCIAL,
  },
  {
    id: 5,
    nome: 'Pedro Souza',
    email: 'pedrosouza@email.com',
    cpf: '321.654.987-00',
    telefone: '11987654321',
    tipoTelefone: PhoneType.CELULAR,
  }
]
