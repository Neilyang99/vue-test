import { remove, getList, save } from '@/api/ma/maa07'

export default {
  data() {
    return {
      projectID: '',
      projectName: '',
      reportType: '',
      listQuery: {
        page: 1,
        limit: 20,
        maa00ID: undefined,
        dataType:1
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增地下室結構體鋼筋試驗資料',
      isAdd: true,
      form: {
        id: '',
        maa07002:this.projectID,
        maa07003:'1',
        maa07004:'',
        maa07005:'',
        maa07006:'',
        maa07007:'',
        maa07008:'0',
        maa07009:'0',
        maa07010:'',
        maa07011:'',
        maa07012:'',
        maa07013:'',
        maa07014:'',
        maa07015:'',
        maa07016:'',
        maa07017:'',
        maa07018:'',
        maa07019:'',
        maa07020:'',
        maa07021:'0'
        
      },
      rules: {
        maa07004: [
          {required: true, message: '請輸入使用位置。',trigger: 'blur'}
        ],
        maa07005: [
          {required: true, message: '請輸入收件日期。',trigger: 'blur'}
        ],
        maa07006: [
          {required: true, message: '請輸入試驗日期。',trigger: 'blur'}
        ],
        maa07008: [
          {required: true, message: '請輸入數量。',trigger: 'blur'}
        ],
        maa07009: [
          {required: true, message: '請輸入試樣組數。',trigger: 'blur'}
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
      this.reportType = this.$route.query.reportType
      this.listQuery.dataType = this.$route.query.reportType

      if(this.reportType == "1"){
        this.formTitle= '地下室_結構體鋼筋試驗資料'
      }else{
        this.formTitle= '地上_結構體鋼筋試驗資料'
      }
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
        maa07002:this.projectID,
        maa07003:'1',
        maa07004:'',
        maa07005:'',
        maa07006:'',
        maa07007:'',
        maa07008:'0',
        maa07009:'0',
        maa07010:'',
        maa07011:'',
        maa07012:'',
        maa07013:'',
        maa07014:'',
        maa07015:'',
        maa07016:'',
        maa07017:'',
        maa07018:'',
        maa07019:'',
        maa07020:'',
        maa07021:'0'
      }
      
    },
    add() {
      this.resetForm()
      //this.formTitle = '新增地下室結構體鋼筋試驗資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa07002:this.listQuery.maa00ID,
            maa07003:this.reportType,
            maa07004:self.form.maa07004,
            maa07005:self.form.maa07005,
            maa07006:self.form.maa07006,
            maa07007:self.form.maa07007,
            maa07008:self.form.maa07008,
            maa07009:self.form.maa07009,
            maa07010:self.form.maa07010,
            maa07011:self.form.maa07011,
            maa07012:self.form.maa07012,
            maa07013:self.form.maa07013,
            maa07014:self.form.maa07014,
            maa07015:self.form.maa07015,
            maa07016:self.form.maa07016,
            maa07017:self.form.maa07017,
            maa07018:self.form.maa07018,
            maa07019:self.form.maa07019,
            maa07020:self.form.maa07020,
            maa07021:'0'
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
        //this.formTitle = '修改地下室結構體鋼筋試驗資料'
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

