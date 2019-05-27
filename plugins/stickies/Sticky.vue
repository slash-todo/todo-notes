<template>
  <div
    class="sticky"
    :style="{backgroundColor: data.color, width: data.size.width + 'px', height: data.size.height + 'px'}"
  >
    <div class="sticky__strip"></div>
    <div class="sticky__content">{{data.text}}</div>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>

<style lang="scss" scoped>
.sticky {
  box-shadow: 0 7px 5px rgba(0, 0, 0, 0.15);

  &__strip {
    background-color: rgba(0, 0, 0, 0.05);
    height: 1.5rem;
  }

  &__content {
    padding: 0.5rem;
  }
}
</style>


