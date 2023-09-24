import { remove, getList, getListByPrjLv2, save, selectItemByLv2 } from '@/api/ma/maa01a'

export default {
  data() {
    return {
      prjId: '',
      prjName: '',
      level1Id:0,
      level2Id:0,
      lv1Name: '',
      lv2Name: '',
      formVisible: false,
      formTitle: '工程預算項目編訂',
      isAdd: true,
      form: {
        id: '',
        maa01a002: 0,
        maa01a003: 0,
        maa01a004: 0,
        maa01a005: 0,
        maa01a006: 0,
        maa01a007: '',
        maa01a008: '',
        maa01a009: '',
        maa01a010: '',
        maa01a011: '',
        maa01a012: '',
        maa01a013: '',
        maa01a014: '',
        maa01a015: 0,
        maa01a016: 0,
        maa01a017: 0,
        maa01a018: '',
        maa01a019: '',
        name1:'',
        name2:'',
        name3:'',
        pk1:0,
        pk2:0,
        pk3:0
      },
      budgetList:[],
      rules: {
        maa01a015: [
          { required: true, message: '請輸入數量，限2位小數', trigger: 'blur' },
          {pattern:/^\d{1,8}(\.\d{1,2})?$/, message: '數量，限整數8位與小數2位'}
        ],
        maa01a016: [
          { required: true, message: '請輸入單價，限2位小數', trigger: 'blur' },
          {pattern:/^\d{1,8}(\.\d{1,2})?$/, message: '單價，限整數8位與小數2位'}
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        projectId: undefined,
        lv2:0
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
      this.prjId = this.$route.query.prjId
      this.prjName = this.$route.query.prjName
      this.level1Id = this.$route.query.level1Id
      this.level2Id = this.$route.query.level2Id
      this.lv1Name = this.$route.query.lv1Name
      this.lv2Name = this.$route.query.lv2Name
      this.listQuery.projectId = this.prjId
      this.listQuery.lv1 = this.level1Id
      this.listQuery.lv2 = this.level2Id
      this.fetchData()
      this.fetchBudgetItem()
    },
    fetchData() {
      this.listLoading = true
      getListByPrjLv2(this.listQuery).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchBudgetItem() {
      selectItemByLv2(this.level2Id).then(response => {
        this.budgetList = response.data
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.name = ''
      this.listQuery.page = 1
      this.fetchData()
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
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
    back() {
      this.$router.go(-1)
    },
    changeSize(limit) {
      this.listQuery.limit = limit
      this.fetchData()
    },
    handleClose() {

    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    resetForm() {
      this.form = {
        id: '',
        maa01a002: 0,
        maa01a003: 0,
        maa01a004: 0,
        maa01a005: 0,
        maa01a006: 0,
        maa01a007: '',
        maa01a008: '',
        maa01a009: '',
        maa01a010: '',
        maa01a011: '',
        maa01a012: '',
        maa01a013: '',
        maa01a014: '',
        maa01a015: 0,
        maa01a016: 0,
        maa01a017: 0,
        maa01a018: '',
        maa01a019: '',
        name1:'',
        name2:'',
        name3:'',
        pk1:0,
        pk2:0,
        pk3:0
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程預算項目'
      this.formVisible = true
      this.isAdd = true
    },
    
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.getSelectLable()
          save({
            id: self.form.id,
            maa01a002: this.prjId,
            maa01a003: this.level1Id,
            maa01a004: this.level2Id,
            maa01a005: self.form.maa01a005,
            maa01a006: self.form.maa01a006,
            maa01a007: '',
            maa01a008: '',
            maa01a009: '',
            maa01a010: this.lv1Name,
            maa01a011: this.lv2Name,
            maa01a012: '',
            maa01a013: this.name3,
            maa01a014: self.form.maa01a014,
            maa01a015: self.form.maa01a015,
            maa01a016: self.form.maa01a016,
            maa01a017: Math.round(self.form.maa01a015*self.form.maa01a016),
            maa01a018: '',
            maa01a019: ''
            
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
    getSelectLable(){
      this.budgetList.forEach(item =>{
        if(item.itemId === this.form.maa01a005){
          this.name1 = item.firstName
          this.name2 = item.secName
          this.name3 = item.itemName
          this.pk1 = item.firstId
          this.pk2 = item.secId
          this.pk3 = item.itemId
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
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改工程預算項目'
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
          remove(id,this.selRow.maa01a002,this.selRow.maa01a004).then(response => {
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

