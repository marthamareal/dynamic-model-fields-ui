import Vue from 'vue'
import Navbar from '@/components/Navbar'

describe('Navbar.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Navbar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.navbar-brand').textContent)
      .toContain('Dynamic Model Fields')
  })
})
