const modal = document.getElementById('modal'),
	modalShow = document.getElementById('show-modal'),
	modalClose = document.getElementById('close-modal'),
	bookmarkForm = document.getElementById('bookmark-form'),
	websiteNameEl = document.getElementById('website-name'),
	websiteUrlEl = document.getElementById('website-url'),
	bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// show modal and focus on input
const showModal = () => {
	modal.classList.add('show-modal')
	websiteNameEl.focus()
}

// modal event listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (event) => event.target === modal ? modal.classList.remove('show-modal') : false)

// validate form
const validate = (nameValue, urlValue) => {
	const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

	const regex = new RegExp(expression)
	if(!nameValue || !urlValue) {
		alert('Please submit values for both fields...')
		return false
	}

	if(!urlValue.match(regex)) {
		alert('Please provide a valid web address...')
		return false
	}

	return true
}

// build bookmarks DOM
const buildBookmarks = () => {
	// before building bookmark, clear bookmarksContainer
	bookmarksContainer.textContent = ''
	// build items
	bookmarks.forEach((bookmark) => {
		const {name, url} = bookmark

		// Item
		const item = document.createElement('div')
		item.classList.add('item')

		// close icon
		const closeIcon = document.createElement('i')
		closeIcon.classList.add('fas', 'fa-times')
		closeIcon.setAttribute('title', 'Delete Bookmark')
		closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`)

		// Favicon / Link Container
		const linkInfo = document.createElement('div')
		linkInfo.classList.add('name')

		// Favicon
		const favicon = document.createElement('img')
		favicon.setAttribute('src', `http://s2.googleusercontent.com/s2/favicons?domain=${url}`)
		favicon.setAttribute('alt', 'Favicon')

		// Link
		const link = document.createElement('a')
		link.setAttribute('href', `${url}`)
		link.setAttribute('target', '_blank')
		link.textContent = name

		// Append to bookmark container
		linkInfo.append(favicon, link)
		item.append(closeIcon, linkInfo)
		bookmarksContainer.appendChild(item)
	})
}

// fetch bookmarks
const fetchBookmarks = () => {
	// get bookmarks from localStorage if available
	if(localStorage.getItem('bookmarks')) {
		bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
	} else {
		// create boookmarks array in localStorage
		bookmarks = [
			{
				name: 'Jacinto Design',
				url: 'https://jacinto.design'
			}
		]

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	}

	buildBookmarks()
}

// Delete Bookmark
const deleteBookmark = (url) => {
	bookmarks.forEach((bookmark, i) => {
		if(bookmark.url === url)
			bookmarks.splice(i, 1)
	})

	// update bookmarks array in localStorage, re-populate DOM
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	fetchBookmarks()
}

// handle data from form
const storeBookmark = (event) => {
	event.preventDefault()
	
	const nameValue = websiteNameEl.value
	let urlValue = websiteUrlEl.value
	if(!urlValue.includes('http://', 'https://')) {
		urlValue = `https://${urlValue}`
	}

	if(!validate(nameValue, urlValue))
		return false

	const bookmark = {
		name: nameValue,
		url: urlValue
	}
	bookmarks.push(bookmark)
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
	fetchBookmarks()
	bookmarkForm.reset()
	websiteNameEl.focus()
}

bookmarkForm.addEventListener('submit', storeBookmark)

// on load fetch bookmarks
fetchBookmarks()
