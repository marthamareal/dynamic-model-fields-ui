import { mount } from '@vue/test-utils'

import Input from '@/components/Input.vue'

describe('Input.vue', () => {
    const wrapper = mount(Input, {
        propsData: {
            field: {
                "name": "date",
                "field_type": "date",
                "options": null
            }
          }
    })
    it('should render as expected', () => {
        expect(wrapper.html()).toMatchSnapshot();
})
})