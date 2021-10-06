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
        <el-col :span="6" align="middle"><label>客戶姓名: {{order.sla20008}}</label></el-col>
        <el-col :span="3" align="middle"><label>棟別: {{order.sla20041}}</label></el-col>
        <el-col :span="3" align="middle"><label>戶號: {{order.sla20042}}</label></el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="驗收日期">
        <template slot-scope="scope">
          {{scope.row.sla24005}}
        </template>
      </el-table-column>
      <el-table-column label="驗收類別">
        <template slot-scope="scope">
          {{scope.row.sla24004Name}}
        </template>
      </el-table-column>
      <el-table-column label="項目分類">
        <template slot-scope="scope">
          {{scope.row.sla24006Name}}
        </template>
      </el-table-column>
      <el-table-column label="備註">
        <template slot-scope="scope">
          {{scope.row.sla24009}}
        </template>
      </el-table-column>
      <el-table-column label="完成日期">
        <template slot-scope="scope">
          {{scope.row.sla24008}}
        </template>
      </el-table-column>
       <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="success" icon="el-icon-log" size="mini" @click.native="setConfirm(scope.row.id)" v-if="scope.row.sla24008 === '' ">完工確認</el-button>
          <el-button type="info" icon="el-icon-log" size="mini" @click.native="cancelFDate(scope.row.id)" v-if="scope.row.sla24008 != '' ">取消確認</el-button>
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
            <el-form-item label="驗收類別"   prop="sla24004" >
                <el-select  v-model="form.sla24004" placeholder="請選擇">
                  <el-option
                    v-for="item in sla24004List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="驗收日期" prop="sla24005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla24005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="項目分類" prop="sla24006">
              <el-select  v-model="form.sla24006" placeholder="請選擇">
                <el-option
                   v-for="item in sla24006List"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="24">
            <el-form-item label="驗收項目" prop="sla24007" >
              <el-input v-model="form.sla24007" type="textarea" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>  
        <el-row>  
          <el-col :span="24">
            <el-form-item label="備註說明" prop="sla24009" >
              <el-input v-model="form.sla24009" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <el-form-item>
          <el-button type="primary" @click="save"  :disabled="form.sla24008 != ''" >{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <el-dialog
      :title="form1Title"
      :visible.sync="form1Visible"
      width="70%">
      <el-form ref="form1" :model="form1" :rules="rules1" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="完成日期" prop="sla24008" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form1.sla24008" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="confirm">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="form1Visible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

  </div>
</template>

<script src="./sla24.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

