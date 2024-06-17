import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 0) {
      const fetchSuggestions = async () => {
        try {
          const response = await fetch(
            `https://news-api-six-navy.vercel.app/api/news/inshorts?query=${query}`
          );
          const result = await response.json();
          if (result.status === "SUCCESS" && result.data.articles) {
            setSuggestions(result.data.articles);
            // console.log(result.data)
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [query]);

  // console.log(query)

  console.log(suggestions);

  return (
    <div className="font-newsreader p-4 flex items-center justify-between w-full relative">
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-700 bg-primaryBg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
        </div>
        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md mt-1 rounded-b-lg z-10">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setQuery(suggestion.title);
                  setSuggestions([]);
                }}>
                <div className="flex gap-2" onClick={() => { window.location.href = suggestion.sourceUrl; }}>
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-10 h-10 object-cover object-center rounded-md"
                  />
                  <div>
                    <h1 className="text-[.7rem] font-medium">{suggestion.title}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <h1 className="font-medium text-4xl absolute left-1/2 transform -translate-x-1/2">
        NewsNow.
      </h1>
      <div className="hidden md:flex gap-3">
        <button onClick={()=>navigate("/bookmarks")} className="px-4 py-2 border border-black text-black rounded-full text-xl flex items-center justify-center">
            Bookmarks
          </button>
        <button className="px-4 py-2 bg-black text-white rounded-full text-xl flex items-center justify-center">
          Subscribe
        </button>
      </div>
      <button
        className="md:hidden text-2xl focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}>
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md mt-2 p-4 flex flex-col space-y-4 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-700 bg-primaryBg  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white shadow-md mt-1 rounded-b-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setQuery(suggestion);
                      setSuggestions([]);
                    }}>
                   <div className="flex gap-2" onClick={() => { window.location.href = suggestion.sourceUrl; }}>
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-10 h-10 object-cover object-center rounded-md"
                  />
                  <div>
                    <h1 className="text-[.7rem] font-medium">{suggestion.title}</h1>
                  </div>
                </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="px-4 py-2 border border-black text-black rounded-full text-xl flex items-center justify-center">
            Bookmarks
          </button>
          <button className="px-4 py-2 bg-black text-white rounded-full text-xl flex items-center justify-center">
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
