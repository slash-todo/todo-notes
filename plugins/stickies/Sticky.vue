<template>
  <div class="sticky">
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
  &__strip {
    background-color: rgba(0, 0, 0, 0.05);
    height: 1rem;
  }

  &__content {
    padding: 0.5rem;
  }
}
</style>


