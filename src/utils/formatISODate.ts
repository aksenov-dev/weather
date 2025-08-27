export const formatISODate = (timestamp: number): string | undefined => {
  if (!timestamp) return

  const date = new Date(timestamp)
  return date.toISOString().split('T')[0]
}