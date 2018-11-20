<template>
  <div id="app">
    <pet-navbar/>
    <main class="mt-3">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import NavBar from './components/Navigation/NavBar.vue'

  export default {
    name: 'pet',
    components: {
      'pet-navbar': NavBar
    }
  }
</script>

<style lang='scss'>
  @import 'globals.scss';
  @import '../../node_modules/bootstrap/scss/bootstrap';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
