import { remove, getList, save, getSlb15004, updateAmt } from '@/api/sales/slb15'

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
      formTitle: '新增訂金補足資料',
      isAdd: true,
      form: {
        id: '',
        slb15004:'',
        slb15006:0,
        slb15007:0,
        slb15008:'',
        slb15010:0
      },
      slb15004List:[],
      rules: {
        slb15006: [
          {pattern: /^\d*$/,message: '請輸入整數:1~9999',trigger: 'blur'}
        ],
        slb15007: [
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
    fetchSlb15004() {//棟別
      getSlb15004(this.projectNo).then(response => {
        this.slb15004List = response.data
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
        slb15004:'',
        slb15006:0,
        slb15007:0,
        slb15008:'',
        slb15010:0
      }
      
    },
    add() {
      
      this.resetForm()
      this.fetchSlb15004()
      this.formTitle = '新增訂金補足資料'
      this.formVisible = true
      this.isAdd = true
      
    },
    save() {
      
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          
          let tmpslb15004 = ""
          let tmpslb15005 = ""
          let tmpslb15010 = 0
          if(this.isAdd === true){
            let aryslb15004 = this.houseName(self.form.slb15004).split('<>')
            tmpslb15004 = aryslb15004[0]
            tmpslb15005 = aryslb15004[1]
            tmpslb15010 = self.form.slb15004
          }else{
            tmpslb15004 = self.form.slb15004
            tmpslb15005 = self.form.slb15005
            tmpslb15010 = self.form.slb15010
          }
          save({
            id: self.form.id,
            slb15002:this.listQuery.slb10ID,
            slb15003:'',
            slb15004:tmpslb15004,
            slb15005:tmpslb15005,
            slb15006:self.form.slb15006*10000,
            slb15007:self.form.slb15007*10000,
            slb15008:self.form.slb15008,
            slb15010:tmpslb15010
            
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
      obj = this.slb15004List.find((item)=>{
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
        //this.fetchslb15004()
        this.slb15004List=[]
        this.isAdd = false
        this.form = this.selRow
        this.form.slb15006 = this.form.slb15006/10000
        this.form.slb15007 = this.form.slb15007/10000
        this.formTitle = '修改訂金補足資料'
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
          remove(id,this.selRow.slb15010).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.updateAmount(this.selRow.slb15002, this.projectNo);
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }
  }
}
