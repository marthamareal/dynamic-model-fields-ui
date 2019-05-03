import { mount } from '@vue/test-utils'
import Vue from 'vue';

import Content from '@/components/Content.vue'

import BSpinner from 'bootstrap-vue/es/components/spinner/spinner'
import BPagination from 'bootstrap-vue/es/components/pagination/pagination'
import BButton from 'bootstrap-vue/es/components/button/button'
import BModal from 'bootstrap-vue/es/components/modal/modal'
import vBModal from 'bootstrap-vue/es/directives/modal/modal'

Vue.directive('b-modal', vBModal)
Vue.component('b-modal', BModal)
Vue.component('b-button', BButton)
Vue.component('b-pagination', BPagination)
Vue.component('b-spinner', BSpinner)


jest.mock('axios', () => ({
    get: () => {
        const response = { 
            data: {
                results: [ {
                    "id": "10d98576-091f-4fb2-ad14-c40822748b51",
                    "name": "Professional liability insurance",
                    "description": "Professional liability insurance, also known",
                    fileds: [
                        {
                        "id": "4b9fbf08-dd06-4320-b409-dc469c6fcb32",
                        "name": "date",
                        "field_type": "date",
                        "options": null
                        },
                        {
                        "id": "483a996e-e603-4437-b689-99193383a7e8",
                        "name": "name",
                        "field_type": "text",
                        "options": null
                        }
        
                    ]
                }],
                count: 7
            }
        }
        return new Promise((resolve, reject) => {resolve(response)})
    }
  }))

describe('Content.vue', () => {
    const wrapper = mount(Content)
    it('should render as expected', () => {
        wrapper.setData({
            riskTypes: [ {
                "id": "10d98576-091f-4fb2-ad14-c40822748b51",
                "name": "Professional liability insurance",
                "description": "Professional liability insurance, also known",
                fileds: [
                    {
                    "id": "4b9fbf08-dd06-4320-b409-dc469c6fcb32",
                    "name": "date",
                    "field_type": "date",
                    "options": null
                    },
                    {
                    "id": "483a996e-e603-4437-b689-99193383a7e8",
                    "name": "name",
                    "field_type": "text",
                    "options": null
                    }
    
                ]
            }]
        })
        expect(wrapper.html()).toMatchSnapshot();
    })
    it('pagination changes should work as expected', () =>{
        const linkWrapper = wrapper.findAll('.page-link').at(3)
        const refWrapper = wrapper.findAll('.page-item').at(3)
        expect(refWrapper.classes('active')).toBe(false)
        linkWrapper.trigger('click')
        expect(refWrapper.classes('active')).toBe(true)
        expect(wrapper.findAll('.page-item').at(2).classes('active')).toBe(false)
    })
})