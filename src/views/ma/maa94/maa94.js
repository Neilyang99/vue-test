import { remove, getList, save } from '@/api/ma/maa94'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增工程類別項目',
      isAdd: true,
      form: {
        id: '',
        maa94002: 0,
        maa94003: '',
        maa94004: '',
        maa94005: 0,
        maa94006: 0,
        maa94007: 0,
        maa94008: '',
        maa94009: '',
        maa94010: ''
      },
      rules: {
        maa94003: [
          { required: true, message: '請輸入項目名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa94003:''
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
      this.listQuery.selMaa94003 = ''
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
        maa94002: 0,
        maa94003: '',
        maa94004: '',
        maa94005: 0,
        maa94006: 0,
        maa94007: 0,
        maa94008: '',
        maa94009: '',
        maa94010: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程類別'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa94002: self.form.maa94002,
            maa94003: self.form.maa94003,
            maa94004: self.form.maa94004,
            maa94005: self.form.maa94005,
            maa94006: 0,
            maa94007: 0,
            maa94008: '',
            maa94009: '',
            maa94010: ''
            
            
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
    view2nd(typeId,name,itemType) {
      this.$router.push({ path: '/maa941', query: { typeId: typeId, name: name, itemType: itemType }})
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
        this.formTitle = '修改工程類別'
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
