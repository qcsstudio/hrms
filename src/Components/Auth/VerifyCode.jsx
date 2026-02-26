import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import authHero from "@/assets/auth-hero.png";

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/set-password");
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
        {/* Logo Placeholder */}
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
          Verify Code
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#999",
            marginBottom: 36,
          }}
        >
          An authentication code has been sent to your email.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Input Field */}
          <div
            style={{
              position: "relative",
              marginBottom: 24,
              border: "1.5px solid #e0e0e0",
              borderRadius: 12,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type={showCode ? "text" : "password"}
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
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
              onClick={() => setShowCode(!showCode)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#888",
                padding: 0,
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

          {/* Submit Button */}
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
            Verify
          </button>
        </form>

        {/* Footer */}
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
        {/* Decorative Circles */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 300,
            height: 300,
            border: "2px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -40,
            width: 400,
            height: 400,
            border: "2px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            padding: "40px",
          }}
        >
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

export default VerifyCode;