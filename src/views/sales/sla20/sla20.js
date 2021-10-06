import { remove, getList, save, selectList } from '@/api/sales/sla20'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增訂單',
      isAdd: true,
      form: {
        id: '',
        sla20068: '',
        sla20069: '',
        sla20087: ''
      },
      buildingList:[],
      rules: {
        

      },
      listQuery: {
        page: 1,
        limit:10,
        sla20008: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {
    
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.fetchData()
      this.fetchOptionList()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchBuilding() {
      selectList().then(response => {
        this.buildingList = response.data
      })
    },
    fetchOptionList(){
      
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    fetchNext() {
      this.listQuery.page = this.listQuery.page + 1
      this.fetchData()
    },
    fetchPrev() {
      this.listQuery.page = this.listQuery.page - 1
      this.fetchData()
    },
    fetchPage(page) {
      this.listQuery.page = page
      this.fetchData()
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    reset() {
      this.listQuery.sla20008 = ''
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleClose() {

    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form = {
        id: '',
        sla20068: '',
        sla20069: '',
        sla20087: ''
      }
    },
    add() {
      this.resetForm()
      this.fetchBuilding()
      
      this.formTitle = '新增訂單'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        this.getSelectLable()

        if (valid) {
          save({
            id: self.form.id,
            sla20002: self.form.sla20002,
            sla20004: self.form.sla20004,
            sla20005: self.form.sla20005,
            sla20006: self.form.sla20006,
            sla20008: self.form.sla20008,
            sla20009: self.form.sla20009,
            sla20013: self.form.sla20013,
            sla20014: self.form.sla20014,
            sla20016: self.form.sla20016,
            sla20038: self.form.sla20038,
            sla20039: self.form.sla20039,
            sla20041: self.form.sla20041,
            sla20042: self.form.sla20042,
            sla20068: self.form.sla20068,
            sla20069: self.form.sla20069,
            sla20087: self.form.sla20087
            
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
        message: '請挑選其中一筆資料....',
        type: 'warning'
      })
      return false
    },
    edit() {
      if (this.checkSel()) {
        this.fetchBuilding()
        this.isAdd = false
        this.form = this.selRow
        //this.form.building = this.selRow.sla10002
        this.formTitle = '修改訂單'
        this.formVisible = true
      }
    },
    getSelectLable(){
      this.buildingList.forEach(item =>{
        if(item.sla00002 === this.form.building){
          this.form.buildingName = item.sla00003;
        }
      })
    },
    accountPayable() {//收款
      if (this.checkSel()) {
        this.$router.push({ path: '/sla23', query: { orderId: this.selRow.id}})
      }
    },
    checkHouse() {//驗收
      if (this.checkSel()) {
        this.$router.push({ path: '/sla24', query: { orderId: this.selRow.id}})
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
