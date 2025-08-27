<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, useTemplateRef } from 'vue'
import { useWeatherStore } from '@/stores/weather'

const isOpen = ref(false)
const selectRef = useTemplateRef('select')

const weatherStore = useWeatherStore()

const toggle = () => {
  isOpen.value = !isOpen.value
}

const setCity = (cityId: number) => {
  weatherStore.setCity(cityId)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  if (selectRef.value && !selectRef.value.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<template>
  <div class="custom-select" ref="select">
    <button class="select-button" @click="toggle">
      <span>
        {{ weatherStore.selectedCity?.name || 'Выберите город' }}
      </span>

      <span class="chevron" :class="{ 'open': isOpen }"></span>
    </button>

    <transition name="fade">
      <ul v-if="isOpen" class="select-dropdown">
        <li
          v-for="city in weatherStore.citiesWithoutSelected"
          :key="city.id"
          @click="setCity(city.id)"
        >
          {{ city.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.custom-select {
  position: relative;
  width: 246px;
  user-select: none;
}

.select-button {
  width: 100%;
  padding: 10px 16px;
  background: rgba(var(--color-white-soft), 0.1);
  font-family: inherit;
  line-height: inherit;
  font-weight: 500;
  font-size: 22px;
  border-radius: 8px;
  color: rgba(var(--color-white), 1);
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.chevron {
  width: 20px;
  height: 20px;
  background: url(/icons/chevron-down.svg) center center / 20px 20px;
  transform: rotate(-90deg);
  transition: transform 0.2s ease-in-out;
}

.chevron.open {
  transform: rotate(0deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 12px;
  padding: 0;
  list-style: none;
  background: var(--color-accent-blue);
  border-radius: 8px;
  overflow: hidden;
}

.select-dropdown li {
  background: rgba(var(--color-white-soft), 0.1);
  padding: 10px 16px;
  font-weight: 500;
  font-size: 22px;
  color: rgba(var(--color-white), 1);
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.select-dropdown li:hover {
  background: rgba(var(--color-white-soft), 0.2);
}

@media (max-width: 768px) {
  .select-button, .select-dropdown li {
    font-size: 18px;
  }

  .chevron {
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
  }
}
</style>