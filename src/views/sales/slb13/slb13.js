import { remove, getList, save, getslb13004, updateAmt } from '@/api/sales/slb13'

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
      formTitle: '新增退戶明細資料',
      isAdd: true,
      form: {
        id: '',
        slb13004:'',
        slb13006:0,
        slb13007:0,
        slb13008:'',
        slb13010:0
      },
      slb13004List:[],
      rules: {
        slb13006: [
          {pattern: /^\d*$/,message: '請輸入整數:1~9999',trigger: 'blur'}
        ],
        slb13007: [
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
    fetchslb13004() {//棟別
      getslb13004(this.projectNo).then(response => {
        this.slb13004List = response.data
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
        slb13004:'',
        slb13006:0,
        slb13007:0,
        slb13008:'',
        slb13010:0
      }
      
    },
    add() {
      
      this.resetForm()
      this.fetchslb13004()
      this.formTitle = '新增退戶明細資料'
      this.formVisible = true
      this.isAdd = true
      
    },
    save() {
      
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          
          let tmpslb13004 = ""
          let tmpslb13005 = ""
          let tmpslb13010 = 0
          if(this.isAdd === true){
            let aryslb13004 = this.houseName(self.form.slb13004).split('<>')
            tmpslb13004 = aryslb13004[0]
            tmpslb13005 = aryslb13004[1]
            tmpslb13010 = self.form.slb13004
          }else{
            tmpslb13004 = self.form.slb13004
            tmpslb13005 = self.form.slb13005
            tmpslb13010 = self.form.slb13010
          }
          save({
            id: self.form.id,
            slb13002:this.listQuery.slb10ID,
            slb13003:'',
            slb13004:tmpslb13004,
            slb13005:tmpslb13005,
            slb13006:self.form.slb13006*10000,
            slb13007:self.form.slb13007*10000,
            slb13008:self.form.slb13008,
            slb13010:tmpslb13010
            
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
      obj = this.slb13004List.find((item)=>{
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
        //this.fetchslb13004()
        this.slb13004List=[]
        this.isAdd = false
        this.form = this.selRow
        this.form.slb13006 = this.form.slb13006/10000
        this.form.slb13007 = this.form.slb13007/10000
        this.formTitle = '修改退戶明細資料'
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
          remove(id,this.selRow.slb13010).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.updateAmount(this.selRow.slb13002, this.projectNo);
            this.fetchData()
          })
        }).catch(() => {
        })
      }
    }
  }
}
