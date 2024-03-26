<template>
  <el-dialog title="外包商挑選" :visible.sync="dialogFormVisible" width="500px">
    <el-table :data="list" border fit highlight-current-row @current-change="handleCurrentChange">
      <el-table-column label="統一編號">
        <template slot-scope="scope">
          {{scope.row.maa93011}}
        </template>
      </el-table-column>
      <el-table-column label="廠商名稱">
        <template slot-scope="scope">
          {{scope.row.maa93004}}
        </template>
      </el-table-column>
      <el-table-column label="功能">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setSelectionValue(scope.row.id,scope.row.maa93004)">選擇</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
  
<script>
  import { getList } from '@/api/ma/maa93'

  export default {
    name: "budgetSelection",
    data() {
      return {
        dialogFormVisible: false,
        listQuery: {
          page: 1,
          limit:10,
        },
        total: 0,
        list: null,
        listLoading: true,
        selRow: {},
        ctlObj: {
          id: 0,
          name: ''
        }
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
      handleCurrentChange(currentRow, oldCurrentRow) {
        this.selRow = currentRow
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
      showDialog() {
        this.dialogFormVisible = true
      },
      setSelectionValueOld(){
        // $emit触发当前实例上的事件
        // 触发父组件的children事件，将this.form回传过去
        if (this.checkSel()) {
          this.ctlObj.id = this.selRow.id
          this.ctlObj.name = this.selRow.maa93004
          this.$emit('children',this.ctlObj)
          // 关闭对话框
          this.dialogFormVisible = false
        }
        
      },
      setSelectionValue(id,name){
        // $emit触发当前实例上的
        // 触发父组件的children事件，将obj回传过去事件
        this.ctlObj.id = id
        this.ctlObj.name = name
        this.$emit('children',this.ctlObj)
        // 关闭对话框
        this.dialogFormVisible = false
      }
    }
  }
</script>