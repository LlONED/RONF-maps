<template>
  <main class="cnt h-full flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6">
    <TheMaps class="section h-[400px] xl:h-[700px] flex-grow-[1]" />
    <TheDrawingArea class="section h-[700px] min-h-[700px] flex-grow-[2]" />
    <TheSettings class="section h-[700px] flex-grow-[1]" :colors="colors" />
  </main>
</template>

<script setup>
  import TheSettings from "@/components/Main/TheSettings.vue";
  import TheDrawingArea from "@/components/Main/TheDrawingArea.vue";
  import TheMaps from "@/components/Main/TheMaps.vue";

  const props = defineProps({
    colors: {
      type: Array,
      required: true,
    },
  });
</script>

<style scoped>
  .section {
    flex-basis: 280px;
    @apply bg-zinc-900 rounded;
  }
</style>
