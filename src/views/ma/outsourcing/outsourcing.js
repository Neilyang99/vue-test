import { remove, getList, save } from '@/api/ma/maa00'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isAdd: true,
      vendorId: '',
      vendorName: '',
      form: {
        id: ''
        
      },
      rules: {
        
      },
      listQuery: {
        page: 1,
        limit:20,
        vendorId: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {

  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.vendorId = this.$route.query.vendorId
      this.vendorName = this.$route.query.vendorName
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleClose() {

    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form = {
        id: ''
      }
    },
    add() {
      
    },
    save() {
      
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
    },
    toNext() {
      if (this.checkSel()) {
        this.$router.push({ name: '承包項目', params: { vendorId: this.vendorId, vendorName: this.vendorName, prjId:this.selRow.id, prjName: this.selRow.maa00004 }})
        
      }
    },
    edit() {
      
    },
    remove() {
      
    }
  }
}
