<template>
 <main>
  <Button @click="handleClick" />
  <div v-if="isGameStart" class="container">
  </div>
 </main>
</template>
<script setup>
import Button from './components/Button.vue'
import { ref } from 'vue'

const isGameStart = ref(false)

function handleClick(){
  isGameStart.value = true
}
</script>