import { mount } from '@vue/test-utils';
import RiskTypeForm from '@/components/RiskTypeForm'

jest.mock('axios', () => ({
    get: () => {
        const response = { 
            data: [
                {
                    "id": "37636f25-e6a5-4183-b932-c11decec5e61",
                    "name": "text"
                },
                {
                    "id": "633c77ab-e78d-4b27-b269-fbb6c598455b",
                    "name": "date"
                }
            ]
        }
        return new Promise((resolve, reject) => resolve(response))
    },
    // post: ({}) => {
    //     const response = { 
    //         data: {
    //             "id": "827c2adc-8d52-498b-a879-118187afdae5",
    //             "name": "Prize Policy2",
    //             "description": "This is my description feild which can not be empty",
    //             "fields": [
    //                 {
    //                     "id": "b33a255d-a3d3-40fd-88c2-af20e9a5d50b",
    //                     "name": "pname",
    //                     "field_type": "text",
    //                     "options": null
    //                 },
    //                 {
    //                     "id": "72a81077-e226-4996-890f-31ace670e9e9",
    //                     "name": "pnamse",
    //                     "field_type": "text",
    //                     "options": null
    //                 }
    //             ]
    //         }
    //     }
    //     return new Promise((resolve, reject) => resolve(response))
    // }
  }))

describe('RiskTypeForm.vue', () => {
    const wrapper = mount(RiskTypeForm)

    it('should render as expected', () => {
        wrapper.setData({
            fieldTypes: [{ text: 'type', value: null }],
            form: {
                name: 'name',
                description: 'sample',
                fields: [{name: 'date', field_type: 'date'}]
              },
        })
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should add new field form', () => {
        const addbutton = wrapper.findAll('.add-button')
        addbutton.trigger('click')
        const fieldSets = wrapper.findAll('.form-inline')
        expect(fieldSets.length).toEqual(2)
    })

    it('should remove a field form', () => {
        const fieldSets = wrapper.findAll('.form-inline')
        fieldSets.at(1).findAll('.cancel-img').trigger('click')
        expect(wrapper.findAll('.form-inline').length).toEqual(1)
    })

    it('should submit form', () => {
        wrapper.find("[type='submit']").trigger('submit')
        
    })
})
