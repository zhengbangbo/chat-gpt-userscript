export function uuid() {
  const t = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const e = []
  for (let n = 0; n < 36; n++)
    e[n] = n === 8 || n === 13 || n === 18 || n === 23 ? '-' : t[Math.ceil(Math.random() * t.length - 1)]
  return e.join('')
}
