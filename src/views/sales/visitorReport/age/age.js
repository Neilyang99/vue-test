import { getMediaAnalysis } from '@/api/sales/visitorReport/media'

export default {
  data() {
    return {
      projectCode: '',
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
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      
      getMediaAnalysis(this.projectCode).then(response => {
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
