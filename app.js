// display all users in a table
// when a user is selected, display their posts

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const main = document.getElementById("main")
let state = 'table'
let selectedUser 



const clear = () => {
  main.innerHTML = ' '
}


const createTable = async () => {
  clear()
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

  main.appendChild(table)
  table.setAttribute('border', '2')
}


const renderPosts = async (user) => {
  clear()
  state = 'posts'
  const {name, id} = user
  const res = await fetch(`${BASE_URL}/posts`)
  const json = await res.json()
  const posts = json.filter((post)=> {
    return post.userId === id
  })
  
  const container = document.createElement('div')
  const header = document.createElement('h1')
  header.innerHTML = name
  container.appendChild(header)

  const backBtn = document.createElement('button')
  backBtn.innerHTML = "Back"

  backBtn.addEventListener('click', ()=> {
    createTable()
  })

  container.appendChild(backBtn)


  posts.forEach(post => {
    const {body, id, title} = post
    const article = document.createElement('article')
    const header = document.createElement('header')
    header.innerHTML = `<h3>${id}: ${title}</h3>`
    article.appendChild(header)
    const text = document.createElement('p')
    text.innerHTML = body
    article.appendChild(text)
    container.appendChild(article)

  })

  main.appendChild(container)

}

const selectUser = (user) => {
  selectedUser = user
  state = 'posts'
  renderPosts(user)
}




createTable()
