import { remove, getList, save } from '@/api/ma/maa08'

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
      formTitle: '新增出工人數資料',
      isAdd: true,
      form: {
        id: '',
        maa08002:this.projectID,
        maa08003:'',
        maa08004:'',
        maa08005:'',
        maa08006:'',
        maa08007:'',
        maa08008:'',
        maa08009:'',
        maa08010:'0'
        
      },
      rules: {
        maa08003: [
          {required: true, message: '請輸入出工日期。',trigger: 'blur'}
        ],
        maa08008: [
          {required: true, message: '請輸入人數。',trigger: 'blur'}
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
        maa08002:this.projectID,
        maa08003:'',
        maa08004:'',
        maa08005:'',
        maa08006:'',
        maa08007:'',
        maa08008:'',
        maa08009:'',
        maa08010:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增出工人數資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa08002:this.listQuery.maa00ID,
            maa08003:self.form.maa08003,
            maa08004:self.form.maa08004,
            maa08005:self.form.maa08005,
            maa08006:self.form.maa08006,
            maa08007:self.form.maa08007,
            maa08008:self.form.maa08008,
            maa08009:self.form.maa08009,
            maa08010:'0'
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
        this.formTitle = '修改出工人數資料'
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
