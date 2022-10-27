<template>
  <div id="app">
    <portal-target name="modal"></portal-target>
    <portal-target name="drawer-overlay"></portal-target>
  </div>
</template>

<script>
//@is an alias to /src
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1 0 auto;
}
</style>