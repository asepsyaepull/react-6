import React from 'react'
import Navbar from '../../components'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const HomePage = () => {
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 3,
    totalData: 0,
  });

  const getData = async (page = 1) => {
    try {
      const response = await axios.get(`https://dummyjson.com/recipes?limit=${pagination.limit}&skip=${(page - 1) * pagination.limit}`);
      setData(response.data.recipes);
      setPagination((prev) => ({
        ...prev,
        currentPage: page,
        totalData: response.data.total,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: newPage,
    }));
  };

  const totalPages = Math.ceil(pagination.totalData / pagination.limit);

  if (!data) {
    return <div className='container mx-auto h-screen flex justify-center items-center'><span className="loading loading-dots loading-lg"></span>
    </div>;
  }

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
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">Page {pagination.currentPage} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalPages}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage