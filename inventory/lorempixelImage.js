import { h } from "preact"

export default {

    name: "lorempixel-image",

    getDefaultProps() {
        return {
            width: 100,
            height: 50,
            category: "cats",
            index: 1,
        }
    },

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

}
