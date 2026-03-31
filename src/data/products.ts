export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  sales: number
}

// 生成50+条产品数据
export const products: Product[] = [
  { id: 1, name: '无线蓝牙耳机 Pro', description: '主动降噪，30小时续航，Hi-Res认证', price: 799, image: 'https://picsum.photos/seed/prod1/400/300', category: '数码', rating: 4.8, sales: 2341 },
  { id: 2, name: '智能手表 X3', description: '健康监测，防水50米，14天超长续航', price: 1299, image: 'https://picsum.photos/seed/prod2/400/300', category: '穿戴', rating: 4.6, sales: 1823 },
  { id: 3, name: '机械键盘 RGB', description: '青轴手感，1680万色RGB，铝合金框架', price: 599, image: 'https://picsum.photos/seed/prod3/400/300', category: '外设', rating: 4.7, sales: 3102 },
  { id: 4, name: '4K高清投影仪', description: '支持HDR10，2000流明，内置安卓系统', price: 3999, image: 'https://picsum.photos/seed/prod4/400/300', category: '影音', rating: 4.5, sales: 892 },
  { id: 5, name: '电竞鼠标无线版', description: '16000DPI，60g轻量化，RGB灯效', price: 299, image: 'https://picsum.photos/seed/prod5/400/300', category: '外设', rating: 4.9, sales: 4521 },
  { id: 6, name: '便携充电宝 20000mAh', description: '双向快充，Type-C接口，可上飞机', price: 199, image: 'https://picsum.photos/seed/prod6/400/300', category: '配件', rating: 4.4, sales: 5632 },
  { id: 7, name: '无线充电器底座', description: '15W快充，兼容多设备，LED指示灯', price: 129, image: 'https://picsum.photos/seed/prod7/400/300', category: '配件', rating: 4.3, sales: 3211 },
  { id: 8, name: '蓝牙音箱 旗舰版', description: '360°环绕音效，IPX7防水，24小时续航', price: 899, image: 'https://picsum.photos/seed/prod8/400/300', category: '影音', rating: 4.7, sales: 1567 },
  { id: 9, name: '运动相机 4K', description: '防水防抖，GPS轨迹，语音控制', price: 1599, image: 'https://picsum.photos/seed/prod9/400/300', category: '数码', rating: 4.6, sales: 987 },
  { id: 10, name: '固态硬盘 1TB', description: 'NVMe高速，读写3000MB/s，五年质保', price: 699, image: 'https://picsum.photos/seed/prod10/400/300', category: '存储', rating: 4.8, sales: 2134 },
  { id: 11, name: '显示器挂灯', description: '非对称光源，无频闪，触控调光', price: 249, image: 'https://picsum.photos/seed/prod11/400/300', category: '外设', rating: 4.5, sales: 1876 },
  { id: 12, name: '无线麦克风', description: '专业降噪，U段稳定，50米传输', price: 499, image: 'https://picsum.photos/seed/prod12/400/300', category: '影音', rating: 4.6, sales: 1234 },
  { id: 13, name: '平板电脑 11寸', description: '2K全面屏，8GB+256GB，学习办公', price: 2299, image: 'https://picsum.photos/seed/prod13/400/300', category: '数码', rating: 4.7, sales: 3456 },
  { id: 14, name: '游戏手柄', description: '支持多平台，线性扳机，震动反馈', price: 259, image: 'https://picsum.photos/seed/prod14/400/300', category: '外设', rating: 4.4, sales: 2876 },
  { id: 15, name: '智能台灯', description: '无极调光，护眼无频闪，远程控制', price: 179, image: 'https://picsum.photos/seed/prod15/400/300', category: '家居', rating: 4.5, sales: 1987 },
  { id: 16, name: '空气净化器', description: 'HEPA滤网，智能检测，静音运行', price: 1299, image: 'https://picsum.photos/seed/prod16/400/300', category: '家居', rating: 4.6, sales: 876 },
  { id: 17, name: '电动牙刷', description: '声波震动，智能计时，IPX7防水', price: 399, image: 'https://picsum.photos/seed/prod17/400/300', category: '个护', rating: 4.7, sales: 2345 },
  { id: 18, name: '扫地机器人', description: '激光导航，自动集尘，智能避障', price: 2599, image: 'https://picsum.photos/seed/prod18/400/300', category: '家居', rating: 4.8, sales: 654 },
  { id: 19, name: '智能门锁', description: '指纹识别，远程开锁，异常报警', price: 999, image: 'https://picsum.photos/seed/prod19/400/300', category: '家居', rating: 4.5, sales: 1234 },
  { id: 20, name: '便携投影仪', description: '口袋大小，720P分辨率，内置电池', price: 999, image: 'https://picsum.photos/seed/prod20/400/300', category: '影音', rating: 4.3, sales: 1567 },
  { id: 21, name: '无线耳机 运动版', description: '挂耳式，IPX5防水，12小时续航', price: 399, image: 'https://picsum.photos/seed/prod21/400/300', category: '数码', rating: 4.4, sales: 2134 },
  { id: 22, name: '机械鼠标垫', description: 'XXL加大，编织表面，硅胶底座', price: 89, image: 'https://picsum.photos/seed/prod22/400/300', category: '外设', rating: 4.6, sales: 3456 },
  { id: 23, name: 'USB-C扩展坞', description: '11合1，4K输出，100W PD快充', price: 399, image: 'https://picsum.photos/seed/prod23/400/300', category: '配件', rating: 4.7, sales: 1876 },
  { id: 24, name: '智能音箱', description: '语音控制，智能家居中枢，360°音效', price: 299, image: 'https://picsum.photos/seed/prod24/400/300', category: '影音', rating: 4.5, sales: 4567 },
  { id: 25, name: '移动硬盘 2TB', description: 'USB3.1，金属外壳，抗震防摔', price: 499, image: 'https://picsum.photos/seed/prod25/400/300', category: '存储', rating: 4.6, sales: 1654 },
  { id: 26, name: '电容笔 主动式', description: '精准压感，Type-C充电，兼容多设备', price: 169, image: 'https://picsum.photos/seed/prod26/400/300', category: '配件', rating: 4.4, sales: 2345 },
  { id: 27, name: '路由器 WiFi 6', description: 'Mesh组网，3000Mbps，覆盖全屋', price: 599, image: 'https://picsum.photos/seed/prod27/400/300', category: '网络', rating: 4.7, sales: 1987 },
  { id: 28, name: '网络摄像头', description: '2K画质，红外夜视，双向语音', price: 299, image: 'https://picsum.photos/seed/prod28/400/300', category: '数码', rating: 4.5, sales: 2876 },
  { id: 29, name: 'Type-C数据线', description: '100W快充，USB3.1，编织线身', price: 59, image: 'https://picsum.photos/seed/prod29/400/300', category: '配件', rating: 4.8, sales: 8765 },
  { id: 30, name: '手机支架 铝合金', description: '多角度调节，稳固防滑，桌面使用', price: 79, image: 'https://picsum.photos/seed/prod30/400/300', category: '配件', rating: 4.3, sales: 5432 },
  { id: 31, name: '平板电脑保护套', description: '磁吸设计，智能休眠，多色可选', price: 129, image: 'https://picsum.photos/seed/prod31/400/300', category: '配件', rating: 4.5, sales: 3211 },
  { id: 32, name: '游戏耳麦', description: '7.1环绕声，RGB灯效，ENC降噪', price: 399, image: 'https://picsum.photos/seed/prod32/400/300', category: '外设', rating: 4.6, sales: 2345 },
  { id: 33, name: '随身WiFi', description: '4G全网通，3000mAh电池，流量卡套餐', price: 299, image: 'https://picsum.photos/seed/prod33/400/300', category: '网络', rating: 4.4, sales: 1876 },
  { id: 34, name: '智能手环', description: '心率监测，睡眠追踪，14天续航', price: 199, image: 'https://picsum.photos/seed/prod34/400/300', category: '穿戴', rating: 4.5, sales: 5678 },
  { id: 35, name: '车载充电器', description: '双口快充，LED数显，过压保护', price: 69, image: 'https://picsum.photos/seed/prod35/400/300', category: '配件', rating: 4.6, sales: 4321 },
  { id: 36, name: '内存条 16GB', description: 'DDR5 4800MHz，时序优化，RGB灯条', price: 499, image: 'https://picsum.photos/seed/prod36/400/300', category: '存储', rating: 4.7, sales: 1543 },
  { id: 37, name: '散热器 笔记本', description: '双风扇，RGB调速，铝合金材质', price: 199, image: 'https://picsum.photos/seed/prod37/400/300', category: '外设', rating: 4.4, sales: 2134 },
  { id: 38, name: '高清线缆套装', description: 'HDMI2.1，8K@60Hz，编织线身', price: 149, image: 'https://picsum.photos/seed/prod38/400/300', category: '配件', rating: 4.5, sales: 2876 },
  { id: 39, name: '智能体脂秤', description: 'APP同步，12项数据，玻璃面板', price: 129, image: 'https://picsum.photos/seed/prod39/400/300', category: '个护', rating: 4.3, sales: 3456 },
  { id: 40, name: '无人机 入门级', description: '4K摄像头，30分钟续航，一键起飞', price: 1999, image: 'https://picsum.photos/seed/prod40/400/300', category: '数码', rating: 4.6, sales: 876 },
  { id: 41, name: '电子书阅读器', description: '6寸墨水屏，32GB存储，护眼背光', price: 899, image: 'https://picsum.photos/seed/prod41/400/300', category: '数码', rating: 4.7, sales: 1234 },
  { id: 42, name: '无线键盘 薄膜', description: '静音按键，数字键盘，简约设计', price: 159, image: 'https://picsum.photos/seed/prod42/400/300', category: '外设', rating: 4.4, sales: 4567 },
  { id: 43, name: '太阳能充电宝', description: '20000mAh，太阳能快充，防水防尘', price: 299, image: 'https://picsum.photos/seed/prod43/400/300', category: '配件', rating: 4.3, sales: 1654 },
  { id: 44, name: '智能眼镜', description: 'AR增强现实，语音助手，时尚外观', price: 1999, image: 'https://picsum.photos/seed/prod44/400/300', category: '穿戴', rating: 4.5, sales: 543 },
  { id: 45, name: '移动电源 小巧', description: '10000mAh，迷你便携，双USB输出', price: 99, image: 'https://picsum.photos/seed/prod45/400/300', category: '配件', rating: 4.6, sales: 6789 },
  { id: 46, name: '电竞椅 游戏版', description: '人体工学，透气网布，可躺休息', price: 899, image: 'https://picsum.photos/seed/prod46/400/300', category: '家居', rating: 4.7, sales: 987 },
  { id: 47, name: '键盘手托', description: '记忆海绵，皮革表面，护腕舒适', price: 79, image: 'https://picsum.photos/seed/prod47/400/300', category: '外设', rating: 4.5, sales: 3456 },
  { id: 48, name: '无线鼠标 静音', description: '静音按键，Type-C充电，3档DPI', price: 129, image: 'https://picsum.photos/seed/prod48/400/300', category: '外设', rating: 4.6, sales: 4321 },
  { id: 49, name: 'LED补光灯', description: '双色温，环形设计，USB供电', price: 199, image: 'https://picsum.photos/seed/prod49/400/300', category: '配件', rating: 4.4, sales: 2134 },
  { id: 50, name: '蓝牙适配器', description: '5.0版本，aptX解码，即插即用', price: 89, image: 'https://picsum.photos/seed/prod50/400/300', category: '配件', rating: 4.5, sales: 5678 },
  { id: 51, name: '视频采集卡', description: '4K采集，60帧录制，USB3.0', price: 599, image: 'https://picsum.photos/seed/prod51/400/300', category: '影音', rating: 4.6, sales: 876 },
  { id: 52, name: '电容麦克风', description: '专业录音，心形指向，USB接口', price: 499, image: 'https://picsum.photos/seed/prod52/400/300', category: '影音', rating: 4.7, sales: 1234 },
  { id: 53, name: '游戏加速器', description: '专线加速，跨区畅玩，月卡优惠', price: 39, image: 'https://picsum.photos/seed/prod53/400/300', category: '网络', rating: 4.4, sales: 8765 },
  { id: 54, name: 'AR游戏手柄', description: '空间定位，体感操作，兼容多平台', price: 699, image: 'https://picsum.photos/seed/prod54/400/300', category: '外设', rating: 4.5, sales: 654 },
  { id: 55, name: '智能翻译机', description: '离线翻译，40种语言，拍照识别', price: 1299, image: 'https://picsum.photos/seed/prod55/400/300', category: '数码', rating: 4.6, sales: 432 },
  { id: 56, name: '桌面风扇', description: '静音马达，USB供电，可调风速', price: 59, image: 'https://picsum.photos/seed/prod56/400/300', category: '家居', rating: 4.3, sales: 3456 },
]

export const categories = ['全部', '数码', '外设', '影音', '配件', '穿戴', '家居', '个护', '存储', '网络']