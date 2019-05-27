<template>
  <div class="sidebar">
    <installed-plugins-list :plugins="plugins"></installed-plugins-list>
  </div>
</template>

<script>
import InstalledPluginsList from './InstalledPluginsList.vue';

export default {
  name: 'sidebar-container',
  data: function() {
    return {
      plugins: [
        {
          link: '/plugins/stickies',
          name: 'Stickies'
        }
      ]
    };
  },
  components: {
    InstalledPluginsList
  }
};
</script>

<style lang="scss" scoped>
</style>


