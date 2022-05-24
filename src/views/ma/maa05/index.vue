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
    <div class="block">
      <el-row>
        <el-col :span="10">
          工程案名稱: {{projectName}}
        </el-col>
        <el-col :span="8">
          {{formTitle}}
        </el-col>
      </el-row>
    </div>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row @current-change="handleCurrentChange">

      <el-table-column label="澆置日期">
        <template slot-scope="scope">
          {{scope.row.maa05005}}
        </template>
      </el-table-column>
      <el-table-column label="澆置位置">
        <template slot-scope="scope">
          {{scope.row.maa05004}}
        </template>
      </el-table-column>
      <el-table-column label="設計強度">
        <template slot-scope="scope">
          {{scope.row.maa05006}}
        </template>
      </el-table-column>
      <el-table-column label="供貨廠商">
        <template slot-scope="scope">
          {{scope.row.maa05007}}
        </template>
      </el-table-column>
      <el-table-column label="數量">
        <template slot-scope="scope">
          {{scope.row.maa05008}}
        </template>
      </el-table-column>
      <el-table-column label="7天試驗日期">
        <template slot-scope="scope">
          {{scope.row.maa05010}}
        </template>
      </el-table-column>
      <el-table-column label="7天試驗合格">
        <template slot-scope="scope">
          {{scope.row.maa05014}}
        </template>
      </el-table-column>
      <el-table-column label="28天試驗日期">
        <template slot-scope="scope">
          {{scope.row.maa05018}}
        </template>
      </el-table-column>
      <el-table-column label="28天試體1合格">
        <template slot-scope="scope">
          {{scope.row.maa05023}}
        </template>
      </el-table-column>
      <el-table-column label="28天試體2合格">
        <template slot-scope="scope">
          {{scope.row.maa05027}}
        </template>
      </el-table-column>
      <el-table-column label="28天試體3合格">
        <template slot-scope="scope">
          {{scope.row.maa05031}}
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="70%">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="工程名稱" >{{projectName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="澆置位置" prop="maa05004" >
              <el-input v-model="form.maa05004" maxlength="30"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="澆置日期" prop="maa05005" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa05005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="設計強度" prop="maa05006" >
              <el-input v-model="form.maa05006" maxlength="10"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="供貨廠商" prop="maa05007" >
                <el-select  v-model="form.maa05007" placeholder="請選擇">
                  <el-option
                    v-for="item in maa05007List"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="數量" prop="maa05008" >
              <el-input v-model="form.maa05008" maxlength="200"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試體組數" prop="maa05009" >
              <el-input v-model="form.maa05009" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="7天試驗日期" prop="maa05010" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa05010" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試驗日期(天)" prop="maa05011" >
              <el-input v-model="form.maa05011" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="7天試體強度" prop="maa05012" >
              <el-input v-model="form.maa05012" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="7天試體強度%" prop="maa05013" >
              <el-input v-model="form.maa05013" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合格判定" prop="maa05014" >
              <el-input v-model="form.maa05014" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="28天試驗日期" prop="maa05018" >
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.maa05018" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試驗日期(天)" prop="maa05019" >
              <el-input v-model="form.maa05019" maxlength="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="28天試體1強度" prop="maa05020" >
              <el-input v-model="form.maa05020" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試體1強度%" prop="maa05021" >
              <el-input v-model="form.maa05021" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="試體1養生條件" prop="maa05022" >
              <el-input v-model="form.maa05022" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="合格判定" prop="maa05023" >
              <el-input v-model="form.maa05023" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="28天試體2強度" prop="maa05024" >
              <el-input v-model="form.maa05024" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試體2強度%" prop="maa05025" >
              <el-input v-model="form.maa05025" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="試體2養生條件" prop="maa05026" >
              <el-input v-model="form.maa05026" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="合格判定" prop="maa05027" >
              <el-input v-model="form.maa05027" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="28天試體3強度" prop="maa05028" >
              <el-input v-model="form.maa05028" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="試體3強度%" prop="maa05029" >
              <el-input v-model="form.maa05029" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="試體3養生條件" prop="maa05030" >
              <el-input v-model="form.maa05030" maxlength="6"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="合格判定" prop="maa05031" >
              <el-input v-model="form.maa05031" maxlength="1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="備註" prop="maa05036" >
              <el-input v-model="form.maa05036" maxlength="200"></el-input>
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

<script src="./maa05.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

