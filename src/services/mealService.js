import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/meals`

export async function search(mealQuery) {
  const res = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mealQuery)
  })
  return res.json()
}

export async function getMealDetails(mealId) {
  const res = await fetch(`${BASE_URL}/getMealDetails/${mealId}`)
  return res.json()
}

export async function addMeal(mealDetails) {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mealDetails)
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const index = async () => {
  try {
    const res = await fetch(BASE_URL)
    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export{
  index
}