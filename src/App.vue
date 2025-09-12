<template>
  <HomeView />
  
</template>

<script setup>
import HomeView from './views/homeView.vue'
import { onMounted } from 'vue'
import { initHomeInteractions } from './scripts/home.js'

onMounted(() => {
  initHomeInteractions()
})
</script>

<style>
/* Estilos globais podem ir em src/styles/main.css */
</style>
