import { remove, getList, save, getSla24004, getSla24006, getOrderById, confirm } from '@/api/sales/sla24'

export default {
  data() {
    return {
      orderId: '',
      listQuery: {
        page: 1,
        limit: 20,
        orderId: undefined
      },
      total: 0,
      list: null,
      order: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      form1Visible: false,
      formTitle: '新增驗收紀錄',
      form1Title: '完工確認',
      isAdd: true,
      form: {
        id: '',
        sla24004:'',
        sla24005:'',
        sla24006:'',
        sla24007:'',
        sla24008:'',
        sla24009:''
      },
      form1:{
        id: '',
        sla24008:'',
      },
      sla24004List:[],
      sla24006List:[],
      rules: {
        sla24004: [
          { required: true, message: '請輸入驗收類別', trigger: 'blur' }
        ],
        sla24005: [
          { required: true, message: '請輸入驗收日期', trigger: 'blur' }
        ],
        sla24006: [
          { required: true, message: '請輸入項目分類', trigger: 'blur' }
        ],
        sla24007: [
          { required: true, message: '請輸入項目內容', trigger: 'blur' }
        ]
      },
      rules1: {
        sla24008: [
          { required: true, message: '請輸入完成日期', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.orderId = this.$route.query.orderId
      this.fetchData()
      this.fetchOrder()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.orderId).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchSla24004() {
      getSla24004().then(response => {
        this.sla24004List = response.data
      })
    },
    fetchSla24006() {
      getSla24006().then(response => {
        this.sla24006List = response.data
      })
    },
    fetchOrder() {
      getOrderById(this.orderId).then(response => {
        this.order = response.data
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
        sla24004:'',
        sla24005:'',
        sla24006:'',
        sla24007:'',
        sla24008:'',
        sla24009:''
      }
      
    },
    add() {
      this.resetForm()
      this.fetchSla24004() //驗收類別
      this.fetchSla24006() //項目分類
      this.formTitle = '新增驗收紀錄'
      this.formVisible = true
      this.isAdd = true

      //this.form.sla24005 = new Date().toISOString().substr(0,10)
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          //self.form.sla24005 = self.form.sla24005.replace(/-/g,'')

          save({
            id: self.form.id,
            sla24002:this.orderId,
            sla24004:self.form.sla24004,
            sla24005:self.form.sla24005,
            sla24006:self.form.sla24006,
            sla24007:self.form.sla24007,
            sla24008:self.form.sla24008,
            sla24009:self.form.sla24009
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
        this.fetchSla24004() 
        this.fetchSla24006() 
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改驗收紀錄'
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
    },
    setConfirm(rowId) {
      this.form1.id = rowId
      this.form1Visible = true

    },
    cancelFDate(rowId) {
      confirm({
        id: rowId,
        sla24008:''

      }).then(response => {
        console.log(response)
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.fetchData()
        this.form1Visible = false
      })
    },
    confirm() {
      var self = this
      this.$refs['form1'].validate((valid) => {
        if (valid) {

          confirm({
            id: self.form1.id,
            sla24008:self.form1.sla24008

          }).then(response => {
            console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
            this.form1Visible = false
          })
        } else {
          return false
        }
      })
    }
  }
}
