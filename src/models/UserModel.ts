export interface UserModel {
  id: number;
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  sex: "Masculino" | "Feminino" | "Outro";
}
