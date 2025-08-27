<script setup lang="ts">
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weather'

import Navigation from '@/components/Navigation.vue'
import CitySelect from '@/components/CitySelect.vue'
import LocationDate from '@/components/LocationDate.vue'
import PopularCitiesWeather from '@/components/PopularCitiesWeather.vue'
import TodayWeather from '@/components/TodayWeather.vue'
import WeekWeather from '@/components/WeekWeather.vue'

const weatherStore = useWeatherStore()

onMounted(() => weatherStore.init())
</script>

<template>
  <div class="container">
    <header class="header">
      <Navigation/>
      <CitySelect/>
    </header>

    <main v-if="weatherStore.selectedCity">
      <LocationDate/>

      <TodayWeather v-if="weatherStore.viewMode === 'today'"/>
      <WeekWeather v-else/>

      <PopularCitiesWeather/>
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 56px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }
}
</style>