import { h, Component } from "preact"
import ref from "../ref"
import { GRID_SIZE, NORTH, EAST, SOUTH, WEST } from "../constants"
import roundCoordinate from "../roundCoordinate"
import DragableItem from "./DragableItem"
import generateUniqueId from "../generateUniqueId"

export default class App extends Component {
    constructor(props) {
        super(props)
        const initialState = props.initialState || {}
        this.state = {
            focusItemId: false,
            items: initialState.items || {},
            itemsOrder: initialState.itemsOrder || [],
        }
    }

    render({ inventory }, { items, itemsOrder, focusItemId }) {
        return (
            <div style={{ display: "flex", flex: "1" }}>
                <div
                    style={{
                        backgroundColor: "#eee",
                        padding: 5,
                    }}
                >
                    {inventory.map((options) => (
                        <DragableItem
                            style={{
                                display: "flex",
                                width: options.initialSize.width,
                                height: options.initialSize.height,
                            }}
                            startMove={this._createDragScenario.bind(this, options)}
                            item={{options}}
                        />
                    ))}
                </div>
                <div
                    ref={ref(this, "_area")}
                    style={{
                        flex: 1,
                        position: "relative",
                        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='${GRID_SIZE}'
                                height='${GRID_SIZE}'
                                viewbox='0 0 ${GRID_SIZE} ${GRID_SIZE}'
                            >
                                <circle cx="${GRID_SIZE / 2}" cy="${GRID_SIZE / 2}" r="1" fill="#eee"/>
                            </svg>
                        `)}")`,
                        backgroundPosition: `${GRID_SIZE / 2}px ${GRID_SIZE / 2}px`,
                    }}
                    onClick={() => {
                        this.setState({ focusItemId: false })
                    }}
                >
                    {itemsOrder.map((itemId) => (
                        <DragableItem
                            key={itemId}
                            style={{
                                position: "absolute",
                                display: "flex",
                                top: items[itemId].position.y,
                                left: items[itemId].position.x,
                                width: items[itemId].size.width,
                                height: items[itemId].size.height,
                                opacity: this._isInArea(items[itemId]) ? "1" : "0.5",
                                boxShadow: focusItemId === itemId ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
                                zIndex: focusItemId === itemId ? "1" : "0",
                            }}
                            startMove={this._createDragScenario.bind(this, itemId)}
                            startResize={this._createResizeScenario.bind(this, itemId)}
                            onClick={() => this.setState({ focusItemId: itemId })}
                            item={items[itemId]}
                        />
                    ))}
                </div>
            </div>

        )
    }

    _createDragScenario(itemIdOrOptions, startEvent, base) {
        let itemId = typeof itemIdOrOptions === "string" && itemIdOrOptions

        const baseRect = base.getBoundingClientRect()
        const deltaX = startEvent.pageX - baseRect.left
        const deltaY = startEvent.pageY - baseRect.top
        const getPosition = (event) => {
            const rect = this._area.getBoundingClientRect()
            return {
                x: roundCoordinate(event.pageX - rect.left - deltaX),
                y: roundCoordinate(event.pageY - rect.top - deltaY),
            }
        }
        return {
            snap: (event) => {
                if (!itemId) {
                    itemId = generateUniqueId()
                    this.setState(({items, itemsOrder}) => ({
                        items: Object.assign({}, items, {
                            [itemId]: {
                                id: itemId,
                                position: getPosition(event),
                                size: itemIdOrOptions.initialSize,
                                options: itemIdOrOptions,
                                active: true,
                            },
                        }),
                        itemsOrder: [...itemsOrder, itemId],
                    }))
                }
            },

            move: (event) => {
                this._replaceItem({
                    id: itemId,
                    position: getPosition(event),
                    active: true,
                })
            },

            stop: () => {
                this._dragStop(itemId)
            },
        }
    }

    _createResizeScenario(itemId, direction, startEvent) {
        const {position: { x, y }, size: { height, width }} = this.state.items[itemId]

        return {
            move: (event) => {

                const deltaX = roundCoordinate(event.pageX - startEvent.pageX)
                const deltaY = roundCoordinate(event.pageY - startEvent.pageY)

                this._replaceItem({
                    id: itemId,
                    position: {
                        x: direction & WEST ? x + deltaX : x,
                        y: direction & NORTH ? y + deltaY : y,
                    },
                    size: {
                        width: Math.max(GRID_SIZE, (
                            direction & EAST ? width + deltaX :
                            direction & WEST ? width - deltaX :
                                width)),
                        height: Math.max(GRID_SIZE, (
                            direction & SOUTH ? height + deltaY :
                            direction & NORTH ? height - deltaY :
                                height)),
                    },
                    active: true,
                })
            },

            stop: () => {
                this._dragStop(itemId)
            },
        }
    }

    _dragStop(itemId) {
        if (!this._isInArea(this.state.items[itemId])) {
            this._removeItem(itemId, () => this._triggerUpdateState())
        }
        else {
            this._replaceItem({
                id: itemId,
                active: false,
            }, () => this._triggerUpdateState())
        }
    }

    _isInArea({ position: { x, y }, size: { width, height } }) {
        if (!this._area) return true
        const rect = this._area.getBoundingClientRect()
        return x >= 0 && y >= 0 && x + width <= rect.width && y + height <= rect.height
    }

    _removeItem(id, cb) {
        this.setState(({items, focusItemId, itemsOrder}) => {
            const newItems = Object.assign({}, items)
            delete newItems[id]
            return {
                items: newItems,
                focusItemId: focusItemId === id ? false : focusItemId,
                itemsOrder: itemsOrder.filter((itemId) => itemId !== id),
            }
        }, cb)
    }

    _replaceItem(item, cb) {
        this.setState(({items}) => {
            if (!items.hasOwnProperty(item.id)) throw new Error(`Unkwnown item ${item.id}`)

            return {
                items: Object.assign({}, items, {
                    [item.id]: Object.assign({}, items[item.id], item),
                }),
            }
        }, cb)
    }

    _triggerUpdateState() {
        this.props.onUpdate && this.props.onUpdate(this.state)
    }

}
