<template>
  <div class="board">
    <Sticky v-for="(note, index) in notes" :data="note" :key="index"></Sticky>
  </div>
</template>

<script>
import { Sticky } from './Sticky';
import { StickyService } from './services';

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
    this.notes = StickyService.loadStickies();
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


