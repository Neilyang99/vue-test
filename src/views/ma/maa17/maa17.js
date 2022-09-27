import { remove, getList, save, getMaa17006 } from '@/api/ma/maa17'

export default {
  data() {
    return {
      dataPK: '',
      period: '',
      projectName: '',
      listQuery: {
        page: 1,
        limit: 20,
        dataPK: undefined
      },
      total: 0,
      list: null,
      list2: null,
      listLoading: true,
      maa17006List: null,
      selRow: {},
      formVisible: false,
      titleTxt: '零用金明細紀錄',
      formTitle:'',
      isAdd: true,
      form: {
        id: '',
        maa17002:0,
        maa17003:'',
        maa17004:'',
        maa17005:'',
        maa17006:'',
        maa17007:''
      },
      rules: {
        maa17004: [
          {required: true, message: '請輸入日期。',trigger: 'blur'}
        ],
        maa17005: [
          {required: true, message: '請輸入金額。',trigger: 'blur'}
        ],
        maa17006: [
          {required: true, message: '請輸入來源證明。',trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.listQuery.dataPK = this.$route.query.dataPK
      this.period = this.$route.query.period
      this.projectName = this.$route.query.projectName
      this.fetchData()
      this.fetchOptionList()
    },
    getTotal(param){
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合計';
          return;
        }
        //const values = data.map(item => Number(item[column.property]));
        const values = data.map(item => Number(item["maa17005"]));
        if (column.property === 'num') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          
          sums[index];
        } else {
          sums[index] = '--';
        }
      });

      return sums;
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.dataPK,"I").then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
      getList(this.listQuery.dataPK,"O").then(response => {
        this.list2 = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
      })
    },
    fetchOptionList(){
      getMaa17006().then(response => {this.maa17006List = response.data})
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
        maa17002:0,
        maa17003:'',
        maa17004:'',
        maa17005:'',
        maa17006:'',
        maa17007:''
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
            maa17002:this.listQuery.dataPK,
            maa17003:'O',
            maa17004:self.form.maa17004,
            maa17005:self.form.maa17005,
            maa17006:self.form.maa17006,
            maa17007:self.form.maa17007

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
    edit() {
      if (this.checkSel() ) {
        this.isAdd = false
        this.form = this.selRow
        this.formTitle = '修改'+this.titleTxt
        this.formVisible = true
      }
    },
    remove() {
      if (this.checkSel() ) {
        var id = this.selRow.id
        var maa17002 = this.selRow.maa17002// maa16PK
        
        this.$confirm('確定刪除資料?', '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          remove(id, maa17002).then(response => {
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
