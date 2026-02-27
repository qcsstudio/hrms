import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import authHero from "@/assets/auth-hero.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/verify-code");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* Left Side */}
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

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            color: "#111",
            fontWeight: 500,
            marginBottom: 24,
            padding: 0,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            style={{ width: 18, height: 18 }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
          Back to login
        </button>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#111",
            marginBottom: 8,
          }}
        >
          Forgot Your Password
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#999",
            marginBottom: 36,
          }}
        >
          Please enter your registered email address.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
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
            {/* Email Icon */}
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
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>

            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: 15,
                color: "#333",
                backgroundColor: "transparent",
              }}
              required
            />

            {/* Check Icon */}
            <svg
              style={{
                position: "absolute",
                right: 16,
                width: 20,
                height: 20,
                color: "#ccc",
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
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
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
            Submit
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

      {/* Right Side */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg, #7EB4F5 0%, #4A7BF7 40%, #3B5FCC 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2
            style={{
              color: "#fff",
              fontSize: 48,
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: 40,
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
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
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;