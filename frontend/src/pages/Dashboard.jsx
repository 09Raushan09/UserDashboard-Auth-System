import React, { useState, useEffect } from 'react';
import { LogOut, User as UserIcon, Mail, ShieldCheck, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token")?.replace(/['"]+/g, '');
            if (!token) {
                window.location.href = "/login";
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/users/me", {
                    method: "GET",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                const result = await response.json();
                
                if (response.ok) {
                    setUserData(result.data);
                } else {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="relative flex justify-center items-center">
                    <div className="absolute animate-ping w-16 h-16 rounded-full bg-indigo-400 opacity-20"></div>
                    <div className="w-16 h-16 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 p-4 sm:p-6 lg:p-8 font-sans flex flex-col md:flex-row gap-6">
            
            {/* Premium Floating Sidebar */}
            <aside className="w-full md:w-72 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6 flex flex-col border border-slate-100/80">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="bg-indigo-600 p-2 rounded-xl">
                        <ShieldCheck size={24} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">NexDash.</h2>
                </div>
                
                <nav className="flex-1 hidden md:block space-y-2">
                    <div className="px-4 py-3.5 bg-indigo-50/80 text-indigo-700 rounded-2xl font-bold cursor-pointer flex items-center gap-3 transition-all">
                        <UserIcon size={18} /> My Profile
                    </div>
                    <div className="px-4 py-3.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-2xl font-semibold cursor-pointer flex items-center gap-3 transition-all">
                        <Settings size={18} /> Account Settings
                    </div>
                </nav>

                <button onClick={handleLogout} className="mt-6 md:mt-auto flex items-center justify-center gap-2 w-full py-4 px-4 bg-red-50 text-red-600 font-bold rounded-2xl hover:bg-red-100 hover:scale-[1.02] transition-all duration-300">
                    <LogOut size={18} strokeWidth={2.5} /> Sign Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/80 p-6 md:p-10 lg:p-12 relative overflow-hidden">
                
                {/* Top Nav inside main content */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">Overview</h1>
                        <p className="text-slate-500 mt-2 font-medium">Manage your personal information.</p>
                    </div>
                    <button className="p-3 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                        <Bell size={20} />
                    </button>
                </div>

                {/* Profile Data Card - The "Premium" Component */}
                <div className="bg-gradient-to-br from-slate-50 to-white rounded-[2rem] p-8 md:p-10 border border-slate-100/80 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-10 hover:shadow-md transition-shadow duration-300">
                    
                    {/* Image section with premium styling */}
                    <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        <img 
                            src={userData?.profileImage || "https://via.placeholder.com/150"} 
                            alt="Avatar" 
                            className="relative w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-xl ring-8 ring-white" 
                        />
                        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                    </div>

                    <div className="flex-1 text-center md:text-left pt-2">
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold tracking-wider uppercase mb-4">
                            Premium Member
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900">{userData?.name}</h2>
                        
                        <div className="mt-8 space-y-4 max-w-md">
                            <div className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <Mail size={20} className="text-indigo-500" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</span>
                                    <span className="font-semibold text-slate-900">{userData?.email}</span>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4 text-slate-600 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-100 transition-colors">
                                <div className="bg-slate-50 p-2 rounded-lg">
                                    <UserIcon size={20} className="text-indigo-500" />
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Account ID</span>
                                    <span className="font-semibold text-slate-900 font-mono text-sm">{userData?._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </main>
        </div>
    );
};

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { LogOut, User as UserIcon, Mail } from "lucide-react";

// const Dashboard = () => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         window.location.href = "/login";
//         return;
//       }

//       try {
//         const response = await fetch("http://localhost:5000/api/users/me", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await response.json();

//         if (response.ok) {
//           setUserData(result.data);
//         } else {
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//         }
//       } catch (error) {
//         console.error("Fetch error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/login";
//   };

//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center gap-4">
//           <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
//           <div className="w-48 h-5 bg-gray-200 rounded"></div>
//           <div className="w-32 h-4 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
//       <aside className="w-full md:w-72 bg-white border-b md:border-b-0 md:border-r border-gray-100 p-6 flex flex-col shadow-sm">
//         <h2 className="text-2xl font-bold text-gray-800 tracking-tight mb-8">
//           AdminPanel.
//         </h2>
//         <nav className="flex-1 hidden md:block">
//           <div className="px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl font-semibold cursor-pointer">
//             My Profile
//           </div>
//         </nav>
//         <button
//           onClick={handleLogout}
//           className="mt-6 md:mt-auto flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </aside>

//       <main className="flex-1 p-6 md:p-10 lg:p-14">
//         <div className="max-w-3xl">
//           <header className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//               Dashboard Overview
//             </h1>
//             <p className="text-gray-500 mt-2">
//               Manage your premium account details below.
//             </p>
//           </header>

//           <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8 hover:shadow-md transition-shadow duration-300">
//             <div className="shrink-0">
//               <img
//                 src={
//                   userData?.profileImage || "https://via.placeholder.com/150"
//                 }
//                 alt="Avatar"
//                 className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-inner ring-4 ring-indigo-50"
//               />
//             </div>
//             <div className="flex-1 text-center md:text-left">
//               <h2 className="text-2xl font-bold text-gray-900">
//                 {userData?.name}
//               </h2>
//               <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold tracking-wide uppercase rounded-full">
//                 Verified Active
//               </span>

//               <div className="mt-6 space-y-3">
//                 <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 bg-gray-50 py-2 px-4 rounded-xl">
//                   <Mail size={18} className="text-indigo-400" />
//                   <span className="font-medium">{userData?.email}</span>
//                 </div>
//                 <div className="flex items-center justify-center md:justify-start gap-3 text-gray-600 bg-gray-50 py-2 px-4 rounded-xl">
//                   <UserIcon size={18} className="text-indigo-400" />
//                   <span className="font-medium">ID: {userData?._id}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
