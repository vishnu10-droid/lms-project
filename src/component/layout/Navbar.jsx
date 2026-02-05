// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">

//           {/* Logo */}
//           <div className="flex items-center">
//             <h1 className="text-2xl font-bold text-indigo-600">
//               Learnify
//             </h1>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8">
//             <a href="#" className="text-gray-700 hover:text-indigo-600">Home</a>
//             <a href="#" className="text-gray-700 hover:text-indigo-600">Courses</a>
//             <a href="#" className="text-gray-700 hover:text-indigo-600">About</a>
//             <a href="#" className="text-gray-700 hover:text-indigo-600">Pricing</a>
//             <a href="#" className="text-gray-700 hover:text-indigo-600">Contact</a>

//             <a
//               href="#"
//               className="text-indigo-600 font-medium hover:underline"
//             >
//               Login
//             </a>

//             <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
//               Get Started
//             </button>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 focus:outline-none"
//             >
//               {isOpen ? (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               ) : (
//                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               )}
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <div className="px-4 py-4 space-y-3">
//             <a href="#" className="block text-gray-700">Home</a>
//             <a href="#" className="block text-gray-700">Courses</a>
//             <a href="#" className="block text-gray-700">About</a>
//             <a href="#" className="block text-gray-700">Pricing</a>
//             <a href="#" className="block text-gray-700">Contact</a>
//             <a href="#" className="block text-indigo-600 font-medium">Login</a>

//             <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
//               Get Started
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
