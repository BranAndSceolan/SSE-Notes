import { shallowMount } from '@vue/test-utils'
import DocumentList from "@/components/DocumentList.vue";
import LandingPage from "@/components/LandingPage.vue";
import Search from "@/components/Search.vue";
import CreateDocument from "@/components/CreateDocument.vue";

describe('DocumentList.vue', () => {
  it('renders component on mount', () => {
    const wrapper = shallowMount(DocumentList, {
    });
    expect(wrapper.text()).toContain("Title");
  });
});

describe('LandingPage.vue', () => {
  it('renders component on mount', () => {
    const wrapper = shallowMount(LandingPage, {
    });
    expect(wrapper.text()).toContain("cookie");
  });
});

describe('Search.vue', () => {
  it('renders component on mount', () => {
    const wrapper = shallowMount(Search, {
    });
    expect(wrapper.text()).toContain("Search");
  });
});

describe('CreateDocument.vue', () => {
  it('renders component on mount', () => {
    const wrapper = shallowMount(CreateDocument, {
    });
    expect(wrapper.text()).toContain("Save");
  });
});