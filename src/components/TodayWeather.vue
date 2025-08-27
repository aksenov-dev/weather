<script setup lang="ts">
import WeatherByHours from '@/components/WeatherByHours.vue'
import WeatherNow from '@/components/WeatherNow.vue'
</script>

<template>
  <section class="today-weather">
    <WeatherNow />
    <WeatherByHours />
  </section>
</template>

<style scoped>
.today-weather {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  column-gap: 50px;
  margin-bottom: 56px;
}

@media (max-width: 1280px) {
  .today-weather {
    display: block;
    margin-bottom: 48px;
  }
}

@media (max-width: 768px) {
  .today-weather {
    margin-bottom: 36px;
  }
}
</style>