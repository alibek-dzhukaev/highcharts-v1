const renderSubtitle = (ctx) => {
    const verticalOffset = 90
    // Get chart center coordinates
    const centerX = ctx.plotWidth / 2;
    const centerY = ctx.plotHeight / 2 - verticalOffset;


    if (ctx.label) {
        ctx.label.destroy()
    }

    // Create the label
    ctx.label = ctx.renderer
        .label('Invested ($ MM)', centerX, centerY)
        .css({
            color: '#FFFFFF',
            fontSize: '24px',
            fontWeight: 500,
            fontFamily: 'Acumin Pro'
        })
        .add();

    // Position the label in the center of the chart
    const labelBox = ctx.label.getBBox();
    ctx.label.translate(centerX - labelBox.width / 2, centerY - labelBox.height / 2);
}

const renderSum = (ctx, chart) => {
    const sumResult = ctx.series.at(0).data.reduce((acc, cv) => acc + cv.y, 0)

    if(ctx.sum) {
        ctx.sum.destroy()
    }
    const centerSecondX = ctx.plotWidth / 2 - 10;
    const centerSecondY = ctx.plotHeight / 2 - 30
    ctx.sum = ctx.renderer
        .label(new Intl.NumberFormat("en-IN").format(sumResult), centerSecondX, centerSecondY)
        .css({
            color: '#ffffff',
            fontSize: '80px',
            fontWeight: 500,
            fontFamily: 'Acumin Pro'
        })
        .add()

    const sumBox = ctx.sum.getBBox()
    ctx.sum.translate(centerSecondX - sumBox.width / 2, centerSecondY - sumBox.height / 2);
}

const renderButtons = (ctx, chart) => {
    const verticalOffset = 90
    // Get chart center coordinates
    const centerX = ctx.plotWidth / 2;
    const centerY = ctx.plotHeight / 2 - verticalOffset;
    const zoomLabels = ['1M', '3M', '6M', 'YTD', '1Y']

    if (Object.hasOwn(ctx, 'buttonList')) {
        ctx.buttonList.forEach(button => {
            button.destroy()
        })
        delete ctx.buttonList
    }

    ctx.buttonList = zoomLabels.reverse().map(label => {
        return ctx.renderer.button(label, 100, 100, null,
            {
                fill: ctx.zoomButtonCLickedLabel === label ? '#333333' : 'transparent',
                stroke: 'transparent',
                style: {
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '12px',
                    fontFamily: 'Acumin Pro SemiCondensed'
                }
            },
            {
                fill: '#9d9d9d'
            })
            .on('click', function () {
                ctx.zoomButtonCLickedLabel = label
                const targetIndex = zoomLabels.findIndex(it => it === label)
                const datalist = ctx.options.datalist.filter(set => {
                    const idx = zoomLabels.findIndex(it => it === set.custom.range)
                    return idx >= targetIndex
                })
                ctx.series[0].setData(datalist)
            })
            .add()
    })
    ctx.buttonList.forEach((label, index) => {
        label.translate(centerX + 70 - (30 * index * 1.5), centerY + 150)
    })
}

export const render = (ctx, chart) => {
    renderSubtitle(ctx)
    renderSum(ctx, chart)
    renderButtons(ctx, chart)
}


