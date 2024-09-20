// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEmptyObject(obj: any): boolean {
  if (obj === null || obj === undefined || obj === '') return true
  // Si l'objet est un tableau vide ou une chaîne vide, il est considéré comme vide
  if (typeof obj === 'string' || Array.isArray(obj)) return obj.length === 0

  // Si l'objet est de type "object", vérifier récursivement
  if (typeof obj === 'object') {
    return Object.values(obj).every((value) => isEmptyObject(value))
  }

  // Sinon, ce n'est pas vide (par exemple, si c'est un nombre ou un booléen)
  return false
}
