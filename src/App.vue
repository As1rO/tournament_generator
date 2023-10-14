<template>
  <main>
    <div v-if="!isGameStart">
      <Button @click="handleClick" > Start</Button>
    </div>
    <div v-if="isGameStart" class="container">
      <Select :options="selectedOption" v-model="selectedValue" @change="handleNumberOfPlayer" />
      <div v-if="selectedValue !== null">
      <Input v-for="(inputValue, index) in selectedValue" :key="index" v-model="inputsValues[index]" />
      <Button @click="saveNames">Sauvegarder</Button>
      </div>
      <div v-if="showTree">
        <div v-for="pool of ChampionshipPools" class="container-pool">
          <div class="pool">
            <div><span class="player_name">{{ pool.player1.name }}</span></div>
            <div><span class="player_name">{{ pool.player2.name }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import Button from './components/Button.vue'
import Input from './components/Input.vue'
import Select from './components/Select.vue'
import { ref, reactive } from 'vue'

const isGameStart = ref(false)

const selectedOption = ref([
  { label: '4', value: 4, id: 1 },
  { label: '8', value: 8, id: 2 },
  { label: '16', value: 16, id: 3 },
  { label: '32', value: 32, id: 4 },
])

function handleClick() {
  isGameStart.value = true
}

const selectedValue = ref(null)
const inputsValues = ref([])


function handleNumberOfPlayer(newValue) {
  const selectedOptionItem = selectedOption.value.find(option => option.value === newValue);

  if (selectedOptionItem) {
    inputsValues.value = Array(selectedOptionItem.value).fill('');
  }
}

const showTree = ref(false)

function saveNames() {
  console.log('Noms sauvegardés :', inputsValues.value);
  showTree.value = true
  console.log('test', generateVs())
}


const generateUniqueId = (prefix = 'id') => {
  let idCounter = 0
  const id = ++idCounter
  return `${prefix}-${id}-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .substring(2, 7)}`
}

const ChampionshipPools = ref([])

function generateVs(){
  const numberOfVs = selectedValue.value
  const vs = []
  for (let i = 0; i < numberOfVs; i = i + 2) {
    vs.push({
      game_id: i / 2,
      player1: {'name' : inputsValues.value[i] , player_id : generateUniqueId() },
      player2: {'name' : inputsValues.value[i + 1 ] , player_id : generateUniqueId()},
    })
  }
  ChampionshipPools.value = vs
  console.log('ChampionshipPools', ChampionshipPools.value)
  return vs
}

</script>

<style lang="scss" scoped>

.container-pool{
  display: flex;
  .pool{
    display: flex;
    flex-flow: row nowrap;
    gap: 8px;

    > div {
      width: 150px;
      height: 60px;
    }
    .player_name{
      padding: 8px 15px;
      background-color: #fa6400;
    }
  }
}
</style>
