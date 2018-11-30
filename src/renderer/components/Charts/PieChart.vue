<template>
  <highcharts :options="pieChartOptions"/>
</template>
<script>
export default {
  name: 'pet-charts-piechart',
  props: ['chartOptions'],
  computed: {
    pieChartOptions () {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: this.chartOptions.title
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: this.chartOptions.seriesName,
          colorByPoint: true,
          data: this.chartOptions.data
        }],
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>
