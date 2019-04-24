<template>
  <div id="app">
  <app-header></app-header>
  <app-content></app-content>
  <app-footer></app-footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    'app-header': Navbar,
    'app-content': Content,
    'app-footer': Footer
  }
}
</script>

<style>
  body {
    margin: 0; overflow-x: hidden;
    }
  * {
    box-sizing: border-box
    }
  #app {
     padding-top: 100px;
  }
</style>
