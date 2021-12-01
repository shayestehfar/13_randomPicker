const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

// focus on input arae
textarea.focus()

// event listener to input area
textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value)

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    }, 10)

    randomSelect()
  }
})

// create  spans of the class 'tag' from the input of textarea
function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())

  tagsEl.innerHTML = ''

  tags.forEach((tag) => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerText = tag
    tagsEl.appendChild(tagEl)
  })
}

function randomSelect() {
  const times = 30 // this is constant to multiply by 100ms to finish the process

  // pick a random tag and switch highlight/unhighlight every 100ms
  const interval = setInterval(() => {
    const randomTag = pickRandomTag()
    switchHighlight(randomTag)
  }, 100)

  // pick the last random tag and highlight it
  setTimeout(() => {
    clearInterval(interval)
    pickLastTag()
  }, times * 100)
}

// pick a random tag with class of 'tag' from parent element of the class 'tags'
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

// add class of highlight to a span element of the class 'tag'
function highlightTag(tag) {
  tag.classList.add('highlight')
}

// remove class of highlight to a span element of the class 'tag'
function unHighlightTag(tag) {
  tag.classList.remove('highlight')
}

// function to highlight a tag and unhighlight it after 100ms
function switchHighlight(tag) {
  if (tag !== undefined) {
    highlightTag(tag)

    setTimeout(() => {
      unHighlightTag(tag)
    }, 100)
  }
}

// function to pick a random tag after times*100 ms and highlight it
function pickLastTag() {
  setTimeout(() => {
    const randomTag = pickRandomTag()

    highlightTag(randomTag)
  }, 100)
}
