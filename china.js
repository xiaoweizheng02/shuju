// 使用 async/await 确保地图加载顺序执行
(function() {
  // 直接注册地图函数
  window.registerChinaMap = function(callback) {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(geoJson => {
        console.log('✅ 中国地图数据加载成功！');
        echarts.registerMap('china', geoJson);
        console.log('✅ 中国地图注册成功！');
        if (callback) callback();
      })
      .catch(err => {
        console.error('❌ 地图加载失败:', err);
      });
  };
})();
