import { remove, getList, save, getSlb11List, getHouse, getOnSaleCase, getWeather, getAttendance } from '@/api/sales/slb10'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '新增專案日報表',
      isAdd: true,
      form: {
        id: '',
        slb10002: '',
        slb10003: '',
        slb10004: '',
        slb10008: '',
        slb10009: 0,
        slb10010: 0,
        slb10011: 0,
        slb10012: '',
        dealList:[{
          slb11004:'',
          slb11006:0,
          slb11007:0
        }]
      },
      rules: {
        slb10009: [
          {pattern: /^\d*$/,message: '請輸入數字1~999',trigger: 'blur'}
        ],
        slb10010: [
          {pattern: /^\d*$/,message: '請輸入數字1~999',trigger: 'blur'}
        ],
        slb10011: [
          {pattern: /^\d*$/,message: '請輸入數字1~999',trigger: 'blur'}
        ]
      },
      listQuery: {
        page: 1,
        limit:10,
        selSlb10004: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      projectNo: '',
      slb10004List:{},
      slb10003List:{},
      slb10012List:{},
      slb11004List:{}
    }
  },
  filters: {
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
    fetchSlb11(slb11002) {
      getSlb11List(slb11002).then(response => {
        this.form.dealList = response.data
      })
    },
    fetchSlb11004(project) {//棟別
      getHouse(project).then(response => {
        this.slb11004List = response.data
      })
    },
    fetchOnSaleCase() {
      getOnSaleCase().then(response => {
        this.slb10004List = response.data
      })
    },
    fetchWeather() {
      getWeather().then(response => {
        this.slb10003List = response.data
      })
    },
    fetchAttendance() {
      getAttendance().then(response => {
        this.slb10012List = response.data
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selSlb10004 = ''
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
        slb10002: '',
        slb10003: '',
        slb10004: '',
        slb10008: '',
        slb10009: 0,
        slb10010: 0,
        slb10011: 0,
        slb10012: '',
        dealList:[{
          slb11004:'',
          slb11006:0,
          slb11007:0
        }]
      }
    },
    add() {
      this.resetForm()
      this.fetchOnSaleCase()
      this.fetchWeather()
      this.fetchAttendance()
      //this.fetchSlb11004('2021001')
      this.formTitle = '新增專案日報表'
      this.formVisible = true
      this.isAdd = true
      this.form.slb10002 = new Date().toISOString().substr(0,10)
      this.form.slb10014 =this.form.slb10014/10000
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          self.form.slb10002 = self.form.slb10002.replace(/-/g,'')
          self.form.slb10005 = this.projectName(self.form.slb10004)

          save({
            id: self.form.id,
            slb10002: self.form.slb10002,
            slb10003: self.form.slb10003,
            slb10004: self.form.slb10004,
            slb10005: self.form.slb10005,
            slb10008: self.form.slb10008,
            slb10009: self.form.slb10009,
            slb10010: self.form.slb10010,
            slb10011: self.form.slb10011,
            slb10012: self.form.slb10012,
            slb10013: self.form.slb10013,
            slb10014: self.form.slb10014*10000
            
            
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
        this.isAdd = false
        this.form = this.selRow
        this.fetchOnSaleCase()
        this.fetchWeather()
        this.fetchAttendance()
        this.fetchSlb11(this.selRow.id)
        //this.fetchSlb11004(this.form.slb10004)
        //this.form.building = this.selRow.sla00002
        this.formTitle = '修改銷售案'
        //delay to show for ajax to get slb11 data
        setTimeout(()=> this.formVisible = true, 500)
      }
    },
    deal() {//成交
      if (this.checkSel()) {
        
        this.$router.push({ path: '/slb11', query: { slb10ID: this.selRow.id, projectId: this.selRow.slb10004, pjName: this.selRow.slb10005, pDate: this.selRow.slb10002 }})
      }
    },
    again() {//回籠
      if (this.checkSel()) {
        
        this.$router.push({ path: '/slb12', query: { slb10ID: this.selRow.id, projectId: this.selRow.slb10004, pjName: this.selRow.slb10005, pDate: this.selRow.slb10002 }})
      }
    },
    cancelH() {//退戶
      if (this.checkSel()) {
        
        this.$router.push({ path: '/slb13', query: { slb10ID: this.selRow.id, projectId: this.selRow.slb10004, pjName: this.selRow.slb10005, pDate: this.selRow.slb10002 }})
      }
    },
    deposit() {//訂金補足
      if (this.checkSel()) {
        
        this.$router.push({ path: '/slb15', query: { slb10ID: this.selRow.id, projectId: this.selRow.slb10004, pjName: this.selRow.slb10005, pDate: this.selRow.slb10002 }})
      }
    },
    contract() {//簽約
      if (this.checkSel()) {
        
        this.$router.push({ path: '/slb16', query: { slb10ID: this.selRow.id, projectId: this.selRow.slb10004, pjName: this.selRow.slb10005, pDate: this.selRow.slb10002 }})
      }
    },
    addDeal(){
      let len = this.form.dealList.length
      this.$set(this.form.dealList,len, {
        slb11004:'',
        slb11006:0,
        slb11007:0
      })
    },
    deleteDeal(i){
      if(this.form.dealList.length > 1){
        this.form.dealList.splice(this.form.dealList.indexOf(i),1)
      }else{
        alert('請保留一項!')
        return false
      }
    },
    projectName(vid){//get Project name by project id
      let obj = {};
      obj = this.slb10004List.find((item)=>{
        return item.key === vid
      })
      return obj.value
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
