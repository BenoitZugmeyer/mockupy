import { h, Component } from "preact"

class Button extends Component {
    render({label}) {
        return <button style={{ flex: 1 }}>{label}</button>
    }
}
class Select extends Component {
    render() {
        return <select style={{ flex: 1 }}></select>
    }
}


class Text extends Component {
    render({text}) {
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
    }
}

export default function render(options) {
    switch (options.type) {
    case  "button":
        return <Button {...options} />
    case  "text":
        return <Text {...options} />
    case  "select":
        return <Select {...options} />
    }
}
