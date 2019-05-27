<template>
  <div class="board">
    <h3>Stickies</h3>
    <Sticky v-for="(note, index) in notes" :data="note" :key="index"></Sticky>
  </div>
</template>

<script>
import Sticky from './Sticky.vue';
import { StickiesService } from './services';

export default {
  data: function() {
    return {
      notes: []
    };
  },
  components: {
    Sticky
  },
  mounted() {
    this.notes = StickiesService.loadStickies();
  }
};
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
}
</style>


