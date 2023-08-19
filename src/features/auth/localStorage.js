// Adds user to local storage

export function storeUser(user) {
  user = JSON.stringify(user)
  localStorage.setItem('user', user)
}

export function loadUser() {
  let user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  }
  return null
}

export function clearUser() {
  localStorage.removeItem('user')
}
