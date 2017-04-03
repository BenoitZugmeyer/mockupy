import { h, render } from "preact"
import App from "./components/App"
import inventory from "../inventory"

Object.assign(document.body.style, {
    margin: 0,
    padding: "10px",
    boxSizing: "border-box",
    display: "flex",
    height: "100vh",
    overflow: "hidden",
})


const inventoryMap = new Map()
for (const item of inventory) {
    if (!item.name) throw new Error("An item has no name")
    if (inventoryMap.has(item.name)) throw new Error(`Duplicate item name: ${item.name}`)
    inventoryMap.set(item.name, item)
}

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
        inventoryMap={inventoryMap}
        initialState={restoreState()}
        onUpdate={storeStateDebounced}
    />
), document.body)
