<template>
  <section class="flex flex-col text-lg">
    <div class="p-5">
      <v-input-text
        class="w-full py-1.5 px-3"
        placeholder="map search"
        :value="search"
        @input="searchMap"
      />
    </div>

    <SelectMap
      class="px-4 pb-4 pt-1 overflow-y-scroll scrollbar"
      :currentMap="currentMap"
      :maps="accessMaps"
      @select="selectMap"
    />
  </section>
</template>

<script setup>
  import { mapGetters, mapMutations } from "@/hooks/useVuexMaps";

  import SelectMap from "@/components/Main/Select/Map.vue";
  import { ref, computed } from "vue";

  const { currentMap } = mapGetters("current");
  const { maps } = mapGetters("maps");
  const { setCurrentMap, setCurrentImage } = mapMutations("current");

  const search = ref("");

  const mapsKeys = Object.keys(maps.value);
  const accessMaps = ref(mapsKeys);

  function searchMap(e) {
    search.value = e.target.value;

    accessMaps.value = mapsKeys.filter(
      (m) =>
        search.value === "" ||
        m.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  function selectMap(map = "") {
    setCurrentMap(map);
    setCurrentImage(Object.keys(maps.value[map])[0]);
  }
</script>
