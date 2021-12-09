import { buildingList, getCntMotivation, getCntVisitor, getCntArea, getCntVisitType, getCntAge } from '@/api/sales/visitorCharts'
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
        label: '來客區域長條圖'
      },{
        value: '5',
        label: '年齡圓餅圖'
      }],
      chartDataType:[{
        value: 'week',
        label: '週'
      },{
        value: 'month',
        label: '月'
      },{
        value: 'quarter',
        label: '季'
      },{
        value: 'year',
        label: '年'
      }],
      listQuery: {
        chartType: undefined,
        chartDataType: undefined,
        buildingNo: undefined
      },
      buildingList:{},
      buildingName:'',
      chartData:{},
      optionData:[],
      legendData:[],
      ageData:[],
      visitorData:[],
      visitorLegend:[],
      areaData:[],
      areaLegend:[],
      typeData:[],
      typeLegend:[]
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
      this.fetchBuilding()
      
    },
    fetchData() {

    },
    fetchBuilding() {
      buildingList().then(response => {
        this.buildingList = response.data
      })
    },
    getCntMotivation(buildingNo){
      var ddata = []
      getCntMotivation(buildingNo).then(response => {
        this.optionData = response.data
        this.optionData.forEach(function(item, i){
          ddata.push(item.name)
        })
        this.legendData = ddata
      })
    },
    getCntAge(buildingNo){
      var ddata = []
      getCntAge(buildingNo).then(response => {
        this.optionData = response.data
        this.optionData.forEach(function(item, i){
          ddata.push(item.name)
        })
        this.ageData = ddata
      })
    },
    getVisitorQty(buildingNo,dataType){
      var ddata = []
      var vdata = []
      var fromDB = []
      getCntVisitor(buildingNo, dataType).then(response => {
        fromDB = response.data
        
        fromDB.forEach(function(item, i){
          ddata.push(item.key)
          vdata.push(item.value)
        })
        this.visitorLegend = ddata
        this.visitorData = vdata
      })
      
    },
    getCntVisitType(buildingNo){
      var ddata = []
      var vdata = []
      var fromDB = []
      getCntVisitType(buildingNo).then(response => {
        fromDB = response.data
        fromDB.forEach(function(item, i){
          ddata.push(item.name)
          vdata.push(item.value)
        })
        this.typeLegend = ddata
        this.typeData = vdata
      })
    },
    getCntArea(buildingNo){
      var ddata = []
      var vdata = []
      var fromDB = []
      getCntArea(buildingNo).then(response => {
        fromDB = response.data
        fromDB.forEach(function(item, i){
          ddata.push(item.name)
          vdata.push(item.value)
        })
        this.areaLegend = ddata
        this.areaData = vdata
      })
    },
    getBuildingName(vid){//get Project name by project id
      let obj = {};
      obj = this.buildingList.find((item)=>{
        return item.sla00002 === vid
      })
      return obj.sla00003
    },
    search() {
      this.buildingName = this.getBuildingName(this.listQuery.buildingNo)
      this.chartData = {}

      if(this.listQuery.chartType == '1'){
        this.getVisitorQty(this.listQuery.buildingNo, this.listQuery.chartDataType)
        setTimeout(()=> this.lineChart(), 500)
        
      }else if(this.listQuery.chartType == '2'){
        this.getCntMotivation(this.listQuery.buildingNo);
        setTimeout(()=> this.pieChart(), 500)

      }else if(this.listQuery.chartType == '3'){
        this.getCntVisitType(this.listQuery.buildingNo)
        setTimeout(()=> this.barChart(), 500)

      }else if(this.listQuery.chartType == '4'){  
        this.getCntArea(this.listQuery.buildingNo)
        setTimeout(()=> this.barAreaChart(), 500)
      }else if(this.listQuery.chartType == '5'){  
        this.getCntAge(this.listQuery.buildingNo)
        setTimeout(()=> this.agePieChart(), 500)
      }
    },
    reset() {
      this.listQuery.chartType = ''
      this.listQuery.buildingNo=''
      this.listQuery.chartDataType=''

    },
    lineChart(){
      this.chartData = {
        title: {
          text: '來客量曲線圖',
          subtext: this.buildingName,
          x: 'center'
        },
        tooltip: {
          trigger: 'axis'
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
          data: this.visitorLegend
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'line',
            smooth: true,
            data: this.visitorData
          }
        ],
        color:["#009688"]
      }
    },
    barAreaChart(){
      this.chartData= {
        title: {
          text: '來客區域長條圖',
          subtext: this.buildingName,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.areaLegend
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
          data: this.areaData,
          type: 'bar'
        }],
        color:["#7EC0EE"]
      }
    },
    barChart(){
      this.chartData= {
        title: {
          text: '來源總數量長條圖',
          subtext: this.buildingName,
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.typeLegend
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
          data: this.typeData,
          type: 'bar'
        }],
        color:["#7EC0EE"]
      }
    },
    pieChart(){
      this.chartData= {
        title: {
          text: '動機總數量圓餅圖',
          subtext: this.buildingName,
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
          data: this.legendData
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
    },
    agePieChart(){
      this.chartData= {
        title: {
          text: '年齡總數量圓餅圖',
          subtext: this.buildingName,
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
          data: this.ageData
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
