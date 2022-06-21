import { remove, getList, save } from '@/api/ma/maa00'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增工程案',
      isAdd: true,
      form: {
        id: ''
        
      },
      rules: {
        
      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa00004: undefined
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
      this.listQuery.selMaa00004 = ''
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
    maa11_1() {//混凝土(假設工程)
      if (this.checkSel()) {
        this.$router.push({ path: '/maa11', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004, reportType:'1' }})
      }
    },
    maa11_2() {//混凝土(結構體工程)
      if (this.checkSel()) {
        this.$router.push({ path: '/maa11', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004, reportType:'2' }})
      }
    },
    maa12_1() {//鋼筋(基礎工程)
      if (this.checkSel()) {
        this.$router.push({ path: '/maa12', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004, reportType:'1' }})
      }
    },
    maa12_2() {//鋼筋(結構體工程)
      if (this.checkSel()) {
        this.$router.push({ path: '/maa12', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004, reportType:'2' }})
      }
    },
    maa12_3() {//鋼筋(雜項工程)
      if (this.checkSel()) {
        this.$router.push({ path: '/maa12', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004, reportType:'3' }})
      }
    },
    edit() {
      
    },
    remove() {
      
    }
  }
}
