<template>
    <select :value="modelValue" @change="updateValue">
        <option v-for="option in options" :value="option.value" :key="option.id">
            {{ option.label }}
        </option>
    </select>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { options, modelValue } = defineProps(['options', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

function updateValue(event) {
    emit('update:modelValue', parseInt(event.target.value));
}
</script>
