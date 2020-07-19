
<template style="height:100%">
    <div style="height:100%">
        <el-container style="height:100%">
            <el-header class="title_s" style="color:#2e3255">
                  {{this.title}}
            </el-header>
            <el-container style="margin-left:150px;margin-right:150px;height:100%;padding-right:30px">
              <el-main id = 'main' style="height:100%;width:100%">
                <el-menu
                  background-color='#f3f3f4'
                  router:true
                  default-active="5"
                  active-text-color="#000000"
                  text-color="#eb5264"
                  class="el-menu-demo"
                  mode="horizontal"
                  style="display:flex;flex-direction:row;align-content:center;justify-content:space-around;margin-bottom:20px"
                  @select="handleSelect">
                  <el-menu-item index="1" width><router-link to="/"   style="text-decoration:none">历史记录展示</router-link></el-menu-item>
                  <el-submenu index="2" style="font-size:10px">
                    <template slot="title">股价预测展示</template>
                    <router-link to="/predict" style="text-decoration:none"><el-menu-item index="2-1"><i class="el-icon-menu"></i>LSTM(长短时记忆)</el-menu-item></router-link>
                    <router-link to="/preSVM" style="text-decoration:none"><el-menu-item index="2-2" ><i class="el-icon-menu"></i>SVM(支持向量机)</el-menu-item></router-link>
                    <router-link to="/preLR" style="text-decoration:none"><el-menu-item index="2-3" ><i class="el-icon-menu"></i>LR(逻辑回归)</el-menu-item></router-link>
                  </el-submenu>
                  <el-submenu index="3" style="font-size:14px">
                    <template slot="title">买卖点及回测展示</template>
                    <router-link to="/comLSTM" style="text-decoration:none"><el-menu-item index="3-1"><i class="el-icon-menu"></i>LSTM(长短时记忆)</el-menu-item></router-link>
                    <router-link to="/comSVM" style="text-decoration:none"><el-menu-item index="3-2"><i class="el-icon-menu"></i>SVM(支持向量机)</el-menu-item></router-link>
                    <router-link to="/comLR" style="text-decoration:none"><el-menu-item index="3-3"><i class="el-icon-menu"></i>LR(逻辑回归)</el-menu-item></router-link>
                  </el-submenu>
                  <el-menu-item index="5" width><router-link to="/kg" style="text-decoration:none">知识图谱展示</router-link></el-menu-item>
                </el-menu>
                <!--search-->
                
                <!--结果图-->
                <div style="background:#EBEEF5;height:100%;margin-top:20px;margin-left:30px;margin-right:30px;margin-top:30px">
                  <img :src="require('@/assets/graph.png')" style="width:100%;height:100%" />
                </div>
              </el-main>
            </el-container>
        </el-container>
    </div>
</template>



<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
import Vue from 'vue';

export default {
  name: 'BG',
  data () {
    return {
      title:'股票量化分析系统',
      activeIndex: '1',
      activeIndex2: '1',
      code: '',
      placeholder:"请输入内容",
      imgsrc2:'D:/software/python/project/stock/bishe_ui/stock_quantity/static/graph.png',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: ''
    }
  },
  methods: {
    handleSelect(key, keyPath) {
    console.log(key, keyPath);
    }
  }
}


</script>

<style type="text/css" >
.title_s{
  font-family: "PingFang SC";
  font-size: 40px;
  color: #409EFF;
  margin-bottom: 30px
};
.container_s{
  background: rgb(0, 255, 234);
  width:100%;
  margin-left: 150px
};
.main{
  width:1000px;
  background: #409EFF;
};
.aside_s{
  width: 500px;
  margin-left:200px;
  margin-top:200px
};
.input{
  width:100px
}

</style>