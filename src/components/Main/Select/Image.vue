<template>
  <div class="flex gap-3">
    <label v-for="(imageName, i) in images" :key="i" class="relative">
      <v-input-radio
        class="peer"
        name="images"
        :value="imageName"
        :checked="props.currentImage === imageName"
        @change="emits('select', $event.target.value)"
      />
      <div class="system-button peer-checked:bg-rr-40">
        {{ imageName }}
      </div>
    </label>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  const props = defineProps({
    currentImage: {
      type: String,
      required: true,
    },

    images: {
      type: Object,
      required: true,
    },
  });

  const emits = defineEmits({
    select: null,
  });

  const images = computed(() => Object.keys(props.images));
</script>

<style scoped>
  .peer:not(:checked):hover + div {
    @apply bg-rr-50;
  }
</style>
