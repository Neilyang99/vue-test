import { remove, getList, save } from '@/api/ma/maa92'

export default {
  data() {
    return {
      firstId: '',
      firstTypeName: '',
      secId: '',
      secTypeName: '',
      formVisible: false,
      formTitle: '新增工程預算項目',
      isAdd: true,
      form: {
        id: '',
        maa92002: 0,
        maa92003: 0,
        maa92004: '',
        maa92005: '',
        maa92006: '',
        maa92007: '',
        maa92008: '',
        maa92009: 0,
        maa92010: 0,
        maa92011: '',
        maa92012: 10,
        maa92013: '',
        maa92014: ''
      },
      rules: {
        maa92006: [
          { required: true, message: '請輸入工程預算項目代號', trigger: 'blur' }
        ],
        maa92007: [
          { required: true, message: '請輸入工程預算項目名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        name: undefined,
        firstId: undefined,
        secId: undefined
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
      this.firstId = this.$route.query.firstId
      this.firstTypeName = this.$route.query.firstTypeName
      this.secId = this.$route.query.secId
      this.secTypeName = this.$route.query.secTypeName
      this.listQuery.firstId = this.firstId
      this.listQuery.secId = this.secId
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
      this.listQuery.name = ''
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
    back() {
      this.$router.go(-1)
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
        maa92002: 0,
        maa92003: 0,
        maa92004: '',
        maa92005: '',
        maa92006: '',
        maa92007: '',
        maa92008: '',
        maa92009: 0,
        maa92010: 0,
        maa92011: '',
        maa92012: 10,
        maa92013: '',
        maa92014: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程預算項目'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa92002: this.firstId,
            maa92003: this.secId,
            maa92004: '',
            maa92005: '',
            maa92006: self.form.maa92006,
            maa92007: self.form.maa92007,
            maa92008: self.form.maa92008,
            maa92009: self.form.maa92009,
            maa92010: self.form.maa92010,
            maa92011: self.form.maa92011,
            maa92012: self.form.maa92012,
            maa92013: 'Y',
            maa92014: ''
            
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
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改工程預算項目'
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
    }
  }
}
