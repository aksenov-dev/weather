import type { City, CurrentWeather, HourlyWeather, WeekDayWeather } from '@/shared/types'

export interface CityWeather extends City {
  current: CurrentWeather
  week: WeekDayWeather[]
  today: HourlyWeather[]
}