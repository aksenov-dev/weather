<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

import { formatDate, formatISODate } from '@/utils'

const weatherStore = useWeatherStore()

const cityName = computed(() => weatherStore.selectedCity?.name)
const currentWeather = computed(() => weatherStore.selectedCityWeather?.current)

const ruDate = computed(() => {
  if (!currentWeather.value) return
  return formatDate(currentWeather.value.serverTime)
})

const isoDate = computed(() => {
  if (!currentWeather.value) return
  return formatISODate(currentWeather.value.serverTime)
})
</script>

<template>
  <section class="location-date">
    <h1 class="title">Погода в городе {{ cityName }}</h1>

    <time :datetime="isoDate" class="date">{{ ruDate }}</time>
  </section>
</template>

<style scoped>
.location-date {
  margin-bottom: 48px;
}

.title {
  font-size: 36px;
  font-weight: 600;
  color: rgba(var(--color-white), 1);
  line-height: 1.3;
  margin: 0 0 12px;
}

.date {
  font-size: 30px;
  font-weight: 500;
  color: rgba(var(--color-white-soft), 0.6);
}

@media (max-width: 768px) {
  .location-date {
    margin-bottom: 36px;
  }

  .title {
    font-size: 30px;
  }

  .date {
    font-size: 24px;
  }
}
</style>