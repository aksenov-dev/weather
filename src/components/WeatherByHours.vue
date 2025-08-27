<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'

import { assetUrl, capitalize } from '@/utils'
import { WeatherStatusLabel } from '@/shared/types'

const weatherStore = useWeatherStore()

const todayWeather = computed(() => weatherStore.selectedCityWeather?.today)
</script>

<template>
  <div class="weather-by-hours">
    <div
      v-for="item of todayWeather"
      :key="item.time"
      class="weather-by-hours-row"
    >
      <div class="time">
        <div>{{ item.time }}</div>
        <div>{{ capitalize(item.part) }}</div>
      </div>

      <div class="temperature">{{ item.temperature }}°</div>

      <div class="description">
        <img
          :src="assetUrl(`icons/${item.status}.svg`)"
          :alt="WeatherStatusLabel[item.status]"
        />

        <div class="desc">{{ WeatherStatusLabel[item.status] }}</div>
      </div>

      <div class="wind">{{ item.wind }} м/с</div>
      <div class="humidity">{{ item.humidity }}%</div>
    </div>
  </div>
</template>

assetUrl(`icons/${status}.svg`)

<style scoped>
.weather-by-hours {
  width: 100%;
}

.weather-by-hours-row {
  display: grid;
  grid-template-columns: 16% 21% 30% 13% 14%;
  align-items: center;
  column-gap: 10px;
  font-size: 18px;
  font-weight: 400;
  padding: 7px 0;
  color: rgba(var(--color-white), 1);
  border-bottom: 1px solid rgba(var(--color-white-soft), 0.1);
}

.time {
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  align-items: center;
}

.temperature {
  font-size: 48px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
}

.description {
  display: flex;
  align-items: center;
}

.description img {
  width: 60px;
  height: 60px;
  margin-right: 12px;
}

.wind, .humidity {
  font-weight: 500;
  text-align: center;
}

@media (max-width: 768px) {
  .weather-by-hours-row {
    font-size: 16px;
    column-gap: 8px;
  }

  .time {
    row-gap: 6px;
  }

  .temperature {
    font-size: 36px;
  }

  .description img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }
}

@media (max-width: 640px) {
  .weather-by-hours-row {
    font-size: 14px;
  }

  .time {
    row-gap: 5px;
  }

  .temperature {
    font-size: 32px;
  }
}
</style>