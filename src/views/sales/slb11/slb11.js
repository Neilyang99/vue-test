import { remove, getList, save, getSlb11004, updateAmt } from '@/api/sales/slb11'

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
      formTitle: '新增成交明細資料',
      isAdd: true,
      form: {
        id: '',
        slb11004:'',
        slb11006:0,
        slb11007:0,
        slb11008:'',
        slb11010:0
      },
      slb11004List:[],
      rules: {
        slb11006: [
          {pattern: /^\d*$/,message: '請輸入整數:1~9999',trigger: 'blur'}
        ],
        slb11007: [
          {pattern: /^\d*$/,message: '請輸入整數:1~9999',trigger: 'blur'}
        ]
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
    fetchSlb11004() {//棟別
      getSlb11004(this.projectNo).then(response => {
        this.slb11004List = response.data
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
        slb11004:'',
        slb11006:0,
        slb11007:0,
        slb11008:'',
        slb11010:0
      }
      
    },
    add() {
      
      this.resetForm()
      this.fetchSlb11004()
      this.formTitle = '新增成交明細資料'
      this.formVisible = true
      this.isAdd = true
      
    },
    save() {
      
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          
          let tmpSlb11004 = ""
          let tmpSlb11005 = ""
          let tmpSlb11010 = 0
          if(this.isAdd === true){
            let arySlb11004 = this.houseName(self.form.slb11004).split('<>')
            tmpSlb11004 = arySlb11004[0]
            tmpSlb11005 = arySlb11004[1]
            tmpSlb11010 = self.form.slb11004
          }else{
            tmpSlb11004 = self.form.slb11004
            tmpSlb11005 = self.form.slb11005
            tmpSlb11010 = self.form.slb11010
          }
          save({
            id: self.form.id,
            slb11002:this.listQuery.slb10ID,
            slb11003:'',
            slb11004:tmpSlb11004,
            slb11005:tmpSlb11005,
            slb11006:self.form.slb11006*10000,
            slb11007:self.form.slb11007*10000,
            slb11008:self.form.slb11008,
            slb11010:tmpSlb11010
            
          }).then(response => {
            //console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.updateAmount(this.listQuery.slb10ID, this.projectNo)//更新累計
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
      obj = this.slb11004List.find((item)=>{
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
        this.slb11004List=[]
        this.isAdd = false
        this.form = this.selRow
        this.form.slb11006 = this.form.slb11006/10000
        this.form.slb11007 = this.form.slb11007/10000
        this.formTitle = '修改成交明細資料'
        this.formVisible = true
      }
    },
    updateAmount(id, pjNo){//(slb10.id, projectNo)重新計算金額與戶數
      updateAmt(id, pjNo).then(response => {
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
          remove(id,this.selRow.slb11010).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.updateAmount(this.selRow.slb11002, this.projectNo);
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }
  }
}
