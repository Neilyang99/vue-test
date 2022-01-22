import { remove, getList, save, startToSale } from '@/api/sales/sla00'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增銷售案',
      isAdd: true,
      form: {
        id: '',
        sla00002: '',
        sla00003: '',
        sla00004: '',
        sla00005: '',
        sla00006: '',
        sla00007: '',
        sla00008: '',
        sla00011: 0,
        sla00012: 0,
        sla00013: 0,
        sla00014: 0,
        sla00015: 0,
        sla00016: 0,
        sla00017: 0,
        sla00028: 0,
        sla00029: 0,
        sla00030: 0,
        sla00035: 0,
        sla00043: ''
      },
      rules: {
        sla00002: [
          { required: true, message: '請輸入銷售案代號', trigger: 'blur' }
        ],
        sla00003: [
          { required: true, message: '請輸入銷售案名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selSla00003: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
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
    fetchBuilding() {
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selSla00003 = ''
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
        id: '',
        sla00002: '',
        sla00003: '',
        sla00004: '',
        sla00005: '',
        sla00006: '',
        sla00007: '',
        sla00008: '',
        sla00011: 0,
        sla00012: 0,
        sla00013: 0,
        sla00014: 0,
        sla00015: 0,
        sla00016: 0,
        sla00017: 0,
        sla00028: 0,
        sla00029: 0,
        sla00030: 0,
        sla00035: 0,
        sla00043: ''
      }
    },
    add() {
      this.resetForm()
      this.fetchBuilding()
      this.formTitle = '新增銷售案'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            sla00002: self.form.sla00002,
            sla00003: self.form.sla00003,
            sla00004: self.form.sla00004,
            sla00005: self.form.sla00005,
            sla00006: self.form.sla00006,
            sla00007: self.form.sla00007,
            sla00008: self.form.sla00008,
            sla00011: self.form.sla00011,
            sla00012: self.form.sla00012,
            sla00013: self.form.sla00013,
            sla00014: self.form.sla00014,
            sla00015: self.form.sla00015,
            sla00016: self.form.sla00016,
            sla00017: self.form.sla00017,
            sla00028: self.form.sla00028,
            sla00029: self.form.sla00029,
            sla00030: self.form.sla00030,
            sla00035: self.form.sla00035,
            sla00041: self.form.sla00041,
            sla00043: self.form.sla00043
            
          }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
          })
        } else {
          return false
        }
      })
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
    edit() {
      if (this.checkSel()) {
        this.fetchBuilding()
        this.isAdd = false
        this.form = this.selRow
        this.form.building = this.selRow.sla00002
        this.formTitle = '修改銷售案'
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel()) {
        var id = this.selRow.id
        this.$confirm('確定刪除資料?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    },
    house() {
      if (this.checkSel()) {
        this.$router.push({ path: '/sla01', query: { sla00ID: this.selRow.id, projectId: this.selRow.sla00002 }})
      }
    },
    carPosition() {
      if (this.checkSel()) {
        this.$router.push({ path: '/sla02', query: { sla00ID: this.selRow.id, projectId: this.selRow.sla00002 }})
      }
    },
    startToSale(id,status) {
      //if (this.checkSel()) {
        startToSale(id,status).then(
          response => {
            console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
          }
        )
      //}
    }

  }
}
