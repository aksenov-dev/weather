<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { computed } from 'vue'
import { WeatherStatusLabel } from '@/shared/types'

const weatherStore = useWeatherStore()

const weekWeather = computed(() => weatherStore.selectedCityWeather?.week)
</script>

<template>
  <section class="week-weather">
    <div class="cards">
      <article
        v-for="item in weekWeather"
        :key="item.day"
        class="card"
      >
        <p class="week-day">{{ item.day }}</p>

        <img
          :src="`/icons/${item.status}.svg`"
          :alt="WeatherStatusLabel[item.status]"
        />

        <p class="temperature">{{ item.temperature }}°</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.week-weather {
  margin-bottom: 56px;
}

.cards {
  display: flex;
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 124px;
  row-gap: 8px;
}

.card p {
  margin: 0;
  color: rgba(var(--color-white), 1);
  font-size: 18px;
}

.card .week-day {
  font-weight: 400;
}

.card img {
  width: 60px;
  height: 60px;
}

.card .temperature {
  font-weight: 500;
}
</style>