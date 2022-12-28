<template>
  <canvas id="cursor" class="hidden"></canvas>
</template>

<script setup>
  import { watch, onMounted, computed } from "vue";
  import { useGenerateCursor } from "@/hooks/useGenerateCursor";

  const props = defineProps({
    currentColor: {
      type: String,
      required: true,
    },
  });

  const currentColor = computed(() => props.currentColor);

  watch(currentColor, (color = "") => {
    useGenerateCursor(color);
  });

  onMounted(() => {
    useGenerateCursor(currentColor.value);
  });
</script>
