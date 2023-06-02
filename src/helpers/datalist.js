import dataset from "@/helpers/db.json";
import Entity from "@/utils/Entity";

const colors = ['#00f6ff', '#9700c9', '#fa258c', '#fa7a25', '#cfc104', '#048230', '#022dc9', '#db58a2', '#fc0000', '#593636']

export const datalist = dataset.initial
    .map((set, idx) => new Entity(
        set.name,
        set.amount,
        colors[idx],
        set.slug,
        set.range
    ))

export const drillDownDatalist = Object.entries(dataset.drilldown)
    .reduce((acc, [slug, dataset]) => {
        acc[slug] = dataset.map(set => {
            return new Entity(
                set.name,
                set.amount,
                '#' + Math.floor(Math.random() * 16777215).toString(16),
                null
            )
        })
        return acc
    }, {})
