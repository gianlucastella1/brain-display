<script setup>
  import { onMounted, ref } from "vue";
  import { World } from "@/store/world.js";

  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  let io_layer = parseLayerVisibilityValue(params.get('io'));
  let dcn_layer = parseLayerVisibilityValue(params.get('dcn'));
  let granular_layer = parseLayerVisibilityValue(params.get('granular'));
  let molecular_layer = parseLayerVisibilityValue(params.get('molecular'));
  let purkinje_layer = parseLayerVisibilityValue(params.get('purkinje'));

  const target = ref();
  const world = new World(
    io_layer, dcn_layer, granular_layer, molecular_layer, purkinje_layer
  );

  onMounted(() => {
    target.value.appendChild(world.renderer.domElement);
    world.init(target.value)
  });

  function parseLayerVisibilityValue(param) {
    var result = true

    if (param != '') {
      if (param == '0' || param == 'false' || param == false)
        result = false;
    }

    return result;
  }
</script>

<template>
  <div ref="target">

  </div>
</template>

<style scoped>
</style>
