import { getList } from '@/api/system/notice'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'
import elementResizeDetectorMaker from "element-resize-detector"

export default {
  data() {
    return {
      chartList: [{
        value: '1',
        label: '來客量曲線圖'
      }, {
        value: '2',
        label: '動機總數圓餅圖'
      },{
        value: '3',
        label: '來源總數量長條圖'
      },{
        value: '4',
        label: '位置總數量長條圖'
      }],
      listQuery: {
        chartType: undefined
      },
      chartData:{},
      optionData:[
        { value: 135, name: '自用' },
        { value: 75, name: '首次' },
        { value: 34, name: '換屋' },
        { value: 15, name: '贈與' },
        { value: 30, name: '投資'},
        { value: 10, name: '幫別人看'},
        { value: 1, name: '其他'}
      ] 
    }
      
  },
  created() {
    this.init()
  },
  mounted(){
    //绑定echart图表跟随窗口大小自动缩放
    let that = this
    let erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById("visitorCharts"),(element)=>{
      that.$nextTick(()=>{
        that.$refs.chart.resize()
      })
    })
  },
  methods: {
    init(){
      this.fetchData()
      
    },
    fetchData() {

    },
    search() {
      if(this.listQuery.chartType == '1'){
        this.lineChart()
      }else if(this.listQuery.chartType == '2'){
        this.pieChart()
      }else if(this.listQuery.chartType == '3'){
        this.barChart()
      }else if(this.listQuery.chartType == '4'){    
      }
      
    },
    reset() {
      
    },
    lineChart(){
      this.chartData = {
        title: {
          text: '來客量曲線圖',
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: [this.$t('dashboard.email'), this.$t('dashboard.ad'), this.$t('dashboard.vedio'), this.$t('dashboard.direct'), this.$t('dashboard.searchEngine')]
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: this.$t('dashboard.email'),
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: this.$t('dashboard.ad'),
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: this.$t('dashboard.vedio'),
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: this.$t('dashboard.direct'),
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: this.$t('dashboard.searchEngine'),
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    },
    barChart(){
      this.chartData= {
        xAxis: {
          type: 'category',
          data: [this.$t('common.week.mon'), this.$t('common.week.tue'), this.$t('common.week.wed'), this.$t('common.week.thu'), this.$t('common.week.fri'), this.$t('common.week.sat'), this.$t('common.week.sun')]
        },
        yAxis: {
          type: 'value'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      }
    },
    pieChart(){
      this.chartData= {
        title: {
          text: '動機總數量圓餅圖',
          //subtext: '---------------',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['自用','首次','換屋','贈與','投資','幫別人看','其他']
        },
        series: [
          {
            name: 'from',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.optionData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
