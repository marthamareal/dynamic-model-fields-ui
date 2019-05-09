<template>
<div class="row" id="content">
  <div v-if="riskTypes.length === 0" class="d-flex justify-content-center mb-3">
    <b-spinner variant="success"></b-spinner>
    <strong>Loading...</strong>
  </div>

  <div class="row cards-container" id="risk-types" v-else >

    <Card :riskType="riskType"
    v-for="riskType in riskTypes"
    :key="riskType.id"
    :deleteRiskType="deleteRiskType"
    :onResponse="handleResponses"/>

  </div>
  <div class="row align-self-center " v-if="riskTypes.length > 0" >
    <b-pagination
      v-model="currentPage"
      :per-page="perPage"
      :items="riskTypes"
      :total-rows="totalItems"
      @change="pageChange"
      >
    </b-pagination>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Card from './Card'

export default {
  name: 'Content',
  components: {
    Card
  },
  props: {
    onResponse: Function
  },
  data (props) {
    return {
      perPage: 6,
      currentPage: 1,
      riskTypes: [],
      totalItems: null,
      handleResponses: props.onResponse
    }
  },
  methods: {
    deleteRiskType (riskTypeId) {
      axios.delete(`${process.env.BASE_API_URL}/risk-types/${riskTypeId}`)
        .then(response => {
          if (response.status === 200) {
            this.handleResponses('Congrats', 'You have successfully deleted risk type', 'success')
            this.riskTypes = this.riskTypes.filter(risk => risk.id !== riskTypeId)
            this.riskTypes.length > 0 ? this.pageChange(this.currentPage) : this.pageChange(this.currentPage - 1)
          } else {
            this.handleResponses('Sory', 'Unable to delete risk type, something went wrong at the server.', 'danger')
          }
        })
        .catch(response => {
          this.handleResponses('Oops!!', 'Something wrong has happened, Please contact our support for help.', 'danger')
        })
    },
    async pageChange (page) {
      this.currentPage = page
      await axios.get(`${process.env.BASE_API_URL}/risk-types/?page=${page}`)
        .then(response => { this.riskTypes = response.data.results; this.totalItems = response.data.count })
        .catch(response => {
          this.handleResponses('Sorry', 'Unable to fetch risk types, Please check your internet connections or contact our support for help.', 'danger')
        })
    }
  },
  async mounted () {
    await axios.get(`${process.env.BASE_API_URL}/risk-types/`)
      .then(response => { this.riskTypes = response.data.results; this.totalItems = response.data.count })
      .catch(response => {
        this.handleResponses('Sorry', 'Unable to fetch risk types, Please check your internet connections or contact our support for help.', 'danger')
      })
  }
}
</script>

<style>
  #content {
      margin: 0;
      padding: 30px 60px 0px 60px;
      min-height: 70vh;
      flex-direction: column;
  }
  .cards-container {
    flex-grow: 1
  }
</style>
