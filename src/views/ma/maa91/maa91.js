import { remove, getList, save } from '@/api/ma/maa91'

export default {
  data() {
    return {
      typeId: '',
      firstTypeName: '',
      formVisible: false,
      formTitle: '新增工程預算小類別',
      isAdd: true,
      form: {
        id: '',
        maa91002: 0,
        maa91003: '',
        maa91004: '',
        maa91005: '',
        maa91006: 10,
        maa91007: 'Y',
        maa91008: ''
      },
      rules: {
        maa91004: [
          { required: true, message: '請輸入工程預算類別代號', trigger: 'blur' }
        ],
        maa91005: [
          { required: true, message: '請輸入工程預算類別名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        name: undefined,
        typeId: undefined
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
      this.typeId = this.$route.query.typeId
      this.firstTypeName = this.$route.query.name
      this.listQuery.typeId = this.typeId
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
        maa91002: 0,
        maa91003: '',
        maa91004: '',
        maa91005: '',
        maa91006: 10,
        maa91007: 'Y',
        maa91008: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程預算類別'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa91002: this.typeId,
            maa91003: '',
            maa91004: self.form.maa91004,
            maa91005: self.form.maa91005,
            maa91006: self.form.maa91006,
            maa91007: 'Y',
            maa91008: ''
            
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
    viewItem(secId,secTypeName) {
      this.$router.push({ path: '/maa92', query: { firstId: this.typeId, firstTypeName: this.firstTypeName, secId: secId, secTypeName: secTypeName}})
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
        this.formTitle = '修改工程預算類別'
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
