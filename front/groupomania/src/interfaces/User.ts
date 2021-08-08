export default interface User {
  id: number;
  email: string;
  login: string;
  privilege: number;
  firstName: string | null;
  lastName: string | null;
  jobTitle: string | null;
  avatarUrl: string | null;
  birthDate: Date | null;
  biography: string | null;
  departmentId: number | null;
  departmentName: string | null;
}
