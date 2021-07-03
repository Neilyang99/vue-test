import { remove, getList, save, getSla02005, getSla02006, getSla02008 } from '@/api/sales/sla02'

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
      formTitle: '新增可售車位資料',
      isAdd: true,
      form: {
        id: '',
        sla02003:this.projectNo,
        sla02004:'',
        sla02005:'',
        sla02006:'',
        sla02007:'',
        sla02008:'',
        sla02009:'',
        sla02010:'',
        sla02011:'',
        sla02014:0,
        sla02015:0,
        sla02016:0,
        sla02017:0,
        sla02023:''
      },
      rules: {
        
      },
      sla02005List:[],
      sla02006List:[],
      sla02008List:[],
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
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchSla02005() {//車位類別
      getSla02005().then(response => {
        this.sla02005List = response.data
      })
    },
    fetchSla02006() {//車位類型
      getSla02006().then(response => {
        this.sla02006List = response.data
      })
    },
    fetchSla02008() {//購買類別
      getSla02008().then(response => {
        this.sla02008List = response.data
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
        sla02003:this.projectNo,
        sla02004:'',
        sla02005:'',
        sla02006:'',
        sla02007:'',
        sla02008:'',
        sla02009:'',
        sla02010:'',
        sla02011:'',
        sla02014:0,
        sla02015:0,
        sla02016:0,
        sla02017:0,
        sla02023:''
      }
      
    },
    add() {
      this.resetForm()
      this.fetchSla02005()
      this.fetchSla02006()
      this.fetchSla02008()
      this.formTitle = '新增可售車位資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            sla02002:this.listQuery.sla00ID,
            sla02003:this.projectNo,
            sla02004:self.form.sla02004,
            sla02005:self.form.sla02005,
            sla02006:self.form.sla02006,
            sla02007:self.form.sla02007,
            sla02008:self.form.sla02008,
            sla02009:self.form.sla02009,
            sla02010:self.form.sla02010,
            sla02011:self.form.sla02011,
            sla02014:self.form.sla02014,
            sla02015:self.form.sla02015,
            sla02016:self.form.sla02016,
            sla02017:self.form.sla02017,
            sla02023:'A',
            sla02029:''
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
    checkData(){
      if(this.selRow.sla02023 == 'A'){//A=未銷售
        return true
      }
      this.$message({
        message: '已有銷售資料，不可變更。',
        type: 'warning'
      })
      return false
    },
    edit() {
      if (this.checkSel() && this.checkData()) {
        this.fetchSla02005()
        this.fetchSla02006()
        this.fetchSla02008()
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改可售車位資料'
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel() && this.checkData()) {
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
