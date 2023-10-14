<template>
    <input
    type="text"
    :maxlength="40"
    placeholder="Enter name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const { modelValue } = defineProps(['modelValue'])
const emit = defineEmits()
</script>
