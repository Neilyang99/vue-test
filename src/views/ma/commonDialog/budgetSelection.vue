<template>
  <el-dialog title="工程預算項目挑選" :visible.sync="dialogFormVisible" width="800px">

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange" style="width: 100%" :header-cell-style="{textAlign: 'center'}">
      <el-table-column label="大類別">
        <template slot-scope="scope">
          {{scope.row.maa01a010}}
        </template>
      </el-table-column>
      <el-table-column label="小類別">
        <template slot-scope="scope">
          {{scope.row.maa01a011}}
        </template>
      </el-table-column>
      <el-table-column :min-width="200" label="項目名稱">
        <template slot-scope="scope">
          {{scope.row.maa01a013}}
        </template>
      </el-table-column>
      <el-table-column :min-width="40"  label="單位">
        <template slot-scope="scope">
          {{scope.row.maa01a014}}
        </template>
      </el-table-column>
      <el-table-column label="數量" align="right">
        <template slot-scope="scope">
          {{scope.row.maa01a015}}
        </template>
      </el-table-column>
      <el-table-column label="單價" align="right">
        <template slot-scope="scope">
          {{scope.row.maa01a016}}
        </template>
      </el-table-column>
      
      
    </el-table>
    <el-pagination 
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        :current-page.sync="listQuery.page"
        @size-change="changeSize"
        @current-change="fetchPage"
        @prev-click="fetchPrev"
        @next-click="fetchNext">
    </el-pagination>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">關 閉</el-button>
      <el-button @click="cancelSelection()">取消挑選</el-button>
      <el-button type="primary" @click="selectItem()">確 認</el-button>
    </div>
  </el-dialog>

</template>
  
<script>
  import { getList } from '@/api/ma/maa01a'

  export default {
    name: "budgetSelection",
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
        },
        formLabelWidth: '120px',
        listQuery: {
          page: 1,
          limit:10,
          projectId: undefined,
          lv2:0
        },
        total: 0,
        list: null,
        listLoading: true,
        selRow: {},
        ctlObj: {
          id: 0,
          item: '',
          unit:'',
          qty:'',
          price:''
        }
      }
    },
    created() {
      
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
      handleCurrentChange(currentRow, oldCurrentRow) {
        this.selRow = currentRow
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
      showDialog(projectId) {
        //TODO: test
        this.listQuery.projectId = projectId
        this.fetchData()
        this.dialogFormVisible = true
      },
      selectItem(){
        // $emit触发当前实例上的事件
        // 触发父组件的children事件，将this.form回传过去
        if (this.checkSel()) {
          this.ctlObj.id = this.selRow.id
          this.ctlObj.item = this.selRow.maa01a013
          this.ctlObj.unit = this.selRow.maa01a014
          this.ctlObj.qty = this.selRow.maa01a015
          this.ctlObj.price = this.selRow.maa01a016
          this.$emit('children',this.ctlObj)
          // 关闭对话框
          this.dialogFormVisible = false
        }
      },
      cancelSelection(){
        this.ctlObj.id = 0
        this.ctlObj.item = ''
        this.ctlObj.unit = ''
        this.ctlObj.qty = ''
        this.ctlObj.price = ''
        this.$emit('children',this.ctlObj)
        // 关闭对话框
        this.dialogFormVisible = false
      }
    }
  }
</script>