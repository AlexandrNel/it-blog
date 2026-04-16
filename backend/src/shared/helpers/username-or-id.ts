export function isIdOrUsername(id: string): 'id' | 'username' {
  const isUsername = id.match(/^[a-zA-Z0-9]{6,25}$/gim)
  return isUsername ? 'username' : 'id'
}
