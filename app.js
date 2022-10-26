// display all users in a table
// when a user is selected, display their posts

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const table = document.getElementById('table')



const createTable = async () => {
  const res = await fetch(`${BASE_URL}/users`)
  const json = await res.json()
  console.log(json);

  json.forEach((user, i) => {
    const row = document.createElement("tr")

    const name = user.name
    const company = user.company.name
    const city = user.address.city
    const id = user.id
    
    const data = [ name, company, city, id]

    data.forEach((obj, j) => {
      const cell = document.createElement('td')
      const text = document.createTextNode(obj) 
      cell.appendChild(text)
      row.appendChild(cell)
      table.appendChild(row)

    })
  })



}

createTable()