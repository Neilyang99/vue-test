import { remove, getList, save } from '@/api/ma/maa93'

export default {
  data() {
    return {
      formVisible: false,
      titleTxt:'工程請款單',
      formTitle: '',
      isAdd: true,
      vendorId: '',
      vendorName: '',
      prjId:'',
      prjName:'',
      form: {
        id: ''
      },
      apList:[
        {
          maa31001:1,
          maa31002:'TEST Item1',
          maa31003:20,
          price:45,
          totalQty: 10
        },
        {
          maa31001:2,
          maa31002:'TATTWTII',
          maa31003:1000,
          price:8,
          totalQty: 200
        }
      ],
      rules: {
        maa93011: [
          { required: true, message: '請輸入統一編號', trigger: 'blur' }
        ],
        maa93004: [
          { required: true, message: '請輸入包商名稱', trigger: 'blur' }
        ]
      },
      listQuery: {
        page: 1,
        limit:20,
        selMaa93004: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
  },
  filters: {

  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.vendorId = this.$route.query.vendorId
      this.vendorName = this.$route.query.vendorName
      this.prjId = this.$route.query.prjId
      this.prjName = this.$route.query.prjName

      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        //this.list = response.data.records
        //this.listLoading = false
        //this.total = response.data.total
      })

      this.listLoading = false
      this.list=[
        {maa31001:'20220730',maa31002:1,maa31003:1832,maa31004:148,maa31005:1980},
        {maa31001:'20220930',maa31002:2,maa31003:135,maa31004:15,maa31005:150}
                ]
      this.total = 2
    },
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selMaa93004 = ''
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
        id: ''
       
      }
    },
    add() {
      this.resetForm()
      this.formTitle = '新增'+this.titleTxt
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa93002: '',
            maa93003: self.form.maa93003,
            maa93004: self.form.maa93004,
            maa93005: self.form.maa93005,
            maa93006: self.form.maa93006,
            maa93007: self.form.maa93007,
            maa93008: self.form.maa93008,
            maa93009: self.form.maa93009,
            maa93010: self.form.maa93010,
            maa93011: self.form.maa93011,
            maa93012: self.form.maa93012,
            maa93013: self.form.maa93013,
            maa93014: self.form.maa93014,
            maa93015: self.form.maa93015,
            maa93016: self.form.maa93016,
            maa93017: self.form.maa93017,
            maa93018: self.form.maa93018,
            maa93089: self.form.maa93089
            
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
    setBudget(vendorId,vendorName) {
      this.$router.push({ path: '/outsourcing', query: { vendorId: vendorId, vendorName: vendorName }})
      //outsourcing:外包合約
      //this.$router.push({ name: '外包合約', params: { vendorId: vendorId, vendorName: vendorName }})
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
