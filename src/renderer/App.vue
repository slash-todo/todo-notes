<template>
  <div id="app">
    <aside>
      <sidebar-container></sidebar-container>
    </aside>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { SidebarContainer } from './components/sidebar';

export default {
  name: 'app',
  components: {
    SidebarContainer
  }
};
</script>

<style lang="scss">
html,
body {
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #f5f5f5;
  margin: 0;
  overflow: hidden;
}

h3,
h5 {
  margin-top: 0;
  margin-bottom: 1rem;
}

main {
  padding: 1rem;

  h3 {
    color: black;
  }
}

aside {
  flex-basis: 15rem;
  background-color: #ff6e4b;
}

main {
  flex: 1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  display: flex;
  flex: 1;
}
</style>
