import type { City, WeatherStatus } from '@/shared/types'

export interface PopularCityWeather extends City {
  temperature: number
  humidity: number
  status: WeatherStatus
}