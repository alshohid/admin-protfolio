"use client";
import { registerUser } from "@/apiCalling/usersApi/userRegistration";
import Input from "@/ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  console.log("user info ", userInfo);
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await registerUser(userInfo);
      if (response.status === "success") {
        setSuccess(true);
        router.replace("/features/");
      }
    } catch (err: any) {
      console.error("Registration failed", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-[#0E1526] flex items-center justify-center">
      <div className="bg-[#19243A] w-[600px] p-8 rounded-lg shadow-lg">
        <form onSubmit={formSubmitHandler}>
          <h1 className="text-white text-2xl mb-6">Admin Portal</h1>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Input
                id="firstName_id"
                elementType="input"
                label="First Name"
                required
                value={userInfo.firstName}
                placeholder="Please Enter First name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUserInfo({
                    ...userInfo,
                    firstName: event.target.value,
                  });
                }}
              />
            </div>
            <div>
              <Input
                id="lastName_id"
                elementType="input"
                label="Last Name"
                value={userInfo.lastName}
                required
                placeholder="Please Enter Last name"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUserInfo({
                    ...userInfo,
                    lastName: event.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="mb-4">
            <Input
              id="email_id"
              elementType="input"
              type="email"
              label="Email"
              value={userInfo.email}
              required
              placeholder="Please Enter your Email"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserInfo({
                  ...userInfo,
                  email: event.target.value,
                });
              }}
            />
          </div>
          <div className="mb-4">
            <Input
              id="password_id"
              elementType="input"
              type="password"
              label="Password"
              value={userInfo.password}
              required
              placeholder="Please Enter your Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserInfo({
                  ...userInfo,
                  password: event.target.value,
                });
              }}
            />
          </div>
          <div className="mb-6">
            <Input
              id="mobile_id"
              elementType="input"
              label="Mobile"
              value={userInfo.mobile}
              placeholder="Please Enter your mobile"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUserInfo({
                  ...userInfo,
                  mobile: event.target.value,
                });
              }}
            />
          </div>
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 mt-4">Registration successful!</p>
        )}
      </div>
    </div>
  );
}
