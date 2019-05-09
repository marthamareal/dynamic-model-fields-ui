<template>
  <div id="app">
  <app-header :onResponse="handleResponses"/>
  <app-content :onResponse="handleResponses"/>
  <app-footer/>
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
  },
  methods: {
    handleResponses (title, message, variant) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-center',
        variant: variant,
        solid: true
      })
    }
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
