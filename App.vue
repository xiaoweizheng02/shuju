<template>
  <div class="min-h-screen bg-[#0a1929] text-white">
    <!-- 顶部标题栏 -->
    <header class="bg-[#1e293b] border-b border-[#334155] py-4 px-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-[#00aaff]">
          <span class="text-white">全国招聘就业热力数据</span>可视化大屏
        </h1>
        <div class="flex items-center space-x-6">
          <div class="text-sm text-gray-400">
            <span class="text-[#00aaff]">数据来源：</span>
            全国招聘市场监测中心 | 国家统计局 | 人力资源和社会保障部
          </div>
          <div class="text-sm text-gray-300">
            <span class="text-[#00aaff]">更新时间:</span> {{ updateTime }}
          </div>
          <button 
            @click="refreshData"
            class="bg-[#0066cc] hover:bg-[#0052a3] text-white px-3 py-1 rounded-md text-sm transition-colors"
          >
            刷新数据
          </button>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="p-6">
      <!-- 总览数据卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="data-card p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">总岗位数</span>
            <span class="text-xs bg-[#0066cc]/20 text-[#00aaff] px-2 py-0.5 rounded">全网</span>
          </div>
          <div class="text-2xl font-bold mb-2">{{ formatNumber(overview.jobsCount) }}</div>
          <div class="text-xs text-gray-500 mb-1">涵盖：IT互联网、制造业、服务业、金融、教育等20+行业</div>
          <div class="text-xs flex items-center" :class="overview.jobsGrowth >= 0 ? 'text-green-400' : 'text-red-400'">
            <span>{{ overview.jobsGrowth >= 0 ? '↑' : '↓' }}</span>
            <span class="ml-1">{{ Math.abs(overview.jobsGrowth) }}%</span>
            <span class="ml-1 text-gray-400">较上月</span>
          </div>
        </div>
        <div class="data-card p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">活跃求职人数</span>
            <span class="text-xs bg-[#10b981]/20 text-[#10b981] px-2 py-0.5 rounded">全类型</span>
          </div>
          <div class="text-2xl font-bold mb-2">{{ formatNumber(overview.applicantsCount) }}</div>
          <div class="text-xs text-gray-500 mb-1">包含：白领、蓝领、服务业、新职业求职者</div>
          <div class="text-xs flex items-center" :class="overview.applicantsGrowth >= 0 ? 'text-green-400' : 'text-red-400'">
            <span>{{ overview.applicantsGrowth >= 0 ? '↑' : '↓' }}</span>
            <span class="ml-1">{{ Math.abs(overview.applicantsGrowth) }}%</span>
            <span class="ml-1 text-gray-400">较上月</span>
          </div>
        </div>
        <div class="data-card p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">招聘企业数</span>
            <span class="text-xs bg-[#f59e0b]/20 text-[#f59e0b] px-2 py-0.5 rounded">全行业</span>
          </div>
          <div class="text-2xl font-bold mb-2">{{ formatNumber(overview.companiesCount) }}</div>
          <div class="text-xs text-gray-500 mb-1">覆盖：国企、民企、外企、初创公司</div>
          <div class="text-xs flex items-center" :class="overview.companiesGrowth >= 0 ? 'text-green-400' : 'text-red-400'">
            <span>{{ overview.companiesGrowth >= 0 ? '↑' : '↓' }}</span>
            <span class="ml-1">{{ Math.abs(overview.companiesGrowth) }}%</span>
            <span class="ml-1 text-gray-400">较上月</span>
          </div>
        </div>
        <div class="data-card p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-400 text-sm">供需比</span>
            <span class="text-xs bg-[#8b5cf6]/20 text-[#8b5cf6] px-2 py-0.5 rounded">竞争力指标</span>
          </div>
          <div class="text-2xl font-bold mb-2">{{ overview.supplyDemandRatio.toFixed(2) }}</div>
          <div class="text-xs text-gray-500 mb-1">数值越低竞争越激烈，反之机会越多</div>
          <div class="text-xs flex items-center" :class="overview.supplyDemandGrowth >= 0 ? 'text-green-400' : 'text-red-400'">
            <span>{{ overview.supplyDemandGrowth >= 0 ? '↑' : '↓' }}</span>
            <span class="ml-1">{{ Math.abs(overview.supplyDemandGrowth) }}%</span>
            <span class="ml-1 text-gray-400">较上月</span>
          </div>
        </div>
      </div>

      <!-- 岗位类型分布卡片 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="data-card p-4 border-l-4 border-[#00aaff]">
          <div class="text-gray-400 text-sm mb-1">白领岗位</div>
          <div class="text-xl font-bold text-[#00aaff]">{{ formatNumber(whiteCollarCount) }}</div>
          <div class="text-xs text-gray-500">技术、产品、设计等</div>
        </div>
        <div class="data-card p-4 border-l-4 border-[#f59e0b]">
          <div class="text-gray-400 text-sm mb-1">蓝领岗位</div>
          <div class="text-xl font-bold text-[#f59e0b]">{{ formatNumber(blueCollarCount) }}</div>
          <div class="text-xs text-gray-500">普工、操作工、电工等</div>
        </div>
        <div class="data-card p-4 border-l-4 border-[#10b981]">
          <div class="text-gray-400 text-sm mb-1">服务业岗位</div>
          <div class="text-xl font-bold text-[#10b981]">{{ formatNumber(serviceCount) }}</div>
          <div class="text-xs text-gray-500">销售、运营、客服等</div>
        </div>
        <div class="data-card p-4 border-l-4 border-[#8b5cf6]">
          <div class="text-gray-400 text-sm mb-1">新职业岗位</div>
          <div class="text-xl font-bold text-[#8b5cf6]">{{ formatNumber(newJobCount) }}</div>
          <div class="text-xs text-gray-500">AI训练师、直播带货等</div>
        </div>
      </div>

      <!-- 地图区域 -->
      <div class="chart-container p-4 mb-6">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-semibold">全国招聘热力分布</h2>
            <p class="text-xs text-gray-400 mt-1">展示全国31个省市自治区的招聘热度分布，红点表示城市热力点，数值越高表示岗位越集中</p>
          </div>
        </div>
        <div ref="mapRef" style="width: 100%; height: 500px;"></div>
      </div>

      <!-- 中间图表区域 -->
      <div class="grid grid-cols-2 gap-6 mb-6">
        <!-- 热门岗位 -->
        <div class="chart-container p-4">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-lg font-semibold">热门岗位分析</h2>
              <p class="text-xs text-gray-400 mt-1">按岗位类型分类统计，点击标签切换查看不同类别</p>
            </div>
            <div class="flex space-x-2">
              <button 
                v-for="(category, index) in positionCategories" 
                :key="index"
                @click="activePositionCategory = category.value"
                :class="[
                  'px-3 py-1 rounded-md text-xs transition-colors',
                  activePositionCategory === category.value 
                    ? 'bg-[#0066cc] text-white' 
                    : 'bg-[#334155] text-gray-300 hover:bg-[#475569]'
                ]"
              >
                {{ category.label }}
              </button>
            </div>
          </div>
          <div ref="hotPositionsRef" class="h-[300px]"></div>
        </div>

        <!-- 人才流入/流出 -->
        <div class="chart-container p-4">
          <div>
            <h2 class="text-lg font-semibold">人才流入/流出城市</h2>
            <p class="text-xs text-gray-400 mt-1">正值表示人才净流入城市，负值表示人才净流出城市</p>
          </div>
          <div ref="talentFlowRef" class="h-[300px]"></div>
        </div>
      </div>

      <!-- 底部图表区域 -->
      <div class="grid grid-cols-3 gap-6">
        <!-- 岗位发布趋势 -->
        <div class="chart-container p-4">
          <div>
            <h2 class="text-lg font-semibold">近30天岗位发布趋势</h2>
            <p class="text-xs text-gray-400 mt-1">展示近期岗位发布数量的变化趋势，帮助预测市场走势</p>
          </div>
          <div ref="trendRef" class="h-[250px]"></div>
        </div>

        <!-- 行业招聘占比 -->
        <div class="chart-container p-4">
          <div>
            <h2 class="text-lg font-semibold">各行业招聘占比</h2>
            <p class="text-xs text-gray-400 mt-1">IT互联网行业占比最高，其次是制造业和服务业</p>
          </div>
          <div ref="industryRef" class="h-[250px]"></div>
        </div>

        <!-- 薪资分布 -->
        <div class="chart-container p-4">
          <div>
            <h2 class="text-lg font-semibold">岗位薪资分布</h2>
            <p class="text-xs text-gray-400 mt-1">5k-15k薪资区间岗位最多，高端岗位需求持续增长</p>
          </div>
          <div ref="salaryRef" class="h-[250px]"></div>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>数据统计周期：自然日 | 数据更新频率：每小时 | 数据范围：全国范围</p>
        <p class="mt-1">© 2024 全国招聘市场监测中心 - 数据仅供参考</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import mockData from './data/mockData.js';
import * as echarts from 'echarts';
import chinaMapGeoJSON from './data/chinaMap.js';

// 响应式数据
const mapRef = ref(null);
const hotPositionsRef = ref(null);
const talentFlowRef = ref(null);
const trendRef = ref(null);
const industryRef = ref(null);
const salaryRef = ref(null);
const updateTime = ref(new Date().toLocaleString());
const activePositionCategory = ref('all');

// 岗位类别
const positionCategories = [
  { label: '全部', value: 'all' },
  { label: '白领', value: 'white-collar' },
  { label: '蓝领', value: 'blue-collar' },
  { label: '服务业', value: 'service' },
  { label: '新职业', value: 'new' }
];

// 计算属性
const overview = computed(() => mockData.overview);
const hotPositions = computed(() => mockData.hotPositions);
const talentFlow = computed(() => mockData.talentFlow);
const trendData = computed(() => mockData.trendData);
const industryData = computed(() => mockData.industryData);
const salaryData = computed(() => mockData.salaryData);

// 各类岗位数量
const whiteCollarCount = computed(() => {
  return hotPositions.value
    .filter(p => p.category === 'white-collar')
    .reduce((sum, p) => sum + p.jobsCount, 0);
});

const blueCollarCount = computed(() => {
  return hotPositions.value
    .filter(p => p.category === 'blue-collar')
    .reduce((sum, p) => sum + p.jobsCount, 0);
});

const serviceCount = computed(() => {
  return hotPositions.value
    .filter(p => p.category === 'service')
    .reduce((sum, p) => sum + p.jobsCount, 0);
});

const newJobCount = computed(() => {
  return hotPositions.value
    .filter(p => p.category === 'new')
    .reduce((sum, p) => sum + p.jobsCount, 0);
});

// 方法
const formatNumber = (num) => {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  return num.toLocaleString();
};

const refreshData = () => {
  updateTime.value = new Date().toLocaleString();
  initCharts();
};

const loadChinaMap = () => {
  return new Promise((resolve, reject) => {
    console.log('🚀 开始加载中国地图...');
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(geoJson => {
        console.log('✅ 中国地图数据加载成功！');
        echarts.registerMap('china', geoJson);
        console.log('✅ 中国地图注册成功！');
        resolve();
      })
      .catch(err => {
        console.error('❌ 外部地图加载失败，使用本地数据:', err);
        try {
          echarts.registerMap('china', chinaMapGeoJSON);
          console.log('✅ 使用本地地图数据注册成功！');
          resolve();
        } catch (localErr) {
          console.error('❌ 本地地图注册也失败:', localErr);
          reject(localErr);
        }
      });
  });
};

const initMapChart = () => {
  if (!mapRef.value) return;
  
  const chart = echarts.init(mapRef.value);
  
  const mapOption = {
    backgroundColor: '#0a1929',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10, 25, 41, 0.9)',
      borderColor: '#3ba0ff',
      textStyle: {
        color: '#fff'
      },
      formatter: function(params) {
        if (params.data && params.data.value && params.data.value.length > 2) {
          return `${params.name}<br/>岗位热度: ${params.data.value[2]}`;
        }
        return params.name;
      }
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        color: ['#0066cc', '#00aaff', '#ff5722']
      }
    },
    series: [
      {
        name: '中国地图',
        type: 'map',
        map: 'china',
        roam: true,
        zoom: 1.2,
        center: [104.114129, 37.550339],
        label: {
          show: true,
          color: '#8fa3bf',
          fontSize: 10,
          fontWeight: 'normal'
        },
        itemStyle: {
          areaColor: '#1e3a5f',
          borderColor: '#3ba0ff',
          borderWidth: 1.5
        },
        emphasis: {
          itemStyle: {
            areaColor: '#2a5a8f'
          },
          label: {
            color: '#fff',
            fontWeight: 'bold'
          }
        },
        data: []
      },
      {
        name: '城市热力点',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        data: [
          { name: '北京', value: [116.403874, 39.914885, 95] },
          { name: '上海', value: [121.473701, 31.230416, 92] },
          { name: '广州', value: [113.264385, 23.129110, 90] },
          { name: '深圳', value: [114.057868, 22.543096, 88] },
          { name: '杭州', value: [120.153576, 30.287459, 85] },
          { name: '成都', value: [104.065735, 30.659462, 75] },
          { name: '重庆', value: [106.551559, 29.563009, 70] },
          { name: '武汉', value: [114.305539, 30.593098, 68] },
          { name: '南京', value: [118.767413, 32.041598, 65] },
          { name: '西安', value: [108.948024, 34.261986, 60] },
          { name: '苏州', value: [120.6293, 31.3299, 58] },
          { name: '郑州', value: [113.6243, 34.7466, 55] },
          { name: '长沙', value: [112.9388, 28.2281, 52] },
          { name: '青岛', value: [120.3316, 36.0671, 50] },
          { name: '宁波', value: [121.5448, 29.8756, 48] }
        ],
        symbolSize: function(val) {
          return val[2] / 3;
        },
        rippleEffect: {
          brushType: 'stroke',
          color: '#ff5722',
          period: 3,
          scale: 2.5
        },
        itemStyle: {
          color: '#ff5722',
          shadowBlur: 15,
          shadowColor: 'rgba(255, 87, 34, 0.6)'
        },
        label: {
          show: true,
          color: '#fff',
          fontSize: 10,
          fontWeight: 'bold'
        }
      }
    ]
  };

  chart.setOption(mapOption);
  window.addEventListener('resize', () => chart.resize());
};

// 初始化热门岗位图表
const initHotPositionsChart = () => {
  if (!hotPositionsRef.value) return;
  
  const chart = echarts.init(hotPositionsRef.value);
  
  let filteredPositions = hotPositions.value;
  if (activePositionCategory.value !== 'all') {
    filteredPositions = hotPositions.value.filter(item => item.category === activePositionCategory.value);
  }
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: filteredPositions.map(item => item.name),
      axisLabel: {
        rotate: 45,
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return (value / 1000).toFixed(0) + 'k';
        }
      }
    },
    series: [{
      name: '岗位数量',
      type: 'bar',
      data: filteredPositions.map(item => item.jobsCount),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#0066cc' },
          { offset: 1, color: '#00aaff' }
        ])
      }
    }]
  };
  
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
};

// 初始化人才流入/流出图表
const initTalentFlowChart = () => {
  if (!talentFlowRef.value) return;
  
  const chart = echarts.init(talentFlowRef.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: talentFlow.value.map(item => item.name),
      axisLabel: {
        fontSize: 11
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [{
      name: '人才流动率',
      type: 'bar',
      data: talentFlow.value.map(item => item.flow),
      itemStyle: {
        color: function(params) {
          return params.value >= 0 ? '#10b981' : '#ef4444';
        }
      }
    }]
  };
  
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
};

// 初始化岗位发布趋势图表
const initTrendChart = () => {
  if (!trendRef.value) return;
  
  const chart = echarts.init(trendRef.value);
  
  const option = {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: trendData.value.map(item => item.date),
      axisLabel: {
        fontSize: 8
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return (value / 1000).toFixed(0) + 'k';
        }
      }
    },
    series: [{
      name: '岗位数量',
      type: 'line',
      data: trendData.value.map(item => item.jobsCount),
      smooth: true,
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(0, 102, 204, 0.3)' },
          { offset: 1, color: 'rgba(0, 102, 204, 0.1)' }
        ])
      },
      lineStyle: {
        color: '#0066cc'
      },
      itemStyle: {
        color: '#00aaff'
      }
    }]
  };
  
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
};

// 初始化行业招聘占比图表
const initIndustryChart = () => {
  if (!industryRef.value) return;
  
  const chart = echarts.init(industryRef.value);
  
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}% ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        fontSize: 10
      }
    },
    series: [{
      name: '行业占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#0a1929',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: industryData.value
    }]
  };
  
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
};

// 初始化薪资分布图表
const initSalaryChart = () => {
  if (!salaryRef.value) return;
  
  const chart = echarts.init(salaryRef.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: salaryData.value.map(item => item.range)
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: function(value) {
          return (value / 10000).toFixed(1) + '万';
        }
      }
    },
    series: [{
      name: '岗位数量',
      type: 'bar',
      data: salaryData.value.map(item => item.count),
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#0066cc' },
          { offset: 1, color: '#00aaff' }
        ])
      }
    }]
  };
  
  chart.setOption(option);
  window.addEventListener('resize', () => chart.resize());
};

const initCharts = async () => {
  await nextTick();
  await loadChinaMap();
  
  if (mapRef.value) {
    initMapChart();
  } else {
    console.error('❌ mapRef is null');
  }
  
  if (hotPositionsRef.value) {
    initHotPositionsChart();
  } else {
    console.error('❌ hotPositionsRef is null');
  }
  
  if (talentFlowRef.value) {
    initTalentFlowChart();
  } else {
    console.error('❌ talentFlowRef is null');
  }
  
  if (trendRef.value) {
    initTrendChart();
  } else {
    console.error('❌ trendRef is null');
  }
  
  if (industryRef.value) {
    initIndustryChart();
  } else {
    console.error('❌ industryRef is null');
  }
  
  if (salaryRef.value) {
    initSalaryChart();
  } else {
    console.error('❌ salaryRef is null');
  }
};

import { watch } from 'vue';
watch(activePositionCategory, () => {
  initHotPositionsChart();
});

onMounted(async () => {
  await nextTick();
  setTimeout(() => {
    initCharts();
  }, 100);
});
</script>

<style scoped>
.data-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 8px;
  border: 1px solid rgba(0, 170, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 170, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.data-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0066cc, #00aaff);
}

.data-card:hover {
  box-shadow: 0 6px 30px rgba(0, 170, 255, 0.2);
  transform: translateY(-2px);
  border-color: rgba(0, 170, 255, 0.5);
}

.chart-container {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-radius: 8px;
  border: 1px solid rgba(0, 170, 255, 0.3);
  box-shadow: 0 4px 20px rgba(0, 170, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.chart-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, #0066cc, #00aaff);
}
</style>
