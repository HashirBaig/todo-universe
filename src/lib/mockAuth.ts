import type { Role } from "../store/authStore";

type MockUser = {
  email: string;
  password: string;
  role: Role;
};

const MOCK_USERS: MockUser[] = [
  { email: "admin@mealcart.com", password: "abcd1234", role: "ADMIN" },
  { email: "staff@mealcart.com", password: "staff123", role: "STAFF" },
  { email: "customer@mealcart.com", password: "customer123", role: "CUSTOMER" },
];

export const isMockAuthEnabled = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export function mockLogin(email: string, password: string) {
  return new Promise<{ data: { email: string; role: Role; token: string } }>(
    (resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find(
          (u) => u.email === email && u.password === password,
        );

        if (!user) {
          reject(new Error("Invalid credentials"));
          return;
        }

        resolve({
          data: {
            email: user.email,
            role: user.role,
            token: `mock-jwt-token-${user.role.toLowerCase()}`,
          },
        });
      }, 500); // simulate network delay
    },
  );
}
