import { h, Component } from "preact"
import ref from "../ref"
import { GRID_SIZE, NORTH, EAST, SOUTH, WEST } from "../constants"
import roundCoordinate from "../roundCoordinate"
import DragableItem from "./DragableItem"
import generateUniqueId from "../generateUniqueId"

function formatProps(props, extraProps) {
    const formatedProps = Object.assign({}, props, extraProps)
    formatedProps.width = roundCoordinate(formatedProps.width)
    formatedProps.height = roundCoordinate(formatedProps.height)
    return formatedProps
}

export default class App extends Component {
    constructor(props) {
        super(props)
        const initialState = props.initialState || {}
        this.state = {
            focusItemId: false,
            items: initialState.items || {},
            itemsOrder: initialState.itemsOrder || [],
            inventoryItems: props.inventory.map((desc, inventoryIndex) => ({
                props: desc.getDefaultProps(),
                inventoryIndex,
            })),
        }
    }

    render({ inventory }, { inventoryItems, items, itemsOrder, focusItemId }) {
        return (
            <div style={{ display: "flex", flex: "1" }}>
                <div
                    style={{
                        backgroundColor: "#eee",
                        padding: 5,
                    }}
                >
                    {inventoryItems.map((item) => {
                        return (
                            <DragableItem
                                style={{
                                    display: "flex",
                                    width: item.props.width,
                                    height: item.props.height,
                                }}
                                startMove={this._createDragScenario.bind(this, item)}
                            >
                                {inventory[item.inventoryIndex].renderItem(formatProps(item.props))}
                            </DragableItem>
                        )
                    })}
                </div>
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
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
                        {itemsOrder.map((itemId) => {
                            const item = items[itemId]
                            return (
                                <DragableItem
                                    key={itemId}
                                    style={{
                                        position: "absolute",
                                        display: "flex",
                                        top: item.position.y,
                                        left: item.position.x,
                                        width: item.props.width,
                                        height: item.props.height,
                                        opacity: this._isInArea(item) ? "1" : "0.5",
                                        boxShadow: focusItemId === itemId ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none",
                                        zIndex: focusItemId === itemId ? "1" : "0",
                                    }}
                                    startMove={this._createDragScenario.bind(this, item)}
                                    startResize={this._createResizeScenario.bind(this, itemId)}
                                    onClick={() => this.setState({ focusItemId: itemId })}
                                    isActive={item.active}
                                >
                                    {inventory[item.inventoryIndex].renderItem(this._getItemProps(itemId))}
                                </DragableItem>
                            )
                        })}
                    </div>
                    {focusItemId && (
                        <div
                            style={{
                                backgroundColor: "#eee",
                                padding: 5,
                            }}
                        >
                            {inventory[items[focusItemId].inventoryIndex].renderSettings(
                                this._getItemProps(focusItemId),
                                (newProps) => {
                                    this._replaceItem({
                                        id: focusItemId,
                                        props: formatProps(items[focusItemId].props, newProps),
                                    })
                                }
                            ) || "No settings available"}
                        </div>
                    )}
                </div>
            </div>

        )
    }

    _getItemProps(itemId) {
        const item = this.state.items[itemId]
        return formatProps(item.props, { dragging: item.active })
    }

    _createDragScenario(originalItem, startEvent, base) {
        let itemId = originalItem.id

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
                            [itemId]: Object.assign({}, originalItem, {
                                id: itemId,
                                position: getPosition(event),
                                active: true,
                            }),
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
        const {position: { x, y }, props: { height, width }} = this.state.items[itemId]

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
                    props: {
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

    _isInArea({ position: { x, y }, props: { width, height } }) {
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
            const existingItem = items[item.id]
            const newItem = Object.assign({}, existingItem, item, {
                props: Object.assign({}, existingItem.props, item.props),
            })

            return {
                items: Object.assign({}, items, {
                    [item.id]: newItem,
                }),
            }
        }, cb)
    }

    _triggerUpdateState() {
        this.props.onUpdate && this.props.onUpdate(this.state)
    }

}
