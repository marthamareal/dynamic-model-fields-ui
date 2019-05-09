import Vue from 'vue'
import Navbar from '@/components/Navbar'
import { mount } from '../../../node_modules/@vue/test-utils'

describe('Navbar.vue', () => {
  const wrapper = mount(Navbar)

  it('should render correct contents', () => {
    const Constructor = Vue.extend(Navbar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.navbar-brand').textContent)
      .toContain('Dynamic Model Fields')
  })

  it('should show tost on search', () => {
   const searchButton = wrapper.find('.form-line')
  //  searchButton.find("[type='submit']")
  })
})
