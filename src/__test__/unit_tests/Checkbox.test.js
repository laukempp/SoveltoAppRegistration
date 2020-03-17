import React from "react";
import { act } from "react-dom/test-utils";
import Enzyme, {shallow, mount} from "enzyme";
import Checkbox from "../../components/teacher/Checkbox"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({adapter: new Adapter()});

describe("Checkbox component", () => {
    let wrapper;

    beforeEach(async () => {
        wrapper = Enzyme.mount(Enzyme.shallow(<Checkbox />).get(0))
    })

    afterEach(() => {
        wrapper.unmount();
        jest.clearAllMocks();
    })

    it("Component should render", () => {
        expect(wrapper.exists()).toBe(true)
    })

})

/*

*/
