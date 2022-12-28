<template class="cnt">
  <TheHeader :discord="discordLink" :github="githubLink" />

  <section class="bg-zinc-700 w-full h-8 flex justify-center items-center">
    <span>
      You can ask to add a new map to the
      <a class="underline text-rr-100 hover:text-rr-50" :href="discordLink">
        discord server
      </a>
    </span>
  </section>

  <TheMain :colors="colors" />
</template>

<script setup>
  import TheHeader from "@/components/Header/TheHeader.vue";
  import TheMain from "@/components/Main/TheMain.vue";

  import { discordLink, githubLink } from "@/config/links";
  import { maps } from "@/config/maps";
  import { colors } from "@/config/colors";

  import { validateMaps } from "@/utils/maps";
  import { mapMutations } from "@/hooks/useVuexMaps";

  const { setCurrentMap, setCurrentColor, setCurrentImage } =
    mapMutations("current");
  const { setMaps } = mapMutations("maps");

  setMaps(validateMaps(maps));
  setCurrentColor(colors[0].value);
  setCurrentMap(Object.keys(maps)[0]);
  setCurrentImage(Object.keys(maps[Object.keys(maps)[0]])[0]);
</script>
