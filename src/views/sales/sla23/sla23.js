import { remove, getList, save, getSla23006, getSla23031, getOrderById } from '@/api/sales/sla23'

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
      formTitle: '新增收款紀錄',
      isAdd: true,
      form: {
        id: '',
        sla23005:'',
        sla23006:'',
        sla23008:0,
        sla23031:'',
        sla23033:'',
        sla230045:'',
        sla230046:'',
        sla230047:'',
        sla230048:''
      },
      sla23006List:[],
      sla23031List:[],
      rules: {
        sla23031: [
          { required: true, message: '請輸入收款類別', trigger: 'blur' }
        ],
        sla23005: [
          { required: true, message: '請輸入收款日期', trigger: 'blur' }
        ],
        sla23006: [
          { required: true, message: '請輸入收款方式', trigger: 'blur' }
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
    fetchSla23006() {
      getSla23006().then(response => {
        this.sla23006List = response.data
      })
    },
    fetchSla23031() {
      getSla23031().then(response => {
        this.sla23031List = response.data
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
        sla23005:'',
        sla23006:'',
        sla23008:0,
        sla23031:'',
        sla23033:'',
        sla230045:'',
        sla230046:'',
        sla230047:'',
        sla230048:''
      }
      
    },
    add() {
      this.resetForm()
      this.fetchSla23006() //收款方式
      this.fetchSla23031() //收款類別
      this.formTitle = '新增收款紀錄'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {

          if(self.form.sla23031 != '40'){
            self.form.sla23033 = '';
          }
          save({
            id: self.form.id,
            sla23002:this.orderId,
            sla23005:self.form.sla23005,
            sla23006:self.form.sla23006,
            sla23008:self.form.sla23008,
            sla23031:self.form.sla23031,
            sla23033:self.form.sla23033,
            sla23045:self.form.sla23045,
            sla23046:self.form.sla23046,
            sla23047:self.form.sla23047,
            sla23048:self.form.sla23048,
            sla23049: ''
            
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
        this.fetchSla23006() //收款方式
        this.fetchSla23031() //收款類別
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改收款紀錄'
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
