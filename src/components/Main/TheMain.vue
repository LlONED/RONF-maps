<template>
  <main class="cnt h-full flex justify-between items-center gap-6 flex-wrap">
    <TheMaps class="section flex-grow-[1]" />
    <TheDrawingArea class="section flex-grow-[2]" />
    <TheSettings class="section flex-grow-[1]" :colors="colors" />
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
    flex-basis: 200px;
    @apply h-[700px] bg-zinc-900 rounded;
  }
</style>
