<template>
  <section class="flex flex-col items-center justify-center gap-10 p-2">
    <a
      class="underline text-4xl font-bold"
      target="_blank"
      :href="maps[currentMap][currentImage].link"
    >
      {{ currentMap }}
    </a>

    <SelectImage
      :currentImage="currentImage"
      :images="maps[currentMap]"
      @select="setCurrentImage"
    />

    <SelectColor
      :currentColor="currentColor"
      :colors="props.colors"
      @select="setCurrentColor"
    />

    <button class="system-button" @click="useCanvasClear">clear</button>
  </section>
</template>

<script setup>
  import { mapGetters, mapMutations } from "@/hooks/useVuexMaps";

  import SelectColor from "@/components/Main/Select/Color.vue";
  import SelectImage from "@/components/Main/Select/Image.vue";
  import { useCanvasClear } from "@/hooks/useCanvasClear";

  const { currentMap, currentColor, currentImage } = mapGetters("current");
  const { maps } = mapGetters("maps");
  const { setCurrentColor, setCurrentImage } = mapMutations("current");

  const props = defineProps({
    colors: {
      type: Array,
      required: true,
    },
  });
</script>
