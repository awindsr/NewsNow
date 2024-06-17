import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import MainNewsCard from "../components/MainNewsCard";
import NewsCards from "../components/NewsCards";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

export default function Homepage() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("sports");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const baseurl = "https://inshortnews-c68f4d9c3ca9.herokuapp.com/";

  useEffect(() => {
    const fetchArticles = async () => {
      const requestOptions = {
        method: "GET",
      };

      try {
        const response = await axios.get(
          `${baseurl}news?category=${selectedCategory}`
        );

        setArticles(response.data.data);
        console.log(response.data); // Assuming 'articles' is the key for articles in the response
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, [selectedCategory]);
  console.log(articles);

  return (
    <div className="w-screen h-auto bg-primaryBg">
      <div>
        <Header />
      </div>
      <div>
        <NavBar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {articles.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <p className="text-2xl">Loading...</p>
        </div>
      ) : (
        <section className="newsArea w-full h-auto flex flex-col p-8 gap-8">
          <MainNewsCard newsItem={articles[0]} />
          <div className="flex flex-wrap justify-between gap-8 ">
            {articles.slice(startIndex, endIndex).map((article, index) => (
              <NewsCards key={index} newsItem={article} />
            ))}
          </div>

          <div className="pagination w-full flex items-center justify-center mt-8 mb-8">
            <button
              className="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-10"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="h-10 px-5 flex items-center text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 focus:shadow-outline">
              {currentPage}
            </span>
            {currentPage < 2 ? (
              <button
                className="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-10"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === 2}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </section>
      )}
<Footer/>
      
    </div>
  );
}
