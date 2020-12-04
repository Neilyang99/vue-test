<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.sla10006" size="mini" placeholder="请输入銷售案號"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="success" size="mini" icon="el-icon-search" @click.native="search">{{ $t('button.search') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-refresh" @click.native="reset">{{ $t('button.reset') }}</el-button>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <el-col :span="24">
          <el-button type="success" size="mini" icon="el-icon-plus" @click.native="add">{{ $t('button.add') }}</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click.native="edit">{{ $t('button.edit') }}</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click.native="remove">{{ $t('button.delete') }}</el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click.native="info">可售房屋</el-button>
          <el-button type="info" size="mini" icon="el-icon-caret-bottom" @click.native="info">車位</el-button>
          <el-button type="info" size="mini" icon="el-icon-view" @click.native="info">銷售員</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table>
      <el-table-column label="銷售案號">
        <template slot-scope="scope">
        </template>
      </el-table-column>
      <el-table-column label="銷售案名稱"></el-table-column>
      <el-table-column label="基地地號"></el-table-column>
      <el-table-column label="開始銷售日"></el-table-column>
      <el-table-column label="結案銷售日"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
        <el-button icon="el-icon-log" size="mini" @click.native="viewLog(scope.row.sla10001)">查看訪談紀錄</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-form-item label="銷售案號"  >
              <el-select  v-model="form.building" filterable placeholder="请选择">
                <el-option
                  v-for="item in buildingList"
                  :key="item.id"
                  :label="item.sla00003"
                  :value="item.sla00002">
                </el-option>
              </el-select>
          </el-form-item>

        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./sla00.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

