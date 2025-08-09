// creat data

let title = document.getElementById('title')
let price = document.getElementById('price')
let texas = document.getElementById('texas')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let total = document.getElementById('total')
let sumbit = document.getElementById('sumbit')
let search = document.getElementById('search')
let datapro
let tmp
let mood = "create"
let searchMood = 'title'

// get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +texas.value + +ads.value) - +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    } else {
        total.innerHTML = ''
        total.style.background = 'gray'
    }

}
// save data
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product)
} else {
    datapro = []
}
sumbit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        texas: texas.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
    if (title.value != '' && newPro.count < 100) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datapro.push(newPro)
                }
            }
            else {
                datapro.push(newPro)
            }
        }
        else {
            datapro[tmp] = newPro
            mood = 'Create'
            sumbit.innerHTML = 'create'
            count.style.display = 'block'
        }
        clearData()

    }
    localStorage.setItem('product', JSON.stringify(datapro))
    showData()

    // console.log(datapro)
}
// clear data
function clearData() {

    title.value = '',
        price.value = '',
        texas.value = '',
        ads.value = '',
        discount.value = '',
        total.innerHTML = '',
        count.value = '',
        category.value = '',
        total.style.background = 'gray'

}
// read
function showData() {
    let table = ''
    for (i = 0; i < datapro.length; i++) {
        table += ` <tr>
              <td>${i + 1}</td>
              <td>${datapro[i].title}</td>
              <td>${datapro[i].price}</td>
              <td>${datapro[i].texas}</td>
              <td>${datapro[i].ads}</td>
              <td>${datapro[i].discount}</td>
              <td>${datapro[i].total}</td>
              <td>${datapro[i].category}</td>
              <td><button id="update" onclick = "updateData(${i})">update</button></td>
              <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>`
    }
    document.getElementById('tbody').innerHTML = table
    let btnDelete = document.getElementById('deletAll')
    if (datapro.length > 0) {
        btnDelete.innerHTML = `
          <button onclick = "deleteAll()">Delete All(${datapro.length})</button>
        `
    } else {
        btnDelete.innerHTML = ''
    }
}
function deleteAll() {
    localStorage.clear();
    datapro.splice(0)
    showData()
    clearAll()
}
showData()
// delete
function deleteData(i) {
    datapro.splice(i, 1)
    localStorage.product = JSON.stringify(datapro)
    showData()
}
// update Data
function updateData(i) {
    title.value = datapro[i].title
    price.value = datapro[i].price
    texas.value = datapro[i].texas
    ads.value = datapro[i].ads
    discount.value = datapro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = datapro[i].category
    sumbit.innerHTML = 'Update'
    mood = 'update'
    tmp = i
    scroll({
        top: 0,
        behavior: "smooth"
    })
}
// search

function getSearchMood(id) {
    if (id == 'searchtitle') {
        searchMood = 'title'
    } else {
        searchMood = 'category'
    }
    search.placeholder = 'search By ' + searchMood
    search.focus()
    search.value = ''
    showData();
}

function searchData(value) {
    for (let i = 0; i < datapro.length; i++) {
        let table = ''
        if (searchMood == 'title') {
            if (datapro[i].title.includes(value))
                table += ` <tr>
                          <td>${i + 1}</td>
                          <td>${datapro[i].title}</td>
                          <td>${datapro[i].price}</td>
                          <td>${datapro[i].texas}</td>
                          <td>${datapro[i].ads}</td>
                          <td>${datapro[i].discount}</td>
                          <td>${datapro[i].total}</td>
                          <td>${datapro[i].category}</td>
                          <td><button id="update" onclick = "updateData(${i})">update</button></td>
                          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`
        }

        else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += ` <tr>
                          <td>${i + 1}</td>
                          <td>${datapro[i].title}</td>
                          <td>${datapro[i].price}</td>
                          <td>${datapro[i].texas}</td>
                          <td>${datapro[i].ads}</td>
                          <td>${datapro[i].discount}</td>
                          <td>${datapro[i].total}</td>
                          <td>${datapro[i].category}</td>
                          <td><button id="update" onclick = "updateData(${i})">update</button></td>
                          <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`
            }
        }
    }
    document.getElementById('tbody').innerHTML = table
}

// clean data
