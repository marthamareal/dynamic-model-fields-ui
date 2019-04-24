<template>
  <div class="col-md-4 mb-5" id="card">
    <div class="card h-100">
      <div class="card-body">
        <h2 class="card-title">{{riskType.name}}</h2>
        <p class="card-text">{{riskType.description}}</p>
      </div>
      <div class="card-footer">
        <b-button v-b-modal= "id" variant="primary">APPLY</b-button>
          <b-modal :id="id" hide-footer :title="riskType.name" >
            <Input :field="field" v-for="field in fields" :key="field.indexOf"/>
            <b-button class="mt-3 btn-primary" block @click="handleSubmit">SUBMIT</b-button>
          </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Input from './Input'

export default {
  name: 'Card',
  components: {
    Input
  },
  props: {
    riskType: Object
  },
  data (props) {
    return {
      id: `modal-${props.riskType.id}`,
      fields: props.riskType.fields
    }
  },
  methods: {
    handleSubmit () {
      this.$bvToast.toast(`This feature is not available.`, {
        title: 'Sorry',
        toaster: 'b-toaster-top-center',
        variant: 'info',
        solid: true
      })
    }
  }
}
</script>

<style>
.modal-dialog {
  padding-top: 60px;
  min-width: 80px !important;
}
.btn-primary {
  color: #e8eaee;
  font-weight: 500;
  background-color: #35495e;
  border: 1px solid #7d7f827d;
  border-radius: 2px;
  float: right;
}
.btn-primary:hover {
  background-color: #35495ecb;
  border: 1px solid #35495e;
  color: #ecedef;
}
.card-title {
  border-bottom: 1px solid #dfdfdf;
  font-size: 25px;
  color: #35495e;
  min-height: 65px;
}
.card:hover {
  box-shadow: 0em 0em 0.5em #acacac8e;
  transition: box-shadow 0.6s;
}
.card-text {
  height: 95px;
  overflow-y: auto;
}
</style>
