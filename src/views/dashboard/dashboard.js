import { getList } from '@/api/system/notice'
import { findNoHandleList } from '@/api/sales/visitorLog'
import { mapGetters } from 'vuex'
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

  name: 'dashboard',
  components: {
    chart: ECharts
  },
  data() {
    const data = []
    for (let i = 0; i <= 360; i++) {
      const t = i / 180 * Math.PI
      const r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }
    return {
      list: null,
      listLoading: true
    }
  },
  computed: {
    ...mapGetters([
      'name'

    ])
  },
  created() {
    this.fetchData()
    this.fetchNoHandle()
  },
  mounted(){
    //绑定echart图表跟随窗口大小自动缩放
    let that = this
    let erd = elementResizeDetectorMaker()
    erd.listenTo(document.getElementById("dashboard"),(element)=>{
      that.$nextTick(()=>{
        that.$refs.lineChart.resize()
        that.$refs.barChart.resize()
        that.$refs.pieChart.resize()
      })
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      const self = this
      getList(self.listQuery).then(response => {
        for (var i = 0; i < response.data.length; i++) {
          var notice = response.data[i]
          self.$notify({
            title: notice.title,
            message: notice.content,
            duration: 3000
          })
        }
        self.listLoading = false
      })
    },
    fetchNoHandle(){
      this.listLoading = true
      findNoHandleList().then(response => {
          this.list = response.data
          this.listLoading = false
          this.total = response.data.total
      })
  
    }
  }
}
