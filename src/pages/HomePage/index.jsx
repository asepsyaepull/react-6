import React from 'react'
import Navbar from '../../components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState([
    {
      current_page: 1,
      limit: null,
      total: null,
    }
  ]);

  const getData = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/recipes');
      setData(response.data.recipes); // Simpan data ke state
      setPagination({
        current_page: response.data.current_page,
        limit: response.data.limit,
        total: response.data.total,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">HomePage</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recipes</h2>
          <ul className="space-y-4">
            {data.map((recipe, index) => (
              <li key={index} className="border-b border-gray-200 pb-4">
                <h3 className="text-xl font-medium text-gray-800">{recipe.name}</h3>
                <div className='flex flex-col w-96 gap-2 my-2'>
                  <p className="font-medium text-gray-800">Ingredients</p>
                  <p className="text-gray-600 text-wrap">{recipe.ingredients}</p>
                </div>
                <div className='flex flex-col w-96 gap-2 my-2'>
                  <p className="font-medium text-gray-800">Prep Time</p>
                  <p className="text-gray-600">{recipe.prepTimeMinutes}</p>
                </div>
                <div className='flex flex-col w-96 gap-2 my-2'>
                  <p className="font-medium text-gray-800">Cook Time</p>
                  <p className="text-gray-600">{recipe.cookTimeMinutes}</p>
                </div>
                <div className='flex flex-col w-96 gap-2 my-2'>
                  <p className="font-medium text-gray-800">Difficulty</p>
                  <p className="text-gray-600">{recipe.difficulty}</p>
                </div>
                <Link to={`/detail/${recipe.id}`}>
                  <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">See Detail</button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HomePage