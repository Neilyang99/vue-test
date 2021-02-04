import { remove, getList, save, getSla01007, getSla01008, getSla01015 } from '@/api/sales/sla01'

export default {
  data() {
    return {
      projectNo: '',
      listQuery: {
        page: 1,
        limit: 20,
        sla00ID: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增可售房屋資料',
      isAdd: true,
      form: {
        id: '',
        sla01003:this.projectNo,
        sla01004:'',
        sla01005:'',
        sla01006:'',
        sla01007:'',
        sla01008:'',
        sla01009:'',
        sla01010:'',
        sla01011:'',
        sla01012:'',
        sla01013:'',
        sla01014:'',
        sla01015:''
      },
      sla01007List:[],
      sla01008List:[],
      sla01015List:[],
      rules: {
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.sla00ID = this.$route.query.sla00ID
      this.projectNo = this.$route.query.projectId
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.sla00ID).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchSla01007() {//房型
      getSla01007().then(response => {
        this.sla01007List = response.data
      })
    },
    fetchSla01008() {//格局
      getSla01008().then(response => {
        this.sla01008List = response.data
      })
    },
    fetchSla01015() {//車位
      getSla01015().then(response => {
        this.sla01015List = response.data
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
        sla01003:this.projectNo,
        sla01004:'',
        sla01005:'',
        sla01006:'',
        sla01007:'',
        sla01008:'',
        sla01009:'',
        sla01010:'',
        sla01011:'',
        sla01012:'',
        sla01013:'',
        sla01014:'',
        sla01015:''
      }
      
    },
    add() {
      this.resetForm()
      this.fetchSla01007()
      this.fetchSla01008()
      this.fetchSla01015()
      this.formTitle = '新增可售房屋資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            sla01002:this.listQuery.sla00ID,
            sla01003:this.projectNo,
            sla01004:self.form.sla01004,
            sla01005:self.form.sla01005,
            sla01006:self.form.sla01006,
            sla01007:self.form.sla01007,
            sla01008:self.form.sla01008,
            sla01009:self.form.sla01009,
            sla01010:self.form.sla01010,
            sla01011:self.form.sla01011,
            sla01012:self.form.sla01012,
            sla01013:self.form.sla01013,
            sla01014:self.form.sla01014,
            sla01015:self.form.sla01015
            
          }).then(response => {
            //console.log(response)
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
        this.fetchSla01007()
        this.fetchSla01008()
        this.fetchSla01015()
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改可售房屋資料'
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
