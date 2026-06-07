import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        },
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else setErrorMsg(data.message || "Invalid credentials");
    } catch (error) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans flex-row-reverse">
      {/* Right Side - Image Area */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-100 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
          alt="Modern Workspace"
          className="absolute inset-0 w-full h-full object-cover opacity-90 animate-fade-in"
        />
        <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply"></div>
      </div>

      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="max-w-md w-full animate-fade-in-up">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 font-medium">
              Sign in to your premium workspace.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 pl-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="hello@example.com"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between mb-2 pl-1 pr-1">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  Forgot?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:-translate-y-1 hover:shadow-xl disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-300"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center lg:text-left text-sm font-medium text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
            >
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//     if (errorMsg) setErrorMsg("");
//   };

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const response = await fetch("http://localhost:5000/api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         localStorage.setItem("token", data.token);
//         window.location.href = "/dashboard"; // Full reload to ensure state resets
//       } else {
//         setErrorMsg(data.message || "Invalid credentials");
//       }
//     } catch (error) {
//       setErrorMsg("Network error. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
//           Welcome Back
//         </h2>
//         {errorMsg && (
//           <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center font-medium">
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleLoginSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             value={credentials.email}
//             onChange={handleChange}
//             required
//             placeholder="Email Address"
//             className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//           />
//           <input
//             type="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleChange}
//             required
//             placeholder="Password"
//             className="w-full px-4 py-3 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
//           />

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all mt-2"
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>
//         <p className="mt-5 text-center text-sm text-gray-600">
//           New here?{" "}
//           <Link
//             to="/register"
//             className="text-indigo-600 font-bold hover:text-indigo-500"
//           >
//             Create Account
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
