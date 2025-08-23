// 等待 2.5 秒，确保 Live2D 完全初始化
setTimeout(() => {
  const canvas = document.getElementById('live2d');
  if (!canvas) {
    console.warn('Live2D canvas 未找到');
    return;
  }
  // 1. 移到 body 最外层，避免被容器裁剪
  document.body.appendChild(canvas);
  // 2. 强制样式
  Object.assign(canvas.style, {
    'position': 'fixed',
    'bottom': (window.widget.display.vOffset || 50) + 'px',
    'right': (window.widget.display.hOffset || 30) + 'px',
    'width': (window.widget.display.width || 150) + 'px',
    'height': (window.widget.display.height || 250) + 'px',
    'z-index': '999999',
    'pointer-events': 'auto',
    'opacity': '1',
    'visibility': 'visible'
  });
  // 3. ⭐ 强制触发 Live2D 重新计算视口
  //    因为 @0 版本没有公开 resize API，我们模拟 resize 事件
  window.dispatchEvent(new Event('resize'));
  // 4. 再次强制重绘（可选）
  setTimeout(() => {
    window.dispatchEvent(new Event('resize'));
  }, 500);
 console.log('✅ Live2D 已修复：位置、大小、坐标系');
}, 2500);