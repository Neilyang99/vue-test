import { remove, getList, save, getMaterialItem } from '@/api/ma/maa10'

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
      formTitle: '新增材料入庫資料',
      isAdd: true,
      form: {
        id: '',
        maa10002:this.projectID,
        maa10003:'1',
        maa10004:'',
        maa10005:'',
        maa10006:'',
        maa10007:'',
        maa10008:'0',
        maa10009:'0',
        maa10010:'',
        maa10012:'',
        maa10013:'0'
        
        
      },
      rules: {
        maa10005: [
          {required: true, message: '請輸入進料日期。',trigger: 'blur'}
        ],
        maa10008: [
          {required: true, message: '請輸入數量。',trigger: 'blur'}
        ],
        maa10009: [
          {required: true, message: '請輸入單價。',trigger: 'blur'}
        ]
      },
      maa10006List: null,
      maa10007List: null
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
      this.fetchMaterialItem()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.maa00ID).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchMaterialItem() {
      getMaterialItem().then(response => {
        this.maa10006List = response.data
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
        maa10002:this.projectID,
        maa10003:'1',
        maa10004:'',
        maa10005:'',
        maa10006:'',
        maa10007:'',
        maa10008:'0',
        maa10009:'0',
        maa10010:'',
        maa10012:'',
        maa10013:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增材料入庫資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa10002:this.listQuery.maa00ID,
            maa10003:self.form.maa10003,
            maa10004:self.form.maa10004,
            maa10005:self.form.maa10005,
            maa10006:self.form.maa10006,
            maa10007:self.form.maa10007,
            maa10008:self.form.maa10008,
            maa10009:self.form.maa10009,
            maa10010:self.form.maa10010,
            maa10012:self.form.maa10012,
            maa10013:'0'
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
        this.formTitle = '修改材料入庫資料'
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
