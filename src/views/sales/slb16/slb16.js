import { remove, getList, save, getslb16004, updateAmt } from '@/api/sales/slb16'

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
      formTitle: '新增簽約明細資料',
      isAdd: true,
      form: {
        id: '',
        slb16004:'',
        slb16006:0,
        slb16007:0,
        slb16008:'',
        slb16010:0
      },
      slb16004List:[],
      rules: {
        slb16006: [
          {pattern: /^\d*$/,message: '請輸入整數:1~9999',trigger: 'blur'}
        ],
        slb16007: [
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
    fetchslb16004() {//棟別
      getslb16004(this.projectNo).then(response => {
        this.slb16004List = response.data
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
        slb16004:'',
        slb16006:0,
        slb16007:0,
        slb16008:'',
        slb16010:0
      }
      
    },
    add() {
      
      this.resetForm()
      this.fetchslb16004()
      this.formTitle = '新增簽約明細資料'
      this.formVisible = true
      this.isAdd = true
      
    },
    save() {
      
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          
          let tmpslb16004 = ""
          let tmpslb16005 = ""
          let tmpslb16010 = 0
          if(this.isAdd === true){
            let aryslb16004 = this.houseName(self.form.slb16004).split('<>')
            tmpslb16004 = aryslb16004[0]
            tmpslb16005 = aryslb16004[1]
            tmpslb16010 = self.form.slb16004
          }else{
            tmpslb16004 = self.form.slb16004
            tmpslb16005 = self.form.slb16005
            tmpslb16010 = self.form.slb16010
          }
          save({
            id: self.form.id,
            slb16002:this.listQuery.slb10ID,
            slb16003:'',
            slb16004:tmpslb16004,
            slb16005:tmpslb16005,
            slb16006:self.form.slb16006*10000,
            slb16007:self.form.slb16007*10000,
            slb16008:self.form.slb16008,
            slb16010:tmpslb16010
            
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
      obj = this.slb16004List.find((item)=>{
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
        //this.fetchslb16004()
        this.slb16004List=[]
        this.isAdd = false
        this.form = this.selRow
        this.form.slb16006 = this.form.slb16006/10000
        this.form.slb16007 = this.form.slb16007/10000
        this.formTitle = '修改簽約明細資料'
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
          remove(id,this.selRow.slb16010).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.updateAmount(this.selRow.slb16002, this.projectNo);
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }
  }
}
