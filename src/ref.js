const refs = new WeakMap()

export default function ref(component, name) {
    let componentRefs = refs.get(component)
    if (!componentRefs) {
        componentRefs = new Map()
        refs.set(component, componentRefs)
    }
    let fn = componentRefs.get(name)
    if (!fn) {
        fn = (element) => {
            component[name] = element
        }
        componentRefs.set(name, fn)
    }
    return fn
}
