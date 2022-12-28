<template>
  <canvas
    class="w-full h-full"
    id="canvas"
    :style="{
      background: `url(${maps[currentMap][currentImage].path}) no-repeat center`,
      backgroundSize: 'contain',
    }"
    @mousemove="draw"
    @mousedown="start"
    @mouseup="out"
    @mouseout="out"
  ></canvas>
</template>

<script setup>
  import { computed, onMounted, watch } from "vue";
  import { useCanvasClear } from "@/hooks/useCanvasClear";

  const props = defineProps({
    currentColor: {
      type: String,
      required: true,
    },

    currentMap: {
      type: String,
      required: true,
    },

    currentImage: {
      type: String,
      required: true,
    },

    maps: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits({
    update: null,
  });

  const currentColor = computed(() => props.currentColor);
  const currentMap = computed(() => props.currentMap);
  const currentImage = computed(() => props.currentImage);
  const maps = computed(() => props.maps);

  let isDrawing = false;
  let $canvas = null;
  let ctx = null;

  function draw(e) {
    const color = currentColor.value;

    if (isDrawing === false) return;

    if (color.slice(0, 2) === "s:") {
      ctx.clearRect(
        e.clientX - $canvas.offsetLeft,
        e.clientY - $canvas.offsetTop,
        15,
        15
      );
      return;
    }
    ctx.lineTo(
      e.clientX - $canvas.offsetLeft + 5,
      e.clientY - $canvas.offsetTop + 5
    );
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    return;
  }

  function start(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(
      e.clientX - $canvas.offsetLeft + 5,
      e.clientY - $canvas.offsetTop + 5
    );
    e.preventDefault();
  }

  function out(e) {
    if (isDrawing) {
      isDrawing = false;
      ctx.stroke();
      ctx.closePath();
    }
  }

  onMounted(() => {
    $canvas = document.querySelector("#canvas");
    $canvas.width = $canvas.clientWidth;
    $canvas.height = $canvas.clientHeight;
    ctx = $canvas.getContext("2d", { willReadFrequently: true });
  });

  watch([currentMap, currentImage], ([curMap, curImg], [oldMap, oldImg]) => {
    emit("update", {
      map: oldMap,
      image: oldImg,
      imageData: ctx.getImageData(0, 0, $canvas.width, $canvas.height),
    });

    useCanvasClear();

    const imageData = maps.value[curMap][curImg].points;
    if ("data" in imageData) ctx.putImageData(imageData, 0, 0);
  });
</script>
