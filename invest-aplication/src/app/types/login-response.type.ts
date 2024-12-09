export type LoginResponse = {
  token: string;  // Token retornado pela API
  name: string;   // Nome do usuário
  role?: string;  // A role (papel) do usuário, pode ser opcional (por isso o '?' ao lado)
}
