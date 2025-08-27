<script setup lang="ts">
import { useWeatherStore } from '@/stores/weather'

const weatherStore = useWeatherStore()
</script>

<template>
  <nav>
    <ul class="nav-list">
      <li
        class="nav-list-item"
        :class="{ active: weatherStore.viewMode === 'today' }"
        @click="weatherStore.setViewMode('today')"
      >
        Главная
      </li>

      <li
        class="nav-list-item"
        :class="{ active: weatherStore.viewMode === 'week' }"
        @click="weatherStore.setViewMode('week')"
      >
        Погода за неделю
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav-list {
  display: inline-flex;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: rgba(var(--color-white-soft), 0.1);
  border-radius: 8px;
  font-weight: 500;
  font-size: 22px;
}

.nav-list-item {
  padding: 10px 16px;
  color: rgba(var(--color-white), 0.4);
  border-right: 1px solid rgba(var(--color-white-soft), 0.2);
  cursor: pointer;
  user-select: none;
  transition: color 0.2s ease-in-out;
}

.nav-list-item:hover {
  color: rgba(var(--color-white), 1);
}

.nav-list-item.active {
  color: rgba(var(--color-white), 1);
  cursor: default;
  pointer-events: none;
}

.nav-list-item:last-child {
  border-right: none;
}

@media (max-width: 768px) {
  .nav-list {
    font-size: 18px;
  }
}
</style>
