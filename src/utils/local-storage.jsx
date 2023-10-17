export const addAccessToken = (token) => localStorage.setItem('ACCESS_TOKEN', token) // (key: value)

export const removeAccessToken = () => localStorage.removeItem('ACCESS_TOKEN');

export const getAccessToken = () => localStorage.getItem('ACCESS_TOKEN');