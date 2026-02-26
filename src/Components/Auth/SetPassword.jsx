import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import authHero from "@/assets/auth-hero.png";

const SetPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          backgroundColor: "#fff",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              width: 240,
              height: 80,
              backgroundColor: "#e0e0e0",
              borderRadius: 4,
            }}
          />
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#111",
            marginBottom: 8,
          }}
        >
          Set A Password
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#999",
            marginBottom: 36,
          }}
        >
          Your previous password has been reset. Please set a new password for
          your account.
        </p>

        <form onSubmit={handleSubmit}>
          {/* PASSWORD */}
          <div
            style={{
              position: "relative",
              marginBottom: 20,
              border: "1.5px solid #e0e0e0",
              borderRadius: 12,
              padding: "14px 50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* Lock Icon */}
            <svg
              style={{
                position: "absolute",
                left: 16,
                width: 22,
                height: 22,
                color: "#888",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 15,
                color: "#333",
                backgroundColor: "transparent",
              }}
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: 22, height: 22 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div
            style={{
              position: "relative",
              marginBottom: 24,
              border: "1.5px solid #e0e0e0",
              borderRadius: 12,
              padding: "14px 50px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              style={{
                position: "absolute",
                left: 16,
                width: 22,
                height: 22,
                color: "#888",
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 15,
                color: "#333",
                backgroundColor: "transparent",
              }}
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: "absolute",
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                style={{ width: 22, height: 22 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#4A7BF7",
              color: "#fff",
              border: "none",
              borderRadius: 30,
              fontSize: 16,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Set Password
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            fontSize: 13,
            color: "#999",
            marginTop: "auto",
            paddingTop: 40,
          }}
        >
          By Logging In, you agree to our{" "}
          <a href="#" style={{ color: "#111", textDecoration: "underline" }}>
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" style={{ color: "#111", textDecoration: "underline" }}>
            Privacy Policy
          </a>.
        </p>
      </div>

      {/* RIGHT SIDE (Same Design) */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg, #7EB4F5 0%, #4A7BF7 40%, #3B5FCC 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: 40 }}>
          <h2
            style={{
              color: "#fff",
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 40,
            }}
          >
            Join the <br />
            future of <br />
            HR Sign Up
          </h2>

          <img
            // src={authHero}
            alt="HR Professional"
            style={{
              maxWidth: 380,
              width: "100%",
              borderRadius: 8,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SetPassword;