export interface User {
  id?: number;
  email: string;
  password: string;
  login: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  birthDate?: Date;
  biography?: string;
  departmentId?: number;
  departmentName?: string;
  privilege?: number;
}
