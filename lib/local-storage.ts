export function getLocalStorage(key: string, defaultValue: any = null) {
  if (typeof window === "undefined") {
    return defaultValue
  }

  const value = localStorage.getItem(key)
  if (value === null) {
    return defaultValue
  }

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export function setLocalStorage(key: string, value: any) {
  if (typeof window === "undefined") {
    return
  }

  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

export function removeLocalStorage(key: string) {
  if (typeof window === "undefined") {
    return
  }

  localStorage.removeItem(key)
}
