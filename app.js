// display all users in a table
// when a user is selected, display their posts

const BASE_URL = 'https://jsonplaceholder.typicode.com'

let state = 'table'
let selectedUser 


const selectUser = (user) => {
  selectedUser = user
  console.log(user, selectedUser);
}

console.log(selectedUser);

const createTable = async () => {
  const res = await fetch(`${BASE_URL}/users`)
  const json = await res.json()

  const table = document.createElement('table')
  const header = document.createElement('tr')

  const headers = ['Name', 'Company', 'City', 'ID', 'Posts']

  headers.forEach((item)=> {
    const cell = document.createElement('th')
    const cellText = document.createTextNode(item)
    cell.appendChild(cellText)
    table.appendChild(cell)

  })

  json.forEach((user, i) => {
    const row = document.createElement("tr")
    const name = user.name
    const company = user.company.name
    const city = user.address.city
    const id = user.id
    
    const data = [ name, company, city, id, 'posts']

    data.forEach((obj, j) => {
      if (obj !== 'posts'){
        const cell = document.createElement('td')
        const text = document.createTextNode(obj) 
        cell.appendChild(text)
        row.appendChild(cell)
        table.appendChild(row)
      } else {
        const cell = document.createElement('td')
        const btn = document.createElement('button')
        btn.innerHTML = 'SHOW'
        btn.addEventListener('click', ()=> {
          selectUser(user)
        })
        cell.appendChild(btn)
        row.appendChild(cell)
        table.appendChild(row)
      }

    })
  })

  document.body.appendChild(table)
  table.setAttribute('border', '2')
}


if(state === 'table') {
  createTable()

}