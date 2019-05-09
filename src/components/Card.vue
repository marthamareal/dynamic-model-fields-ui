<template>
  <div class="col-md-4 mb-5" id="card">
    <div :class="ghostLoad">
      <b-spinner class="loader" variant="success"></b-spinner>
    </div>
    <div :class="contentClass">
      <div class="card-body">
        <h2 class="card-title">{{riskType.name}}</h2>
        <p class="card-text">{{riskType.description}}</p>
      </div>
      <div class="card-footer">
        <img class="edit" @click="onEdit" src="../assets/edit.png" v-b-tooltip.hover title="edit"/>
        <img class="delete" @click="onDelete(riskType.id)" src="../assets/delete.png" v-b-tooltip.hover title="delete"/>

        <b-button v-b-modal= "id" variant="primary">APPLY</b-button>
          <b-modal :id="id" hide-footer :title="riskType.name" >
            <Input :field="field" v-for="field in fields" :key="field.indexOf" :modalId="id"/>
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
    riskType: Object,
    deleteRiskType: Function,
    handleResponse: Function
  },
  data (props) {
    console.log(this.isLoading)
    return {
      id: `modal-${props.riskType.id}`,
      fields: props.riskType.fields,
      deleteType: props.deleteRiskType,
      contentClass: 'card h-100',
      ghostLoad: 'card h-100 no-gh'
    }
  },
  methods: {
    handleSubmit () {
      this.handleResponse('Sorry', 'This feature is not available.', 'info')
    },
    onDelete (riskTypeId) {
      this.deleteType(riskTypeId)
      this.contentClass = 'card h-100 gh-content'
      this.ghostLoad = 'card h-100 ghost-load'
    },
    onEdit (e) {
      e.preventDefault()
      this.handleResponse('Sorry', 'This feature is not available.', 'info')
    }
  }
}
</script>

<style>
.gh-content {
  position: relative;
  z-index: -1;
  top: -310px;
}
.no-gh {
  display: none;
}
.ghost-load {
  position: relative;
  background-color: #e9ecefc7;
}
.loader {
  position: relative;
  top: 50%;
  left: 50%;
}
.modal-dialog {
  padding-top: 60px;
  min-width: 80px !important;
}
.btn-primary {
  color: #e8eaee;
  font-weight: 500;
  background-color: #35495e!important;
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
.card-footer {
  display: inline;
}
.card-footer img{
  padding: 6px;
  height: 30px;
  width: 30px;
  display: none;
}
.card:hover .card-footer img {
display: inline!important;
}

.card-footer img:hoover {
  box-shadow: 0em 0em 0.5em #3b3b3b7d;
  transition: box-shadow 0.6s;
}
</style>
