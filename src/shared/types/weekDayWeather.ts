import type { WeatherStatus } from '@/shared/types'

export interface WeekDayWeather {
  day: string
  temperature: number
  status: WeatherStatus
}