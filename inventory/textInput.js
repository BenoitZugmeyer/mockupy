import { h } from "preact"

export default {

    name: "text-input",

    getDefaultProps() {
        return {
            width: 100,
            height: 30,
            text: "plop",
        }
    },

    renderItem({text}) {
        return (
            <input
                type="text"
                style={{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                }}
                value={text}
            />
        )
    },

    renderSettings({ text }, update) {
        return (
            <div>
                <label>
                    Text:&nbsp;
                    <input type="text" onInput={(e) => update({ text: e.target.value })} value={text} />
                </label>
            </div>
        )
    },

}
