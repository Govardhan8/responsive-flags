const body = document.querySelector('body')
const container = document.createElement('main')
container.className = 'container'
body.append(container)

const getCountries = () => {
	const xhr = new XMLHttpRequest()
	xhr.open('GET', 'https://restcountries.com/v2/all')
	xhr.responseType = 'json'
	xhr.onload = () => {
		data = xhr.response
		localStorage.setItem('data', data)
		console.log(data)
		createPage(data)
		return data
	}
	xhr.send()
}
getCountries()

let data = localStorage.getItem('data')
const createPage = (data) => {
	//creating a row
	var section = document.createElement('section')
	section.className = 'row'
	container.append(section)

	let x = 1

	data.map((d) => {
		if (x > 4) {
			x = 1
			container.append(section)
			section = document.createElement('section')
			section.className = 'row'
		}

		//Creating flag box
		const flagContainer = document.createElement('div')
		const blockClass = 'box'
		flagContainer.className = `${blockClass}`
		section.append(flagContainer)

		//Flag image
		const image = document.createElement('img')
		const imageContainer = document.createElement('div')
		imageContainer.className = 'imageContainer'
		image.src = `${d.flags.png}`
		imageContainer.append(image)
		flagContainer.append(imageContainer)

		//Flag information
		const info = document.createElement('div')
		info.className = 'info'
		info.innerHTML = `
    <p><b class="name">${d.name}</b></p>
	<p><b>Population : </b> ${d.population}</p>
	<p><b>Region : </b> ${d.region}</p>
	<p><b>Capital : </b> ${d.capital}</p>
    `
		flagContainer.append(info)
		x++
	})
}
