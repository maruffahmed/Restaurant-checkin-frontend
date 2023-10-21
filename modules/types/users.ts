export interface IUsers {
  success: boolean;
  data: {
    id: string;
    phone: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
