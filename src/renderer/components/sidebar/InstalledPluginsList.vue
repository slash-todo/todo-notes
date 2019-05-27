<template>
  <div>
    <h3>Installed Plugins</h3>
    <p :style="{ fontSize: '0.7rem' }">{{location}}</p>
    <ul>
      <li v-for="plugin in plugins" :key="plugin.name">
        <router-link :to="plugin.link" linkActiveClass="active" class="plugin-link">{{plugin.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'InstalledPluginsList',
  props: ['plugins']
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0 -1rem;

  li {
    padding: 1rem;
    border-left: 5px solid transparent;

    &:has(a.router-link-active) {
      border-color: white;
    }

    a.plugin-link {
      color: white;
      text-decoration: none;
    }
  }
}
</style>
