import Vue from 'vue'
import Card from '@/components/Card'
import { mount } from '../../../node_modules/@vue/test-utils'

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
    post: (options) => {
        const response = { 
            data: {
                "name": "test user",
                "Age": 11,
            }
        }
        return new Promise((resolve, reject) => resolve(response))
    }
  }))
  
describe('Navbar.vue', () => {
  const wrapper = mount(Card,{
      propsData: {   riskType: {
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
    },
    onResponse: jest.fn(),
    deleteRiskType: jest.fn(),
    }
  }
)

    it('should render as expected', () => {
        expect(wrapper.html()).toMatchSnapshot()
    })

    it('should submit form', () => {
        const spy = jest.spyOn(wrapper.vm, 'onResponse')
        const applyButton = wrapper.find("button")
        applyButton.trigger('click')
        wrapper.find(".btn-block").trigger('click')
        expect(spy).toHaveBeenCalled()
    })

    it('should delete riskType', () => {
        const spy = jest.spyOn(wrapper.vm, 'deleteRiskType')
        const deleteIcon = wrapper.findAll("img").at(1)
        deleteIcon.trigger('click')
        expect(spy).toHaveBeenCalled()
    })

    it('should edit riskType', () => {
        const spy = jest.spyOn(wrapper.vm, 'onResponse')
        const editIcon = wrapper.findAll("img").at(0)
        editIcon.trigger('click', { preventDefault: jest.fn()})
        expect(spy).toHaveBeenCalled()
    })
})
