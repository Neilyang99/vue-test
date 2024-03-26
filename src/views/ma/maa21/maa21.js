import { remove, getList, save, projectList } from '@/api/ma/maa21'
import budgetSelection from '../commonDialog/budgetSelection';
import vendorSelection from '../commonDialog/vendorSelection';

export default {
  // 註冊組件
  components: {
    budgetSelection,
    vendorSelection
  },
  data() {
    return {
      formVisible: false,
      titleTxt: '工程合約',
      formTitle: '',
      isAdd: true,
      formStatus: '',
      form: {
        
      },
      gridForm:{

      },
      rules: {
        maa21003: [
          { required: true, message: '請輸入工程案', trigger: 'blur' }
        ],
        maa21004: [
          { required: true, message: '請輸入請款公司', trigger: 'blur' }
        ],
        maa21005: [
          { required: true, message: '請輸入付款公司', trigger: 'blur' }
        ],
        maa21007: [
          { required: true, message: '請輸入合約日期', trigger: 'blur' }
        ]
      },
      tableRules:{

      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa21002: '',
        selMaa21003: ''
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      maa22Grid: null,
      ctlFieldName:'',
      projectList: null
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
      this.fetchProject()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
      })
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selMaa21003 = ''
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
    handleGrid(currentRow, oldCurrentRow) {
      this.selRow = currentRow
    },
    selectVendor(t){//廠商挑選對話框
      this.ctlFieldName = t
      this.$refs.vendorSelection.showDialog()
    },
    parentVendor(obj){//廠商挑選回傳呼叫的function
      if(this.ctlFieldName == 'maa21004'){//請款廠商
        this.form.maa21002 = obj.id;
        this.form.maa21004 = obj.name;
      }else{
        this.form.maa21002 = obj.id;
        this.form.maa21005 = obj.name;
      }
    },
    selectBudget() {
      let projectId = this.form.maa21003
      // 弹出对话框
      this.$refs.budgetSelection.showDialog(projectId)
    },
    // 子组件传值给父组件
    parentBudget(obj) {
      console.log(obj.item)
      // 打印子组件传递的值
      this.selRow.maa22005 = obj.id
      this.selRow.maa22005 = obj.item
      this.selRow.maa22007 = obj.unit
      this.selRow.maa22008 = obj.qty
      this.selRow.maa22009 = obj.price
    },
    fetchProject() {
      projectList().then(response => {
        this.projectList = response.data
      })
    },
    calAmt() {
      let totalAmount = 0
      this.maa22Grid.forEach((item, index)=>{
        if(item.maa22012 > 0 && item.maa22013 >0){
          totalAmount += (item.maa22012*item.maa22013)
        }
      })
      if(totalAmount > 0){
        this.form.maa21016 = totalAmount
        this.form.maa21017 = Math.round(this.form.maa21016 * (1-this.form.maa21008/100) )
      }
    },
    resetForm() {
      this.form = {
        id: '',
        maa21002: '',
        maa21003: '',
        maa21004: '',
        maa21005: '',
        maa21006: 0,
        maa21007: '',
        maa21008: 95,
        maa21009: 5,
        maa21010: 0,
        maa21011: 0,
        maa21012: 0,
        maa21016: 0,
        maa21017: 0,
        maa21022: 1,
        maa21023: '',
        createTime: ''
      }

      this.maa22Grid = [
        {maa22003:100,maa22005:"",maa22007:"",maa22008:"",maa22009:"" },
        {maa22003:200,maa22005:"",maa22007:"",maa22008:"",maa22009:"" },
        {maa22003:300,maa22005:"",maa22007:"",maa22008:"",maa22009:"" },
        {maa22003:400,maa22005:"",maa22007:"",maa22008:"",maa22009:"" },
        {maa22003:500,maa22005:"",maa22007:"",maa22008:"",maa22009:"" }
        
      ]
    },
    addGridRow(){
      let cnt = (this.maa22Grid.length+1)*100;
      this.maa22Grid.push({
				maa22003:cnt,maa22005:"",maa22007:"",maa22008:"",maa22009:""
			})
    },
    add() {
      this.resetForm()
      //this.fetchProject()
      this.formTitle = '新增'+this.titleTxt
      this.formVisible = true
      this.isAdd = true
      this.formStatus = '開立'

      var dateObj = new Date()
      this.form.createTime = dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate()

    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa21002: self.form.maa21002,
            maa21003: self.form.maa21003,
            maa21004: self.form.maa21004,
            maa21005: 'Y',
            maa21006: 0
            
            
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
    view2nd(typeId,name) {
      
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
        this.formTitle = '修改'+this.titleTxt
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
