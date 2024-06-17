import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import MainNewsCard from "../components/MainNewsCard";
import NewsCards from "../components/NewsCards";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

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
      
        {
            articles.length === 0 ? (
                <div className="flex items-center justify-center h-96">
                    <p className="text-2xl">Loading...</p>
                </div>
            ):(
                <section className="newsArea w-full h-auto flex flex-col p-8 gap-8">
                <MainNewsCard newsItem={articles[0]} />
                <div className="flex flex-wrap justify-between gap-8 ">
                  {articles.slice(startIndex, endIndex).map((article, index) => (
                    <NewsCards key={index} newsItem={article} />
                  ))}
                </div>
              
              <div className="pagination w-full flex items-center justify-center mt-8 mb-8">
                <button
                className="bg-green-300 text-white px-3 py-1 rounded-md"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <span
                className="bg-green-500 text-white px-4 py-3 rounded-md"
                >{currentPage}</span>
                {currentPage<2?(
        
                <button
                className="bg-green-300 text-white px-3 py-1 rounded-md"
        
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage===2}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
                ):(
                    <div>
                        </div>
                )}
              </div>
              </section>
            )
        }
       
      <footer className="w-full h-20 bg-black flex items-center justify-center">

        <p className="text-white text-lg">© 2021 NewsNow. All Rights Reserved</p>
        </footer>
    </div>
  );
}
