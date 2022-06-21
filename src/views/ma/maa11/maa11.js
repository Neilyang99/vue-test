import { remove, getList, save } from '@/api/ma/maa11'

export default {
  data() {
    return {
      projectID: '',
      projectName: '',
      reportType: '',
      reportName:'',
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
      formTitle: '',
      isAdd: true,
      form: {
        id: '',
        maa11002:this.projectID,
        maa11003:this.reportType,
        maa11004:'',
        maa11005:'',
        maa11006:'',
        maa11007:'',
        maa11008:'0',
        maa11009:'0',
        maa11010:'',
        maa11011:'0',
        maa11012:'',
        maa11013:'0'
        
        
      },
      rules: {
        maa11005: [
          {required: true, message: '請輸入日期。',trigger: 'blur'}
        ],
        maa11004: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
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
      this.reportType  = this.$route.query.reportType
      this.fetchData()

      if(this.reportType == '1'){
        this.reportName = "假設工程混凝土數量回報表";
      }else{
        this.reportName = "結構體工程混凝土數量回報表";
      }
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.maa00ID,this.reportType).then(response => {
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
        maa11002:this.projectID,
        maa11003:this.reportType,
        maa11004:'',
        maa11005:'',
        maa11006:'',
        maa11007:'',
        maa11008:'0',
        maa11009:'0',
        maa11010:'',
        maa11011:'0',
        maa11012:'',
        maa11013:'0'
      }
      
    },
    add() {
      this.resetForm()
      if(this.reportType == '1'){
        this.formTitle = '新增混凝土(假設工程)資料'
      }else{
        this.formTitle = '新增混凝土(結構體工程)資料'
      }
      
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa11002:this.listQuery.maa00ID,
            maa11003:this.reportType,
            maa11004:self.form.maa11004,
            maa11005:self.form.maa11005,
            maa11006:self.form.maa11006,
            maa11007:self.form.maa11007,
            maa11008:self.form.maa11008,
            maa11009:self.form.maa11009,
            maa11010:self.form.maa11010,
            maa11011:self.form.maa11011,
            maa11012:self.form.maa11012,
            maa11013:'0'
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
        this.formTitle = '修改混凝土使用數量資料'
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
