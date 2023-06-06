export const updateDrilldownGraph = (ctx, chart) => {
    const series = Object.entries(ctx.options.drillDownDatalist)
        .reduce((acc, [slug, dataset]) => {
            const name = slug.replaceAll('-', ' ')
            acc[slug] = {
                name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
                borderWidth: 0,
                colorByPoint: true,
                innerSize: '95%',
                data: dataset
            }

            return acc
        }, {})

    const target = series[chart.point.drilldown]
    ctx.addSingleSeriesAsDrilldown(chart.point, target)
    ctx.applyDrilldown()
}

