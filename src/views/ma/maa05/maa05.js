import { remove, getList, save } from '@/api/ma/maa05'

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
      formTitle: '混凝土強度品質表',
      isAdd: true,
      form: {
        id: '',
        maa05002:this.projectID,
        maa05003:'1',
        maa05004:'',
        maa05005:'',
        maa05006:'',
        maa05007:'',
        maa05008:'0',
        maa05009:'0',
        maa05010:'',
        maa05011:'0',
        maa05012:'0',
        maa05013:'0',
        maa05014:'',
        maa05018:'',
        maa05019:'0',
        maa05020:'0',
        maa05021:'0',
        maa05022:'0',
        maa05023:'',
        maa05024:'0',
        maa05025:'0',
        maa05026:'0',
        maa05027:'',
        maa05028:'0',
        maa05029:'0',
        maa05030:'0',
        maa05031:'',
        maa05036:'',
        maa05037:'0'
        
      },
      rules: {
        maa05004: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
        ],
        maa05005: [
          {required: true, message: '請輸入澆置日期。',trigger: 'blur'}
        ],
        maa05008: [
          {required: true, message: '請輸入數量。',trigger: 'blur'}
        ],
        maa05009: [
          {required: true, message: '請輸入試體組數。',trigger: 'blur'}
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
        this.formTitle= '混凝土鑽心強度品質紀錄'
      }else{
        this.formTitle= '混凝土抗壓強度品質紀錄'
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
        maa05002:this.projectID,
        maa05003:'1',
        maa05004:'',
        maa05005:'',
        maa05006:'',
        maa05007:'',
        maa05008:'0',
        maa05009:'0',
        maa05010:'',
        maa05011:'0',
        maa05012:'0',
        maa05013:'0',
        maa05014:'',
        maa05018:'',
        maa05019:'0',
        maa05020:'0',
        maa05021:'0',
        maa05022:'0',
        maa05023:'',
        maa05024:'0',
        maa05025:'0',
        maa05026:'0',
        maa05027:'',
        maa05028:'0',
        maa05029:'0',
        maa05030:'0',
        maa05031:'',
        maa05036:'',
        maa05037:'0'
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
            maa05002:this.listQuery.maa00ID,
            maa05003:this.reportType,
            maa05004:self.form.maa05004,
            maa05005:self.form.maa05005,
            maa05006:self.form.maa05006,
            maa05007:self.form.maa05007,
            maa05008:self.form.maa05008,
            maa05009:self.form.maa05009,
            maa05010:self.form.maa05010,
            maa05011:self.form.maa05011,
            maa05012:self.form.maa05012,
            maa05013:self.form.maa05013,
            maa05014:self.form.maa05014,

            maa05018:self.form.maa05018,
            maa05019:self.form.maa05019,
            maa05020:self.form.maa05020,
            maa05021:self.form.maa05021,
            maa05022:self.form.maa05022,
            maa05023:self.form.maa05023,
            maa05024:self.form.maa05024,
            maa05025:self.form.maa05025,
            maa05026:self.form.maa05026,
            maa05027:self.form.maa05027,
            maa05028:self.form.maa05028,
            maa05029:self.form.maa05029,
            maa05030:self.form.maa05030,
            maa05031:self.form.maa05031,
            maa05036:self.form.maa05036,
            maa05037:'0'
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

