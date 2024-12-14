import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components';


const DetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null); // Inisialisasi dengan null

  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes/' + id);
      setData(response.data); // Simpan data ke state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, [id]); // Tambahkan id sebagai dependensi

  if (!data) {
    return <div>Loading...</div>; // Tampilkan loading saat data belum ada
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">{data.name}</h1>
          <p className="text-gray-600 mb-4">{data.description}</p>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Ingredients</h2>
          <ul className="list-disc list-inside space-y-2">
            {data.ingredients && data.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Instructions</h2>
          <p className="text-gray-600 mb-4">{data.instructions}</p>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Preparation Time</h3>
            <p className="text-gray-600">{data.prepTimeMinutes} minutes</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Cooking Time</h3>
            <p className="text-gray-600">{data.cookTimeMinutes} minutes</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Servings</h3>
            <p className="text-gray-600">{data.servings} serving</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Difficulty</h3>
            <p className="text-gray-600">{data.difficulty}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Cuisine</h3>
            <p className="text-gray-600">From {data.cuisine}</p>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Calories</h3>
            <p className="text-gray-600">{data.caloriesPerServing} PerServing</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;