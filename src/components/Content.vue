<template>
<div class="row" id="content">
  <div v-if="riskTypes.length === 0" class="d-flex justify-content-center mb-3">
    <b-spinner variant="success"></b-spinner>
    <strong>Loading...</strong>
  </div>

  <div class="row cards-container" id="risk-types" v-else >
    <Card :riskType="riskType" v-for="riskType in riskTypes" :key="riskType.indexOf"/>
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
  data () {
    return {
      perPage: 6,
      currentPage: 1,
      riskTypes: [],
      totalItems: null
    }
  },
  methods: {
    handleApiErrors () {
      this.$bvToast.toast(` Unable to fetch risk types, Please check your internet connections or contact our support for help.`, {
        title: 'Sorry',
        toaster: 'b-toaster-top-center',
        variant: 'danger',
        solid: true
      })
    },
    async pageChange (page) {
      this.currentPage = page
      await axios.get(`${process.env.BASE_API_URL}/risk-types/?page=${page}`)
        .then(response => { this.riskTypes = response.data.results; this.totalItems = response.data.count })
        .catch(response => {
          this.handleApiErrors()
        })
    }
  },
  async mounted () {
    await axios.get(`${process.env.BASE_API_URL}/risk-types/`)
      .then(response => { this.riskTypes = response.data.results; this.totalItems = response.data.count })
      .catch(response => {
        this.handleApiErrors()
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
