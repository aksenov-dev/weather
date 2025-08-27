import type { WeatherStatus } from '@/shared/types'

export interface HourlyWeather {
  time: string
  part: 'ночь' | 'утро' | 'день' | 'вечер'
  temperature: number
  humidity: number
  wind: number
  status: WeatherStatus
}