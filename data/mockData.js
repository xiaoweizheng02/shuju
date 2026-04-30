// 全国招聘就业热力数据可视化大屏模拟数据

// 总览数据
const overview = {
  jobsCount: 125800,
  jobsGrowth: 8.2,
  applicantsCount: 342500,
  applicantsGrowth: 5.6,
  companiesCount: 18500,
  companiesGrowth: 3.4,
  supplyDemandRatio: 0.85,
  supplyDemandGrowth: 2.1,
  momGrowth: 6.8
}

// 地图数据
const mapData = [
  { name: '北京', value: { jobs: 95, applicants: 88, supplyDemand: 0.92 } },
  { name: '天津', value: { jobs: 65, applicants: 58, supplyDemand: 0.89 } },
  { name: '河北', value: { jobs: 58, applicants: 62, supplyDemand: 0.94 } },
  { name: '山西', value: { jobs: 45, applicants: 48, supplyDemand: 1.03 } },
  { name: '内蒙古', value: { jobs: 38, applicants: 42, supplyDemand: 1.12 } },
  { name: '辽宁', value: { jobs: 62, applicants: 55, supplyDemand: 0.89 } },
  { name: '吉林', value: { jobs: 48, applicants: 52, supplyDemand: 1.08 } },
  { name: '黑龙江', value: { jobs: 42, applicants: 46, supplyDemand: 1.10 } },
  { name: '上海', value: { jobs: 92, applicants: 85, supplyDemand: 0.91 } },
  { name: '江苏', value: { jobs: 88, applicants: 78, supplyDemand: 0.89 } },
  { name: '浙江', value: { jobs: 85, applicants: 75, supplyDemand: 0.88 } },
  { name: '安徽', value: { jobs: 55, applicants: 60, supplyDemand: 1.09 } },
  { name: '福建', value: { jobs: 72, applicants: 65, supplyDemand: 0.90 } },
  { name: '江西', value: { jobs: 48, applicants: 55, supplyDemand: 1.15 } },
  { name: '山东', value: { jobs: 75, applicants: 68, supplyDemand: 0.91 } },
  { name: '河南', value: { jobs: 60, applicants: 65, supplyDemand: 1.08 } },
  { name: '湖北', value: { jobs: 68, applicants: 62, supplyDemand: 0.91 } },
  { name: '湖南', value: { jobs: 58, applicants: 60, supplyDemand: 1.03 } },
  { name: '广东', value: { jobs: 90, applicants: 82, supplyDemand: 0.91 } },
  { name: '广西', value: { jobs: 45, applicants: 50, supplyDemand: 1.11 } },
  { name: '海南', value: { jobs: 38, applicants: 42, supplyDemand: 1.10 } },
  { name: '重庆', value: { jobs: 70, applicants: 65, supplyDemand: 0.93 } },
  { name: '四川', value: { jobs: 65, applicants: 60, supplyDemand: 0.92 } },
  { name: '贵州', value: { jobs: 40, applicants: 45, supplyDemand: 1.13 } },
  { name: '云南', value: { jobs: 42, applicants: 48, supplyDemand: 1.14 } },
  { name: '西藏', value: { jobs: 25, applicants: 30, supplyDemand: 1.20 } },
  { name: '陕西', value: { jobs: 55, applicants: 50, supplyDemand: 0.91 } },
  { name: '甘肃', value: { jobs: 35, applicants: 40, supplyDemand: 1.14 } },
  { name: '青海', value: { jobs: 28, applicants: 32, supplyDemand: 1.14 } },
  { name: '宁夏', value: { jobs: 32, applicants: 35, supplyDemand: 1.09 } },
  { name: '新疆', value: { jobs: 38, applicants: 42, supplyDemand: 1.10 } }
]

// 热门招聘城市
const hotCities = [
  { name: '北京', jobsCount: 18500 },
  { name: '上海', jobsCount: 17200 },
  { name: '广州', jobsCount: 15800 },
  { name: '深圳', jobsCount: 14500 },
  { name: '杭州', jobsCount: 12800 },
  { name: '成都', jobsCount: 10500 },
  { name: '武汉', jobsCount: 9800 },
  { name: '南京', jobsCount: 9200 },
  { name: '西安', jobsCount: 8500 },
  { name: '重庆', jobsCount: 8200 }
]

// 热门岗位
const hotPositions = [
  // 白领岗位
  { name: '前端开发', jobsCount: 12500, category: 'white-collar' },
  { name: '后端开发', jobsCount: 11800, category: 'white-collar' },
  { name: '产品经理', jobsCount: 8500, category: 'white-collar' },
  { name: 'UI设计', jobsCount: 7200, category: 'white-collar' },
  { name: '数据分析师', jobsCount: 5800, category: 'white-collar' },
  { name: '测试工程师', jobsCount: 5200, category: 'white-collar' },
  { name: '人力资源', jobsCount: 4800, category: 'white-collar' },
  { name: '市场营销', jobsCount: 4500, category: 'white-collar' },
  // 蓝领岗位
  { name: '普工', jobsCount: 15800, category: 'blue-collar' },
  { name: '操作工', jobsCount: 14200, category: 'blue-collar' },
  { name: '电工', jobsCount: 8500, category: 'blue-collar' },
  { name: '焊工', jobsCount: 7800, category: 'blue-collar' },
  { name: '司机', jobsCount: 7200, category: 'blue-collar' },
  { name: '保安', jobsCount: 6500, category: 'blue-collar' },
  // 服务业岗位
  { name: '服务员', jobsCount: 13500, category: 'service' },
  { name: '厨师', jobsCount: 9800, category: 'service' },
  { name: '销售', jobsCount: 12500, category: 'service' },
  { name: '运营', jobsCount: 10800, category: 'service' },
  { name: '客服', jobsCount: 8200, category: 'service' },
  { name: '保洁', jobsCount: 7500, category: 'service' },
  // 新职业
  { name: '直播带货', jobsCount: 6800, category: 'new' },
  { name: '人工智能训练师', jobsCount: 5200, category: 'new' },
  { name: '数字孪生工程师', jobsCount: 4800, category: 'new' },
  { name: '元宇宙设计师', jobsCount: 4500, category: 'new' },
  { name: '区块链开发', jobsCount: 4200, category: 'new' },
  { name: '碳排放管理师', jobsCount: 3800, category: 'new' }
]

// 人才流入/流出城市
const talentFlow = [
  { name: '深圳', flow: 12.5 },
  { name: '杭州', flow: 10.2 },
  { name: '上海', flow: 8.5 },
  { name: '北京', flow: 7.8 },
  { name: '广州', flow: 6.5 },
  { name: '成都', flow: 5.2 },
  { name: '武汉', flow: -2.5 },
  { name: '西安', flow: -3.8 },
  { name: '南京', flow: -4.2 },
  { name: '重庆', flow: -5.5 }
]

// 近30天岗位发布量趋势
const trendData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date()
  date.setDate(date.getDate() - (29 - i))
  return {
    date: `${date.getMonth() + 1}/${date.getDate()}`,
    jobsCount: Math.floor(4000 + Math.random() * 2000 + i * 100)
  }
})

// 各行业招聘占比
const industryData = [
  { name: 'IT/互联网', value: 25 },
  { name: '制造业', value: 20 },
  { name: '服务业', value: 18 },
  { name: '金融', value: 12 },
  { name: '教育', value: 10 },
  { name: '医疗健康', value: 8 },
  { name: '零售', value: 7 },
  { name: '物流', value: 5 },
  { name: '建筑', value: 5 }
]

// 岗位薪资分布
const salaryData = [
  { range: '5k以下', count: 15000 },
  { range: '5k-10k', count: 35000 },
  { range: '10k-15k', count: 30000 },
  { range: '15k-20k', count: 20000 },
  { range: '20k-30k', count: 15000 },
  { range: '30k以上', count: 10000 }
]

// 导出所有数据
const mockData = {
  overview,
  mapData,
  hotCities,
  hotPositions,
  talentFlow,
  trendData,
  industryData,
  salaryData
}

export default mockData