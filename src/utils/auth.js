const TokenKey = 'auth_token'

let token = null

export function getToken() {
  if (token) {
    return token
  }
  return (token = localStorage.getItem(TokenKey))
}

export function setToken(auth) {
  token = auth
  return localStorage.setItem(TokenKey, auth)
}

export function removeToken() {
  token = null
  return localStorage.removeItem(TokenKey)
}
