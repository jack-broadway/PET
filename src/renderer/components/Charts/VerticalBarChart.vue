<template>
  <highcharts :options="barChartOptions"/>
</template>
<script>
export default {
  name: 'pet-charts-verticalbar',
  props: ['chartOptions'],
  computed: {
    barChartOptions () {
      return {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'column'
        },
        title: {
          text: this.chartOptions.title
        },
        xAxis: {
          categories: this.chartOptions.categories
        },
        tooltip: {
          pointFormat: '{series.name}: <b>$ {point.y}</b>'
        },
        series: this.chartOptions.series,
        credits: {
          enabled: false
        }
      }
    }
  }
}
</script>
