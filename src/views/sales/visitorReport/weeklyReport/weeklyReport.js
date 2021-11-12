import { getSaleStatus } from '@/api/sales/visitorReport/media'

export default {
  data() {
    return {
      projectId: 0,
      reportTitle:'',
      listQuery: {
        page: 1,
        limit: 100,
        visitorId: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        
      },
      rules: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.projectId = this.$route.query.projectId
      this.fetchData()
      this.reportTitle = "週 報 表";
    },
    fetchData() {
      /*this.listLoading = true
      
      getSaleStatus(this.projectId).then(response => {
        this.form = response.data
        this.listLoading = false
      })*/
      
    },
    
    back() {
      this.$router.go(-1)
    },
    handleClose() {

    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form = {
        
      }
      
    },
    checkSel() {
      if (this.selRow && this.selRow.id) {
        return true
      }
      this.$message({
        message: '請挑選其中一筆資料',
        type: 'warning'
      })
      return false
    }
    
  }
}
