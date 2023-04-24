import { remove, getList, save, selectBudget, exportXls } from '@/api/ma/maa01'
import { getApiUrl } from '@/utils/utils'
export default {
  data() {
    return {
      prjId: '',
      prjName: '',
      pk1: 0,
      name1: '',
      name2: '',
      formVisible: false,
      formTitle: '新增總工程預算',
      isAdd: true,
      form: {
        id: '',
        maa01002: 0,
        maa01003: 0,
        maa01004: '',
        maa01005: '',
        maa01006: '',
        maa01007: '',
        maa01008: '',
        maa01009: '',
        maa01010: '',
        maa01011: '',
        maa01012: 0,
        maa01013: 0,
        maa01014: 0,
        maa01015: 0,
        maa01016: 0,
        maa01017: 10,
        maa01018: '',
        maa01019: ''
      },
      budgetList:[],
      rules: {
        
        maa01012: [
          { required: true, message: '請輸入工程預算金額', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        prjId: undefined
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
      this.listQuery.prjId = this.prjId
      this.fetchData()
      this.fetchBudgetItem()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    fetchBudgetItem() {
      selectBudget().then(response => {
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
        maa01002: 0,
        maa01003: 0,
        maa01004: '',
        maa01005: '',
        maa01006: '',
        maa01007: '',
        maa01008: '',
        maa01009: '',
        maa01010: '',
        maa01011: '',
        maa01012: 0,
        maa01013: 0,
        maa01014: 0,
        maa01015: 0,
        maa01016: 0,
        maa01017: 10,
        maa01018: '',
        maa01019: '',
        pk1: 0,
        name1: '',
        name2: '',
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程預算金額'
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
            maa01002: this.prjId,
            maa01003: this.pk1,
            maa01004: self.form.maa01004,
            maa01005: '',
            maa01006: '',
            maa01007: '',
            maa01008: '',
            maa01009: '',
            maa01010: this.name1,
            maa01011: this.name2,
            maa01012: self.form.maa01012,
            maa01013: 0,
            maa01014: 0,
            maa01015: 0,
            maa01016: 0,
            maa01017: self.form.maa01017,
            maa01018: 'Y',
            maa01019: ''
            
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
        if(item.secId === this.form.maa01004){
          this.name1 = item.firstName
          this.name2 = item.secName
          this.pk1 = item.firstId
        }
      })
    },
    setBudget(level1Id,level2Id,lv1Name,lv2Name) {
      this.$router.push({ path: '/maa01a', 
        query: { 
          prjId: this.prjId, 
          prjName: this.prjName, 
          level1Id: level1Id, 
          level2Id: level2Id,
          lv1Name: lv1Name,
          lv2Name: lv2Name
        }})
    },
    exportXls() {
      exportXls(this.listQuery).then(response => {
        window.location.href= getApiUrl() + '/file/download?idFile='+response.data.id
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
        this.formTitle = '修改工程預算金額'
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

