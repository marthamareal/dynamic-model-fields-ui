<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <a class="navbar-brand" href="/">
      <img src='../assets/logo.png'/>
      Dynamic Model Fields</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" @click="handleSearch" >Search</b-button>
            </b-nav-form>
          </li>
          <li class="nav-item">
            <b-button size="sm" v-b-modal.modal-1 class="my-2 my-sm-0" type="button"> New Risktype</b-button>
          </li>
        </ul>
      </div>
    </div>

    <risk-type-form
    :onResponse="handleResponses"
    id="modal-1"/>
  </nav>

</template>

<script>
import BNav from 'bootstrap-vue/es/components/nav/nav-form'
import BForm from 'bootstrap-vue/es/components/form/form'
import BFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import BButton from 'bootstrap-vue/es/components/button/button'
import vBModal from 'bootstrap-vue/es/directives/modal/modal'

import RiskTypeForm from './RiskTypeForm'

export default {
  name: 'Navbar',
  components: {
    'risk-type-form': RiskTypeForm,
    'b-form-input': BFormInput,
    'b-button': BButton,
    'b-nav-form': BNav,
    'b-form': BForm
  },
  directives: {
    'b-modal': vBModal
  },
  props: {
    onResponse: Function
  },
  data (props) {
    return {
      handleResponses: props.onResponse
    }
  },
  methods: {
    handleSearch () {
      this.handleResponses('Sorry', 'This feature is not available.', 'info')
    }
  }
}
</script>

<style>
  .navbar {
    width: 100vw;
  }
  img {
    height: 60px;
  }
  .nav-item {
    padding-left: 50px;
  }
</style>
