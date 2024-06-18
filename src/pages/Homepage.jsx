// Homepage.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setArticles,
  setSelectedCategory,
  setCurrentPage,
} from "../redux/actions";
import axios from "axios";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import MainNewsCard from "../components/MainNewsCard";
import NewsCards from "../components/NewsCards";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Homepage() {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articles);
  const selectedCategory = useSelector((state) => state.selectedCategory);
  const currentPage = useSelector((state) => state.currentPage);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const baseurl = "https://inshortnews-c68f4d9c3ca9.herokuapp.com/";

  useEffect(() => {
    const fetchArticles = async () => {
      const requestOptions = { method: "GET" };
      if (selectedCategory) {
        try {
          const response = await axios.get(
            `${baseurl}news?category=${selectedCategory}`
          );
          dispatch(setArticles(response.data.data));
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
    };

    fetchArticles();
  }, [selectedCategory, dispatch]);

  return (
    <div className="w-screen h-auto bg-primaryBg">
      <Header />
      <NavBar />
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
              onClick={() => dispatch(setCurrentPage(currentPage - 1))}
              disabled={currentPage === 1}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <span className="h-10 px-5 flex items-center text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 focus:shadow-outline">
              {currentPage}
            </span>
            {currentPage < 2 ? (
              <button
                className="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-10"
                onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                disabled={currentPage === 2}>
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
