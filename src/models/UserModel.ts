export interface UserModel {
  id: number;
  name: string;
  email: string;
  birthDate: Date;
  sex: "Masculino" | "Feminino" | "Outro";
}
