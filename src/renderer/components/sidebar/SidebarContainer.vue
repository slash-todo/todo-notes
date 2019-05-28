<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <span>//TODO</span>
      <router-link to="/settings">⚙️</router-link>
    </div>

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
a {
  text-decoration: none;
}

.sidebar {
  &__header {
    display: flex;
    align-items: center;

    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
    margin-bottom: 1rem;

    span {
      flex: 1;
    }
  }
}
</style>


