"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination";
import LoaderFiter from "@/components/LoaderFiter";

// Define the Meal interface
interface Meal {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strYoutube: string;
  [key: string]: any; // Allows for additional dynamic properties like ingredients and measures
}

export default function Page() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 12;

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const shuffleArray = (array: Meal[]) => {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchMealsByLetters = async (letters: string[]) => {
    let allMeals: Meal[] = [];

    for (const letter of letters) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
        );
        const data = await response.json();

        if (data.meals) {
          allMeals = [...allMeals, ...data.meals];
        }
      } catch (error) {
        console.error(`Error fetching meals for letter "${letter}":`, error);
      }
    }

    const uniqueMeals = Array.from(
      new Map(allMeals.map((meal) => [meal.idMeal, meal])).values()
    );

    return shuffleArray(uniqueMeals);
  };

  const fetchMealsBySearch = async (query: string) => {
    let allMeals: Meal[] = [];

    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.meals) {
        allMeals = data.meals;
      }
    } catch (error) {
      console.error(`Error fetching meals for search query "${query}":`, error);
    }

    return allMeals;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let letters: string[];

      if (search.trim()) {
        // Search by the provided query string
        letters = [];
        const fetchedMeals = await fetchMealsBySearch(search.trim());
        setMeals(fetchedMeals);
      } else {
        // Fetch meals by all letters when search is empty
        letters = Array.from("abcdefghijklmnopqrstuvwxyz");
        const fetchedMeals = await fetchMealsByLetters(letters);
        setMeals(fetchedMeals);
      }

      setLoading(false);
    };

    fetchData();
  }, [search]);

  // Paginate meals
  const paginatedMeals = meals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-center text-4xl font-bold mb-10">
        Find Your Recipe!
      </h1>

      <div className="flex items-center justify-center gap-4 mb-8">
        <input
          type="text"
          className="w-1/2 px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
          placeholder="Search for meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          onClick={() => setSearch(search)}
        >
          Search
        </button>
      </div>

      {loading ? (
        <LoaderFiter />
      ) : paginatedMeals.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMeals.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl text-main font-semibold mb-2">
                    {meal.strMeal}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    <span className="font-bold">Cuisine:</span> {meal.strArea}
                  </p>
                  <p className="text-gray-700 line-clamp-3">
                    {meal.strInstructions}
                  </p>
                  <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-red-500 px-3 py-2 rounded-xl"
                  >
                    <FontAwesomeIcon icon={faYoutube} />
                    <span className="ml-3">YouTube</span>
                  </a>
                  <a
                    href={`/recipe/${meal.idMeal}`}
                    className="inline-block mt-3 bg-blue ml-5 px-3 py-2 rounded-xl"
                  >
                    <FontAwesomeIcon icon={faBowlFood} />
                    <span className="ml-3">See Full</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center my-10 w-full">
            <Pagination
              items={meals.length}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={onPageChange}
            />
          </div>
        </>
      ) : (
        <div className="text-center text-xl">No meals found.</div>
      )}
    </div>
  );
}
