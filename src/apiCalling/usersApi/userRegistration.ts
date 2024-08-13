// api/userService.ts (or place this within your component file if preferred)
export interface UserInfo {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  email: string;
}

export const registerUser = async (userData: UserInfo) => {
  const response = await fetch("http://localhost:3000/api/user/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.data || "Registration failed");
  }

  return response.json();
};
