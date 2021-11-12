import { getList } from '@/api/sales/visitorReport'

export default {
  data() {
    return {
      formVisible: false,
      formTitle: '',
      isAdd: true,
      form: {
        id: ''
      },
      rules: {
        
      },
      listQuery: {
        page: 1,
        limit:20,
        selSla00003: undefined
      },
      total: 0,
      list: null,
      listLoading: true,
      selRow: {}
    }
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
    search() {
      this.listQuery.page = 1
      this.fetchData()
    },
    reset() {
      this.listQuery.selSla00003 = ''
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
    mdeiaAnalysis(projectCode) {
      this.$router.push({ path: '/mediaReport', query: { projectCode: projectCode, reportType:'MEDIA' }})
    },
    areaAnalysis(projectCode) {
      this.$router.push({ path: '/mediaReport', query: { projectCode: projectCode, reportType:'AREA' }})
    },
    motivationAnalysis(projectCode) {
      this.$router.push({ path: '/mediaReport', query: { projectCode: projectCode, reportType:'MOTIVATION' }})
    },
    ageAnalysis(projectCode) {
      this.$router.push({ path: '/mediaReport', query: { projectCode: projectCode, reportType:'AGE' }})
    },
    careerAnalysis(projectCode) {
      this.$router.push({ path: '/mediaReport', query: { projectCode: projectCode, reportType:'CAREER' }})
    },
    orderAnalysis(projectId) {
      this.$router.push({ path: '/orderCause', query: { projectId: projectId, reportType:'BUY' }})
    },
    notOrderAnalysis(projectId) {
      this.$router.push({ path: '/orderCause', query: { projectId: projectId, reportType:'NOBUY' }})
    },
    notDealAgain(projectCode) {
      this.$router.push({ path: '/notDealAgain', query: { projectCode: projectCode, reportType:'NOTDEAL' }})
    },
    houseTypeAnalysis(projectId) {
      this.$router.push({ path: '/houseType', query: { projectId: projectId }})
    },
    saleStatus(projectId) {
      this.$router.push({ path: '/saleStatus', query: { projectId: projectId }})
    },
    weeklyReport(projectId) {
      this.$router.push({ path: '/weeklyReport', query: { projectId: projectId }})
    }
  }
}
