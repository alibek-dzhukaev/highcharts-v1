export const formatTooltip = (ctx) => {
    let content = ''
    const dot = '<span style="color:' + ctx.point.color + ';">&#x2B24;</span>'
    const title = '<span style="color: #fff; font-size: 16px; font-weight: 600;">' + ctx.point.name + '</span>'
    const keyWord = '<span style="color: #fff; font-size: 14px; font-weight: 500">' + ctx.series.name + '</span>'
    const sum = '<span style="color: #fff; font-size: 14px; font-weight: 700">' + `$${ctx.point.y}MM` + '</span>'

    const topLine = '<div style="display: flex; gap: 1rem; align-items: center">' + dot + title + '</div>'
    const bottomLine = '<div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between">' + keyWord + sum + '</div>'

    const linkLabel = 'https://www.google.com/search?q=' + ctx.point.name
    const link = '<a target="_blank" href="' + linkLabel + '" style="text-decoration: none; padding: 5px 10px; margin: 5px 10px; background: #0B50CF; color: #fff">' + 'See ' + ctx.point.name + '</a>'

    content += '<div style="min-width: 210px; display: flex; flex-direction: column; justify-content: space-between; text-align: center">' + topLine + '<br>' + bottomLine + '<br>' + link  + '</div>'
    return content
}
