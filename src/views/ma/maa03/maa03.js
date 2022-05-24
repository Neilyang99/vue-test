import { remove, getList, save } from '@/api/ma/maa03'

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
      formTitle: '新增混凝土抽磅資料',
      isAdd: true,
      form: {
        id: '',
        maa03002:this.projectID,
        maa03003:'',
        maa03004:'',
        maa03005:'',
        maa03006:'',
        maa03007:'',
        maa03008:'',
        maa03009:'',
        maa03010:'',
        maa03011:'0',
        maa03012:'0',
        maa03013:'0',
        maa03014:'0',
        maa03015:'0',
        maa03016:'',
        maa03017:'',
        maa03020:'0'
        
      },
      rules: {
        maa03003: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
        ],
        maa03006: [
          {required: true, message: '請輸入抽磅車號。',trigger: 'blur'}
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
        maa03002:this.projectID,
        maa03003:'',
        maa03004:'',
        maa03005:'',
        maa03006:'',
        maa03007:'',
        maa03008:'',
        maa03009:'',
        maa03010:'',
        maa03011:'0',
        maa03012:'0',
        maa03013:'0',
        maa03014:'0',
        maa03015:'0',
        maa03016:'',
        maa03017:'',
        maa03020:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增混凝土抽磅資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa03002:this.listQuery.maa00ID,
            maa03003:self.form.maa03003,
            maa03004:self.form.maa03004,
            maa03005:self.form.maa03005,
            maa03006:self.form.maa03006,
            maa03007:self.form.maa03007,
            maa03008:self.form.maa03008,
            maa03009:self.form.maa03009,
            maa03010:self.form.maa03010,
            maa03011:self.form.maa03011,
            maa03012:self.form.maa03012,
            maa03013:self.form.maa03013,
            maa03014:self.form.maa03014,
            maa03015:self.form.maa03015,
            maa03016:self.form.maa03016,
            maa03017:self.form.maa03017,
            maa03020:'0'
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
        this.formTitle = '修改混凝土抽磅資料'
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
