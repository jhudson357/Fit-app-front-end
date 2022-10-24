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
  console.log('hello')
  console.log(`${BASE_URL}/getMealDetails/${mealId}`)
  console.log('MEAL ID', mealId)
  const res = await fetch(`${BASE_URL}/getMealDetails/${mealId}`)
  console.log(res, 'RES')
  return res.json()
}