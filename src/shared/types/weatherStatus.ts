export type WeatherStatus = 'cloudy' | 'rainy' | 'sunny' | 'windy'

export const WeatherStatusLabel = {
  cloudy: 'Облачно',
  rainy: 'Дождливо',
  sunny: 'Солнечно',
  windy: 'Ветрено',
} as const satisfies Record<WeatherStatus, string>
