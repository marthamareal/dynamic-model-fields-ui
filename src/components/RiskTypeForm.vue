<template>
  <b-modal id="modal-1" hide-footer title="Create Risk Type">
    <b-form @submit="onSubmit">
      <b-form-group label="Name:">
        <b-form-input
          id="input-0"
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
          id="input-1"
          v-model="form.description"
          required
        ></b-form-textarea>
      </b-form-group>

      <label>Fields</label>

      <div class="card h-100">
      <div class="card-body">
        <b-form-group class = "form-inline" v-for="(field, index) in form.fields" :key="index">
          <b-form-input
            id="input-2"
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
    <b-button block variant="primary" class="mt-3 form risk-type-form" type="submit">Submit</b-button>
    </b-form>
  </b-modal>
</template>

<script>
import axios from 'axios'
import BForm from 'bootstrap-vue/es/components/form/form'
import BFormSelect from 'bootstrap-vue/es/components/form-select/form-select'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import BFormGroup from 'bootstrap-vue/es/components/form-group/form-group'
import BFormInput from 'bootstrap-vue/es/components/form-input/form-input'
import BButton from 'bootstrap-vue/es/components/button/button'
import BFormTextarea from 'bootstrap-vue/es/components/form-textarea/form-textarea'

export default {
  name: 'RiskTypeForm',
  props: {
    onResponse: Function
  },
  components: {
    'b-form': BForm,
    'b-form-select': BFormSelect,
    'b-modal': BModal,
    'b-form-group': BFormGroup,
    'b-form-input': BFormInput,
    'b-button': BButton,
    'b-form-textarea': BFormTextarea
  },
  data (props) {
    return {
      form: {
        name: '',
        description: '',
        fields: [{name: 'date', field_type: 'date'}]
      },
      fieldTypes: [{ text: 'type', value: null }],
      handleResponses: props.onResponse
    }
  },
  async mounted () {
    await axios.get(`${process.env.BASE_API_URL}/field-types/`)
      .then(response => {
        let data = response.data
        this.fieldTypes = data.map(item => {
          return { text: item.name, value: item.id }
        })
      })
      .catch(response => {
        this.handleResponses('Sory',
          'Unable to fetch field types, Please check your internet connections or contact our support for help.', 'danger')
      })
  },
  methods: {

    onSubmit (evt) {
      evt.preventDefault()
      let formData = JSON.parse(JSON.stringify(this.form))
      axios.post(`${process.env.BASE_API_URL}/risk-types/`, formData)
        .then(response => {
          if (response.status === 201) {
            this.handleResponses('Congrats', 'You have successfully added a new risk type', 'success')
          } else {
            this.handleResponses('Sory', 'Unable to create risk type, something went wrong at the server.', 'danger')
          }
        })
        .catch(response => {
          this.handleResponses('Oops!!', 'Something wrong has happened, Please contact our support for help.', 'danger')
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
