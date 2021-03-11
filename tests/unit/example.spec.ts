import { shallowMount } from "@vue/test-utils";
import PhotoSheet from "@/components/PhotoSheet.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(PhotoSheet, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
