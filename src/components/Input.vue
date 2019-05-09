<template>
<form class="form-group" ref="form" @submit.stop.prevent="handleSubmit">
  <div role="group">
  <label for="input-live"><strong>{{name}}</strong></label>
  <!-- Check if typoe is select or not -->
    <div v-if="field.field_type === 'select-one'">
      <b-form-group v-for="(option, index) in field.options" :key="index" class="form-check form-check-inline">
        <b-form-radio name="some-radios" value="A">{{option}}</b-form-radio>
      </b-form-group>
    </div>
    <div v-else>
      <b-form-input
        :id="modalId"
        :type="field.field_type"
        trim
      ></b-form-input>
   </div>
   <!-- Check ends -->
  </div>
</form>
</template>

<script>
export default {
  name: 'Input',
  props: {
    field: Object,
    modalId: String
  },
  data (props) {
    return { name: props.field.name.charAt(0).toUpperCase() + props.field.name.slice(1) }
  }
}

</script>
