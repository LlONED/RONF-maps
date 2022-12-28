<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-4xl font-bold text-center">keyboard</h1>

    <div class="flex flex-col items-center">
      <label
        class="flex justify-between w-[135px] relative text-lg hover:opacity-80"
        v-for="(color, i) in props.colors"
        :key="i"
      >
        <v-input-radio
          class="peer"
          name="colors"
          :value="color.value"
          :checked="props.currentColor === color.value"
          @change="emits('select', $event.target.value)"
        />
        <span
          class="flex-[2]"
          :style="{
            color: color.titleColor,
          }"
        >
          {{ color.title }}
        </span>

        <div
          class="flex-1 flex justify-between items-center peer-checked:text-rr-100"
        >
          <span>-</span>
          <span>{{ color.valueText }}</span>
        </div>
      </label>
    </div>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";

  const props = defineProps({
    colors: {
      type: Array,
      required: true,
    },

    currentColor: {
      type: String,
      required: true,
    },
  });

  const emits = defineEmits({ select: null });

  onMounted(() => {
    window.addEventListener("keypress", (e) => {
      if (isNaN(e.key) || e.key < 0 || e.key > 9) return;

      const index = +e.key === 0 ? 9 : +e.key - 1;
      const color = props.colors[index].value;

      if (props.currentColor === color) return;

      document.querySelectorAll('input[name="colors"]')[index].focus();
      emits("select", color);
    });
  });
</script>
