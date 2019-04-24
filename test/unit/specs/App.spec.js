import App from '@/App.vue';
import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

describe('App.vue', () => {
    const wrapper = shallowMount(App)
    // checks App is a valid Vue component.
    it('App is a component', () => {
      expect(wrapper.isVueInstance()).toBeTruthy()
    })
  })