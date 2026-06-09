import axios from 'axios'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

// Search meals by name
export async function searchMeals(query) {
  const { data } = await axios.get(`${BASE_URL}/search.php`, {
    params: { s: query },
  })
  return data.meals || []
}

// Get meals by category
export async function getMealsByCategory(category) {
  const { data } = await axios.get(`${BASE_URL}/filter.php`, {
    params: { c: category },
  })
  return data.meals || []
}

// Get all categories
export async function getCategories() {
  const { data } = await axios.get(`${BASE_URL}/categories.php`)
  return data.categories || []
}

// Get meal details by ID
export async function getMealById(id) {
  const { data } = await axios.get(`${BASE_URL}/lookup.php`, {
    params: { i: id },
  })
  return data.meals?.[0] || null
}

// Get random meal
export async function getRandomMeal() {
  const { data } = await axios.get(`${BASE_URL}/random.php`)
  return data.meals?.[0] || null
}
