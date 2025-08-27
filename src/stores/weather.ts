import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

import type { City, CityWeather, PopularCityWeather, ViewMode } from '@/shared/types'

import axios from 'axios'
import { assetUrl } from '@/utils'

export const useWeatherStore = defineStore('weather', () => {
  const viewMode = ref<ViewMode>('today')
  const cities = ref<City[]>([])
  const popularCitiesWeather = ref<PopularCityWeather[]>([])
  const selectedCity = ref<City | null>(null)
  const selectedCityWeather = ref<CityWeather | null>(null)

  const citiesWithoutSelected = computed(() => {
    if (!selectedCity.value) return cities.value

    return cities.value.filter(city => city.id !== selectedCity.value?.id)
  })

  const init = async (): Promise<void> => {
    const savedCity = localStorage.getItem('selectedCity')
    if (savedCity) selectedCity.value = JSON.parse(savedCity)

    const savedMode = localStorage.getItem('viewMode')
    if (savedMode) viewMode.value = savedMode as ViewMode

    await getCities()
    await getPopularCitiesWeather()
  }

  const getCities = async (): Promise<void> => {
    try {
      const { data } = await axios.get<City[]>(assetUrl('mock/cities.json'))
      cities.value = data

      if (!selectedCity.value && cities.value.length > 0) {
        selectedCity.value = cities.value[0]
      }

      if (selectedCity.value) {
        await getCityWeather(selectedCity.value.id)
      }
    } catch (err) {
      console.error('Ошибка загрузки списка городов', err)
    }
  }

  const getCityWeather = async (id: number): Promise<void> => {
    try {
      const { data } = await axios.get<CityWeather>(assetUrl(`mock/city-${id}.json`))
      selectedCityWeather.value = data

      document.title = `Погода в городе ${selectedCity.value?.name}`
    } catch (err) {
      console.error('Ошибка загрузки погоды', err)
    }
  }

  const getPopularCitiesWeather = async (): Promise<void> => {
    try {
      const { data } = await axios.get<PopularCityWeather[]>(assetUrl('mock/popular.json'))
      popularCitiesWeather.value = data
    } catch (err) {
      console.error('Ошибка загрузки погоды в популярных городах', err)
    }
  }

  const setCity = async (cityId: number): Promise<void> => {
    const city = cities.value.find(item => item.id === cityId)
    if (!city) return

    selectedCity.value = city
    await getCityWeather(selectedCity.value.id)
  }

  const setViewMode = (mode: ViewMode): void => {
    viewMode.value = mode
  }

  watch([selectedCity, viewMode], () => {
    localStorage.setItem('selectedCity', JSON.stringify(selectedCity.value))
    localStorage.setItem('viewMode', viewMode.value)
  })

  return {
    viewMode,
    selectedCity,
    selectedCityWeather,
    citiesWithoutSelected,
    popularCitiesWeather,
    init,
    setCity,
    setViewMode
  }
})
