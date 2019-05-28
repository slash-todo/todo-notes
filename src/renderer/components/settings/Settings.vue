<template>
  <div>
    <section>
      <h3>Plugins</h3>
      <form action>
        <label>
          <span>Path</span>
          <input type="text">
        </label>

        <h4>Installed</h4>
        <ul>
          <li v-for="plugin in plugins" :key="plugin.name">
            <span>{{plugin.name}}</span>
            <span>{{plugin.install}}</span>
          </li>

          <button>add plugin</button>
        </ul>

        <h4>Settings</h4>
        <ul>
          <li v-for="plugin in plugins" :key="plugin.name">
            <span>{{plugin.name}}</span>
            <span>{{plugin.settings}}</span>
          </li>
        </ul>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  props: ['plugins']
};
</script>

<style lang="scss" scoped>
</style>


