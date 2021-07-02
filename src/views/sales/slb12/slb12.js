import { remove, getList, save, getSlb12004, updateCount } from '@/api/sales/slb12'

export default {
  data() {
    return {
      projectNo: '',
      projectName: '',
      pDate: '',
      today: '',
      listQuery: {
        page: 1,
        limit: 20,
        slb10ID:undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增回籠明細資料',
      isAdd: true,
      form: {
        id: '',
        slb12004:'',
        slb12005:'',
        slb12006:'',
        slb12008:0
      },
      slb12004List:[],
      rules: {
        
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.slb10ID = this.$route.query.slb10ID
      this.projectNo = this.$route.query.projectId
      this.projectName = this.$route.query.pjName
      this.pDate = this.$route.query.pDate
      this.today = new Date().toISOString().substr(0,10).replace(/-/g,'')
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.slb10ID).then(response => {
        this.list = response.data
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchSlb12004() {//棟別
      getSlb12004(this.projectNo).then(response => {
        this.slb12004List = response.data
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
        slb12004:'',
        slb12005:'',
        slb12006:'',
        slb12008:0
      }
      
    },
    add() {
      
      this.resetForm()
      this.fetchSlb12004()
      this.formTitle = '新增回籠明細資料'
      this.formVisible = true
      this.isAdd = true
      
    },
    save() {
      
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          
          let tmpSlb12004 = ""
          let tmpSlb12005 = ""
          let tmpSlb12008 = 0
          if(this.isAdd === true){
            let arySlb12004 = this.houseName(self.form.slb12004).split('<>')
            tmpSlb12004 = arySlb12004[0]
            tmpSlb12005 = arySlb12004[1]
            tmpSlb12008 = self.form.slb12004
          }else{
            tmpSlb12004 = self.form.slb12004
            tmpSlb12005 = self.form.slb12005
            tmpSlb12008 = self.form.slb12008
          }
          save({
            id: self.form.id,
            slb12002:this.listQuery.slb10ID,
            slb12003:'',
            slb12004:tmpSlb12004,
            slb12005:tmpSlb12005,
            slb12006:self.form.slb12006,
            slb12008:tmpSlb12008
            
          }).then(response => {
            //console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.updateCount(this.listQuery.slb10ID)//更新累計
            this.fetchData()
            this.formVisible = false
          })
        } else {
          return false
        }
      })
    },
    houseName(vid){//get Project name by project id
      let obj = {};
      obj = this.slb12004List.find((item)=>{
        return item.key === vid
      })
      return obj.value
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
        //this.fetchSlb11004()
        this.slb12004List=[]
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改成交明細資料'
        this.formVisible = true
      }
    },
    updateCount(id, pjNo){//(slb10.id, projectNo)重新計算金額與戶數
      updateCount(id, pjNo).then(response => {
        console.log(response)
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
          remove(id,this.selRow.slb12008).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.updateCount(this.selRow.slb12002);
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }
  }
}
