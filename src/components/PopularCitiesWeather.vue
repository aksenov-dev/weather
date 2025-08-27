<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'
import { WeatherStatusLabel } from '@/shared/types'
import { assetUrl } from '@/utils'

const weatherStore = useWeatherStore()
</script>

<template>
  <section>
    <div class="popular-cities-weather">
      <h2>Погода в популярных городах</h2>
      <div class="info"></div>
    </div>

    <div class="cards">
      <article
        v-for="city in weatherStore.popularCitiesWeather"
        :key="city.id"
        class="card"
        @click="weatherStore.setCity(city.id)"
      >
        <div class="description">
          <h3>{{ city.name }}</h3>
          <p>{{ WeatherStatusLabel[city.status] }}</p>
        </div>

        <img
          :src="assetUrl(`icons/${city.status}.svg`)"
          :alt="WeatherStatusLabel[city.status]"
        />

        <p class="temperature">{{ city.temperature }}°</p>
        <p>Влажность: {{ city.humidity }}%</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.popular-cities-weather {
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 32px;
}

.popular-cities-weather .info {
  min-width: 38px;
  min-height: 38px;
  border-radius: 100%;
  background: url(/icons/question.svg) center center no-repeat rgba(var(--color-white-soft), 0.1);
  cursor: help;
  transition: opacity 0.2s ease;
}

.popular-cities-weather .info:hover {
  opacity: 0.75;
}

.popular-cities-weather h2 {
  margin: 0;
  color: rgba(var(--color-white), 1);
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 36px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  border-radius: 8px;
  padding: 25px 26px;
  background: radial-gradient(135% 135% at -18% -23%, rgba(255, 255, 255, 0.2) 0%, rgba(238, 237, 237, 0.1) 100%);
  box-shadow: inset 0 0 0 1px rgba(var(--color-white), 0.1);
  font-weight: 500;
  color: rgba(var(--color-white), 1);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card .description {
  text-align: center;
}

.card .description h3 {
  color: rgba(var(--color-white), 1);
  font-size: 26px;
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 8px;
}

.card img {
  width: 60px;
  height: 60px;
}

.card p {
  margin: 0;
  font-size: 18px;
}

.card p.temperature {
  font-size: 48px;
  font-weight: 600;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .popular-cities-weather h2 {
    font-size: 28px;
  }

  .cards {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 20px;
  }

  .card {
    padding: 18px 19px;
    row-gap: 12px;
  }

  .card .description h3 {
    font-size: 20px;
    margin-bottom: 6px;
  }

  .card p {
    font-size: 14px;
  }

  .card p.temperature {
    font-size: 36px;
    font-weight: 600;
    line-height: 1.3;
  }
}

@media (max-width: 640px) {
  .popular-cities-weather h2 {
    font-size: 24px;
  }
}
</style>