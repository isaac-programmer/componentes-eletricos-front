interface User {
  id: string;
  name: string;
  email: string;
  group: { name: string; isAdmin: boolean };
}