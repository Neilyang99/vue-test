import { remove, getList, save } from '@/api/ma/maa04'

export default {
  data() {
    return {
      projectID: '',
      projectName: '',
      listQuery: {
        page: 1,
        limit: 20,
        maa00ID: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增混凝土試體取樣資料',
      isAdd: true,
      form: {
        id: '',
        maa04002:this.projectID,
        maa04003:'',
        maa04004:'',
        maa04005:'',
        maa04006:'',
        maa04007:'',
        maa04008:'',
        maa04009:'',
        maa04010:'0',
        maa04011:'',
        maa04012:'',
        maa04013:'',
        maa04014:'',
        maa04015:'',
        maa04016:'',
        maa04017:'',
        maa04018:'',
        maa04021:'0'
        
      },
      rules: {
        maa04003: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
        ],
        maa04007: [
          {required: true, message: '請輸入取樣車號。',trigger: 'blur'}
        ],
        maa04010: [
          {required: true, message: '請輸入取樣組數。',trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.maa00ID = this.$route.query.maa00ID
      this.projectName = this.$route.query.projectName
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.maa00ID).then(response => {
        this.list = response.data.records
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
        id: '',
        maa04002:this.projectID,
        maa04003:'',
        maa04004:'',
        maa04005:'',
        maa04006:'',
        maa04007:'',
        maa04008:'',
        maa04009:'',
        maa04010:'0',
        maa04011:'',
        maa04012:'',
        maa04013:'',
        maa04014:'',
        maa04015:'',
        maa04016:'',
        maa04017:'',
        maa04018:'',
        maa04021:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增混凝土試體取樣資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa04002:this.listQuery.maa00ID,
            maa04003:self.form.maa04003,
            maa04004:self.form.maa04004,
            maa04005:self.form.maa04005,
            maa04006:self.form.maa04006,
            maa04007:self.form.maa04007,
            maa04008:self.form.maa04008,
            maa04009:self.form.maa04009,
            maa04010:self.form.maa04010,
            maa04011:self.form.maa04011,
            maa04012:self.form.maa04012,
            maa04013:self.form.maa04013,
            maa04014:self.form.maa04014,
            maa04015:self.form.maa04015,
            maa04016:self.form.maa04016,
            maa04017:self.form.maa04017,
            maa04018:self.form.maa04018,
            maa04021:'0'
          }).then(response => {
            //console.log(response)
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
      if (this.checkSel() ) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改混凝土試體取樣資料'
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel() ) {
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
