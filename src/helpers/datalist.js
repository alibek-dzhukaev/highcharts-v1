import Entity from "@/utils/Entity";

const colors = ['#00f6ff', '#9700c9', '#fa258c', '#fa7a25', '#cfc104', '#048230', '#022dc9', '#db58a2', '#fc0000', '#593636']

export class DatalistManager {
    #colors = [
        '#00f6ff',
        '#9700c9',
        '#fa258c',
        '#fa7a25',
        '#cfc104',
        '#048230',
        '#022dc9',
        '#db58a2',
        '#fc0000',
        '#593636'
    ]

    mapDatalist(dataset) {
        return dataset.map((set, idx) => {
            return new Entity(
                set.name,
                set.amount,
                this.#colors[idx],
                set.slug,
                set.range
            )
        })
    }

    mapDrillDownDatalist(dataset) {
        return Object.entries(dataset)
            .reduce((acc, [slug, data]) => {
                acc[slug] = data.map(set => {
                    return new Entity(
                        set.name,
                        set.amount,
                        '#' + Math.floor(Math.random() * 16777215).toString(16),
                        null
                    )
                })

                return acc
            }, {})
    }
}

