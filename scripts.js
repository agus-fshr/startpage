/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"WHUBYi7pOOHC2WY0","label":"ITBA","bookmarks":[{"id":"tJmDJBrCr7mxK9Hz","label":"Blackboard","url":"https://campus.itba.edu.ar/"},{"id":"aw3Ok3vDLDBJRzi7","label":"SGA","url":"https://sga.itba.edu.ar/app2/L7ExSNbPC4sb6TPJDblCApV28_TV0rSO9auoWx8mJndaDLR_xeZ86GesasHvBscoR9vGe_BaY2MCCaaesCtju4B1xo5_QW1t/L7E59/TPJfd/_QW24"}]},{"id":"ZnJzABDUKJVy0eMF","label":"Google","bookmarks":[{"id":"i64QYPg3OFvWObWs","label":"Gmail","url":"https://mail.google.com/mail/u/0/#inbox"},{"id":"QE4MuqdWMqlyoeDI","label":"Drive","url":"https://drive.google.com/drive/u/0/my-drive"},{"id":"QbVEuhwL9sfrAmXn","label":"Calendar","url":"https://calendar.google.com/calendar/u/0/r/week"}]},{"id":"NE4hYul1g6drHfre","label":"Personal","bookmarks":[{"id":"NcKsv5jBlvXIP1RH","label":"GitHub","url":"https://github.com/agus-fshr"},{"id":"s7ZeHZiw46iHy6aO","label":"freeCodeCamp","url":"https://www.freecodecamp.org/learn/data-analysis-with-python/#data-analysis-with-python-course"},{"id":"Opx1lrQeN95yi519","label":"Twitter","url":"https://twitter.com/home?lang=en"},{"id":"SfvArook7yWY81Eu","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn/"}]},{"id":"wGUDIa5SV7WpM8i5","label":"sources","bookmarks":[{"id":"MIhyXbJKjwuS9pG4","label":"WhatsApp Web","url":"https://web.whatsapp.com/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
