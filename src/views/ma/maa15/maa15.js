import { remove, getList, save, getWorkerName } from '@/api/ma/maa15'

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
      titleTxt: '廠商代墊款紀錄',
      formTitle:'',
      isAdd: true,
      form: {
        id: '',
        maa15002:this.projectID,
        maa15003:'',
        maa15004:'',
        maa15005:'',
        maa15006:'0',
        maa15007:'',
        maa15008:'',
        maa15009:'0',
        maa15010:'',
        maa15011:'',
        maa15012:'',
        maa15013:'0'
      },
      rules: {
        maa15002: [
          {required: true, message: '工程資料錯誤。',trigger: 'blur'}
        ],
        maa15003: [
          {required: true, message: '請輸入日期。',trigger: 'blur'}
        ],
        maa15006: [
          {required: true, message: '請輸入數量。',trigger: 'blur'}
        ],
        maa15009: [
          {required: true, message: '請輸入單價。',trigger: 'blur'}
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
        maa15002:this.projectID,
        maa15003:'',
        maa15004:'',
        maa15005:'',
        maa15006:'0',
        maa15007:'',
        maa15008:'',
        maa15009:'0',
        maa15010:'',
        maa15011:'',
        maa15012:'',
        maa15013:'0'
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
            maa15002:this.listQuery.maa00ID,
            maa15003:self.form.maa15003,
            maa15004:self.form.maa15004,
            maa15005:self.form.maa15005,
            maa15006:self.form.maa15006,
            maa15007:self.form.maa15007,
            maa15008:self.form.maa15008,
            maa15009:self.form.maa15009,
            maa15010:self.form.maa15010,
            maa15012:self.form.maa15012,
            maa15013:'0'
          }).then(response => {
            //console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
            this.findWorkerName()
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
        this.formTitle = '修改'+this.titleTxt
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
