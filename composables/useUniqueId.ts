export function useUniqueId () {
  return Math.floor(Math.random() * 0xFFFFFFFF).toString()
}
