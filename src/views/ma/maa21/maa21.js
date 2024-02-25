import { remove, getList, save } from '@/api/ma/maa21'

export default {
  data() {
    return {
      formVisible: false,
      formTest: false,
      titleTxt: '工程合約',
      isAdd: true,
      form: {
        id: '',
        maa21002: '',
        maa21003: '',
        maa21004: 10,
        maa21005: 'Y',
        maa21006: ''
      },
      rules: {
        maa21003: [
          { required: true, message: '請輸入工程案', trigger: 'blur' }
        ],
        maa21004: [
          { required: true, message: '請輸入請款公司', trigger: 'blur' }
        ],
        maa21005: [
          { required: true, message: '請輸入付款公司', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa21003: undefined
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
      this.listQuery.selMaa21003 = ''
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
    selVendor(){
      this.formTest = true;
    },

    resetForm() {
      this.form = {
        id: '',
        maa21002: '',
        maa21003: '',
        maa21004: 10,
        maa21005: 'Y',
        maa21006: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增'+this.titleTxt
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa21002: self.form.maa21002,
            maa21003: self.form.maa21003,
            maa21004: self.form.maa21004,
            maa21005: 'Y',
            maa21006: ''
            
            
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
    view2nd(typeId,name) {
      
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
        this.formTitle = '修改'+this.titleTxt
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
