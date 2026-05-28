import { PhoneType } from './phone-type.enum';

export interface User {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipoTelefone: PhoneType;
}
export { PhoneType };

