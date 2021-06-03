import { remove, getList, save, getSla30005, getSla30084 } from '@/api/sales/sla30'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '市調資料輸入',
      isAdd: true,
      form: {
        id: '',
        sla30002: '',
        sla30003: '',
        sla30004: '',
        sla30005: '',
        sla30006: '',
        sla30007: '',
        sla30008: 0,
        sla30009: 0,
        sla30010: 0,
        sla30011: '',
        sla30012: '',
        sla30013: '',
        sla30014: '',
        sla30015: '',
        sla30016: '',
        sla30017: 0,
        sla30018: 0,
        sla30019: 0,
        sla30020: 0,
        sla30021: 0,
        sla30022: 0,
        sla30023: '',
        sla30024: '',
        sla30025: '',
        sla30026: '',
        sla30027: '',
        sla30028: 0,
        sla30029: 0,
        sla30030: '',
        sla30031: '',
        sla30032: '',
        sla30033: false,
        sla30034: 0,
        sla30035: 0,
        sla30036: 0,
        sla30037: 0,
        sla30038: false,
        sla30039: 0,
        sla30040: 0,
        sla30041: 0,
        sla30042: 0,
        sla30043: false,
        sla30044: 0,
        sla30045: 0,
        sla30046: 0,
        sla30047: 0,
        sla30048: false,
        sla30049: 0,
        sla30050: 0,
        sla30051: 0,
        sla30052: 0,
        sla30053: false,
        sla30054: 0,
        sla30055: 0,
        sla30056: 0,
        sla30057: 0,
        sla30058: false,
        sla30059: 0,
        sla30060: 0,
        sla30061: 0,
        sla30062: 0,
        sla30063: false,
        sla30064: 0,
        sla30065: 0,
        sla30066: 0,
        sla30067: 0,
        sla30068: false,
        sla30069: 0,
        sla30070: 0,
        sla30071: 0,
        sla30072: 0,
        sla30073: false,
        sla30074: 0,
        sla30075: 0,
        sla30076: 0,
        sla30077: 0,
        sla30078: false,
        sla30079: 0,
        sla30080: 0,
        sla30081: 0,
        sla30082: 0,
        sla30083: 0,
        sla30084: '',
        sla30085: 0,
        sla30086: 0,
        sla30087: 0,
        sla30088: 0,
        sla30089: 0,
        sla30090: 0,
        sla30091: 0,
        sla30092: 0,
        sla30093: 0,
        sla30094: '',
        sla30095: 0,
        sla30096: 0,
        sla30097: 0,
        sla30098: 0,
        sla30099: 0,
        sla300100: 0,
        sla300101: 0,
        sla300102: 0,
        sla300103: 0,
        sla300104: 0,
        sla300105: 0,
        sla300106: 0,
        sla300107: '',
        sla300108: '',
        sla300109: 0,
        sla300110: 0,
        sla300111: 0,
        sla300112: 0,
        sla300113: 0,
        sla300114: '',
        sla300117: ''
      },
      sla30005List:[],
      sla30084List:[],
      rules: {
        sla30005: [
          { required: true, message: '請輸入行政區', trigger: 'blur' }
        ],
        sla30006: [
          { required: true, message: '請輸入土地區分', trigger: 'blur' }
        ],
        sla30007: [
          { required: true, message: '請輸入投資興建', trigger: 'blur' }
        ],
        sla30008: [
          { required: true, message: '請輸入土地面積', trigger: 'blur' }
        ],
        sla30009: [
          { required: true, message: '請輸入總銷售金額', trigger: 'blur' }
        ],
        sla30010: [
          { required: true, message: '請輸入總銷售金額', trigger: 'blur' }
        ],
        sla30011: [
          { required: true, message: '請輸入廣企公司', trigger: 'blur' }
        ],
        sla30012: [
          { required: true, message: '請輸入建築規劃', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selSla30004: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
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
    fetchOptionList(){
      getSla30005().then(response => {this.sla30005List = response.data})
      getSla30084().then(response => {this.sla30084List = response.data})
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selSla30004 = ''
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
        sla30002: '',
        sla30003: '',
        sla30004: '',
        sla30005: '',
        sla30006: '',
        sla30007: '',
        sla30008: 0,
        sla30009: 0,
        sla30010: 0,
        sla30011: '',
        sla30012: '',
        sla30013: '',
        sla30014: '',
        sla30015: '',
        sla30016: '',
        sla30017: 0,
        sla30018: 0,
        sla30019: 0,
        sla30020: 0,
        sla30021: 0,
        sla30022: 0,
        sla30023: '',
        sla30024: '',
        sla30025: '',
        sla30026: '',
        sla30027: '',
        sla30028: 0,
        sla30029: 0,
        sla30030: '',
        sla30031: '',
        sla30032: '',
        sla30033: false,
        sla30034: 0,
        sla30035: 0,
        sla30036: 0,
        sla30037: 0,
        sla30038: false,
        sla30039: 0,
        sla30040: 0,
        sla30041: 0,
        sla30042: 0,
        sla30043: false,
        sla30044: 0,
        sla30045: 0,
        sla30046: 0,
        sla30047: 0,
        sla30048: false,
        sla30049: 0,
        sla30050: 0,
        sla30051: 0,
        sla30052: 0,
        sla30053: false,
        sla30054: 0,
        sla30055: 0,
        sla30056: 0,
        sla30057: 0,
        sla30058: false,
        sla30059: 0,
        sla30060: 0,
        sla30061: 0,
        sla30062: 0,
        sla30063: false,
        sla30064: 0,
        sla30065: 0,
        sla30066: 0,
        sla30067: 0,
        sla30068: false,
        sla30069: 0,
        sla30070: 0,
        sla30071: 0,
        sla30072: 0,
        sla30073: false,
        sla30074: 0,
        sla30075: 0,
        sla30076: 0,
        sla30077: 0,
        sla30078: false,
        sla30079: 0,
        sla30080: 0,
        sla30081: 0,
        sla30082: 0,
        sla30083: 0,
        sla30084: '',
        sla30085: 0,
        sla30086: 0,
        sla30087: 0,
        sla30088: 0,
        sla30089: 0,
        sla30090: 0,
        sla30091: 0,
        sla30092: 0,
        sla30093: 0,
        sla30094: '',
        sla30095: 0,
        sla30096: 0,
        sla30097: 0,
        sla30098: 0,
        sla30099: 0,
        sla300100: 0,
        sla300101: 0,
        sla300102: 0,
        sla300103: 0,
        sla300104: 0,
        sla300105: 0,
        sla300106: 0,
        sla300107: '',
        sla300108: '',
        sla300109: 0,
        sla300110: 0,
        sla300111: 0,
        sla300112: 0,
        sla300113: 0,
        sla300114: '',
        sla300117: ''
      }
    },
    add() {
      this.resetForm()
      this.fetchOptionList()
      this.formTitle = '市調資料'
      this.formVisible = true
      this.isAdd = true
      this.form.sla30002 = new Date().toISOString().substr(0,10)
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          self.form.sla30002 = self.form.sla30002.replace(/-/g,'')

          if(self.form.sla30033 == true){
            self.form.sla30033 = "1"
          }else{
            self.form.sla30033 = "0"
          }
          if(self.form.sla30038 == true){
            self.form.sla30038 = "1"
          }else{
            self.form.sla30038 = "0"
          }
          if(self.form.sla30043 == true){
            self.form.sla30043 = "1"
          }else{
            self.form.sla30043 = "0"
          }
          if(self.form.sla30048 == true){
            self.form.sla30048 = "1"
          }else{
            self.form.sla30048 = "0"
          }

          if(self.form.sla30053 == true){
            self.form.sla30053 = "1"
          }else{
            self.form.sla30053 = "0"
          }
          if(self.form.sla30058 == true){
            self.form.sla30058 = "1"
          }else{
            self.form.sla30058 = "0"
          }
          if(self.form.sla30063 == true){
            self.form.sla30063 = "1"
          }else{
            self.form.sla30063 = "0"
          }
          if(self.form.sla30068 == true){
            self.form.sla30068 = "1"
          }else{
            self.form.sla30068 = "0"
          }
          if(self.form.sla30073 == true){
            self.form.sla30073 = "1"
          }else{
            self.form.sla30073 = "0"
          }
          if(self.form.sla30078 == true){
            self.form.sla30078 = "1"
          }else{
            self.form.sla30078 = "0"
          }
          
          save({
            id: self.form.id,
            sla30002: self.form.sla30002,
            sla30003: self.form.sla30003,
            sla30004: self.form.sla30004,
            sla30005: self.form.sla30005,
            sla30006: self.form.sla30006,
            sla30007: self.form.sla30007,
            sla30008: self.form.sla30008,
            sla30009: self.form.sla30009,
            sla30010: self.form.sla30010,
            sla30011: self.form.sla30011,
            sla30012: self.form.sla30012,
            sla30013: self.form.sla30013,
            sla30014: self.form.sla30014,
            sla30015: self.form.sla30015,
            sla30016: self.form.sla30016,
            sla30017: self.form.sla30017,
            sla30018: self.form.sla30018,
            sla30019: self.form.sla30019,
            sla30020: self.form.sla30020,
            sla30021: self.form.sla30021,
            sla30022: self.form.sla30022,
            sla30023: self.form.sla30023,
            sla30024: self.form.sla30024,
            sla30025: self.form.sla30025,
            sla30026: self.form.sla30026,
            sla30027: self.form.sla30027,
            sla30028: self.form.sla30028,
            sla30029: self.form.sla30029,
            sla30030: self.form.sla30030,
            sla30031: self.form.sla30031,
            sla30032: self.form.sla30032,
            sla30033: self.form.sla30033,
            sla30034: self.form.sla30034,
            sla30035: self.form.sla30035,
            sla30036: self.form.sla30036,
            sla30037: self.form.sla30037,
            sla30038: self.form.sla30038,
            sla30039: self.form.sla30039,
            sla30040: self.form.sla30040,
            sla30041: self.form.sla30041,
            sla30042: self.form.sla30042,
            sla30043: self.form.sla30043,
            sla30044: self.form.sla30044,
            sla30045: self.form.sla30045,
            sla30046: self.form.sla30046,
            sla30047: self.form.sla30047,
            sla30048: self.form.sla30048,
            sla30049: self.form.sla30049,
            sla30050: self.form.sla30050,
            sla30051: self.form.sla30051,
            sla30052: self.form.sla30052,
            sla30053: self.form.sla30053,
            sla30054: self.form.sla30054,
            sla30055: self.form.sla30055,
            sla30056: self.form.sla30056,
            sla30057: self.form.sla30057,
            sla30058: self.form.sla30058,
            sla30059: self.form.sla30059,
            sla30060: self.form.sla30060,
            sla30061: self.form.sla30061,
            sla30062: self.form.sla30062,
            sla30063: self.form.sla30063,
            sla30064: self.form.sla30064,
            sla30065: self.form.sla30065,
            sla30066: self.form.sla30066,
            sla30067: self.form.sla30067,
            sla30068: self.form.sla30068,
            sla30069: self.form.sla30069,
            sla30070: self.form.sla30070,
            sla30071: self.form.sla30071,
            sla30072: self.form.sla30072,
            sla30073: self.form.sla30073,
            sla30074: self.form.sla30074,
            sla30075: self.form.sla30075,
            sla30076: self.form.sla30076,
            sla30077: self.form.sla30077,
            sla30078: self.form.sla30078,
            sla30079: self.form.sla30079,
            sla30080: self.form.sla30080,
            sla30081: self.form.sla30081,
            sla30082: self.form.sla30082,
            sla30083: self.form.sla30083,
            sla30084: self.form.sla30084,
            sla30085: self.form.sla30085,
            sla30086: self.form.sla30086,
            sla30087: self.form.sla30087,
            sla30088: self.form.sla30088,
            sla30089: self.form.sla30089,
            sla30090: self.form.sla30090,
            sla30091: self.form.sla30091,
            sla30092: self.form.sla30092,
            sla30093: self.form.sla30093,
            sla30094: self.form.sla30094,
            sla30095: self.form.sla30095,
            sla30096: self.form.sla30096,
            sla30097: self.form.sla30097,
            sla30098: self.form.sla30098,
            sla30099: self.form.sla30099,
            sla300100: self.form.sla300100,
            sla300101: self.form.sla300101,
            sla300102: self.form.sla300102,
            sla300103: self.form.sla300103,
            sla300104: self.form.sla300104,
            sla300105: self.form.sla300105,
            sla300106: self.form.sla300106,
            sla300107: self.form.sla300107,
            sla300108: self.form.sla300108,
            sla300109: self.form.sla300109,
            sla300110: self.form.sla300110,
            sla300111: self.form.sla300111,
            sla300112: self.form.sla300112,
            sla300113: self.form.sla300113,
            sla300114: self.form.sla300114,
            sla300117: self.form.sla300117
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
        this.fetchOptionList()
        this.isAdd = false
        this.form = this.selRow
        if(this.selRow.sla30033 == '1'){
          this.form.sla30033 = true
        }
        if(this.selRow.sla30038 == '1'){
          this.form.sla30038 = true
        }
        if(this.selRow.sla30043 == '1'){
          this.form.sla30043 = true
        }
        if(this.selRow.sla30048 == '1'){
          this.form.sla30048 = true
        }
        if(this.selRow.sla30053 == '1'){
          this.form.sla30053 = true
        }
        if(this.selRow.sla30058 == '1'){
          this.form.sla30058 = true
        }
        if(this.selRow.sla30063 == '1'){
          this.form.sla30063 = true
        }
        if(this.selRow.sla30068 == '1'){
          this.form.sla30068 = true
        }
        if(this.selRow.sla30073 == '1'){
          this.form.sla30073 = true
        }
        if(this.selRow.sla30078 == '1'){
          this.form.sla30078 = true
        }
        this.formTitle = '修改市調資料'
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
