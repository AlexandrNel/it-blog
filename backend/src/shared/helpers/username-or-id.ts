  export function isIdOrUsername(id: string): 'id' | 'username' {
    const isUsername = id.match(/^[a-zA-Z0-9]{4,20}$/gim)
    return isUsername ? 'username' : 'id'
  }
