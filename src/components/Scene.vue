<script setup>
  import { onMounted, ref } from "vue";
  import { World } from "@/store/world.js";

  const target = ref();
  const world = new World(
    true, true, true, true, true,
    {
      
      mossy_fibers: false,
      purkinje_cell: false,
      stellate_cell: false,
      ubc_glomerulus: false,
      unipolar_brush_cell: false
    }
  );

  onMounted(() => {
    target.value.appendChild(world.renderer.domElement);
    world.init(target.value)
  });
</script>

<template>
  <div ref="target">

  </div>
</template>

<style scoped>
</style>
