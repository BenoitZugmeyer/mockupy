import { h } from "preact"

export default {

    name: "button",

    getDefaultProps() {
        return {
            width: 100,
            height: 30,
            label: "plop",
        }
    },

    renderItem({label}) {
        return <button style={{ flex: 1 }}>{label}</button>
    },

    renderSettings() {
        return
    },

}
