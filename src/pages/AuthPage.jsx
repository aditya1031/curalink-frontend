import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirm: "",
    userType: "",
    fieldType: "",
    age: "",
    condition: "",
    allergies: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const inputStyle =
    "w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-[#2CB2BE] focus:border-transparent shadow-sm transition";

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // ✅ LOGIN
        const res = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");

        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userData", JSON.stringify(data.user));

        const type = data.user.userType.toLowerCase();
        if (type === "patient") navigate("/patient");
        else if (type === "researcher") navigate("/research");
        else navigate("/");
      } else {
        // ✅ REGISTER
        if (step === 1) {
          if (form.password !== form.confirm)
            throw new Error("Passwords do not match");
          setStep(2);
          setLoading(false);
          return;
        }

        const cleanForm = {
          ...form,
          userType: form.userType.toUpperCase(), // match Prisma ENUM
          gender: form.gender.toUpperCase(), // match Prisma ENUM
          age: form.age ? parseInt(form.age) : null,
        };

        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(cleanForm),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Registration failed");

        setIsLogin(true);
        setStep(1);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#DFF8FF] via-[#EAFDFF] to-[#B2EBF2] px-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-10 w-full max-w-lg border border-gray-100"
      >
        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => {
              setIsLogin(true);
              setStep(1);
              setError("");
            }}
            className={`px-6 py-2 font-semibold rounded-l-full ${
              isLogin ? "bg-[#2CB2BE] text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            className={`px-6 py-2 font-semibold rounded-r-full ${
              !isLogin ? "bg-[#2CB2BE] text-white" : "bg-gray-100 text-gray-600"
            }`}
          >
            Register
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        {/* Forms */}
        {isLogin ? (
          <>
            <h2 className="text-3xl font-bold text-[#0F3961] text-center mb-8">
              Welcome Back 👋
            </h2>

            <form onSubmit={handleAuth} className="space-y-5">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={inputStyle}
              />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                required
                className={inputStyle}
              />

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#2CB2BE] text-white w-full py-3 rounded-xl font-semibold shadow-md transition ${
                  loading ? "opacity-70" : "hover:bg-[#26a6b1]"
                }`}
              >
                {loading ? "Processing..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-[#0F3961] text-center mb-8">
              {step === 1 ? "Create Your Account" : "Health Details"}
            </h2>

            <form onSubmit={handleAuth} className="space-y-5">
              {step === 1 ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChange}
                      placeholder="First name"
                      required
                      className={inputStyle}
                    />
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Last name"
                      required
                      className={inputStyle}
                    />
                  </div>

                  <select
                    name="userType"
                    onChange={handleChange}
                    required
                    className={`${inputStyle} text-black`}
                  >
                    <option value="">Select User Type</option>
                    <option value="PATIENT">Patient</option>
                    <option value="RESEARCHER">Researcher</option>
                  </select>

                  {form.userType === "RESEARCHER" && (
                    <input
                      type="text"
                      name="fieldType"
                      onChange={handleChange}
                      placeholder="Research Area (e.g. AI in Health)"
                      required
                      className={inputStyle}
                    />
                  )}

                  <select
                    name="gender"
                    onChange={handleChange}
                    required
                    className={`${inputStyle} text-black`}
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>

                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputStyle}
                  />

                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                    className={inputStyle}
                  />
                  <input
                    type="password"
                    name="confirm"
                    onChange={handleChange}
                    placeholder="Confirm password"
                    required
                    className={inputStyle}
                  />
                </>
              ) : (
                <>
                  <input
                    type="number"
                    name="age"
                    onChange={handleChange}
                    placeholder="Age (e.g. 24)"
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    name="condition"
                    onChange={handleChange}
                    placeholder="Health condition (optional)"
                    className={inputStyle}
                  />
                  <input
                    type="text"
                    name="allergies"
                    onChange={handleChange}
                    placeholder="Allergies (optional)"
                    className={inputStyle}
                  />
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`bg-[#2CB2BE] text-white w-full py-3 rounded-xl font-semibold shadow-md transition ${
                  loading ? "opacity-70" : "hover:bg-[#26a6b1]"
                }`}
              >
                {loading
                  ? "Please wait..."
                  : step === 1
                  ? "Continue ➜"
                  : "Register & Go to Login"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default AuthPage;
