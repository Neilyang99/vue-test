import { remove, getList, save } from '@/api/sales/visitor'
import { selectList } from '@/api/sales/sla00'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增來人洽詢',
      deptList: [],
      isAdd: true,
      form: {
        id: '',
        sla10003: '',
        sla10006: '',
        sla10007: '',
        sla10009: '',
        sla10013: '',
        sla10015: '',
        building: ''
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
        this.list = response.data
        this.listLoading = false
      })
    },
    fetchBuilding(){
      selectList().then(response => {
        this.buildingList = response.data
      })
    },
    search() {
      this.listQuery.page = 1
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
      this.form = {}
      
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
        if (valid) {
          save({
            id: self.form.id,
            sla10002: self.form.building,
            sla10003: self.form.building.sla00003,
            sla10006: self.form.sla10006,
            sla10007: self.form.sla10007,
            sla10008: self.form.sla10008,
            sla10009: self.form.sla10009,
            sla10010: self.form.sla10010,
            sla10013: self.form.sla10013,
            sla10015: self.form.sla10015
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
      if (this.selRow && this.selRow.sla10001) {
        return true
      }
      this.$message({
        message: '請挑選其中一筆資料',
        type: 'warning'
      })
      return false
    },
    viewLog(visitorId) {
      this.$router.push({ path: '/visitorLog', query: { visitorId: visitorId }})
    },
    edit() {
      if (this.checkSel()) {
        this.fetchBuilding();
        this.isAdd = false
        this.form = this.selRow
        //this.form.id = this.selRow.sla10001
        this.form.building = this.selRow.sla10002
        this.formTitle = '修改洽詢表'
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
