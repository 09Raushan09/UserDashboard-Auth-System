import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImage: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profileImage: e.target.files[0] });
    if (errorMsg) setErrorMsg("");
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;
    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("password", formData.password);
      if (formData.profileImage)
        submitData.append("profileImage", formData.profileImage);

      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/users/register`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: submitData,
      });

      if (response.ok) navigate("/login");
      else {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "Registration failed.");
      }
    } catch (error) {
      setErrorMsg("Network error. Server might be down.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* Left Side - Image Area (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          alt="Premium Abstract Art"
          className="absolute inset-0 w-full h-full object-cover opacity-80 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-white animate-fade-in-up">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Start your journey.
          </h2>
          <p className="text-lg text-slate-300 max-w-md">
            Join thousands of professionals building the future with our premium
            dashboard tools.
          </p>
        </div>
      </div>

      {/* Right Side - Form Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Subtle background blob for the form side */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

        <div className="max-w-md w-full relative z-10 animate-fade-in-up">
          <div className="mb-10 text-center lg:text-left">
            <div className="inline-flex lg:hidden items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white mb-6 shadow-lg shadow-indigo-200">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Create Account
            </h2>
            <p className="mt-2 text-slate-500 font-medium">
              Please fill in your details to get started.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-semibold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              required
              placeholder="Full Name"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />
            <input
              type="email"
              name="email"
              onChange={handleInputChange}
              required
              placeholder="Email Address"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />
            <input
              type="password"
              name="password"
              onChange={handleInputChange}
              required
              placeholder="Password"
              className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 pl-1">
                Profile Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:font-bold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer border border-slate-200 rounded-xl bg-slate-50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-300"
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center lg:text-left text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     profileImage: null,
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errorMsg) setErrorMsg("");
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, profileImage: e.target.files[0] });
//     if (errorMsg) setErrorMsg("");
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const submitData = new FormData();
//       submitData.append("name", formData.name);
//       submitData.append("email", formData.email);
//       submitData.append("password", formData.password);
//       if (formData.profileImage)
//         submitData.append("profileImage", formData.profileImage);

//       // Fetching link securely from .env file using import.meta.env (Vite standard)
//       const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/users/register`;

//       const response = await fetch(apiUrl, {
//         method: "POST",
//         body: submitData,
//       });

//       if (response.ok) {
//         navigate("/login");
//       } else {
//         const errorData = await response.json();
//         setErrorMsg(
//           errorData.message || "Registration failed. Please try again.",
//         );
//       }
//     } catch (error) {
//       setErrorMsg("Network error. Server might be down.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/30 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
//       {/* Decorative subtle background blobs */}
//       <div className="absolute top-10 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>
//       <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-60"></div>

//       {/* Premium Glassmorphism Card */}
//       <div className="relative max-w-lg w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-white p-8 sm:p-10 z-10 my-8">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white mb-4 shadow-lg shadow-indigo-200">
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
//               ></path>
//             </svg>
//           </div>
//           <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
//             Create an account
//           </h2>
//           <p className="mt-2 text-sm text-slate-500 font-medium">
//             Join us to access your premium dashboard.
//           </p>
//         </div>

//         {errorMsg && (
//           <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 rounded-2xl text-sm text-center font-semibold tracking-wide">
//             {errorMsg}
//           </div>
//         )}

//         <form onSubmit={handleRegisterSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               onChange={handleInputChange}
//               required
//               placeholder="John Doe"
//               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               onChange={handleInputChange}
//               required
//               placeholder="hello@example.com"
//               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               onChange={handleInputChange}
//               required
//               placeholder="••••••••"
//               className="w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white/50 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all duration-300"
//             />
//           </div>

//           {/* Premium File Input Styling */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-1.5 pl-1">
//               Profile Image
//             </label>
//             <div className="relative">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 required
//                 className="w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer border border-slate-200 rounded-2xl bg-white/50 transition-all duration-300"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-bold text-[15px] hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 transition-all duration-300"
//           >
//             {isLoading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm font-medium text-slate-500">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
//           >
//             Sign in here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
