import { remove, getList, save, inertByNewProject } from '@/api/ma/maa00'
import { exportXls } from '@/api/ma/maa01a'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增工程案',
      isAdd: true,
      form: {
        id: '',
        maa00002: '',
        maa00003: '',
        maa00004: '',
        maa00005: '',
        maa00006: '',
        maa00007: '',
        maa00008: '',
        maa00009: '',
        maa00010: '',
        maa00011: 0,
        maa00012: 0,
        maa00013: '',
        maa00014: '',
        maa00015: '',
        maa00016: '',
        maa00017: '',
        maa00018: '',
        maa00019: '',
        maa00020: '',
        maa00021: '',
        maa00022: '',
        maa00023: '',
        maa00024: '',
        maa00025: '',
        maa00026: 0,
        maa00027: 0,
        maa00028: 0,
        maa00029: 0,
        maa00030: 0,
        maa00031: 0,
        maa00032: 0,
        maa00033: '',
        maa00034: '',
        maa00035: '',
        maa00036: '',
        maa00040: ''
      },
      rules: {
        maa00002: [
          { required: true, message: '請輸入工程案編號', trigger: 'blur' }
        ],
        maa00004: [
          { required: true, message: '請輸入工程案名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa00004: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      xlsData: null
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
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selMaa00004 = ''
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
        maa00002: '',
        maa00003: '',
        maa00004: '',
        maa00005: '',
        maa00006: '',
        maa00007: '',
        maa00008: '',
        maa00009: '',
        maa00010: '',
        maa00011: 0,
        maa00012: 0,
        maa00013: '',
        maa00014: '',
        maa00015: '',
        maa00016: '',
        maa00017: '',
        maa00018: '',
        maa00019: '',
        maa00020: '',
        maa00021: '',
        maa00022: '',
        maa00023: '',
        maa00024: '',
        maa00025: '',
        maa00026: 0,
        maa00027: 0,
        maa00028: 0,
        maa00029: 0,
        maa00030: 0,
        maa00031: 0,
        maa00032: 0,
        maa00033: '',
        maa00034: '',
        maa00035: '',
        maa00036: '',
        maa00040: ''
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增工程案'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa00002: self.form.maa00002,
            maa00003: '',
            maa00004: self.form.maa00004,
            maa00005: self.form.maa00005,
            maa00006: self.form.maa00006,
            maa00007: self.form.maa00007,
            maa00008: self.form.maa00008,
            maa00009: self.form.maa00009,
            maa00010: self.form.maa00010,
            maa00011: self.form.maa00011,
            maa00012: self.form.maa00012,
            maa00014: '',
            maa00015: self.form.maa00015,
            maa00016: self.form.maa00016,
            maa00017: self.form.maa00017,
            maa00018: '',
            maa00019: self.form.maa00019,
            maa00020: self.form.maa00020,
            maa00021: self.form.maa00021,
            maa00022: '',
            maa00023: '',
            maa00024: self.form.maa00024,
            maa00025: self.form.maa00025,
            maa00026: 0,
            maa00027: self.form.maa00027,
            maa00028: self.form.maa00028,
            maa00029: 0,
            maa00030: 0,
            maa00031: 0,
            maa00032: 0,
            maa00033: '',
            maa00034: '',
            maa00035: self.form.maa00035,
            maa00036: self.form.maa00036,
            maa00040: ''
            
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
    addByNewProject(){
      if (this.checkSel()) {
        inertByNewProject(this.selRow.id).then(response => {
          console.log(response)
          this.$message({
            message: response.data,
            type: 'success'
          })
        })
      }
    },
    export2Xls(){
      if (this.checkSel()) {
        
        import('@/vendor/Export2Excel').then(excel=>{
          const title = ["工程案","大類別","小類別","項目","單位","數量","單價","複價","備註"]
          const filterVal = ['maa01a009','maa01a010', 'maa01a011','maa01a013','maa01a014','maa01a015','maa01a016','maa01a017','maa01a018']
          //const listData=[{"AA":"a01","Age":"18","Sex":"F"},{"AA":"a02","Age":"55","Sex":"M"}]
          exportXls(this.selRow.id).then(response => {
            this.xlsData = response.data
            let data1 = this.formatJson(filterVal, this.xlsData)
            excel.export_json_to_excel({
              header: title,
              data: data1, 
              filename: '預算項目',
              autoWidth: true,
              bookType: 'xlsx'
            })
          
          })
        })
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        //if (j === 'timestamp') {
        //  return parseTime(v[j])
        //} else {
          return v[j]
        //}
      }))
    },
    setBudget(prjId,prjName) {
      this.$router.push({ path: '/maa01', query: { prjId: prjId, prjName: prjName }})
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
        this.formTitle = '修改工程案'
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
