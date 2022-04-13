<template>
  <div class="app-container">
    <div class="block">
      <el-row  :gutter="20">
        <el-col :span="6">
          <el-input v-model="listQuery.selSla00003" size="mini" placeholder="請輸入銷售案名稱"></el-input>
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
          <el-button type="info" size="mini" icon="el-icon-s-home" @click.native="house">可售房屋</el-button>
          <el-button type="info" size="mini" icon="el-icon-truck" @click.native="carPosition">車位</el-button>
          <el-button type="info" size="mini" icon="el-icon-upload" @click.native="houseUpload">房屋資料上傳</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row
      @current-change="handleCurrentChange">
      <el-table-column label="銷售案代號">
        <template slot-scope="scope">
          {{scope.row.sla00002}}
        </template>
      </el-table-column>
      <el-table-column label="銷售案名稱">
        <template slot-scope="scope">
          {{scope.row.sla00003}}
        </template>
      </el-table-column>
      <el-table-column label="進場日期">
        <template slot-scope="scope">
          {{scope.row.sla00007}}
        </template>
      </el-table-column>
      <el-table-column label="開始銷售日">
        <template slot-scope="scope">
          {{scope.row.sla00008}}
        </template>
      </el-table-column>
      <el-table-column label="結案銷售日">
        <template slot-scope="scope">
          {{scope.row.sla00009}}
        </template>
      </el-table-column>
      <el-table-column label="銷售狀態" width="120">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-log" size="mini" @click.native="startToSale(scope.row.id,'Y')"
                     v-if="scope.row.sla00041===''">未銷售</el-button>
          <el-button type="success" icon="el-icon-log" size="mini" @click.native="startToSale(scope.row.id,'P')"
                     v-if="scope.row.sla00041==='Y'">已銷售</el-button>
          <el-button type="warning" icon="el-icon-log" size="mini" @click.native="startToSale(scope.row.id,'Y')"
                     v-if="scope.row.sla00041==='P'">暫停銷售</el-button>           
          <el-button type="danger" icon="el-icon-log" size="mini" @click.native="startToSale(scope.row.id,'N')"
                     v-if="scope.row.sla00041==='N'">不銷售</el-button>           
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="formTitle"
      :visible.sync="formVisible"
      width="76%">
      <el-form ref="form" :model="form" :rules="rules" label-width="160px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="銷售案代號" prop="sla00002">
              <el-input v-model="form.sla00002"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="基地地號" prop="sla00004">
              <el-input v-model="form.sla00004"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row> 
          <el-col :span="12">
            <el-form-item label="銷售案名稱" prop="sla00003">
              <el-input v-model="form.sla00003"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>    
          <el-col :span="6">
            <el-form-item label="工地開工日期" prop="sla00005">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla00005" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工地完工日期" prop="sla00006">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla00006" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="進場日期" prop="sla00007">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla00007" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="開始銷售日期" prop="sla00008">
              <el-date-picker type="date" value-format="yyyyMMdd" placeholder="選擇日期" v-model="form.sla00008" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="可售透天店面數" prop="sla00011">
              <el-input v-model="form.sla00011"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可售透天住家數" prop="sla00012">
              <el-input v-model="form.sla00012"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可售大樓店面數" prop="sla00013">
              <el-input v-model="form.sla00013"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可售大樓住家數" prop="sla00014">
              <el-input v-model="form.sla00014"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>  
          <el-col :span="6">
            <el-form-item label="可售平面汽車停車位數" prop="sla00015">
              <el-input v-model="form.sla00015"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可售平面機車停車位數" prop="sla00016">
              <el-input v-model="form.sla00016"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="可售機械汽車停車位數" prop="sla00017">
              <el-input v-model="form.sla00017"></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row>    
          <el-col :span="6">
            <el-form-item label="廣告預算" prop="sla00030">
              <el-input v-model="form.sla00030"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="仲人費用" prop="sla00035">
              <el-input v-model="form.sla00035"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="車位價格" prop="sla00043">
              <el-input v-model="form.sla00043"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>    
          <el-col :span="6">
            <el-form-item label="表價總銷" prop="sla00029">
              <el-input v-model="form.sla00029"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="底價總銷" prop="sla00028">
              <el-input v-model="form.sla00028"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="save">{{ $t('button.submit') }}</el-button>
          <el-button @click.native="formVisible = false">{{ $t('button.cancel') }}</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

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
  </div>
</template>

<script src="./sla00.js"></script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/common.scss";
</style>

