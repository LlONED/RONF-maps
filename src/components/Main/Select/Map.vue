<template>
  <div class="flex flex-col gap-3">
    <label v-for="(mapName, i) in maps" :key="i" class="relative">
      <v-input-radio
        class="peer"
        name="maps"
        :value="mapName"
        :checked="props.currentMap === mapName"
        @change="emits('select', $event.target.value)"
      />

      <div class="system-button peer-checked:bg-rr-40">
        {{ mapName }}
      </div>
    </label>
  </div>
</template>

<script setup>
  const props = defineProps({
    currentMap: {
      type: String,
      required: true,
    },

    maps: {
      type: Array,
      required: true,
    },
  });

  const emits = defineEmits({
    select: null,
  });
</script>

<style scoped>
  .peer:not(:checked):hover + div {
    @apply bg-rr-50;
  }
</style>
