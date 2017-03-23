import { h, render } from "preact"
import App from "./components/App"

Object.assign(document.body.style, {
    margin: 0,
    padding: "10px",
    boxSizing: "border-box",
    display: "flex",
    height: "100vh",
    overflow: "hidden",
})

const inventory = [
    {
        type: "button",
        label: "blop",
        initialSize: { width: 100, height: 30 },
    },
    {
        type: "text",
        text: "blip",
        initialSize: { width: 100, height: 30 },
    },
    {
        type: "select",
        initialSize: { width: 100, height: 30 },
    },
]

let timeout
function storeState(state) {
    history.pushState(state, "", `#${encodeURIComponent(JSON.stringify(state))}`)
}

function storeStateDebounced(state) {
    clearTimeout(timeout)
    timeout = setTimeout(() => storeState(state), 100)
}

function restoreState() {
    if (history.state) return history.state
    try {
        return JSON.parse(decodeURIComponent(location.hash.slice(1)))
    }
    catch (e) {
        // Ignore
    }
}

let component

addEventListener("popstate", (event) => {
    component.setState(event.state)
})

render((
    <App
        ref={(c) => {
            component = c
        }}
        inventory={inventory}
        initialState={restoreState()}
        onUpdate={storeStateDebounced}
    />
), document.body)
