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
        defaultProps: {
            label: "blop",
        },
        initialSize: { width: 100, height: 30 },
        renderItem({label}) {
            return <button style={{ flex: 1 }}>{label}</button>
        },
        renderSettings() {
            return
        },
    },
    {
        defaultProps: {
            text: "blop",
        },
        initialSize: { width: 100, height: 30 },
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
    },
    {
        defaultProps: {
            category: "cats",
            index: 1,
        },
        initialSize: { width: 100, height: 40 },
        renderItem({ width, height, category, index, dragging }) {
            if (dragging) return

            return <div style={{
                backgroundImage: `url(https://lorempixel.com/${width}/${height}/${category}/${index}`,
                flex: 1,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundColor: "#eee",
            }} />
        },
        renderSettings({ category, index }, update) {
            const categories = [
                "abstract",
                "animals",
                "business",
                "cats",
                "city",
                "food",
                "nightlife",
                "fashion",
                "people",
                "nature",
                "sports",
                "technics",
                "transport",
                "technics",
            ]
            const indexes = []
            for (let i = 0; i < 10; i += 1) indexes.push(i + 1)

            return (
                <div>
                    <label>
                        Category:&nbsp;
                        <select onChange={(e) => {
                            update({ category: e.target.value })
                        }}>
                            {categories.map((id) => (
                                <option value={id} selected={category === id}>{id}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Index:&nbsp;
                        <select onChange={(e) => {
                            update({ index: Number(e.target.value) })
                        }}>
                            {indexes.map((id) => (
                                <option value={id} selected={index === id}>{id}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )
        },
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
