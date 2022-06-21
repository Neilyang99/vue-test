import { remove, getList, save } from '@/api/ma/maa12'

export default {
  data() {
    return {
      projectID: '',
      projectName: '',
      reportType: '',
      reportName:'',
      listQuery: {
        page: 1,
        limit: 20,
        maa00ID: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {},
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        id: '',
        maa12002:this.projectID,
        maa12003:this.reportType,
        maa12004:'',
        maa12005:'',
        maa12006:'',
        maa12007:'',
        maa12008:'',
        maa12009:'',
        maa12010:'',
        maa12011:'',
        maa12012:'',
        maa12013:'',
        maa12014:'',
        maa12015:'',
        maa12016:'',
        maa12017:'',
        maa12018:'',
        maa12019:'',
        maa12020:'',
        maa12021:'',
        maa12022:'',
        maa12023:'',
        maa12024:'',
        maa12025:'',
        maa12026:'',
        maa12027:'',
        maa12028:'',
        maa12029:'',
        maa12030:'',
        maa12031:'',
        maa12032:'',
        maa12033:'',
        maa12034:'',
        maa12035:'',
        maa12036:'',
        maa12037:'',
        maa12038:'',
        maa12039:'',
        maa12040:'',
        maa12041:'',
        maa12042:'',
        maa12043:'',
        maa12044:'',
        maa12045:'',
        maa12046:'',
        maa12047:'',
        maa12048:'',
        maa12049:'',
        maa12050:'',
        maa12051:'',
        maa12052:'',
        maa12053:'',
        maa12054:'',
        maa12055:'',
        maa12056:'',
        maa12057:'',
        maa12058:'',
        maa12059:'',
        maa12060:'',
        maa12061:'',
        maa12062:'',
        maa12063:'',
        maa12064:'',
        maa12065:'',
        maa12066:'',
        maa12067:'',
        maa12068:'',
        maa12069:'',
        maa12070:'',
        maa12071:'',
        maa12072:'',
        maa12073:'',
        maa12074:'',
        maa12075:'',
        maa12076:'',
        maa12077:'',
        maa12078:'',
        maa12079:'',
        maa12080:'',
        maa12081:'',
        maa12082:'',
        maa12083:'',
        maa12084:'',
        maa12085:'',
        maa12086:'',
        maa12087:'',
        maa12088:'',
        maa12089:'',
        maa12090:'',
        maa12091:'',
        maa12092:'',
        maa12114:'',
        maa12115:'',
        maa12116:'',
        maa12117:'',
        maa12118:'0'        
        
      },
      rules: {
        maa12005: [
          {required: true, message: '請輸入日期。',trigger: 'blur'}
        ],
        maa12004: [
          {required: true, message: '請輸入澆置位置。',trigger: 'blur'}
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
      this.reportType  = this.$route.query.reportType
      this.fetchData()

      if(this.reportType == '1'){
        this.reportName = "鋼筋數量回報表_基礎工程";
      }else if(this.reportType == '2'){
        this.reportName = "鋼筋數量回報表_結構體工程";
      }else{
        this.reportName = "鋼筋數量回報表_雜項工程";
      }
    },
    fetchData() {
      this.listLoading = true
      
      getList(this.listQuery.maa00ID,this.reportType).then(response => {
        this.list = response.data.records
        this.listLoading = false
        this.total = response.data.total
        
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
        maa12002:this.projectID,
        maa12003:this.reportType,
        maa12004:'',
        maa12005:'',
        maa12006:'',
        maa12007:'',
        maa12008:'',
        maa12009:'',
        maa12010:'',
        maa12011:'',
        maa12012:'',
        maa12013:'',
        maa12014:'',
        maa12015:'',
        maa12016:'',
        maa12017:'',
        maa12018:'',
        maa12019:'',
        maa12020:'',
        maa12021:'',
        maa12022:'',
        maa12023:'',
        maa12024:'',
        maa12025:'',
        maa12026:'',
        maa12027:'',
        maa12028:'',
        maa12029:'',
        maa12030:'',
        maa12031:'',
        maa12032:'',
        maa12033:'',
        maa12034:'',
        maa12035:'',
        maa12036:'',
        maa12037:'',
        maa12038:'',
        maa12039:'',
        maa12040:'',
        maa12041:'',
        maa12042:'',
        maa12043:'',
        maa12044:'',
        maa12045:'',
        maa12046:'',
        maa12047:'',
        maa12048:'',
        maa12049:'',
        maa12050:'',
        maa12051:'',
        maa12052:'',
        maa12053:'',
        maa12054:'',
        maa12055:'',
        maa12056:'',
        maa12057:'',
        maa12058:'',
        maa12059:'',
        maa12060:'',
        maa12061:'',
        maa12062:'',
        maa12063:'',
        maa12064:'',
        maa12065:'',
        maa12066:'',
        maa12067:'',
        maa12068:'',
        maa12069:'',
        maa12070:'',
        maa12071:'',
        maa12072:'',
        maa12073:'',
        maa12074:'',
        maa12075:'',
        maa12076:'',
        maa12077:'',
        maa12078:'',
        maa12079:'',
        maa12080:'',
        maa12081:'',
        maa12082:'',
        maa12083:'',
        maa12084:'',
        maa12085:'',
        maa12086:'',
        maa12087:'',
        maa12088:'',
        maa12089:'',
        maa12090:'',
        maa12091:'',
        maa12092:'',
        maa12114:'',
        maa12115:'',
        maa12116:'',
        maa12117:'',
        maa12118:'0'   
      }
      
    },
    calSum(){
      
    },
    add() {
      this.resetForm()
      if(this.reportType == '1'){
        this.formTitle = '新增混凝土(假設工程)資料'
      }else{
        this.formTitle = '新增混凝土(結構體工程)資料'
      }
      
      this.formVisible = true
      this.isAdd = true
    },
    save() {
      var self = this
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save({
            id: self.form.id,
            maa12002:this.listQuery.maa00ID,
            maa12003:this.reportType,
            //maa12004:self.form.maa12004,
            maa12005:self.form.maa12005,
            maa12006:self.form.maa12006,
            //maa12007:self.form.maa12007,
            //maa12008:self.form.maa12008,
            maa12009:self.form.maa12009,
            maa12010:self.form.maa12010,
            maa12011:self.form.maa12011,
            maa12012:self.form.maa12012,
            maa12013:self.form.maa12013,
            maa12014:self.form.maa12014,
            maa12015:self.form.maa12015,

            maa12031:self.form.maa12031,
            maa12032:self.form.maa12032,
            maa12033:self.form.maa12033,
            maa12034:self.form.maa12034,
            maa12035:self.form.maa12035,
            maa12036:self.form.maa12036,
            maa12037:self.form.maa12037,
            maa12038:self.form.maa12038,
            maa12039:self.form.maa12039,
            maa12040:self.form.maa12040,
            maa12041:self.form.maa12041,
            maa12042:self.form.maa12042,
            maa12045:self.form.maa12045,
            maa12046:self.form.maa12046,

            maa12052:self.form.maa12052,
            maa12053:self.form.maa12053,
            maa12054:self.form.maa12054,
            maa12055:self.form.maa12055,
            maa12056:self.form.maa12056,
            maa12057:self.form.maa12057,
            maa12058:self.form.maa12058,
            maa12059:self.form.maa12059,
            maa12060:self.form.maa12060,
            maa12061:self.form.maa12061,
            maa12062:self.form.maa12062,
            maa12063:self.form.maa12063,
            maa12066:self.form.maa12066,
            maa12067:self.form.maa12067,

            maa12073:self.form.maa12073,
            maa12074:self.form.maa12074,
            maa12075:self.form.maa12075,
            maa12076:self.form.maa12076,
            maa12077:self.form.maa12077,
            maa12078:self.form.maa12078,
            maa12079:self.form.maa12079,
            maa12080:self.form.maa12080,
            maa12081:self.form.maa12081,
            maa12082:self.form.maa12082,
            maa12083:self.form.maa12083,
            maa12084:self.form.maa12084,
            maa12087:self.form.maa12087,
            maa12088:self.form.maa12088,

            maa12114:self.form.maa12114,
            maa12115:self.form.maa12115,
            maa12116:self.form.maa12116,
            maa12118:'0'
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
        this.formTitle = '修改混凝土使用數量資料'
        this.formVisible = true

        this.form.sd280qty1 = this.form.maa12010+this.form.maa12012+this.form.maa12014
        this.form.sd280qty2 = this.form.maa12011+this.form.maa12013+this.form.maa12015

        this.form.sd420_1qty1 = this.form.maa12031+this.form.maa12033+this.form.maa12035+this.form.maa12037+this.form.maa12039+this.form.maa12041+this.form.maa12045
        this.form.sd420_1qty2 = this.form.maa12032+this.form.maa12034+this.form.maa12036+this.form.maa12038+this.form.maa12040+this.form.maa12042+this.form.maa12046

        this.form.sd420qty1 = this.form.maa12052+this.form.maa12054+this.form.maa12056+this.form.maa12058+this.form.maa12060+this.form.maa12062+this.form.maa12066
        this.form.sd420qty2 = this.form.maa12053+this.form.maa12055+this.form.maa12057+this.form.maa12059+this.form.maa12061+this.form.maa12063+this.form.maa12067

        this.form.sd420Wqty1 = this.form.maa12073+this.form.maa12075+this.form.maa12077+this.form.maa12079+this.form.maa12081+this.form.maa12083+this.form.maa12087
        this.form.sd420Wqty2 = this.form.maa12074+this.form.maa12076+this.form.maa12078+this.form.maa12080+this.form.maa12082+this.form.maa12084+this.form.maa12088

        //total
        //#3
        this.form.sd_3_qty1=this.form.maa12010+this.form.maa12031+this.form.maa12052+this.form.maa12073
        this.form.sd_3_qty2=this.form.maa12011+this.form.maa12032+this.form.maa12053+this.form.maa12074
        //#4
        this.form.sd_4_qty1=this.form.maa12012+this.form.maa12033+this.form.maa12054+this.form.maa12075
        this.form.sd_4_qty2=this.form.maa12013+this.form.maa12034+this.form.maa12055+this.form.maa12076
        //#5
        this.form.sd_5_qty1=this.form.maa12014+this.form.maa12035+this.form.maa12056+this.form.maa12077
        this.form.sd_5_qty2=this.form.maa12015+this.form.maa12036+this.form.maa12057+this.form.maa12078
        //#6
        this.form.sd_6_qty1=this.form.maa12037+this.form.maa12058+this.form.maa12078
        this.form.sd_6_qty2=this.form.maa12038+this.form.maa12059+this.form.maa12079
        //#7
        this.form.sd_7_qty1=this.form.maa12039+this.form.maa12060+this.form.maa12080
        this.form.sd_7_qty2=this.form.maa12040+this.form.maa12061+this.form.maa12081
        //#8
        this.form.sd_8_qty1=this.form.maa12041+this.form.maa12062+this.form.maa12082
        this.form.sd_8_qty2=this.form.maa12042+this.form.maa12063+this.form.maa12083
        //#10
        this.form.sd_10_qty1=this.form.maa12045+this.form.maa12066+this.form.maa12087
        this.form.sd_10_qty2=this.form.maa12046+this.form.maa12067+this.form.maa12088

        this.form.sdqty1=this.form.sd_3_qty1+this.form.sd_4_qty1+this.form.sd_5_qty1+this.form.sd_6_qty1+this.form.sd_7_qty1+this.form.sd_8_qty1+this.form.sd_10_qty1
        this.form.sdqty2=this.form.sd_3_qty2+this.form.sd_4_qty2+this.form.sd_5_qty2+this.form.sd_6_qty2+this.form.sd_7_qty2+this.form.sd_8_qty2+this.form.sd_10_qty2

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


