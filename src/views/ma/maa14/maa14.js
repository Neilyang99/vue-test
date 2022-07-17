import { remove, getList, save, getWorkerName } from '@/api/ma/maa14'

export default {
  data() {
    return {
      projectID: '',
      projectName: '',
      listQuery: {
        page: 1,
        limit: 20,
        maa00ID: undefined
      },
      restaurants: [],
      maa1403List:[],
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '新增臨時工工作資料',
      isAdd: true,
      form: {
        id: '',
        maa14002:this.projectID,
        maa14003:'',
        maa14004:'',
        maa14005:'',
        maa14006:'',
        maa14007:'0',
        maa14008:'',
        maa14009:'',
        maa14010:'0'
        
      },
      rules: {
        maa14002: [
          {required: true, message: '工程資料錯誤。',trigger: 'blur'}
        ],
        maa14004: [
          {required: true, message: '請輸入出工日期。',trigger: 'blur'}
        ],
        maa14007: [
          {required: true, message: '請輸入姓名。',trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.maa00ID = this.$route.query.maa00ID
      this.projectName = this.$route.query.projectName
      this.fetchData()
      this.findWorkerName()
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.maa00ID).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    findWorkerName(){
      getWorkerName().then(response => {
        var workerList = response.data
        workerList.map((item, key) => {
          this.restaurants[key] = {
            value: item.name,
          }
        })
      })  
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        try {
          return restaurant.value.indexOf(queryString) >= 0;
        } catch (e) {alert}
      }
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
        maa14002:this.projectID,
        maa14003:'',
        maa14004:'',
        maa14005:'',
        maa14006:'',
        maa14007:'0',
        maa14008:'',
        maa14009:'',
        maa14010:'0'
      }
      
    },
    add() {
      this.resetForm()
      this.formTitle = '新增臨時工工作資料'
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa14002:this.listQuery.maa00ID,
            maa14003:self.form.maa14003,
            maa14004:self.form.maa14004,
            maa14005:self.form.maa14004.substring(0,4),
            maa14006:self.form.maa14004.substring(4,6),
            maa14007:self.form.maa14007,
            maa14008:'',
            maa14009:self.form.maa14009,
            maa14010:'0'
          }).then(response => {
            //console.log(response)
            this.$message({
              message: '提交成功',
              type: 'success'
            })
            this.fetchData()
            this.formVisible = false
            this.findWorkerName()
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
      if (this.checkSel() ) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改臨時工工作資料'
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel() ) {
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
