import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/LandingPage.vue'

describe('LandingPage.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
