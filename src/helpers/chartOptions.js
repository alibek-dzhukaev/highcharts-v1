import {updateDrilldownGraph} from "@/helpers/updateDrilldownGraph";
import {render} from "@/helpers/render";
import {formatTooltip} from "@/helpers/tooltip";
import {datalist} from "@/helpers/datalist";

export const chartOptions = {
    chart: {
        plotBackgroundColor: '#1A1A1A',
        plotBorderWidth: null,
        plotShadow: false,
        margin: 0,
        type: 'pie',
        events: {
            drilldown: function (chart) {
                delete this.zoomButtonCLickedLabel
                updateDrilldownGraph(this, chart)
            },
            render: function (chart) {
                render(this, chart)
            }
        }
    },
    title: {
        text: 'All Categories',
        style: {
            color: '#fff',
            fontFamily: 'Acumin Pro',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '20px'
        },
        useHTML: true,
        floating: true,
        verticalAlign: 'top',
    },
    tooltip: {
        animation: true,
        backgroundColor: '#111',
        style: {color: '#fefefe', pointerEvents: 'auto'},
        borderWidth: 1,
        borderColor: '#111',
        followPointer: true,
        useHTML: true,
        hideDelay: 1000,
        formatter: function () {
            return formatTooltip(this)
        }
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false,
                distance: -50,
                style: {
                    fontWeight: 'bold',
                    color: 'white'
                }
            },
            startAngle: 0,
            endAngle: 360,
            center: ['50%', '50%'],
            size: '85%'
        }
    },
    drilldown: {
        drillUpButton: {
            theme: {
                display: 'none'
            }
        }
    },
    credits: {
        enabled: false,
    },
    series: [{
        borderWidth: 0,
        name: 'Capital Invested',
        colorByPoint: true,
        innerSize: '95%',
        data: datalist
    }]
}
