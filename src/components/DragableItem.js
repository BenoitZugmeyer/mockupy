import { h, Component } from "preact"
import drag from "../drag"
import renderItem from "./items"
import { GRID_SIZE, NORTH, EAST, WEST, SOUTH } from "../constants"

export default class DragableItem extends Component {

    render({
        onClick,
        startResize,
        startMove,
        style,
        item,
    }, {resizeDirection}) {
        let container
        const delta = item.active ? -GRID_SIZE : 0
        return (
            <div
                ref={(el) => {
                    container = el
                }}

                style={Object.assign({ position: "relative" }, style)}

                onClick={(e) => {
                    e.stopPropagation()
                    if (onClick) onClick()
                }}

                onMouseMove={(event) => {
                    if (item.active || !startResize) return

                    // Do not change cursor while the mouse is clicked
                    if (event.buttons) return

                    const { left, right, top, bottom } = container.getBoundingClientRect()
                    const { pageX, pageY } = event
                    const threshold = 10
                    const resizeDirection =
                        (pageX - left < threshold ? WEST : 0) |
                        (right - pageX < threshold ? EAST : 0) |
                        (pageY - top < threshold ? NORTH : 0) |
                        (bottom - pageY < threshold ? SOUTH : 0)

                    this.setState({
                        resizeDirection,
                    })
                }}

                onMouseLeave={() => {
                    if (item.active || !startResize) return

                    this.setState(() => ({
                        over: null,
                    }))
                }}
            >
                <DragHandle
                    style={{
                        position: "absolute",
                        background: item.active ? "rgba(0, 0, 0, 0.2)" : "",
                        top: delta,
                        right: delta,
                        left: delta,
                        bottom: delta,
                        cursor: (
                            // TODO // !inArea(item) ? "no-drop" :
                            !resizeDirection ? "move" :

                            resizeDirection & WEST ?
                                resizeDirection & NORTH ? "nw-resize" :
                                resizeDirection & SOUTH ? "sw-resize" :
                                    "w-resize" :

                            resizeDirection & EAST ?
                                resizeDirection & NORTH ? "ne-resize" :
                                resizeDirection & SOUTH ? "se-resize" :
                                    "e-resize" :

                            resizeDirection & NORTH ? "n-resize" :
                                "s-resize"
                        ),

                    }}

                    start={(event, base) => {
                        if (resizeDirection && startResize) {
                            return startResize(resizeDirection, event)
                        }
                        if (startMove) {
                            return startMove(event, base)
                        }
                    }}
                />
                {renderItem(item.options)}
            </div>
        )
    }
}

class DragHandle extends Component {
    render(props) {
        const containerProps = Object.assign({}, props)
        delete containerProps.start
        return (
            <div {...containerProps}>
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        this._detachDrag = drag(this.base, (event) => this.props.start(event, this.base))
    }

    componentWillUnmount() {
        this._detachDrag()
    }
}
