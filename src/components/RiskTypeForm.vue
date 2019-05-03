<template>
  <b-modal id="modal-1" hide-footer title="Create Risk Type">
    <b-form @submit="onSubmit">
      <b-form-group label="Name:">
        <b-form-input
          v-model="form.name"
          type="text"
          required
          placeholder="Enter risk type name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
      label="Description:"
      description="Include all information about the policy" >
        <b-form-textarea
          v-model="form.description"
          required
        ></b-form-textarea>
      </b-form-group>

      <label>Fields</label>

      <div class="card h-100">
      <div class="card-body">
        <b-form-group class = "form-inline" v-for="(field, index) in form.fields" :key="index">
          <b-form-input
            v-model="field.name"
            type="text"
            required
          ></b-form-input>
          <b-form-select
            id="input-3"
            v-model="field.field_type"
            :options="fieldTypes"
            required
          ></b-form-select>
          <span>
            <img v-if="index > 0" size="sm" class="cancel-img rounded-circle" @click="removeField(index)" src="../assets/cancel-icon.png"/>
            </span>
        </b-form-group>
        <div  @click="addField" >
        <img class="add-button" src="../assets/add-icon.png"/> Add another field
        </div>
      </div>
    </div>
    <b-button block variant="primary" class="mt-3 form" type="submit">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        name: '',
        description: '',
        fields: [{name: 'date', field_type: 'date'}]
      },
      fieldTypes: [{ text: 'type', value: null }]
    }
  },
  async mounted () {
    await axios.get('https://dynamic-model-fields.herokuapp.com/api/v1/field-types/')
      .then(response => {
        let data = response.data
        this.fieldTypes = data.map(item => {
          return { text: item.name, value: item.id }
        })
      })
      .catch(response => {
        this.handleCreateResponses('Sory', 'Unable to fetch field types, Please contact our support for help.', 'danger')
      })
  },
  methods: {
    handleCreateResponses (title, message, variant) {
      this.$bvToast.toast(message, {
        title: title,
        toaster: 'b-toaster-top-center',
        variant: variant,
        solid: true
      })
    },

    onSubmit (evt) {
      evt.preventDefault()
      let formData = JSON.parse(JSON.stringify(this.form))

      axios.post('https://dynamic-model-fields.herokuapp.com/api/v1/risk-types/', formData)
        .then(response => {
          if (response.status === 201) {
            this.handleCreateResponses('Congrats', 'You have successfully added a new risk type', 'success')
          } else {
            this.handleCreateResponses('Sory', 'Unable to create risk type, something went wrong at the server.', 'danger')
          }
        })
        .catch(response => {
          this.handleCreateResponses('Oops!!', 'Something wrong has happened, Please contact our support for help.', 'danger')
        })
      document.querySelector('.close').click()
    },
    addField (e) {
      e.preventDefault()
      this.form.fields.push({ name: '', type: '' })
    },
    removeField (index) {
      this.form.fields.splice(index, 1)
    }
  }
}
</script>

<style>
.round-button{
  border-radius: 45%;
}
.cancel-img  {
height: inherit;
font-size: small;
padding-left: 20px;
}
.add-button {
  border: 1px solid #dfdfdf;
  padding: initial;
  height: 30px;
  width: 30px;
}
</style>
