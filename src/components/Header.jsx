import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-newsreader p-4 flex items-center justify-between w-full relative">
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-700 bg-primaryBg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
        </div>
      </div>
      <h1 className="font-medium text-4xl absolute left-1/2 transform -translate-x-1/2">
        NewsNow.
      </h1>
      <div className="hidden md:block">
        <button className="px-4 py-2 bg-black text-white rounded-full text-xl flex items-center justify-center">
          Subscribe
        </button>
      </div>
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md mt-2 p-4 flex flex-col space-y-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-700 bg-primaryBg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
            </div>
          </div>
          <button className="px-4 py-2 bg-black text-white rounded-full text-xl flex items-center justify-center">
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
