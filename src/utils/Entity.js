function Entity(name, amount, color, drilldown, range) {
    this.name = name
    this.y = amount
    this.color = color
    this.drilldown = drilldown
    this.custom = {
        range
    }
}

export default Entity
