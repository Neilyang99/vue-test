import { remove, getList, save, getMaxPeriod } from '@/api/ma/maa16'

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
      titleTxt: '零用金紀錄',
      formTitle:'',
      isAdd: true,
      form: {
        id: '',
        maa16002:this.projectID,
        maa16003:'',
        maa16004:'',
        maa16005:'0',
        maa16006:'0',
        maa16007:'',
        maa16008:'',
        maa16009:'0',
        maa16010:'',
        maa16011:'',
        maa16012:'0',
        maa16013:'',
        maa16014:''
      },
      rules: {
        
        maa16003: [
          {required: true, message: '請輸入期別。',trigger: 'blur'}
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
    fetchPeriod(){
      getMaxPeriod(this.listQuery.maa00ID).then(response => {
        //期別+1
        this.form.maa16003 = 1+ response.data 
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
        maa16002:this.projectID,
        maa16003:'',
        maa16004:'',
        maa16005:'0',
        maa16006:'0',
        maa16007:'',
        maa16008:'',
        maa16009:'0',
        maa16010:'',
        maa16011:'',
        maa16012:'0',
        maa16013:'',
        maa16014:''
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增'+this.titleTxt
      this.formVisible = true
      this.isAdd = true
      this.fetchPeriod()
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa16002:this.listQuery.maa00ID,
            maa16003:self.form.maa16003,
            maa16012:'0'
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
    },
    viewDetail(dataPK,period) {
      this.$router.push({ path: '/maa17', query: { dataPK: dataPK, period: period, projectName: this.projectName }})
    }
  }
}
