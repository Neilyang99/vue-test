import { remove, getList, save } from '@/api/ma/maa06'

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
      formTitle: '新增混凝土氯離子品質紀錄',
      isAdd: true,
      form: {
        id: '',
        maa06002:this.projectID,
        maa06003:'',
        maa06004:'',
        maa06005:'',
        maa06006:'',
        maa06007:'0',
        maa06008:'',
        maa06009:'0',
        maa06010:'0',
        maa06011:'0',
        maa06012:'0',
        maa06013:'0',
        maa06014:'',
        maa06015:'0'
        
      },
      rules: {
        maa06003: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
        ],
        maa06006: [
          {required: true, message: '請輸入數量。',trigger: 'blur'}
        ],
        maa06007: [
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
        maa06002:this.projectID,
        maa06003:'',
        maa06004:'',
        maa06005:'',
        maa06006:'',
        maa06007:'0',
        maa06008:'',
        maa06009:'0',
        maa06010:'0',
        maa06011:'0',
        maa06012:'0',
        maa06013:'0',
        maa06014:'',
        maa06015:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增混凝土氯離子品質紀錄'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa06002:this.listQuery.maa00ID,
            maa06003:self.form.maa06003,
            maa06004:self.form.maa06004,
            maa06005:self.form.maa06005,
            maa06006:self.form.maa06006,
            maa06007:self.form.maa06007,
            maa06008:self.form.maa06008,
            maa06009:self.form.maa06009,
            maa06010:self.form.maa06010,
            maa06011:self.form.maa06011,
            maa06012:self.form.maa06012,
            maa06013:self.form.maa06013,
            maa06014:self.form.maa06014,
            maa06015:'0'
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
        this.formTitle = '修改混凝土氯離子品質紀錄'
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
