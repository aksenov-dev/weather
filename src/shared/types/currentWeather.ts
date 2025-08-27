import type { WeatherStatus } from '@/shared/types'

export interface CurrentWeather {
  temperature: number
  humidity: number
  wind: number
  status: WeatherStatus
  serverTime: number
}