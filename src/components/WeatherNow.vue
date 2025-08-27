<script setup lang="ts">
import { computed } from 'vue'
import { useWeatherStore } from '@/stores/weather'
import { WeatherStatusLabel } from '@/shared/types'

const weatherStore = useWeatherStore()

const currentWeather = computed(() => weatherStore.selectedCityWeather?.current)

const weatherData = computed(() => {
  const status = currentWeather.value?.status
  if (!status) return { icon: '', label: '' }

  return {
    icon: `/icons/${status}.svg`,
    label: WeatherStatusLabel[status]
  }
})
</script>

<template>
  <div class="weather-now">
    <img
      :src="weatherData.icon"
      :alt="weatherData.label"
      class="icon"
    />

    <div class="temperature">{{ currentWeather?.temperature }}°</div>

    <dl class="weather-details">
      <div class="weather-details-item">
        <dd>{{ weatherData.label }}</dd>
      </div>

      <div class="weather-details-item">
        <dt>Влажность</dt>
        <dd>{{ currentWeather?.humidity }}%</dd>
      </div>

      <div class="weather-details-item">
        <dt>Ветер</dt>
        <dd>{{ currentWeather?.wind }} м/с</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
.weather-now {
  display: flex;
  align-items: center;
  min-width: 635px;
}

.weather-now .icon {
  width: 180px;
  height: 180px;
  margin-right: 44px;
}

.weather-now .temperature {
  margin-right: 44px;
  font-size: 100px;
  font-weight: 700;
  color: rgba(var(--color-white), 1);
  line-height: 1.1;
  min-width: 166px;
  text-align: center;
}

.weather-details {
  margin: 0;
}

.weather-details-item {
  margin-bottom: 12px;
}

.weather-details-item:last-child {
  margin-bottom: 0;
}

.weather-details-item dt, .weather-details-item dd {
  display: inline;
  text-align: left;
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: rgba(var(--color-white), 1);
}

.weather-details-item dt::after {
  content: ': ';
}

@media (max-width: 1280px) {
  .weather-now {
    margin-bottom: 36px;
  }
}

@media (max-width: 768px) {
  .weather-now .icon {
    width: 100px;
    height: 100px;
    margin-right: 30px;
  }

  .weather-now .temperature {
    min-width: 100px;
    font-size: 75px;
    margin-right: 30px;
  }

  .weather-details-item {
    margin-bottom: 8px;
  }

  .weather-details-item dt, .weather-details-item dd {
    display: inline;
    text-align: left;
    margin: 0;
    font-size: 18px;
    font-weight: 500;
    color: rgba(var(--color-white), 1);
  }
}
</style>