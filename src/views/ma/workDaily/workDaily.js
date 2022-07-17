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
    setBudget(prjId,prjName) {
      this.$router.push({ path: '/maa01', query: { prjId: prjId, prjName: prjName }})
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
    maa10() {
      if (this.checkSel()) {
        
      }
    },
    maa08() {//出工
      if (this.checkSel()) {
        this.$router.push({ path: '/maa08', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004 }})
      }
    },
    maa09() {//memo
      if (this.checkSel()) {
        this.$router.push({ path: '/maa09', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004 }})
      }
    },
    maa14() {//臨時工
      if (this.checkSel()) {
        this.$router.push({ path: '/maa14', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004 }})
      }
    },
    maa15() {//廠商代墊款
      if (this.checkSel()) {
        this.$router.push({ path: '/maa15', query: { maa00ID: this.selRow.id, projectName: this.selRow.maa00004 }})
      }
    },
    edit() {
      
    },
    remove() {
      
    }
  }
}
