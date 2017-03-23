/*
          o
          v
        start
       __| |__
      |       |
      v       v
     snap    cancel
      |       |
      v       |
     move <-- |
      | |___| |
      v       |
     stop     |
      |__   __|
         | |
         v v
        reset
          v
          o
*/

let dragEventsAttached = false
let activeSubscriber = false

function isTouchEvent(event) {
    return event.type.startsWith("touch")
}

function addEvents(element, events, useCapture) {
    for (const name in events) element.addEventListener(name, events[name], useCapture)
    return () => {
        for (const name in events) element.removeEventListener(name, events[name], useCapture)
    }
}

function attachGlobalEvents() {
    if (dragEventsAttached) return
    dragEventsAttached = true
    addEvents(document, {
        touchmove: onMove,
        mousemove: onMove,
        touchend: onStop,
        mouseup: onStop,
        touchcancel: onStop,
    })
}

function get(property, fallback) {
    return activeSubscriber.scenario[property] !== undefined ?
        activeSubscriber.scenario[property] :
        fallback
}

function call(method, argument) {
    return typeof activeSubscriber.scenario[method] === "function" ?
        activeSubscriber.scenario[method](argument) :
        undefined
}

function onStart(start, event) {
    if (activeSubscriber) return

    // This cover left click and touch
    if ((event.which || event.button || 0) >= 2) return

    const scenario = start(event)
    if (scenario) {
        activeSubscriber = {
            scenario,
            snapped: false,
            startOrigin: {
                x: event.pageX,
                y: event.pageY,
            },
        }

        // preventDefault prevents the text to be selected, or context menus to be opened.
        // stopPropagation allow drag and drop usage in a scroller (start dragging will cancel
        // the scroll)
        // BUT:
        // preventDefault prevents scrolling in native (overflow: auto) container.
        // stopPropagation prevents scrolling in a scroller by starting in a draggable element.
        // If all elements in the scroller are draggable, the scroller won't be scrollable.
        //
        // Disabled for now on touch devices, until we find a better solution for dragging in
        // scrollers
        if (!isTouchEvent(event)) {
            event.preventDefault()
        }
    }
}

function onMove(event) {
    if (!activeSubscriber) return

    if (!activeSubscriber.snapped) {
        const snapDistance = isTouchEvent(event) ?
            get("touchSnap", 20) :
            get("mouseSnap", 10)
        const distance =
            (
                (event.pageX - activeSubscriber.startOrigin.x) ** 2 +
                (event.pageY - activeSubscriber.startOrigin.y) ** 2
            ) ** 0.5

        if (!snapDistance || distance > snapDistance) {
            activeSubscriber.snapped = true
            call("snap", event)
        }
    }

    if (activeSubscriber.snapped) {
        event.preventDefault()
        call("move", event)
    }
}

function onStop(event) {
    if (!activeSubscriber) return

    if (activeSubscriber.snapped) {
        event.stopPropagation()
        event.preventDefault()
        call("stop", event)
        setTimeout(addEvents(document, {
            click(event) {
                event.stopPropagation()
            },
        }, true))
    }
    else {
        call("cancel", event)
    }

    call("reset", event)
    activeSubscriber = false
}

export default function drag(root, start) {
    attachGlobalEvents()

    const removeEvents = addEvents(root, {
        touchstart: onStart.bind(null, start),
        mousedown: onStart.bind(null, start),
    })

    return () => {
        removeEvents()
    }
}
