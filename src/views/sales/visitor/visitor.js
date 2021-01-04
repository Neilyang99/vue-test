import { remove, getList, save } from '@/api/sales/visitor'
import { selectList } from '@/api/sales/sla00'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增來人洽詢',
      isAdd: true,
      form: {
        id: '',
        sla10002: '',
        sla10003: '',
        sla10006: '',
        sla10007: '',
        sla10008: '',
        sla10009: '',
        sla10010: '',
        sla10011: '',
        sla10012: '',
        sla10013: '',
        sla10015: '',
        sla10016: '',
        sla10018: '',
        sla10019: '',
        sla10020: '',
        sla10021: '',
        sla10022: '',
        sla10023: '',
        sla10024: '',
        sla10025: '',
        sla10026: '',
        sla10027: '',
        sla10028: '',
        sla10029: '',
        sla10030: '',
        sla10033: '',
        building: '',
        buildingName: ''
      },
      buildingList:[],
      rules: {
        sla10006: [
          { required: true, message: '請輸入客戶名', trigger: 'blur' }
        ],
        sla10010: [
          { required: true, message: '行動電話需要輸入', trigger: 'blur' }
        ]

      },
      listQuery: {
        page: 1,
        limit:10,
        sla10006: undefined
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
      this.listQuery.sla10006 = ''
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
        sla10002: '',
        sla10003: '',
        sla10006: '',
        sla10007: '',
        sla10008: '',
        sla10009: '',
        sla10010: '',
        sla10011: '',
        sla10012: '',
        sla10013: '',
        sla10015: '',
        sla10016: '',
        sla10018: '',
        sla10019: '',
        sla10020: '',
        sla10021: '',
        sla10022: '',
        sla10023: '',
        sla10024: '',
        sla10025: '',
        sla10026: '',
        sla10027: '',
        sla10028: '',
        sla10029: '',
        sla10030: '',
        sla10033: '',
        building: '',
        buildingName: ''
      }
    },
    add() {
      this.resetForm()
      this.fetchBuilding()
      this.formTitle = '新增來人洽詢表'
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
            sla10002: self.form.building,
            sla10003: self.form.buildingName,
            sla10006: self.form.sla10006,
            sla10007: self.form.sla10007,
            sla10008: self.form.sla10008,
            sla10009: self.form.sla10009,
            sla10010: self.form.sla10010,
            sla10011: self.form.sla10011,
            sla10012: self.form.sla10012,
            sla10013: self.form.sla10013,
            sla10015: self.form.sla10015,
            sla10016: self.form.sla10016,
            sla10018: self.form.sla10018,
            sla10019: self.form.sla10019,
            sla10020: self.form.sla10020,
            sla10021: self.form.sla10021,
            sla10022: self.form.sla10022,
            sla10023: self.form.sla10022,
            sla10024: self.form.sla10024,
            sla10025: self.form.sla10025,
            sla10026: self.form.sla10026,
            sla10027: self.form.sla10027,
            sla10028: self.form.sla10028,
            sla10029: self.form.sla10029,
            sla10030: self.form.sla10030,
            sla10033: self.form.sla10033
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
    viewLog(visitorId) {
      this.$router.push({ path: '/visitorLog', query: { visitorId: visitorId }})
    },
    edit() {
      if (this.checkSel()) {
        this.fetchBuilding()
        this.isAdd = false
        this.form = this.selRow
        //this.form.id = this.selRow.sla10001
        this.form.building = this.selRow.sla10002
        this.formTitle = '修改洽詢表'
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
