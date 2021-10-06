<template>
  <div class="app-container">
    <div class="block">
      <el-row>
        <el-col :span="24">
          <el-button icon="el-icon-back" size="mini" @click.native="back">{{ $t('button.back') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
        </el-col>
      </el-row>
    </div>
    <br>
    <div class="block">
      <el-row >
        <el-col :span="3" align="middle"><label>客戶姓名: {{order.sla20008}}</label></el-col>
        <el-col :span="3" align="middle"><label>棟別: {{order.sla20041}}</label></el-col>
        <el-col :span="3" align="middle"><label>戶號: {{order.sla20042}}</label></el-col>
        <el-col :span="3" align="middle"><label>成交總價: {{order.sla20068}}</label></el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="收款日期">
        <template slot-scope="scope">
          {{scope.row.sla23005}}
        </template>
      </el-table-column>
      <el-table-column label="收款類別">
        <template slot-scope="scope">
          {{scope.row.sla23031Name}}
        </template>
      </el-table-column>
      <el-table-column label="收款方式">
        <template slot-scope="scope">
          {{scope.row.sla23006Name}}
        </template>
      </el-table-column>
      <el-table-column label="收款金額">
        <template slot-scope="scope">
          {{scope.row.sla23008}}
        </template>
      </el-table-column>

    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="收款類別"   prop="sla23031" >
                <el-select  v-model="form.sla23031" placeholder="請選擇">
                  <el-option
                    v-for="item in sla23031List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="期款名稱" prop="sla23033"  v-if="form.sla23031 == 40">
                <el-input v-model="form.sla23033" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="收款日期" prop="sla23005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla23005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款方式" prop="sla23006">
              <el-select  v-model="form.sla23006" placeholder="請選擇">
                <el-option
                   v-for="item in sla23006List"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款金額" prop="sla23008" >
              <el-input v-model="form.sla23008"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="24">
            <el-form-item label="收款銀行代號" prop="sla23045" >
              <el-input v-model="form.sla23045"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="24">
            <el-form-item label="收款銀行帳號" prop="sla23046" >
              <el-input v-model="form.sla23046" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="12">
            <el-form-item label="支票號碼" prop="sla23047" >
              <el-input v-model="form.sla23047" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="票據到期日" prop="sla23048" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla23048" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./sla23.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

