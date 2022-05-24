import { remove, getList, save } from '@/api/ma/maa09'

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
      formTitle: '新增memo資料',
      isAdd: true,
      form: {
        id: '',
        maa09002:this.projectID,
        maa09003:'',
        maa09004:'',
        maa09005:'',
        maa09006:'',
        maa09007:'',
        maa09008:'',
        maa09009:'0'
        
      },
      rules: {
        maa09003: [
          {required: true, message: '請輸入填表日期。',trigger: 'blur'}
        ],
        maa09004: [
          {required: true, message: '請輸入區別。',trigger: 'blur'}
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
        maa09002:this.projectID,
        maa09003:'',
        maa09004:'',
        maa09005:'',
        maa09006:'',
        maa09007:'',
        maa09008:'',
        maa09009:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增memo資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa09002:this.listQuery.maa00ID,
            maa09003:self.form.maa09003,
            maa09004:self.form.maa09004,
            maa09005:self.form.maa09005,
            maa09006:self.form.maa09006,
            maa09007:self.form.maa09007,
            maa09008:self.form.maa09008,
            maa09009:'0'
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
        this.formTitle = '修改memo資料'
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
