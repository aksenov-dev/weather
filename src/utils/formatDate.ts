export const formatDate = (timestamp: number): string | undefined => {
  if (!timestamp) return

  const date = new Date(timestamp)

  const formatter = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  })

  return formatter.format(date)
}