export class Renderer {
    static render(ctx) {
        this.#subtitle(ctx)
        this.#sum(ctx)
        this.#buttons(ctx)
    }

    static #subtitle(ctx) {
        const VERTICAL_OFFSET = 90

        const XPosition = ctx.plotWidth / 2
        const YPosition = ctx.plotHeight / 2 - VERTICAL_OFFSET

        if (ctx.label) {
            ctx.label.destroy()
        }

        ctx.label = ctx.renderer
            .label('Invested ($ MM)', XPosition, YPosition)
            .css({
                color: '#fff',
                fontSize: '24px',
                fontWeight: '500',
                fontFamily: 'Acumin Pro'
            })
            .add()

        const labelBox = ctx.label.getBBox()
        ctx.label.translate(XPosition - labelBox.width / 2, YPosition - labelBox.height / 2)
    }

    static #sum(ctx) {
        const HORIZONTAL_OFFSET = 10
        const VERTICAL_OFFSET = 30


        const overallSum = ctx.series.at(0).data.reduce((acc, cv) => acc + cv.y, 0)

        if (ctx.sum) {
            ctx.sum.destroy()
        }

        const XPosition = ctx.plotWidth / 2 - HORIZONTAL_OFFSET
        const YPosition = ctx.plotHeight / 2 - VERTICAL_OFFSET

        ctx.sum = ctx.renderer
            .label(
                new Intl.NumberFormat('en-IN').format(overallSum), XPosition, YPosition
            )
            .css({
                color: '#ffffff',
                fontSize: '80px',
                fontWeight: '500',
                fontFamily: 'Acumin Pro'
            })
            .add()

        const sumBox = ctx.sum.getBBox()
        ctx.sum.translate(XPosition - sumBox.width / 2, YPosition - sumBox.height / 2)
    }

    static #buttons(ctx) {
        const VERTICAL_OFFSET = 90
        const BUTTON_LIST_PROP = 'buttonList'

        const XPosition = ctx.plotWidth / 2
        const YPosition = ctx.plotHeight / 2 - VERTICAL_OFFSET

        const zoomButtonLabels = ['1M', '3M', '6M', 'YTD', '1Y']

        if (Object.hasOwn(ctx, BUTTON_LIST_PROP)) {
            ctx.buttonList.forEach(button => {
                button.destroy()
            })
            delete ctx[BUTTON_LIST_PROP]
        }

        ctx[BUTTON_LIST_PROP] = zoomButtonLabels.reverse().map(label => {
            return ctx.renderer.button(label, 100, 100, null,
                {
                    fill: ctx.zoomButtonCLickedLabel === label ? '#333' : 'transparent',
                    stroke: 'transparent',
                    style: {
                        color: '#fff',
                        fontWeight: '600',
                        fontSize: '12px',
                        fontFamily: 'Acumin Pro SemiCondensed'
                    }
                },
                {
                    fill: '#9d9d9d'
                })
                .on('click', function () {
                    ctx.zoomButtonCLickedLabel = label
                    const targetIndex = zoomButtonLabels.findIndex(it => it === label)
                    const datalist = ctx.options.datalist.filter(set => {
                        const idx = zoomButtonLabels.findIndex(it => it === set.custom.range)
                        return idx >= targetIndex
                    })
                    ctx.series[0].setData(datalist)
                })
                .add()
        })
        ctx.buttonList.forEach((label, index) => {
            label.translate(XPosition + 70 - (30 * index * 1.5), YPosition + 150)
        })
    }
}
