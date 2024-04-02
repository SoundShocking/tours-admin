export const getCSRF = () => {
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
}

export const setCSRF = (csrf: string) => {
  document.querySelector('meta[name="csrf-token"]')?.setAttribute('content', csrf)
}
