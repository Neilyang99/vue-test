import { getNotDeal } from '@/api/sales/visitorReport/media'

export default {
  data() {
    return {
      projectCode: '',
      reportType: '',
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
      this.projectCode = this.$route.query.projectCode
      this.reportType = this.$route.query.reportType
      this.fetchData()
      if(this.reportType == 'NOTDEAL'){
        this.reportTitle = '回 籠 未 成 交 原 因'
      //}else if(this.reportType == 'DEAL'){
        //this.reportTitle = '未 購 原 因 分 析'
      }else{
        this.reportTitle = this.reportType
      }
    },
    fetchData() {
      this.listLoading = true
      
      getNotDeal(this.projectCode, this.reportType).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
      })
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
