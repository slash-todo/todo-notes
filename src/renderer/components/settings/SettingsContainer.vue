<template>
  <settings :plugins="plugins"></settings>
</template>

<script>
import Settings from './Settings.vue';

export default {
  data: function() {
    return {
      plugins: [
        {
          name: 'stickies',
          install: '0.1.0',
          settings: {}
        }
      ]
    };
  },
  components: {
    Settings
  }
};
</script>

<style lang="scss" scoped>
</style>


