<template>
  <div class="app-container">
    <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    <br>
    <center><el-button type="primary" size="small" icon="el-icon-download" @click.native="exportXls">格式下載</el-button></center>
    
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
    <br>
    <center><el-button type="success" size="small" icon="el-icon-upload" @click.native="add">資料上傳</el-button></center>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { exportXls } from '@/api/sales/sla01'
import { getApiUrl } from '@/utils/utils'

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header }) {
      this.tableData = results
      this.tableHeader = header
    },
    add() {
      if(this.tableData == ''){
        this.$message({
          message: '請上傳需要新增的資料。',
          type: 'error'
        })
        return
      }
      
      this.$message({
        message: '上傳成功。',
        type: 'success'
      })
      this.tableData = ''
      
    },
    exportXls() {
      
      exportXls('7','2021001').then(response => {
        window.location.href= getApiUrl() + '/file/download?idFile='+response.data.id
      })
      
      //window.location.href= getApiUrl() + '/file/download?idFile=37'
    }
  }
}
</script>
