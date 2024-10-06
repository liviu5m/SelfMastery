"use client";

import Loader from "@/components/Loader";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Meal {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string;
  strCreativeCommonsConfirmed: string;
  dateModified: string;
}

interface Ingredient {
  id: number;
  name: string;
  measure: string;
}

interface Nutrient {
  food_name: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
}

export default function Page() {
  const { id } = useParams();
  const [meal, setMeal] = useState<Meal>();
  const [info, setInfo] = useState<Nutrient>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIngredient, setActiveIngredient] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
      .then((res) => {
        setMeal(res.data.meals[0]);
        setLoading(false);
        let k = 1;
        const ingredientsList = [];
        while (res.data.meals[0]["strIngredient" + k]) {
          ingredientsList.push({
            id: k,
            name: res.data.meals[0]["strIngredient" + k],
            measure: res.data.meals[0]["strMeasure" + k],
          });
          k++;
        }
        setIngredients(ingredientsList);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeIngredient != 0)
      axios
        .post(
          "https://trackapi.nutritionix.com/v2/natural/nutrients",
          {
            query: ingredients.filter(
              (el: Ingredient) => el.id == activeIngredient
            )[0].name,
          },
          {
            headers: {
              "x-app-id": "b0280e8f",
              "x-app-key": "4de7b900727b9d7ba53d24cbdf7538d8",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setInfo(res.data.foods[0]);
          console.log(res.data.foods[0]);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [activeIngredient]);

  if (loading) return <Loader />;
  return (
    meal && (
      <div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <h1 className="text-xl">{meal?.strMeal}</h1>
            <h4 className="mt-1">
              <span className="text-label">Cuisine: </span>
              {meal.strArea}
            </h4>
            <h4 className="mt-1">
              <span className="text-label">Category: </span>
              {meal.strCategory}
            </h4>
            <p className="mt-3 text-justify">{meal.strInstructions}</p>
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 bg-red-500 shadow-md shadow-red-500 hover:shadow-lg hover:scale-110 hover:shadow-red-500 px-3 py-2 rounded-xl"
            >
              <FontAwesomeIcon icon={faYoutube} />
              <span className="ml-3">Watch On YouTube</span>
            </a>
            <a
              href={meal.strSource}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-10 bg-purple ml-10 px-3 py-2 rounded-xl bg-purple-500 shadow-md shadow-purple-500 hover:shadow-lg hover:scale-110 hover:shadow-purple-500"
            >
              <FontAwesomeIcon icon={faSearch} />
              <span className="ml-3">See Source</span>
            </a>
          </div>
          <div className="w-1/2">
            <img src={meal?.strMealThumb} className="rounded-lg" alt="" />
          </div>
        </div>
        <div className="flex gap-10 mt-10">
          <div className="w-1/2">
            {ingredients.map((ingredient: Ingredient) => {
              return (
                <div
                  key={ingredient.id}
                  className={`flex justify-between items-center w-80 mt-5 `}
                  onClick={() => setActiveIngredient(ingredient.id)}
                >
                  <h4
                    className={`${
                      activeIngredient == ingredient.id ? "bg-blue" : ""
                    } px-3 py-2 rounded-lg hover-blue cursor-pointer`}
                  >
                    {ingredient.name}
                  </h4>
                  <p>{ingredient.measure}</p>
                </div>
              );
            })}
          </div>
          <div className="w-1/2">
            <div
              className={`modal w-full right-8 h-full rounded-lg p-5 bg-gradient-to-r from-purple-500 to-blue-500`}
            >
              {info ? (
                <div className="nutitional_value">
                  <h1 className="text-2xl mb-10">
                    {info?.food_name.toLocaleUpperCase()}
                  </h1>
                  <h4 className="flex items-center justify-between w-80 mb-5">
                    Serving Weight Grams:{" "}
                    <span>{info?.serving_weight_grams}</span>
                  </h4>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Total Calories: <span>{info?.nf_calories}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Total Fat: <span>{info?.nf_total_fat}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Saturated Fat: <span>{info?.nf_saturated_fat}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Cholesterol: <span>{info?.nf_cholesterol}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Sodium: <span>{info?.nf_sodium}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Total Carbohydrate:{" "}
                    <span>{info?.nf_total_carbohydrate}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Dietary Fiber: <span>{info?.nf_dietary_fiber}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Sugars: <span>{info?.nf_sugars}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Protein: <span>{info?.nf_protein}</span>
                  </p>
                  <p className="flex items-center justify-between w-80 mb-5">
                    Potassium: <span>{info?.nf_potassium}</span>
                  </p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <h1 className="text-xl">
                    Please Select A Food To Display Nutitional Values
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
interface Nutrient {
  food_name: string;
  serving_weight_grams: number;
  nf_calories: number;
  nf_total_fat: number;
  nf_saturated_fat: number;
  nf_cholesterol: number;
  nf_sodium: number;
  nf_total_carbohydrate: number;
  nf_dietary_fiber: number;
  nf_sugars: number;
  nf_protein: number;
  nf_potassium: number;
}
