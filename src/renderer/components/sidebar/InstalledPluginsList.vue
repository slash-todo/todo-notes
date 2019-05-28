<template>
  <div>
    <h5>Installed Plugins</h5>
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
h5 {
  padding: 0.25rem 0.75rem;
  text-transform: uppercase;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    a.plugin-link {
      display: block;
      color: white;
      padding: 0.25rem 0.5rem;

      text-decoration: none;
      border-left: 3px solid transparent;

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }

      &.router-link-active {
        border-color: white;
      }
    }
  }
}
</style>
