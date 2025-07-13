
import React from 'react';

export default function Header() {
  return (
    <header className="sticky top-0 bg-white shadow z-50 flex justify-between items-center px-6 py-4">
      <img src="/sgt-logo.png" alt="SGT University" className="h-10" />
      <nav className="hidden md:flex gap-6 text-sm font-medium">
        <a href="#" className="text-gray-700 hover:text-blue-700">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-700">Courses</a>
        <a href="#" className="text-gray-700 hover:text-blue-700">Admissions</a>
        <a href="#" className="text-gray-700 hover:text-blue-700">Contact</a>
      </nav>
    </header>
  );
}
