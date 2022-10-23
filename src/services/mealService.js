const BASE_URL = `${process.env.REACT_APP_BACK_END_SERVER_URL}/api/meals`

export async function search(mealQuery) {
  const res = await fetch(`${BASE_URL}/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(mealQuery)
  })
  return res.json()
}