<template>
  <div class="app-container">
    <div class="block">
      <el-button type="success" size="mini" icon="el-icon-plus"  @click.native="add">{{ $t('button.add') }}</el-button>
    </div>

    <tree-table
    :data="data"
    :expandAll="expandAll"
    highlight-current-row
    border>

      <el-table-column label="名稱" >
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="選單編號" >
        <template slot-scope="scope">
          <span >{{scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="組件" >
        <template slot-scope="scope">
          <span >{{scope.row.component}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否是選單" >
        <template slot-scope="scope">
          <span >{{scope.row.isMenuName}}</span>
        </template>
      </el-table-column>
        <el-table-column label="URL">
          <template slot-scope="scope">
            <span >{{scope.row.url}}</span>
          </template>
      </el-table-column>
      <el-table-column label="是否啟用">
        <template slot-scope="scope">
          <span >{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否隱藏">
        <template slot-scope="scope">
          <span >{{scope.row.hidden}}</span>
        </template>
      </el-table-column>
      <el-table-column label="顺序">
        <template slot-scope="scope">
          <span >{{scope.row.num}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </tree-table>

      <el-dialog
        :title="formTitle"
        :visible.sync="formVisible"
        width="70%">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名稱" prop="name">
                <el-input v-model="form.name" minlength=1></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="請求地址" prop="url">
                <el-input v-model="form.url"  minlength=1></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="是否是選單">
                <el-radio-group v-model="form.ismenu">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否啟用">
                <el-radio-group v-model="form.status">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="選單編號" prop="code">
                <el-input v-model="form.code"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="组件" prop="num">
                <el-input v-model="form.component"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="是否隱藏">
                <el-radio-group v-model="form.hidden">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="圖示" >
                <el-input v-model="form.icon"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" prop="num">
                <el-input type="number" v-model="form.num"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="上階選單" >
                <el-input
                  placeholder="請選擇上階選單"
                  v-model="form.pname"
                  readonly="readonly"
                  @click.native="showTree = !showTree">
                </el-input>
                <el-tree v-if="showTree"
                         empty-text="暫無資料"
                         :expand-on-click-node="false"
                         :data="data"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                         class="input-tree">
                </el-tree>

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

<script src="./menu.js"></script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>
