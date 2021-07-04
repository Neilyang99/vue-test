import { remove, getVisitorList, save, getSla11003 } from '@/api/sales/visitorLog'

export default {
  data() {
    return {
      visitorId: '',
      listQuery: {
        page: 1,
        limit: 20,
        visitorId: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增洽詢紀錄',
      isAdd: true,
      form: {
        id: '',
        sla11003:'',
        sla11004:'',
        sla11005:'',
        sla11006:'',
        sla11008:''
      },
      sla11003List:[],
      rules: {
        sla11003: [
          { required: true, message: '請輸入洽詢類別', trigger: 'blur' }
        ],
        sla11004: [
          { required: true, message: '請輸入洽詢日期', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.visitorId = this.$route.query.visitorId
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      
      getVisitorList(this.visitorId).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchSla11003() {
      getSla11003().then(response => {
        this.sla11003List = response.data
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
        sla11003:'',
        sla11004:'',
        sla11005:'',
        sla11006:'',
        sla11008:''
      }
      
    },
    add() {
      this.resetForm()
      this.fetchSla11003() //洽詢類別
      this.formTitle = '新增來人洽詢紀錄'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            sla11002:this.visitorId,
            sla11003:self.form.sla11003,
            sla11004:self.form.sla11004,
            sla11005:self.form.sla11005,
            sla11006:self.form.sla11006,
            sla11008:self.form.sla11008
            
          }).then(response => {
            console.log(response)
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
      if (this.checkSel()) {
        this.fetchSla11003() //洽詢類別
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改洽詢紀錄'
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel()) {
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
