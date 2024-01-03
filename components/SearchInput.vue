<script setup lang="ts">
const prop = defineProps({
  modelValue: { type: String, required: true },
});

const emit = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const localValue = ref(prop.modelValue)
const debouncedLocalValue = refDebounced(localValue, 500)
watch(debouncedLocalValue, () => {
  emit('update:modelValue', localValue.value)
})
</script>
<template>
  <div class="relative text-red-300">
    <IconSearch class="w-3 absolute top-2.5 left-2 bg-gray-200 z-10 text-gray-400" />

    <input
      type="text"
      placeholder="Search"
      class="!pl-10"
      v-model="localValue"
    />
  </div>
</template>
