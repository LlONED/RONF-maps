<template>
  <section>
    <DrawingPoints
      :currentColor="currentColor"
      :currentImage="currentImage"
      :currentMap="currentMap"
      :maps="maps"
      @update="setPoints"
    />

    <CursorGenerator :currentColor="currentColor" />
  </section>
</template>

<script setup>
  import { mapGetters, mapMutations } from "@/hooks/useVuexMaps";

  import CursorGenerator from "@/components/Main/Canvas/CursorGenerator.vue";
  import DrawingPoints from "@/components/Main/Canvas/DrawingPoints.vue";

  const { currentMap, currentColor, currentImage } = mapGetters("current");
  const { maps } = mapGetters("maps");
  const { setPoints } = mapMutations("maps");
</script>
