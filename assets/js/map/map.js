var mapPerf = {};
var tmpCode = "";
var mapAdditional = {};
var treemap;

function restoreParents(data, parent = null) {
  data.parent = parent;
  (data.children || []).forEach((d) => restoreParents(d, data));
}

function restorePerf(data) {
  data.perf = mapPerf[data.name] ?? data.perf;
  data.additional = mapAdditional[data.name] ?? data.additional;
  (data.children || []).forEach((d) => restorePerf(d));
}

function initMap(width, mapData, color, ignoreAuth, price) {
  restoreParents(mapData);
  restorePerf(mapData);
  initCanvas(mapData, "sec", "", width, color, "", "", true, ignoreAuth, price);
  initCanvas(mapData, "sec", "", width, color, "", "", true, ignoreAuth, price);
}

function drawMap(color, ignoreAuth) {
  const calculateHeight = () => {
    let height =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) -
      10;

    if (!$(".narrow").is(":visible")) {
      height -= 280;
    }

    return height;
  };

  const height = calculateHeight();
  $("#body").height(height);

  const width = $("#main-body").width();

  const treemap = d3.layout
    .treemap()
    .sort((d1, d2) => d1.scale - d2.scale)
    .size([width, height])
    .value((d) => d.scale)
    .padding((d) => {
      if (d.depth === 1) {
        return [17, 1, 1, 1];
      } else if (d.depth === 2) {
        return [12, 1, 2, 1];
      }
      return 0;
    });

  const response = {
    errcode: 0,
    errmsg: "success",
    data: {
      children: [
        {
          children: [
            {
              children: [
                { name: "丰乐种业", scale: 5630517367, id: "000713.SZ" },
                { name: "隆平高科", scale: 19297212436, id: "000998.SZ" },
                { name: "登海种业", scale: 1.51096e10, id: "002041.SZ" },
                { name: "众兴菌业", scale: 4528287361, id: "002772.SZ" },
                { name: "荃银高科", scale: 9421443878, id: "300087.SZ" },
                { name: "神农科技", scale: 3399565346, id: "300189.SZ" },
                { name: "雪榕生物", scale: 3559602571, id: "300511.SZ" },
                { name: "华绿生物", scale: 1.79391177e9, id: "300970.SZ" },
                { name: "万辰生物", scale: 3.0936416e9, id: "300972.SZ" },
                { name: "亚盛集团", scale: 5996498573, id: "600108.SH" },
                { name: "农发种业", scale: 9912468182, id: "600313.SH" },
                { name: "敦煌种业", scale: 3.62600029e9, id: "600354.SH" },
                { name: "新农开发", scale: 3059732816, id: "600359.SH" },
                { name: "万向德农", scale: 3.46412352e9, id: "600371.SH" },
                { name: "统一股份", scale: 1632160947, id: "600506.SH" },
                { name: "新赛股份", scale: 2406900614, id: "600540.SH" },
                { name: "北大荒", scale: 23660919589, id: "600598.SH" },
                { name: "海南橡胶", scale: 19728162144, id: "601118.SH" },
                { name: "苏垦农发", scale: 1.62604e10, id: "601952.SH" },
                { name: "宏辉果蔬", scale: 2764002503, id: "603336.SH" },
              ],
              name: "种植业",
              scale: 158345151507,
              id: "110100",
            },
            {
              children: [
                { name: "中水渔业", scale: 4166724961, id: "000798.SZ" },
                { name: "ST獐子岛", scale: 2.52739823e9, id: "002069.SZ" },
                { name: "ST东洋", scale: 1712972336, id: "002086.SZ" },
                { name: "百洋股份", scale: 2138314176, id: "002696.SZ" },
                { name: "国联水产", scale: 4392813826, id: "300094.SZ" },
                { name: "开创国际", scale: 2631027224, id: "600097.SH" },
                { name: "大湖股份", scale: 2377311709, id: "600257.SH" },
                { name: "好当家", scale: 3520996273, id: "600467.SH" },
              ],
              name: "渔业",
              scale: 23467558735,
              id: "110200",
            },
            {
              children: [
                { name: "平潭发展", scale: 4536030489, id: "000592.SZ" },
                { name: "福建金森", scale: 2.62632184e9, id: "002679.SZ" },
                { name: "ST景谷", scale: 2.155978e9, id: "600265.SH" },
              ],
              name: "林业",
              scale: 9318330329,
              id: "110300",
            },
            {
              children: [
                { name: "京基智农", scale: 12128685815, id: "000048.SZ" },
                { name: "正虹科技", scale: 1.31450846e9, id: "000702.SZ" },
                { name: "新 希 望", scale: 59519243394, id: "000876.SZ" },
                { name: "天康生物", scale: 12109534255, id: "002100.SZ" },
                { name: "天邦食品", scale: 8640945362, id: "002124.SZ" },
                { name: "正邦科技", scale: 6990642006, id: "002157.SZ" },
                { name: "海大集团", scale: 90966443077, id: "002311.SZ" },
                { name: "大北农", scale: 23390743844, id: "002385.SZ" },
                { name: "金新农", scale: 3415747463, id: "002548.SZ" },
                { name: "唐人神", scale: 9411807426, id: "002567.SZ" },
                { name: "中宠股份", scale: 6255533013, id: "002891.SZ" },
                { name: "佩蒂股份", scale: 2.73751636e9, id: "300673.SZ" },
                { name: "傲农生物", scale: 7914848493, id: "603363.SH" },
                { name: "禾丰股份", scale: 10187318471, id: "603609.SH" },
                { name: "天马科技", scale: 7335790296, id: "603668.SH" },
                { name: "驱动力", scale: 278700677, id: "838275.BJ" },
              ],
              name: "饲料",
              scale: 262598008412,
              id: "110400",
            },
            {
              children: [
                { name: "京粮控股", scale: 4854776146, id: "000505.SZ" },
                { name: "南宁糖业", scale: 3607020829, id: "000911.SZ" },
                { name: "中粮科技", scale: 14350234503, id: "000930.SZ" },
                { name: "中基健康", scale: 2714918198, id: "000972.SZ" },
                { name: "保龄宝", scale: 3202184645, id: "002286.SZ" },
                { name: "道道全", scale: 4148101913, id: "002852.SZ" },
                { name: "晨光生物", scale: 7854814847, id: "300138.SZ" },
                { name: "朗源股份", scale: 1.619552e9, id: "300175.SZ" },
                { name: "*ST佳沃", scale: 2765340034, id: "300268.SZ" },
                { name: "金丹科技", scale: 2349077193, id: "300829.SZ" },
                { name: "金龙鱼", scale: 22584972177, id: "300999.SZ" },
                { name: "金健米业", scale: 4.97381994e9, id: "600127.SH" },
                { name: "华资实业", scale: 2.6428794e9, id: "600191.SH" },
                { name: "冠农股份", scale: 6752074236, id: "600251.SH" },
                { name: "安琪酵母", scale: 34412100502, id: "600298.SH" },
                { name: "中粮糖业", scale: 18222986903, id: "600737.SH" },
                { name: "梅花生物", scale: 27874245186, id: "600873.SH" },
                { name: "国投中鲁", scale: 3.2540261e9, id: "600962.SH" },
                { name: "百龙创园", scale: 2.43843726e9, id: "605016.SH" },
                { name: "安德利", scale: 1545951898, id: "605198.SH" },
                { name: "盖世食品", scale: 259002013, id: "836826.BJ" },
              ],
              name: "农产品加工",
              scale: 172426515923,
              id: "110500",
            },
            {
              children: [
                { name: "大禹节水", scale: 3568042775, id: "300021.SZ" },
                { name: "金埔园林", scale: 1.1596651e9, id: "301098.SZ" },
              ],
              name: "农业综合",
              scale: 4727707875,
              id: "110600",
            },
            {
              children: [
                { name: "罗 牛 山", scale: 8723694959, id: "000735.SZ" },
                { name: "东瑞股份", scale: 3.06588579e9, id: "001201.SZ" },
                { name: "民和股份", scale: 5555718873, id: "002234.SZ" },
                { name: "圣农发展", scale: 26491114254, id: "002299.SZ" },
                { name: "ST华英", scale: 5801398161, id: "002321.SZ" },
                { name: "益生股份", scale: 9152379094, id: "002458.SZ" },
                { name: "牧原股份", scale: 173696058806, id: "002714.SZ" },
                { name: "仙坛股份", scale: 5.93999002e9, id: "002746.SZ" },
                { name: "湘佳股份", scale: 1863864697, id: "002982.SZ" },
                { name: "西部牧业", scale: 1680091865, id: "300106.SZ" },
                { name: "ST天山", scale: 998480405, id: "300313.SZ" },
                { name: "温氏股份", scale: 112074973105, id: "300498.SZ" },
                { name: "立华股份", scale: 13034817836, id: "300761.SZ" },
                { name: "晓鸣股份", scale: 1.71700072e9, id: "300967.SZ" },
                { name: "新五丰", scale: 7792946473, id: "600975.SH" },
                { name: "神农集团", scale: 1.67265587e9, id: "605296.SH" },
              ],
              name: "畜禽养殖",
              scale: 379261070928,
              id: "110700",
            },
            {
              children: [
                { name: "金河生物", scale: 3799983556, id: "002688.SZ" },
                { name: "绿康生化", scale: 5159793629, id: "002868.SZ" },
                { name: "瑞普生物", scale: 7197941538, id: "300119.SZ" },
                { name: "回盛生物", scale: 1480867666, id: "300871.SZ" },
                { name: "中牧股份", scale: 13581271858, id: "600195.SH" },
                { name: "生物股份", scale: 11931932257, id: "600201.SH" },
                { name: "普莱柯", scale: 9318319653, id: "603566.SH" },
                { name: "海利生物", scale: 6.75556e9, id: "603718.SH" },
                { name: "蔚蓝生物", scale: 3390182758, id: "603739.SH" },
                { name: "申联生物", scale: 3.19891676e9, id: "688098.SH" },
                { name: "科前生物", scale: 3146823892, id: "688526.SH" },
              ],
              name: "动物保健",
              scale: 68961593567,
              id: "110800",
            },
          ],
          name: "农林牧渔",
          scale: 1079105937276,
          id: "110000",
        },
        {
          children: [
            {
              children: [
                { name: "ST洲际", scale: 6074515008, id: "600759.SH" },
                { name: "新潮能源", scale: 17061288408, id: "600777.SH" },
                { name: "中国石油", scale: 1180411947293, id: "601857.SH" },
              ],
              name: "石油开采",
              scale: 1203547750709,
              id: "210100",
            },
            {
              children: [
                { name: "甘肃能化", scale: 8415475821, id: "000552.SZ" },
                { name: "ST大洲", scale: 1799020278, id: "000571.SZ" },
                { name: "美锦能源", scale: 34118571917, id: "000723.SZ" },
                { name: "ST平能", scale: 0.0, id: "000780.SZ" },
                { name: "冀中能源", scale: 2.133444284e10, id: "000937.SZ" },
                { name: "蓝焰控股", scale: 7.7109962e9, id: "000968.SZ" },
                { name: "山西焦煤", scale: 4.28500176e10, id: "000983.SZ" },
                { name: "电投能源", scale: 25998881756, id: "002128.SZ" },
                { name: "郑州煤电", scale: 5555958893, id: "600121.SH" },
                { name: "兰花科创", scale: 1.4599872e10, id: "600123.SH" },
                { name: "兖矿能源", scale: 102393113579, id: "600188.SH" },
                { name: "华阳股份", scale: 3.350165e10, id: "600348.SH" },
                { name: "盘江股份", scale: 1.479024552e10, id: "600395.SH" },
                { name: "安源煤业", scale: 2811486065, id: "600397.SH" },
                { name: "大有能源", scale: 12384408242, id: "600403.SH" },
                { name: "安泰集团", scale: 2.506932e9, id: "600408.SH" },
                { name: "上海能源", scale: 1.001687148e10, id: "600508.SH" },
                { name: "山煤国际", scale: 33582807012, id: "600546.SH" },
                { name: "云维股份", scale: 3.5248642e9, id: "600725.SH" },
                { name: "山西焦化", scale: 14091666347, id: "600740.SH" },
                { name: "辽宁能源", scale: 5494292519, id: "600758.SH" },
                { name: "云煤能源", scale: 3147957048, id: "600792.SH" },
                { name: "恒源煤电", scale: 11256045812, id: "600971.SH" },
                { name: "淮北矿业", scale: 33444381833, id: "600985.SH" },
                { name: "开滦股份", scale: 11162232953, id: "600997.SH" },
                { name: "晋控煤业", scale: 1.84107e10, id: "601001.SH" },
                { name: "宝泰隆", scale: 6762295823, id: "601011.SH" },
                { name: "陕西黑猫", scale: 9211664352, id: "601015.SH" },
                { name: "中国神华", scale: 478734831834, id: "601088.SH" },
                { name: "昊华能源", scale: 8.9567871e9, id: "601101.SH" },
                { name: "陕西煤业", scale: 1.909915e11, id: "601225.SH" },
                { name: "平煤股份", scale: 23240691264, id: "601666.SH" },
                { name: "潞安环能", scale: 5.848204986e10, id: "601699.SH" },
                { name: "中煤能源", scale: 79805443488, id: "601898.SH" },
                { name: "新集能源", scale: 10724843052, id: "601918.SH" },
                { name: "物产环能", scale: 4033511022, id: "603071.SH" },
                { name: "金能科技", scale: 8020717702, id: "603113.SH" },
              ],
              name: "煤炭开采",
              scale: 1353867227412,
              id: "210200",
            },
            {
              children: [
                { name: "钒钛股份", scale: 39598040497, id: "000629.SZ" },
                { name: "金岭矿业", scale: 4238822438, id: "000655.SZ" },
                { name: "西藏矿业", scale: 18243645649, id: "000762.SZ" },
                { name: "粤桂股份", scale: 2718431308, id: "000833.SZ" },
                { name: "河钢资源", scale: 8463908052, id: "000923.SZ" },
                { name: "大中矿业", scale: 5370884313, id: "001203.SZ" },
                { name: "安宁股份", scale: 1.087463e10, id: "002978.SZ" },
                { name: "鄂尔多斯", scale: 20249656608, id: "600295.SH" },
                { name: "*ST未来", scale: 2234564568, id: "600532.SH" },
                { name: "海南矿业", scale: 13747571757, id: "601969.SH" },
                { name: "金石资源", scale: 15264540653, id: "603505.SH" },
                { name: "龙高股份", scale: 1.0000216e9, id: "605086.SH" },
              ],
              name: "其他采掘",
              scale: 142004717443,
              id: "210300",
            },
            {
              children: [
                { name: "准油股份", scale: 1.66774928e9, id: "002207.SZ" },
                { name: "惠博普", scale: 3577649932, id: "002554.SZ" },
                { name: "仁智股份", scale: 1271554842, id: "002629.SZ" },
                { name: "贝肯能源", scale: 1200350576, id: "002828.SZ" },
                { name: "恒泰艾普", scale: 2456475497, id: "300157.SZ" },
                { name: "通源石油", scale: 2017668087, id: "300164.SZ" },
                { name: "潜能恒信", scale: 4.225344e9, id: "300191.SZ" },
                { name: "中油工程", scale: 24230860024, id: "600339.SH" },
                { name: "海油工程", scale: 28340884268, id: "600583.SH" },
                { name: "石化油服", scale: 30395407954, id: "600871.SH" },
                { name: "海油发展", scale: 3.67976772e10, id: "600968.SH" },
                { name: "中海油服", scale: 4.70714412e10, id: "601808.SH" },
                { name: "中曼石油", scale: 6940001735, id: "603619.SH" },
                { name: "博迈科", scale: 3620092709, id: "603727.SH" },
                { name: "金诚信", scale: 2.028579366e10, id: "603979.SH" },
              ],
              name: "采掘服务",
              scale: 214098950964,
              id: "210400",
            },
          ],
          name: "采掘",
          scale: 2913518646528,
          id: "210000",
        },
        {
          children: [
            {
              children: [
                { name: "华锦股份", scale: 11116125632, id: "000059.SZ" },
                { name: "广聚能源", scale: 4.09189248e9, id: "000096.SZ" },
                { name: "国际实业", scale: 3518621469, id: "000159.SZ" },
                { name: "泰山石油", scale: 1965550453, id: "000554.SZ" },
                { name: "茂化实华", scale: 1615538183, id: "000637.SZ" },
                { name: "沈阳化工", scale: 3292126882, id: "000698.SZ" },
                { name: "岳阳兴长", scale: 5294959514, id: "000819.SZ" },
                { name: "东华能源", scale: 13023716613, id: "002221.SZ" },
                { name: "中晟高科", scale: 1669199154, id: "002778.SZ" },
                { name: "宇新股份", scale: 4153875187, id: "002986.SZ" },
                { name: "宝利国际", scale: 1753130181, id: "300135.SZ" },
                { name: "博汇股份", scale: 1448858211, id: "300839.SZ" },
                { name: "中国石化", scale: 594471694038, id: "600028.SH" },
                { name: "广汇能源", scale: 6.329387954e10, id: "600256.SH" },
                { name: "海越能源", scale: 2581869864, id: "600387.SH" },
                { name: "上海石化", scale: 25284406575, id: "600688.SH" },
                { name: "和顺石油", scale: 2.87313858e9, id: "603353.SH" },
                { name: "康普顿", scale: 2.02e9, id: "603798.SH" },
                { name: "龙蟠科技", scale: 11397641474, id: "603906.SH" },
              ],
              name: "石油化工",
              scale: 7.5486622403e11,
              id: "220100",
            },
            {
              children: [
                { name: "湖北宜化", scale: 11590819936, id: "000422.SZ" },
                { name: "新金路", scale: 3483128254, id: "000510.SZ" },
                { name: "金浦钛业", scale: 3251830217, id: "000545.SZ" },
                { name: "英 力 特", scale: 2806591195, id: "000635.SZ" },
                { name: "远兴能源", scale: 25821418808, id: "000683.SZ" },
                { name: "双环科技", scale: 3889541511, id: "000707.SZ" },
                { name: "航锦科技", scale: 28272827792, id: "000818.SZ" },
                { name: "山东海化", scale: 6561023818, id: "000822.SZ" },
                { name: "鸿达兴业", scale: 7843512522, id: "002002.SZ" },
                { name: "云南能投", scale: 9033502384, id: "002053.SZ" },
                { name: "中泰化学", scale: 18157549485, id: "002092.SZ" },
                { name: "湘潭电化", scale: 7302905407, id: "002125.SZ" },
                { name: "天原股份", scale: 6880308344, id: "002386.SZ" },
                { name: "丰元股份", scale: 4480357143, id: "002805.SZ" },
                { name: "大洋生物", scale: 1339645344, id: "003017.SZ" },
                { name: "国瓷材料", scale: 21734913635, id: "300285.SZ" },
                { name: "道氏技术", scale: 6496985338, id: "300409.SZ" },
                { name: "晶瑞电材", scale: 12862000686, id: "300655.SZ" },
                { name: "江天化学", scale: 1.30149546e9, id: "300927.SZ" },
                { name: "保立佳", scale: 455415834, id: "301037.SZ" },
                { name: "本立科技", scale: 928465125, id: "301065.SZ" },
                { name: "华润材料", scale: 2.28347945e9, id: "301090.SZ" },
                { name: "恒光股份", scale: 1592809628, id: "301118.SZ" },
                { name: "隆华新材", scale: 2066401436, id: "301149.SZ" },
                { name: "新疆天业", scale: 6508869682, id: "600075.SH" },
                { name: "亿利洁能", scale: 14456126108, id: "600277.SH" },
                { name: "亚星化学", scale: 1.65371256e9, id: "600319.SH" },
                { name: "中盐化工", scale: 7767409286, id: "600328.SH" },
                { name: "红星发展", scale: 4140500792, id: "600367.SH" },
                { name: "三友化工", scale: 12592531633, id: "600409.SH" },
                { name: "氯碱化工", scale: 7130978172, id: "600618.SH" },
                { name: "金瑞矿业", scale: 2559005304, id: "600714.SH" },
                { name: "金牛化工", scale: 3245124855, id: "600722.SH" },
                { name: "雪天盐业", scale: 8269214668, id: "600929.SH" },
                { name: "华塑股份", scale: 7530086969, id: "600935.SH" },
                { name: "宝丰能源", scale: 9.48936784e10, id: "600989.SH" },
                { name: "君正集团", scale: 36620995473, id: "601216.SH" },
                { name: "北元集团", scale: 1.412907284e10, id: "601568.SH" },
                { name: "滨化股份", scale: 10249020654, id: "601678.SH" },
                { name: "振华股份", scale: 6134015625, id: "603067.SH" },
                { name: "和邦生物", scale: 2.516906315e10, id: "603077.SH" },
                { name: "镇洋发展", scale: 2061164053, id: "603213.SH" },
                { name: "苏盐井神", scale: 7554866105, id: "603299.SH" },
                { name: "兴业股份", scale: 2.175264e9, id: "603928.SH" },
                { name: "三孚股份", scale: 8677376981, id: "603938.SH" },
              ],
              name: "化学原料",
              scale: 473955006062,
              id: "220200",
            },
            {
              children: [
                { name: "藏格矿业", scale: 35480767389, id: "000408.SZ" },
                { name: "广州浪奇", scale: 4337052117, id: "000523.SZ" },
                { name: "ST红太阳", scale: 4998279004, id: "000525.SZ" },
                { name: "安道麦A", scale: 19158193657, id: "000553.SZ" },
                { name: "渝三峡Ａ", scale: 2.52350672e9, id: "000565.SZ" },
                { name: "四川美丰", scale: 4744362391, id: "000731.SZ" },
                { name: "北方铜业", scale: 4503504521, id: "000737.SZ" },
                { name: "盐湖股份", scale: 114089058867, id: "000792.SZ" },
                { name: "鲁西化工", scale: 17306688189, id: "000830.SZ" },
                { name: "中广核技", scale: 6138117863, id: "000881.SZ" },
                { name: "亚钾国际", scale: 19314537084, id: "000893.SZ" },
                { name: "新洋丰", scale: 12956878284, id: "000902.SZ" },
                { name: "泸天化", scale: 7.10304e9, id: "000912.SZ" },
                { name: "河化股份", scale: 1889190526, id: "000953.SZ" },
                { name: "大庆华科", scale: 2015894225, id: "000985.SZ" },
                { name: "诚志股份", scale: 10159378269, id: "000990.SZ" },
                { name: "华尔泰", scale: 1584480006, id: "001217.SZ" },
                { name: "丽臣实业", scale: 1536615756, id: "001218.SZ" },
                { name: "华邦健康", scale: 10300661492, id: "002004.SZ" },
                { name: "保利联合", scale: 4282369559, id: "002037.SZ" },
                { name: "德美化工", scale: 2635887074, id: "002054.SZ" },
                { name: "中材科技", scale: 35005657962, id: "002080.SZ" },
                { name: "青岛金王", scale: 2368255673, id: "002094.SZ" },
                { name: "南岭民爆", scale: 4.37004799e9, id: "002096.SZ" },
                { name: "兴化股份", scale: 5475312903, id: "002109.SZ" },
                { name: "安 纳 达", scale: 2.77260411e9, id: "002136.SZ" },
                { name: "中核钛白", scale: 14905072961, id: "002145.SZ" },
                { name: "红 宝 丽", scale: 2864654208, id: "002165.SZ" },
                { name: "芭田股份", scale: 4.53959855e9, id: "002170.SZ" },
                { name: "正威新材", scale: 6769122675, id: "002201.SZ" },
                { name: "ST宏达", scale: 1180147002, id: "002211.SZ" },
                { name: "诺 普 信", scale: 6.0096531e9, id: "002215.SZ" },
                { name: "江南化工", scale: 9200382457, id: "002226.SZ" },
                { name: "北化股份", scale: 5029158713, id: "002246.SZ" },
                { name: "联化科技", scale: 1.204063765e10, id: "002250.SZ" },
                { name: "利尔化学", scale: 11714766344, id: "002258.SZ" },
                { name: "华昌化工", scale: 7034993475, id: "002274.SZ" },
                { name: "乐通股份", scale: 2.796e9, id: "002319.SZ" },
                { name: "永太科技", scale: 13442586299, id: "002326.SZ" },
                { name: "新纶新材", scale: 3.44506729e9, id: "002341.SZ" },
                { name: "同德化工", scale: 2354153377, id: "002360.SZ" },
                { name: "神剑股份", scale: 3070352018, id: "002361.SZ" },
                { name: "长青股份", scale: 3265370401, id: "002391.SZ" },
                { name: "多氟多", scale: 22584460937, id: "002407.SZ" },
                { name: "齐翔腾达", scale: 19679029253, id: "002408.SZ" },
                { name: "闰土股份", scale: 7.14455913e9, id: "002440.SZ" },
                { name: "华软科技", scale: 7756240746, id: "002453.SZ" },
                { name: "百川股份", scale: 4131523719, id: "002455.SZ" },
                { name: "ST金正", scale: 5188285612, id: "002470.SZ" },
                { name: "宝莫股份", scale: 3494239925, id: "002476.SZ" },
                { name: "辉丰股份", scale: 2417637998, id: "002496.SZ" },
                { name: "雅化集团", scale: 20931771099, id: "002497.SZ" },
                { name: "蓝丰生化", scale: 1449456986, id: "002513.SZ" },
                { name: "司尔特", scale: 6329503941, id: "002538.SZ" },
                { name: "云图控股", scale: 7247748662, id: "002539.SZ" },
                { name: "东方铁塔", scale: 9052611301, id: "002545.SZ" },
                { name: "凯美特气", scale: 8050629776, id: "002549.SZ" },
                { name: "辉隆股份", scale: 7778974913, id: "002556.SZ" },
                { name: "兄弟科技", scale: 3430578323, id: "002562.SZ" },
                { name: "西陇科学", scale: 2531411578, id: "002584.SZ" },
                { name: "史丹利", scale: 4348160424, id: "002588.SZ" },
                { name: "龙佰集团", scale: 31497350275, id: "002601.SZ" },
                { name: "道明光学", scale: 4013149124, id: "002632.SZ" },
                { name: "赞宇科技", scale: 4418878529, id: "002637.SZ" },
                { name: "万润股份", scale: 15703956171, id: "002643.SZ" },
                { name: "卫星化学", scale: 49035776279, id: "002648.SZ" },
                { name: "德联集团", scale: 2041058324, id: "002666.SZ" },
                { name: "康达新材", scale: 3662556685, id: "002669.SZ" },
                { name: "广东宏大", scale: 2.018383691e10, id: "002683.SZ" },
                { name: "天赐材料", scale: 58573846124, id: "002709.SZ" },
                { name: "利民股份", scale: 3039476645, id: "002734.SZ" },
                { name: "光华科技", scale: 5735040018, id: "002741.SZ" },
                { name: "世龙实业", scale: 2.448e9, id: "002748.SZ" },
                { name: "国光股份", scale: 3561278441, id: "002749.SZ" },
                { name: "凯龙股份", scale: 2743284877, id: "002783.SZ" },
                { name: "洪汇新材", scale: 1933716065, id: "002802.SZ" },
                { name: "红墙股份", scale: 1.30139441e9, id: "002809.SZ" },
                { name: "山东赫达", scale: 6350963103, id: "002810.SZ" },
                { name: "恩捷股份", scale: 80287408441, id: "002812.SZ" },
                { name: "高争民爆", scale: 3.38928e9, id: "002827.SZ" },
                { name: "川恒股份", scale: 1.145796077e10, id: "002895.SZ" },
                { name: "集泰股份", scale: 2664595155, id: "002909.SZ" },
                { name: "中欣氟材", scale: 5057695259, id: "002915.SZ" },
                { name: "金奥博", scale: 2.4115664e9, id: "002917.SZ" },
                { name: "名臣健康", scale: 7141157252, id: "002919.SZ" },
                { name: "新农股份", scale: 2586265294, id: "002942.SZ" },
                { name: "和远气体", scale: 2815402316, id: "002971.SZ" },
                { name: "天禾股份", scale: 1670306638, id: "002999.SZ" },
                { name: "壶化股份", scale: 1456462305, id: "003002.SZ" },
                { name: "联泓新科", scale: 7.94649336e9, id: "003022.SZ" },
                { name: "中农联合", scale: 1380625071, id: "003042.SZ" },
                { name: "硅宝科技", scale: 5455939339, id: "300019.SZ" },
                { name: "中科电气", scale: 9657212658, id: "300035.SZ" },
                { name: "新宙邦", scale: 27289406435, id: "300037.SZ" },
                { name: "回天新材", scale: 6080576291, id: "300041.SZ" },
                { name: "鼎龙股份", scale: 21436113417, id: "300054.SZ" },
                { name: "安诺其", scale: 2311868703, id: "300067.SZ" },
                { name: "海新能科", scale: 8480821098, id: "300072.SZ" },
                { name: "当升科技", scale: 27469657426, id: "300073.SZ" },
                { name: "奥克股份", scale: 5680898588, id: "300082.SZ" },
                { name: "建新股份", scale: 1734720697, id: "300107.SZ" },
                { name: "新开源", scale: 6624488789, id: "300109.SZ" },
                { name: "青松股份", scale: 2843899038, id: "300132.SZ" },
                { name: "先锋新材", scale: 1439819088, id: "300163.SZ" },
                { name: "天晟新材", scale: 1158665403, id: "300169.SZ" },
                { name: "元力股份", scale: 5761579046, id: "300174.SZ" },
                { name: "长海股份", scale: 3646152849, id: "300196.SZ" },
                { name: "高盟新材", scale: 3.50272352e9, id: "300200.SZ" },
                { name: "日科化学", scale: 2546487805, id: "300214.SZ" },
                { name: "金力泰", scale: 2728774616, id: "300225.SZ" },
                { name: "上海新阳", scale: 11812195349, id: "300236.SZ" },
                { name: "瑞丰高材", scale: 1527954142, id: "300243.SZ" },
                { name: "雅本化学", scale: 9894259702, id: "300261.SZ" },
                { name: "富邦股份", scale: 1865929263, id: "300387.SZ" },
                { name: "飞凯材料", scale: 10022540607, id: "300398.SZ" },
                { name: "科隆股份", scale: 1061461339, id: "300405.SZ" },
                { name: "强力新材", scale: 3351380958, id: "300429.SZ" },
                { name: "清水源", scale: 2464454874, id: "300437.SZ" },
                { name: "乐凯新材", scale: 2221210527, id: "300446.SZ" },
                { name: "濮阳惠成", scale: 6515838301, id: "300481.SZ" },
                { name: "蓝晓科技", scale: 19269512716, id: "300487.SZ" },
                { name: "川金诺", scale: 3356843021, id: "300505.SZ" },
                { name: "世名科技", scale: 2091628489, id: "300522.SZ" },
                { name: "达志科技", scale: 2633953805, id: "300530.SZ" },
                { name: "达威股份", scale: 1095986714, id: "300535.SZ" },
                { name: "广信材料", scale: 1906944406, id: "300537.SZ" },
                { name: "星源材质", scale: 20325942286, id: "300568.SZ" },
                { name: "中旗股份", scale: 3994237556, id: "300575.SZ" },
                { name: "容大感光", scale: 5084930336, id: "300576.SZ" },
                { name: "利安隆", scale: 8504512375, id: "300596.SZ" },
                { name: "晨化股份", scale: 1766720441, id: "300610.SZ" },
                { name: "扬帆新材", scale: 1700321548, id: "300637.SZ" },
                { name: "正丹股份", scale: 2457814931, id: "300641.SZ" },
                { name: "飞鹿股份", scale: 980747921, id: "300665.SZ" },
                { name: "双一科技", scale: 1773406256, id: "300690.SZ" },
                { name: "怡达股份", scale: 2313034046, id: "300721.SZ" },
                { name: "润禾材料", scale: 4345916353, id: "300727.SZ" },
                { name: "水羊股份", scale: 4962412025, id: "300740.SZ" },
                { name: "天地数码", scale: 1317714245, id: "300743.SZ" },
                { name: "七彩化学", scale: 3219674736, id: "300758.SZ" },
                { name: "德方纳米", scale: 31781008291, id: "300769.SZ" },
                { name: "贝斯美", scale: 4207314459, id: "300796.SZ" },
                { name: "锦鸡股份", scale: 1927040537, id: "300798.SZ" },
                { name: "泰和科技", scale: 2428578769, id: "300801.SZ" },
                { name: "斯迪克", scale: 3773120948, id: "300806.SZ" },
                { name: "东岳硅材", scale: 1.4556e10, id: "300821.SZ" },
                { name: "中船汉光", scale: 2.24576239e9, id: "300847.SZ" },
                { name: "美瑞新材", scale: 2.32276593e9, id: "300848.SZ" },
                { name: "科思股份", scale: 3.6426048e9, id: "300856.SZ" },
                { name: "华业香料", scale: 737788779, id: "300886.SZ" },
                { name: "翔丰华", scale: 3429435763, id: "300890.SZ" },
                { name: "惠云钛业", scale: 2.3833376e9, id: "300891.SZ" },
                { name: "瑞丰新材", scale: 8107987487, id: "300910.SZ" },
                { name: "中伟股份", scale: 14668083005, id: "300919.SZ" },
                { name: "贝泰妮", scale: 24978537394, id: "300957.SZ" },
                { name: "晶雪节能", scale: 1.1398887e9, id: "301010.SZ" },
                { name: "润丰股份", scale: 5752440036, id: "301035.SZ" },
                { name: "双乐股份", scale: 851006807, id: "301036.SZ" },
                { name: "汇隆新材", scale: 7.308368e8, id: "301057.SZ" },
                { name: "凯盛新材", scale: 3.6121168e9, id: "301069.SZ" },
                { name: "争光股份", scale: 903216912, id: "301092.SZ" },
                { name: "洁雅股份", scale: 1188919156, id: "301108.SZ" },
                { name: "善水科技", scale: 1242610281, id: "301190.SZ" },
                { name: "ST澄星", scale: 7732225288, id: "600078.SH" },
                { name: "云天化", scale: 34084183716, id: "600096.SH" },
                { name: "兴发集团", scale: 27524896945, id: "600141.SH" },
                { name: "巨化股份", scale: 46138660524, id: "600160.SH" },
                { name: "宁科生物", scale: 2849116504, id: "600165.SH" },
                { name: "中国巨石", scale: 58766047167, id: "600176.SH" },
                { name: "返利科技", scale: 3219927815, id: "600228.SH" },
                { name: "沧州大化", scale: 6799866418, id: "600230.SH" },
                { name: "两面针", scale: 2.5905e9, id: "600249.SH" },
                { name: "嘉化能源", scale: 13570829604, id: "600273.SH" },
                { name: "安迪苏", scale: 24003016393, id: "600299.SH" },
                { name: "万华化学", scale: 290363767972, id: "600309.SH" },
                { name: "上海家化", scale: 18916762078, id: "600315.SH" },
                { name: "浙江龙盛", scale: 33769584707, id: "600352.SH" },
                { name: "昊华科技", scale: 37152216809, id: "600378.SH" },
                { name: "江山股份", scale: 1.041282e10, id: "600389.SH" },
                { name: "柳化股份", scale: 2475954581, id: "600423.SH" },
                { name: "华鲁恒升", scale: 66439744769, id: "600426.SH" },
                { name: "时代新材", scale: 8846835635, id: "600458.SH" },
                { name: "六国化工", scale: 3.046144e9, id: "600470.SH" },
                { name: "扬农化工", scale: 28665648898, id: "600486.SH" },
                { name: "中化国际", scale: 17718429033, id: "600500.SH" },
                { name: "ST榕泰", scale: 1816405865, id: "600589.SH" },
                { name: "新安股份", scale: 12742319765, id: "600596.SH" },
                { name: "华谊集团", scale: 12141522895, id: "600623.SH" },
                { name: "阳煤化工", scale: 7530607468, id: "600691.SH" },
                { name: "鲁北化工", scale: 2668481485, id: "600727.SH" },
                { name: "湖南海利", scale: 3706679246, id: "600731.SH" },
                { name: "江苏索普", scale: 7790254782, id: "600746.SH" },
                { name: "丹化科技", scale: 2344782307, id: "600844.SH" },
                { name: "维远股份", scale: 7.681145e9, id: "600955.SH" },
                { name: "宏昌电子", scale: 3366976116, id: "603002.SH" },
                { name: "万盛股份", scale: 5663131872, id: "603010.SH" },
                { name: "胜华新材", scale: 1.47915864e10, id: "603026.SH" },
                { name: "美思德", scale: 2025613474, id: "603041.SH" },
                { name: "江化微", scale: 5933451534, id: "603078.SH" },
                { name: "先达股份", scale: 3386875296, id: "603086.SH" },
                { name: "东方材料", scale: 5722888258, id: "603110.SH" },
                { name: "碳元科技", scale: 1499857884, id: "603133.SH" },
                { name: "新亚强", scale: 1431754795, id: "603155.SH" },
                { name: "皇马科技", scale: 6.458039e9, id: "603181.SH" },
                { name: "亚邦股份", scale: 1.9784899e9, id: "603188.SH" },
                { name: "汇得科技", scale: 2526506673, id: "603192.SH" },
                { name: "元利科技", scale: 5762041766, id: "603217.SH" },
                { name: "雪峰科技", scale: 5.361818e9, id: "603227.SH" },
                { name: "宏和科技", scale: 6.522054e9, id: "603256.SH" },
                { name: "天洋新材", scale: 3.73097816e9, id: "603330.SH" },
                { name: "百傲化学", scale: 3708675168, id: "603360.SH" },
                { name: "亚士创能", scale: 4170245327, id: "603378.SH" },
                { name: "三美股份", scale: 2.078681121e10, id: "603379.SH" },
                { name: "苏利股份", scale: 3141034342, id: "603585.SH" },
                { name: "广信股份", scale: 19536047201, id: "603599.SH" },
                { name: "再升科技", scale: 5.08757919e9, id: "603601.SH" },
                { name: "珀莱雅", scale: 46152928708, id: "603605.SH" },
                { name: "拉芳家化", scale: 3.06728638e9, id: "603630.SH" },
                { name: "海利尔", scale: 6426018015, id: "603639.SH" },
                { name: "彤程新材", scale: 22265676698, id: "603650.SH" },
                { name: "永冠新材", scale: 3736603426, id: "603681.SH" },
                { name: "晶华新材", scale: 1861694881, id: "603683.SH" },
                { name: "阿科力", scale: 4666843125, id: "603722.SH" },
                { name: "天安新材", scale: 1.3142528e9, id: "603725.SH" },
                { name: "三棵树", scale: 4.059501849e10, id: "603737.SH" },
                { name: "雅运股份", scale: 2.0552064e9, id: "603790.SH" },
                { name: "丰山集团", scale: 2.29693073e9, id: "603810.SH" },
                { name: "嘉澳环保", scale: 2519889061, id: "603822.SH" },
                { name: "百合花", scale: 5.09679065e9, id: "603823.SH" },
                { name: "新化股份", scale: 5.80929624e9, id: "603867.SH" },
                { name: "永悦科技", scale: 2037482975, id: "603879.SH" },
                { name: "苏博特", scale: 6313058017, id: "603916.SH" },
                { name: "建业股份", scale: 3.4208e9, id: "603948.SH" },
                { name: "雪龙集团", scale: 3111424463, id: "603949.SH" },
                { name: "醋化股份", scale: 3.7072224e9, id: "603968.SH" },
                { name: "中农立华", scale: 4838402419, id: "603970.SH" },
                { name: "国泰集团", scale: 5516627433, id: "603977.SH" },
                { name: "吉华集团", scale: 3.143e9, id: "603980.SH" },
                { name: "丸美股份", scale: 1.367009e10, id: "603983.SH" },
                { name: "山东玻纤", scale: 2325224734, id: "605006.SH" },
                { name: "永和股份", scale: 5404013578, id: "605020.SH" },
                { name: "西大门", scale: 6.2433721e8, id: "605155.SH" },
                { name: "宏柏新材", scale: 3093587565, id: "605366.SH" },
                { name: "晨光新材", scale: 2297305032, id: "605399.SH" },
                { name: "圣泉集团", scale: 13805352994, id: "605589.SH" },
                { name: "容百科技", scale: 18821728851, id: "688005.SH" },
                { name: "奥福环保", scale: 1854806016, id: "688021.SH" },
                { name: "凯赛生物", scale: 1.497339301e10, id: "688065.SH" },
                { name: "金宏气体", scale: 7371346383, id: "688106.SH" },
                { name: "天奈科技", scale: 12700300898, id: "688116.SH" },
                { name: "东来技术", scale: 5.547477e8, id: "688129.SH" },
                { name: "泰坦科技", scale: 7.11782352e9, id: "688133.SH" },
                { name: "芳源股份", scale: 4831469549, id: "688148.SH" },
                { name: "松井股份", scale: 2822212168, id: "688157.SH" },
                { name: "阿拉丁", scale: 2694265535, id: "688179.SH" },
                { name: "卓越新能", scale: 1.6398e9, id: "688196.SH" },
                { name: "久日新材", scale: 2857697818, id: "688199.SH" },
                { name: "中触媒", scale: 1631972393, id: "688267.SH" },
                { name: "华特气体", scale: 11692843373, id: "688268.SH" },
                { name: "凯立新材", scale: 4248431975, id: "688269.SH" },
                { name: "富淼科技", scale: 1236674527, id: "688350.SH" },
                { name: "建龙微纳", scale: 5585313126, id: "688357.SH" },
                { name: "三孚新科", scale: 3748612519, id: "688359.SH" },
                { name: "赛特新材", scale: 3.44e9, id: "688398.SH" },
                { name: "瑞联新材", scale: 3382994562, id: "688550.SH" },
                { name: "杭华股份", scale: 1.45460616e9, id: "688571.SH" },
                { name: "上纬新材", scale: 694567887, id: "688585.SH" },
                { name: "呈和科技", scale: 3.62318566e9, id: "688625.SH" },
                { name: "华恒生物", scale: 10593652846, id: "688639.SH" },
                { name: "元琛科技", scale: 1020415808, id: "688659.SH" },
                { name: "振华新材", scale: 1.025758232e10, id: "688707.SH" },
                { name: "唯赛勃", scale: 874985563, id: "688718.SH" },
                { name: "壹石通", scale: 4917252754, id: "688733.SH" },
                { name: "厦钨新能", scale: 6478163325, id: "688778.SH" },
                { name: "长远锂科", scale: 14585804356, id: "688779.SH" },
                { name: "颖泰生物", scale: 6161160825, id: "833819.BJ" },
              ],
              name: "化学制品",
              scale: 2694209357519,
              id: "220300",
            },
            {
              children: [
                { name: "东方盛虹", scale: 69790954758, id: "000301.SZ" },
                { name: "吉林化纤", scale: 9487718432, id: "000420.SZ" },
                { name: "恒天海龙", scale: 2.33274046e9, id: "000677.SZ" },
                { name: "恒逸石化", scale: 3.100056341e10, id: "000703.SZ" },
                { name: "美达股份", scale: 2550914379, id: "000782.SZ" },
                { name: "华西股份", scale: 6.5015675e9, id: "000936.SZ" },
                { name: "新乡化纤", scale: 4448344807, id: "000949.SZ" },
                { name: "华峰化学", scale: 34267774758, id: "002064.SZ" },
                { name: "澳洋健康", scale: 2586619292, id: "002172.SZ" },
                { name: "海 利 得", scale: 4949627823, id: "002206.SZ" },
                { name: "泰和新材", scale: 8909743491, id: "002254.SZ" },
                { name: "*ST尤夫", scale: 7034654134, id: "002427.SZ" },
                { name: "荣盛石化", scale: 126232157813, id: "002493.SZ" },
                { name: "优彩资源", scale: 956151706, id: "002998.SZ" },
                { name: "光威复材", scale: 26098101043, id: "300699.SZ" },
                { name: "中简科技", scale: 21461073976, id: "300777.SZ" },
                { name: "蒙泰高新", scale: 6.921408e8, id: "300876.SZ" },
                { name: "皖维高新", scale: 10919822904, id: "600063.SH" },
                { name: "恒力石化", scale: 113329506555, id: "600346.SH" },
                { name: "江南高纤", scale: 3498157022, id: "600527.SH" },
                { name: "神马股份", scale: 5440917668, id: "600810.SH" },
                { name: "南京化纤", scale: 1630239745, id: "600889.SH" },
                { name: "桐昆股份", scale: 30241160309, id: "601233.SH" },
                { name: "新凤鸣", scale: 16273559087, id: "603225.SH" },
                { name: "苏州龙杰", scale: 1705095168, id: "603332.SH" },
                { name: "聚合顺", scale: 1.94369082e9, id: "605166.SH" },
                { name: "同益中", scale: 2196263049, id: "688722.SH" },
                { name: "吉林碳谷", scale: 4341868224, id: "836077.BJ" },
              ],
              name: "化学纤维",
              scale: 550821129133,
              id: "220400",
            },
            {
              children: [
                { name: "国风新材", scale: 4846536441, id: "000859.SZ" },
                { name: "佛塑科技", scale: 4314603857, id: "000973.SZ" },
                { name: "沧州明珠", scale: 7121538983, id: "002108.SZ" },
                { name: "大东南", scale: 4977614515, id: "002263.SZ" },
                { name: "普利特", scale: 9616072474, id: "002324.SZ" },
                { name: "双象股份", scale: 2.21004216e9, id: "002395.SZ" },
                { name: "国恩股份", scale: 4.44520214e9, id: "002768.SZ" },
                { name: "纳尔股份", scale: 2.06957972e9, id: "002825.SZ" },
                { name: "道恩股份", scale: 6569768964, id: "002838.SZ" },
                { name: "沃特股份", scale: 2792909111, id: "002886.SZ" },
                { name: "华峰超纤", scale: 5558451586, id: "300180.SZ" },
                { name: "安利股份", scale: 2082741674, id: "300218.SZ" },
                { name: "银禧科技", scale: 2185836738, id: "300221.SZ" },
                { name: "永利股份", scale: 2373056621, id: "300230.SZ" },
                { name: "裕兴股份", scale: 2570209215, id: "300305.SZ" },
                { name: "同大股份", scale: 1296443086, id: "300321.SZ" },
                { name: "杭州高新", scale: 1126234622, id: "300478.SZ" },
                { name: "同益股份", scale: 1725857391, id: "300538.SZ" },
                { name: "横河精密", scale: 2000203821, id: "300539.SZ" },
                { name: "美联新材", scale: 5971408057, id: "300586.SZ" },
                { name: "南京聚隆", scale: 1.3761002e9, id: "300644.SZ" },
                { name: "泉为科技", scale: 2.3458932e9, id: "300716.SZ" },
                { name: "华信新材", scale: 1418817862, id: "300717.SZ" },
                { name: "宝丽迪", scale: 779563554, id: "300905.SZ" },
                { name: "润阳科技", scale: 782247477, id: "300920.SZ" },
                { name: "祥源新材", scale: 1030444097, id: "300980.SZ" },
                { name: "奇德新材", scale: 5.129182e8, id: "300995.SZ" },
                { name: "江苏博云", scale: 1528296405, id: "301003.SZ" },
                { name: "宁波色母", scale: 1100062063, id: "301019.SZ" },
                { name: "金发科技", scale: 23394227098, id: "600143.SH" },
                { name: "东材科技", scale: 10794310436, id: "601208.SH" },
                { name: "天龙股份", scale: 2494039845, id: "603266.SH" },
                { name: "艾艾精工", scale: 1775848788, id: "603580.SH" },
                { name: "茶花股份", scale: 1.862014e9, id: "603615.SH" },
                { name: "至正股份", scale: 2824131074, id: "603991.SH" },
                { name: "长鸿高科", scale: 3096106283, id: "605008.SH" },
                { name: "福莱新材", scale: 6.05955e8, id: "605488.SH" },
                { name: "英科再生", scale: 2.59614071e9, id: "688087.SH" },
                { name: "会通股份", scale: 3190309162, id: "688219.SH" },
                { name: "瑞华泰", scale: 2.18297128e9, id: "688323.SH" },
                { name: "聚石化学", scale: 1121778099, id: "688669.SH" },
                { name: "禾昌聚合", scale: 671099593, id: "832089.BJ" },
                { name: "方大新材", scale: 332253968, id: "838163.BJ" },
              ],
              name: "塑料",
              scale: 1.4366983957e11,
              id: "220500",
            },
            {
              children: [
                { name: "贵州轮胎", scale: 5646900719, id: "000589.SZ" },
                { name: "青岛双星", scale: 3250587716, id: "000599.SZ" },
                { name: "联科科技", scale: 1.02651471e9, id: "001207.SZ" },
                { name: "黑猫股份", scale: 8032959376, id: "002068.SZ" },
                { name: "三 力 士", scale: 2149405074, id: "002224.SZ" },
                { name: "双箭股份", scale: 2192839926, id: "002381.SZ" },
                { name: "龙星化工", scale: 2301021407, id: "002442.SZ" },
                { name: "永东股份", scale: 1723830655, id: "002753.SZ" },
                { name: "森麒麟", scale: 8620003877, id: "002984.SZ" },
                { name: "阳谷华泰", scale: 4179401942, id: "300121.SZ" },
                { name: "海达股份", scale: 4166934868, id: "300320.SZ" },
                { name: "天铁股份", scale: 9215022918, id: "300587.SZ" },
                { name: "科创新源", scale: 2303294459, id: "300731.SZ" },
                { name: "震安科技", scale: 8026412825, id: "300767.SZ" },
                { name: "S*ST佳通", scale: 2.4446e9, id: "600182.SH" },
                { name: "风神股份", scale: 2842885429, id: "600469.SH" },
                { name: "赛轮轮胎", scale: 30778976959, id: "601058.SH" },
                { name: "三角轮胎", scale: 1.0352e10, id: "601163.SH" },
                { name: "通用股份", scale: 4.7520284e9, id: "601500.SH" },
                { name: "玲珑轮胎", scale: 31312357651, id: "601966.SH" },
                { name: "三维股份", scale: 13504195926, id: "603033.SH" },
                { name: "确成股份", scale: 2298632892, id: "605183.SH" },
                { name: "利通科技", scale: 436906311, id: "832225.BJ" },
                { name: "通易航天", scale: 416047049, id: "871642.BJ" },
              ],
              name: "橡胶",
              scale: 161973761089,
              id: "220600",
            },
          ],
          name: "化工",
          scale: 4779495317403,
          id: "220000",
        },
        {
          children: [
            {
              children: [
                { name: "中信特钢", scale: 82672403257, id: "000708.SZ" },
                { name: "河钢股份", scale: 23771436496, id: "000709.SZ" },
                { name: "中南股份", scale: 6.44656703e9, id: "000717.SZ" },
                { name: "本钢板材", scale: 1.53890849e10, id: "000761.SZ" },
                { name: "新兴铸管", scale: 17883164486, id: "000778.SZ" },
                { name: "太钢不锈", scale: 24664442366, id: "000825.SZ" },
                { name: "鞍钢股份", scale: 24187578792, id: "000898.SZ" },
                { name: "华菱钢铁", scale: 31677926121, id: "000932.SZ" },
                { name: "首钢股份", scale: 22910693349, id: "000959.SZ" },
                { name: "沙钢股份", scale: 8738802258, id: "002075.SZ" },
                { name: "三钢闽光", scale: 12061755091, id: "002110.SZ" },
                { name: "久立特材", scale: 14994027653, id: "002318.SZ" },
                { name: "金洲管道", scale: 3275798911, id: "002443.SZ" },
                { name: "常宝股份", scale: 3719507238, id: "002478.SZ" },
                { name: "永兴材料", scale: 24671670648, id: "002756.SZ" },
                { name: "盛德鑫泰", scale: 9.99845e8, id: "300881.SZ" },
                { name: "包钢股份", scale: 5.828606932e10, id: "600010.SH" },
                { name: "宝钢股份", scale: 1.5063016261e11, id: "600019.SH" },
                { name: "山东钢铁", scale: 17011170791, id: "600022.SH" },
                { name: "西宁特钢", scale: 2978587018, id: "600117.SH" },
                { name: "杭钢股份", scale: 16345595162, id: "600126.SH" },
                { name: "凌钢股份", scale: 6075090357, id: "600231.SH" },
                { name: "南钢股份", scale: 17018992777, id: "600282.SH" },
                { name: "酒钢宏兴", scale: 9958738304, id: "600307.SH" },
                { name: "抚顺特钢", scale: 2.110147e10, id: "600399.SH" },
                { name: "方大特钢", scale: 1.198708324e10, id: "600507.SH" },
                { name: "安阳钢铁", scale: 5917188055, id: "600569.SH" },
                { name: "八一钢铁", scale: 6576131862, id: "600581.SH" },
                { name: "新钢股份", scale: 13233199188, id: "600782.SH" },
                { name: "马钢股份", scale: 16530670785, id: "600808.SH" },
                { name: "柳钢股份", scale: 10661219712, id: "601003.SH" },
                { name: "重庆钢铁", scale: 12738322102, id: "601005.SH" },
                { name: "友发集团", scale: 3456069637, id: "601686.SH" },
                { name: "武进不锈", scale: 4889257946, id: "603878.SH" },
                { name: "甬金股份", scale: 4370832724, id: "603995.SH" },
                { name: "广大特材", scale: 6.3693552e9, id: "688186.SH" },
              ],
              name: "钢铁",
              scale: 714199910386,
              id: "230100",
            },
          ],
          name: "钢铁",
          scale: 714199910386,
          id: "230000",
        },
        {
          children: [
            {
              children: [
                { name: "合金投资", scale: 3754750087, id: "000633.SZ" },
                { name: "英洛华", scale: 7380283511, id: "000795.SZ" },
                { name: "东方钽业", scale: 5400180485, id: "000962.SZ" },
                { name: "安泰科技", scale: 8.92383487e9, id: "000969.SZ" },
                { name: "中科三环", scale: 15087156843, id: "000970.SZ" },
                { name: "中旗新材", scale: 1615431204, id: "001212.SZ" },
                { name: "华瓷股份", scale: 763786071, id: "001216.SZ" },
                { name: "长江材料", scale: 6.9609064e8, id: "001296.SZ" },
                { name: "横店东磁", scale: 3.115013268e10, id: "002056.SZ" },
                { name: "中钢天源", scale: 7335025838, id: "002057.SZ" },
                { name: "沃尔核材", scale: 9010474746, id: "002130.SZ" },
                { name: "云海金属", scale: 13127568058, id: "002182.SZ" },
                { name: "格林美", scale: 36183236615, id: "002340.SZ" },
                { name: "银河磁体", scale: 3611259173, id: "300127.SZ" },
                { name: "正海磁材", scale: 9840032224, id: "300224.SZ" },
                { name: "菲利华", scale: 22334095415, id: "300395.SZ" },
                { name: "光智科技", scale: 2284661925, id: "300489.SZ" },
                { name: "金力永磁", scale: 19421338763, id: "300748.SZ" },
                { name: "铂科新材", scale: 7862816576, id: "300811.SZ" },
                { name: "龙磁科技", scale: 2167870738, id: "300835.SZ" },
                { name: "图南股份", scale: 8.23392765e9, id: "300855.SZ" },
                { name: "屹通新材", scale: 7.26585e8, id: "300930.SZ" },
                { name: "中洲特材", scale: 1217202529, id: "300963.SZ" },
                { name: "力量钻石", scale: 6227736595, id: "301071.SZ" },
                { name: "喜悦智行", scale: 1.51072194e9, id: "301198.SZ" },
                { name: "东睦股份", scale: 5146802033, id: "600114.SH" },
                { name: "有研新材", scale: 12503592714, id: "600206.SH" },
                { name: "天通股份", scale: 11978720075, id: "600330.SH" },
                { name: "宁波韵升", scale: 8743765294, id: "600366.SH" },
                { name: "方大炭素", scale: 25242834207, id: "600516.SH" },
                { name: "丰华股份", scale: 1425946261, id: "600615.SH" },
                { name: "北矿科技", scale: 2.19767707e9, id: "600980.SH" },
                { name: "福达合金", scale: 1.8661272e9, id: "603045.SH" },
                { name: "合盛硅业", scale: 84751664025, id: "603260.SH" },
                { name: "索通发展", scale: 9349567716, id: "603612.SH" },
                { name: "石英股份", scale: 46355468037, id: "603688.SH" },
                { name: "坤彩科技", scale: 2.482272e10, id: "603826.SH" },
                { name: "深圳新星", scale: 2.86932597e9, id: "603978.SH" },
                { name: "大地熊", scale: 1.86646293e9, id: "688077.SH" },
                { name: "西部超导", scale: 36483301945, id: "688122.SH" },
                { name: "云路股份", scale: 4.12488144e9, id: "688190.SH" },
                { name: "联瑞新材", scale: 9585217353, id: "688300.SH" },
                { name: "金博股份", scale: 13061400989, id: "688598.SH" },
                { name: "悦安新材", scale: 2.31484176e9, id: "688786.SH" },
                { name: "贝特瑞", scale: 3.104891035e10, id: "835185.BJ" },
                { name: "秉扬科技", scale: 364549867, id: "836675.BJ" },
              ],
              name: "金属非金属新材料",
              scale: 561969977412,
              id: "240200",
            },
            {
              children: [
                { name: "中金岭南", scale: 18574194526, id: "000060.SZ" },
                { name: "兴业矿业", scale: 12700113704, id: "000426.SZ" },
                { name: "盛达资源", scale: 11016629842, id: "000603.SZ" },
                { name: "焦作万方", scale: 6323053848, id: "000612.SZ" },
                { name: "铜陵有色", scale: 36000263975, id: "000630.SZ" },
                { name: "国城矿业", scale: 21346988978, id: "000688.SZ" },
                { name: "锌业股份", scale: 4821751224, id: "000751.SZ" },
                { name: "中色股份", scale: 11087322799, id: "000758.SZ" },
                { name: "云铝股份", scale: 51543682063, id: "000807.SZ" },
                { name: "云南铜业", scale: 22571241988, id: "000878.SZ" },
                { name: "神火股份", scale: 41460532541, id: "000933.SZ" },
                { name: "罗平锌电", scale: 2.24756622e9, id: "002114.SZ" },
                { name: "常铝股份", scale: 2960746804, id: "002160.SZ" },
                { name: "楚江新材", scale: 9.08508639e9, id: "002171.SZ" },
                { name: "海亮股份", scale: 21469397534, id: "002203.SZ" },
                { name: "精艺股份", scale: 1618903692, id: "002295.SZ" },
                { name: "宏创控股", scale: 3724117371, id: "002379.SZ" },
                { name: "利源精制", scale: 5344175769, id: "002501.SZ" },
                { name: "亚太科技", scale: 5169472721, id: "002540.SZ" },
                { name: "闽发铝业", scale: 3306864234, id: "002578.SZ" },
                { name: "华锋股份", scale: 1580696316, id: "002806.SZ" },
                { name: "和胜股份", scale: 3702314418, id: "002824.SZ" },
                { name: "豪美新材", scale: 1389977157, id: "002988.SZ" },
                { name: "顺博合金", scale: 1464789042, id: "002996.SZ" },
                { name: "鑫铂股份", scale: 2476694128, id: "003038.SZ" },
                { name: "宜安科技", scale: 4197523176, id: "300328.SZ" },
                { name: "银邦股份", scale: 4913241914, id: "300337.SZ" },
                { name: "电工合金", scale: 1522464647, id: "300697.SZ" },
                { name: "锐新科技", scale: 1655779561, id: "300828.SZ" },
                { name: "志特新材", scale: 2.41723042e9, id: "300986.SZ" },
                { name: "南山铝业", scale: 39926165212, id: "600219.SH" },
                { name: "鑫科材料", scale: 4012225179, id: "600255.SH" },
                { name: "宏达股份", scale: 6.7056e9, id: "600331.SH" },
                { name: "西藏珠峰", scale: 18631603224, id: "600338.SH" },
                { name: "江西铜业", scale: 43331165816, id: "600362.SH" },
                { name: "鹏欣资源", scale: 7651666122, id: "600490.SH" },
                { name: "驰宏锌锗", scale: 2.769662613e10, id: "600497.SH" },
                { name: "豫光金铅", scale: 6715894625, id: "600531.SH" },
                { name: "中孚实业", scale: 13453997031, id: "600595.SH" },
                { name: "宁波富邦", scale: 1.4043456e9, id: "600768.SH" },
                { name: "新疆众和", scale: 11218279687, id: "600888.SH" },
                { name: "株冶集团", scale: 4694375435, id: "600961.SH" },
                { name: "华钰矿业", scale: 8041325664, id: "601020.SH" },
                { name: "博威合金", scale: 10939388197, id: "601137.SH" },
                { name: "西部矿业", scale: 3.152709e10, id: "601168.SH" },
                { name: "白银有色", scale: 21695989317, id: "601212.SH" },
                { name: "怡球资源", scale: 6486751391, id: "601388.SH" },
                { name: "中国铝业", scale: 82919002272, id: "601600.SH" },
                { name: "金田股份", scale: 3990929716, id: "601609.SH" },
                { name: "明泰铝业", scale: 13752002961, id: "601677.SH" },
                { name: "华峰铝业", scale: 3.5769591e9, id: "601702.SH" },
                { name: "龙宇股份", scale: 3746748929, id: "603003.SH" },
                { name: "海星股份", scale: 3.535376e9, id: "603115.SH" },
                { name: "众源新材", scale: 2.95514688e9, id: "603527.SH" },
                { name: "鼎胜新材", scale: 17822225116, id: "603876.SH" },
                { name: "永茂泰", scale: 1.7240391e9, id: "605208.SH" },
                { name: "有研粉材", scale: 1832428938, id: "688456.SH" },
              ],
              name: "工业金属",
              scale: 717680164644,
              id: "240300",
            },
            {
              children: [
                { name: "中润资源", scale: 5089116866, id: "000506.SZ" },
                { name: "银泰黄金", scale: 29427717369, id: "000975.SZ" },
                { name: "湖南黄金", scale: 18990301509, id: "002155.SZ" },
                { name: "恒邦股份", scale: 11398176312, id: "002237.SZ" },
                { name: "*ST荣华", scale: 4.06016e8, id: "600311.SH" },
                { name: "中金黄金", scale: 50170603915, id: "600489.SH" },
                { name: "山东黄金", scale: 92710471851, id: "600547.SH" },
                { name: "园城黄金", scale: 3032040255, id: "600766.SH" },
                { name: "赤峰黄金", scale: 29351396708, id: "600988.SH" },
                { name: "西部黄金", scale: 9.54e9, id: "601069.SH" },
                { name: "紫金矿业", scale: 272781226873, id: "601899.SH" },
              ],
              name: "黄金",
              scale: 522897067658,
              id: "240400",
            },
            {
              children: [
                { name: "中钨高新", scale: 12907598137, id: "000657.SZ" },
                { name: "中国稀土", scale: 3.30167231e10, id: "000831.SZ" },
                { name: "锡业股份", scale: 25872006685, id: "000960.SZ" },
                { name: "西部材料", scale: 8293486265, id: "002149.SZ" },
                { name: "东方锆业", scale: 4940774639, id: "002167.SZ" },
                { name: "章源钨业", scale: 7575254849, id: "002378.SZ" },
                { name: "云南锗业", scale: 7274308932, id: "002428.SZ" },
                { name: "赣锋锂业", scale: 80604924797, id: "002460.SZ" },
                { name: "天齐锂业", scale: 116772402067, id: "002466.SZ" },
                { name: "金贵银业", scale: 7197517454, id: "002716.SZ" },
                { name: "中矿资源", scale: 32287272395, id: "002738.SZ" },
                { name: "翔鹭钨业", scale: 1766849407, id: "002842.SZ" },
                { name: "寒锐钴业", scale: 11043548822, id: "300618.SZ" },
                { name: "浩通科技", scale: 2342439945, id: "301026.SZ" },
                { name: "北方稀土", scale: 92111877654, id: "600111.SH" },
                { name: "广晟有色", scale: 12803971413, id: "600259.SH" },
                { name: "盛和资源", scale: 24574628511, id: "600392.SH" },
                { name: "宝钛股份", scale: 16521547299, id: "600456.SH" },
                { name: "贵研铂业", scale: 12783510193, id: "600459.SH" },
                { name: "厦门钨业", scale: 28022686404, id: "600549.SH" },
                { name: "盛屯矿业", scale: 17355413677, id: "600711.SH" },
                { name: "金钼股份", scale: 35428116312, id: "601958.SH" },
                { name: "吉翔股份", scale: 6208378931, id: "603399.SH" },
                { name: "三祥新材", scale: 4541079377, id: "603663.SH" },
                { name: "华友钴业", scale: 84544656117, id: "603799.SH" },
                { name: "洛阳钼业", scale: 115758441559, id: "603993.SH" },
                { name: "博迁新材", scale: 6.66754023e9, id: "605376.SH" },
              ],
              name: "稀有金属",
              scale: 809216955171,
              id: "240500",
            },
          ],
          name: "有色金属",
          scale: 2611764164885,
          id: "240000",
        },
        {
          children: [
            {
              children: [
                { name: "盈方微", scale: 4.57385334e9, id: "000670.SZ" },
                { name: "紫光国微", scale: 88988806758, id: "002049.SZ" },
                { name: "大港股份", scale: 8339608132, id: "002077.SZ" },
                { name: "苏州固锝", scale: 10545676831, id: "002079.SZ" },
                { name: "康强电子", scale: 4.98752436e9, id: "002119.SZ" },
                { name: "通富微电", scale: 26457817389, id: "002156.SZ" },
                { name: "华天科技", scale: 30371543535, id: "002185.SZ" },
                { name: "北方华创", scale: 177791056212, id: "002371.SZ" },
                { name: "雅克科技", scale: 22933583784, id: "002409.SZ" },
                { name: "中晶科技", scale: 2495417771, id: "003026.SZ" },
                { name: "台基股份", scale: 3964265778, id: "300046.SZ" },
                { name: "欧比特", scale: 7778942325, id: "300053.SZ" },
                { name: "国民技术", scale: 8487318455, id: "300077.SZ" },
                { name: "晓程科技", scale: 2579515044, id: "300139.SZ" },
                { name: "北京君正", scale: 39273852281, id: "300223.SZ" },
                { name: "中颖电子", scale: 11537526751, id: "300327.SZ" },
                { name: "南大光电", scale: 17977799051, id: "300346.SZ" },
                { name: "扬杰科技", scale: 25916232255, id: "300373.SZ" },
                { name: "赛微电子", scale: 10384161858, id: "300456.SZ" },
                { name: "全志科技", scale: 1.429773229e10, id: "300458.SZ" },
                { name: "润欣科技", scale: 4457687358, id: "300493.SZ" },
                { name: "富瀚微", scale: 14837384774, id: "300613.SZ" },
                { name: "捷捷微电", scale: 12538884397, id: "300623.SZ" },
                { name: "圣邦股份", scale: 5.001594146e10, id: "300661.SZ" },
                { name: "江丰电子", scale: 16216475009, id: "300666.SZ" },
                { name: "富满微", scale: 10384319243, id: "300671.SZ" },
                { name: "国科微", scale: 19105549547, id: "300672.SZ" },
                { name: "阿石创", scale: 2520697263, id: "300706.SZ" },
                { name: "卓胜微", scale: 4.75060869e10, id: "300782.SZ" },
                { name: "派瑞股份", scale: 2394605435, id: "300831.SZ" },
                { name: "帝科股份", scale: 3884979515, id: "300842.SZ" },
                { name: "雷电微力", scale: 9984236764, id: "301050.SZ" },
                { name: "上海贝岭", scale: 14590469927, id: "600171.SH" },
                { name: "大唐电信", scale: 6506560492, id: "600198.SH" },
                { name: "华微电子", scale: 6866111424, id: "600360.SH" },
                { name: "士兰微", scale: 50043979002, id: "600460.SH" },
                { name: "长电科技", scale: 5.744397084e10, id: "600584.SH" },
                { name: "太极实业", scale: 14532712228, id: "600667.SH" },
                { name: "晶方科技", scale: 16545596181, id: "603005.SH" },
                { name: "博通集成", scale: 4.82112016e9, id: "603068.SH" },
                { name: "汇顶科技", scale: 24630871123, id: "603160.SH" },
                { name: "斯达半导", scale: 43057269466, id: "603290.SH" },
                { name: "韦尔股份", scale: 112402075547, id: "603501.SH" },
                { name: "瑞芯微", scale: 3.386980962e10, id: "603893.SH" },
                { name: "睿能科技", scale: 2.33607888e9, id: "603933.SH" },
                { name: "兆易创新", scale: 83845208872, id: "603986.SH" },
                { name: "新洁能", scale: 12146985317, id: "605111.SH" },
                { name: "立昂微", scale: 28419795562, id: "605358.SH" },
                { name: "睿创微纳", scale: 2.0794977e10, id: "688002.SH" },
                { name: "澜起科技", scale: 8.186579084e10, id: "688008.SH" },
                { name: "乐鑫科技", scale: 9581841366, id: "688018.SH" },
                { name: "安集科技", scale: 19439607777, id: "688019.SH" },
                { name: "炬芯科技", scale: 3340932804, id: "688049.SH" },
                { name: "盛美上海", scale: 8645173272, id: "688082.SH" },
                { name: "晶晨股份", scale: 36750828866, id: "688099.SH" },
                { name: "安路科技-U", scale: 12143729041, id: "688107.SH" },
                { name: "东芯股份", scale: 9457109831, id: "688110.SH" },
                { name: "聚辰股份", scale: 11146311879, id: "688123.SH" },
                { name: "沪硅产业", scale: 68524316671, id: "688126.SH" },
                { name: "利扬芯片", scale: 2784232742, id: "688135.SH" },
                { name: "清溢光电", scale: 6.157744e9, id: "688138.SH" },
                { name: "炬光科技", scale: 9048499767, id: "688167.SH" },
                { name: "希荻微", scale: 3754081715, id: "688173.SH" },
                { name: "概伦电子", scale: 4698790013, id: "688206.SH" },
                { name: "气派科技", scale: 1.15206536e9, id: "688216.SH" },
                { name: "翱捷科技-U", scale: 15990659081, id: "688220.SH" },
                { name: "芯导科技", scale: 1.3448274e9, id: "688230.SH" },
                { name: "神工股份", scale: 9.0368e9, id: "688233.SH" },
                { name: "天岳先进", scale: 10561551024, id: "688234.SH" },
                { name: "寒武纪-U", scale: 6.006203996e10, id: "688256.SH" },
                { name: "创耀科技", scale: 4274809344, id: "688259.SH" },
                { name: "东微半导", scale: 7740380366, id: "688261.SH" },
                { name: "国芯科技", scale: 12593888034, id: "688262.SH" },
                { name: "臻镭科技", scale: 5801857688, id: "688270.SH" },
                { name: "敏芯股份", scale: 1935262388, id: "688286.SH" },
                { name: "晶丰明源", scale: 9989120264, id: "688368.SH" },
                { name: "复旦微电", scale: 1.79992092e10, id: "688385.SH" },
                { name: "华润微", scale: 76235304973, id: "688396.SH" },
                { name: "芯朋微", scale: 5912699087, id: "688508.SH" },
                { name: "芯原股份", scale: 18880900376, id: "688521.SH" },
                { name: "思瑞浦", scale: 15840026878, id: "688536.SH" },
                { name: "力合微", scale: 2624454247, id: "688589.SH" },
                { name: "芯海科技", scale: 3258026099, id: "688595.SH" },
                { name: "力芯微", scale: 3.6436212e9, id: "688601.SH" },
                { name: "恒玄科技", scale: 11167512463, id: "688608.SH" },
                { name: "和林微纳", scale: 3322834825, id: "688661.SH" },
                { name: "银河微电", scale: 939442693, id: "688689.SH" },
                { name: "明微电子", scale: 3169429472, id: "688699.SH" },
                { name: "宏微科技", scale: 8813576223, id: "688711.SH" },
                { name: "格科微", scale: 18956044176, id: "688728.SH" },
                { name: "普冉股份", scale: 5008693328, id: "688766.SH" },
                { name: "艾为电子", scale: 10019048022, id: "688798.SH" },
                { name: "中芯国际", scale: 122924890816, id: "688981.SH" },
              ],
              name: "半导体",
              scale: 2002920639077,
              id: "270100",
            },
            {
              children: [
                { name: "华金资本", scale: 3658804795, id: "000532.SZ" },
                { name: "风华高科", scale: 1.803213427e10, id: "000636.SZ" },
                { name: "厦门信达", scale: 2717267435, id: "000701.SZ" },
                { name: "振华科技", scale: 45806018797, id: "000733.SZ" },
                { name: "超声电子", scale: 5294265414, id: "000823.SZ" },
                { name: "天津普林", scale: 2220023405, id: "002134.SZ" },
                { name: "顺络电子", scale: 16348333925, id: "002138.SZ" },
                { name: "东晶电子", scale: 1631063832, id: "002199.SZ" },
                { name: "福晶科技", scale: 13938153327, id: "002222.SZ" },
                { name: "超华科技", scale: 3885646317, id: "002288.SZ" },
                { name: "东山精密", scale: 35271285376, id: "002384.SZ" },
                { name: "兴森科技", scale: 23359956647, id: "002436.SZ" },
                { name: "沪电股份", scale: 46668696239, id: "002463.SZ" },
                { name: "江海股份", scale: 15969720191, id: "002484.SZ" },
                { name: "中京电子", scale: 5587700582, id: "002579.SZ" },
                { name: "金安国纪", scale: 6341650337, id: "002636.SZ" },
                { name: "崇达技术", scale: 5466304608, id: "002815.SZ" },
                { name: "奥士康", scale: 10477301151, id: "002913.SZ" },
                { name: "深南电路", scale: 4.800851978e10, id: "002916.SZ" },
                { name: "鹏鼎控股", scale: 68973275952, id: "002938.SZ" },
                { name: "三环集团", scale: 57584733682, id: "300408.SZ" },
                { name: "惠伦晶体", scale: 3257329312, id: "300460.SZ" },
                { name: "胜宏科技", scale: 17725874984, id: "300476.SZ" },
                { name: "弘信电子", scale: 6349631237, id: "300657.SZ" },
                { name: "宏达电子", scale: 9211367821, id: "300726.SZ" },
                { name: "明阳电路", scale: 4284986475, id: "300739.SZ" },
                { name: "中富电路", scale: 1.003221e9, id: "300814.SZ" },
                { name: "四会富仕", scale: 1413138134, id: "300852.SZ" },
                { name: "科翔股份", scale: 3162993282, id: "300903.SZ" },
                { name: "中英科技", scale: 761173775, id: "300936.SZ" },
                { name: "本川智能", scale: 1871865854, id: "300964.SZ" },
                { name: "生益科技", scale: 41663889854, id: "600183.SH" },
                { name: "铜峰电子", scale: 3640183694, id: "600237.SH" },
                { name: "法拉电子", scale: 3.232125e10, id: "600563.SH" },
                { name: "*ST方科", scale: 11718524136, id: "600601.SH" },
                { name: "华正新材", scale: 5115241785, id: "603186.SH" },
                { name: "景旺电子", scale: 20617450202, id: "603228.SH" },
                { name: "依顿电子", scale: 7697992531, id: "603328.SH" },
                { name: "骏亚科技", scale: 3831026854, id: "603386.SH" },
                { name: "泰晶科技", scale: 7640641799, id: "603738.SH" },
                { name: "世运电路", scale: 10201802533, id: "603920.SH" },
                { name: "博敏电子", scale: 7235931294, id: "603936.SH" },
                { name: "艾华集团", scale: 9106634308, id: "603989.SH" },
                { name: "澳弘电子", scale: 851181929, id: "605058.SH" },
                { name: "协和电子", scale: 8.687921e8, id: "605258.SH" },
                { name: "生益电子", scale: 4.26124498e9, id: "688183.SH" },
                { name: "南亚新材", scale: 2279360684, id: "688519.SH" },
                { name: "迅捷兴", scale: 8.9578902e8, id: "688655.SH" },
              ],
              name: "元件",
              scale: 656229375639,
              id: "270200",
            },
            {
              children: [
                { name: "深纺织Ａ", scale: 4551937616, id: "000045.SZ" },
                { name: "深天马Ａ", scale: 23995341155, id: "000050.SZ" },
                { name: "TCL科技", scale: 57610050101, id: "000100.SZ" },
                { name: "东旭光电", scale: 8851591925, id: "000413.SZ" },
                { name: "华映科技", scale: 5360380081, id: "000536.SZ" },
                { name: "佛山照明", scale: 5388155355, id: "000541.SZ" },
                { name: "京东方Ａ", scale: 155129489374, id: "000725.SZ" },
                { name: "冠捷科技", scale: 7214558741, id: "000727.SZ" },
                { name: "ST德豪", scale: 2.83892827e9, id: "002005.SZ" },
                { name: "联创电子", scale: 12417467266, id: "002036.SZ" },
                { name: "雪莱特", scale: 2840393964, id: "002076.SZ" },
                { name: "莱宝高科", scale: 5886559471, id: "002106.SZ" },
                { name: "中光学", scale: 4097557033, id: "002189.SZ" },
                { name: "合力泰", scale: 10023906223, id: "002217.SZ" },
                { name: "水晶光电", scale: 17571023428, id: "002273.SZ" },
                { name: "宇顺电子", scale: 1965642294, id: "002289.SZ" },
                { name: "维信诺", scale: 9.80537302e9, id: "002387.SZ" },
                { name: "国星光电", scale: 5138374612, id: "002449.SZ" },
                { name: "欧菲光", scale: 15806890111, id: "002456.SZ" },
                { name: "奥拓电子", scale: 3135111111, id: "002587.SZ" },
                { name: "木林森", scale: 7.95024303e9, id: "002745.SZ" },
                { name: "恒久科技", scale: 2191135329, id: "002808.SZ" },
                { name: "视源股份", scale: 32504330434, id: "002841.SZ" },
                { name: "同兴达", scale: 3107871508, id: "002845.SZ" },
                { name: "三利谱", scale: 5801557632, id: "002876.SZ" },
                { name: "亚世光电", scale: 2168529081, id: "002952.SZ" },
                { name: "鸿合科技", scale: 4665945725, id: "002955.SZ" },
                { name: "五方光电", scale: 2386394589, id: "002962.SZ" },
                { name: "芯瑞达", scale: 1212354942, id: "002983.SZ" },
                { name: "宝明科技", scale: 2648180926, id: "002992.SZ" },
                { name: "日久光电", scale: 1654749688, id: "003015.SZ" },
                { name: "宸展光电", scale: 2485778518, id: "003019.SZ" },
                { name: "金龙机电", scale: 4674438389, id: "300032.SZ" },
                { name: "GQY视讯", scale: 2.12e9, id: "300076.SZ" },
                { name: "长信科技", scale: 15926344675, id: "300088.SZ" },
                { name: "乾照光电", scale: 5.69464397e9, id: "300102.SZ" },
                { name: "经纬辉开", scale: 3057516142, id: "300120.SZ" },
                { name: "锦富技术", scale: 4142556078, id: "300128.SZ" },
                { name: "雷曼光电", scale: 1821142614, id: "300162.SZ" },
                { name: "鸿利智汇", scale: 5137337438, id: "300219.SZ" },
                { name: "洲明科技", scale: 7485826926, id: "300232.SZ" },
                { name: "瑞丰光电", scale: 2869105044, id: "300241.SZ" },
                { name: "利亚德", scale: 13454728209, id: "300296.SZ" },
                { name: "*ST长方", scale: 1374789258, id: "300301.SZ" },
                { name: "聚飞光电", scale: 6743713566, id: "300303.SZ" },
                { name: "麦捷科技", scale: 7098333231, id: "300319.SZ" },
                { name: "华灿光电", scale: 6493541958, id: "300323.SZ" },
                { name: "苏大维格", scale: 4758980611, id: "300331.SZ" },
                { name: "艾比森", scale: 2693150073, id: "300389.SZ" },
                { name: "联得装备", scale: 2248601115, id: "300545.SZ" },
                { name: "激智科技", scale: 3813615236, id: "300566.SZ" },
                { name: "英飞特", scale: 3489324712, id: "300582.SZ" },
                { name: "三雄极光", scale: 1934661346, id: "300625.SZ" },
                { name: "光莆股份", scale: 2271535098, id: "300632.SZ" },
                { name: "太龙股份", scale: 1748772558, id: "300650.SZ" },
                { name: "联合光电", scale: 3.01741409e9, id: "300691.SZ" },
                { name: "森霸传感", scale: 2167564572, id: "300701.SZ" },
                { name: "聚灿光电", scale: 3896725319, id: "300708.SZ" },
                { name: "隆利科技", scale: 2083809347, id: "300752.SZ" },
                { name: "宇瞳光学", scale: 3935959455, id: "300790.SZ" },
                { name: "久量股份", scale: 2.2096e9, id: "300808.SZ" },
                { name: "爱克股份", scale: 1266623719, id: "300889.SZ" },
                { name: "汇创达", scale: 1743879088, id: "300909.SZ" },
                { name: "秋田微", scale: 2.33455356e9, id: "300939.SZ" },
                { name: "南极光", scale: 1304852026, id: "300940.SZ" },
                { name: "崧盛股份", scale: 1.10583024e9, id: "301002.SZ" },
                { name: "阳光照明", scale: 4583497201, id: "600261.SH" },
                { name: "联创光电", scale: 1.542778216e10, id: "600363.SH" },
                { name: "凯盛科技", scale: 9808270599, id: "600552.SH" },
                { name: "飞乐音响", scale: 4991171198, id: "600651.SH" },
                { name: "*ST瑞德", scale: 7138271158, id: "600666.SH" },
                { name: "三安光电", scale: 80141049835, id: "600703.SH" },
                { name: "彩虹股份", scale: 16359773978, id: "600707.SH" },
                { name: "永新光学", scale: 9012000525, id: "603297.SH" },
                { name: "得邦照明", scale: 7068318602, id: "603303.SH" },
                { name: "欧普照明", scale: 13522430755, id: "603515.SH" },
                { name: "华体科技", scale: 1915481986, id: "603679.SH" },
                { name: "晨丰科技", scale: 1831980639, id: "603685.SH" },
                { name: "沃格光电", scale: 3452919351, id: "603773.SH" },
                { name: "力鼎光电", scale: 552269528, id: "605118.SH" },
                { name: "伟时电子", scale: 1228538526, id: "605218.SH" },
                { name: "立达信", scale: 8.658846e8, id: "605365.SH" },
                { name: "光峰科技", scale: 1.118999253e10, id: "688007.SH" },
                { name: "福光股份", scale: 4.58963229e9, id: "688010.SH" },
                { name: "龙腾光电", scale: 8349433642, id: "688055.SH" },
                { name: "美迪凯", scale: 1945033643, id: "688079.SH" },
                { name: "蓝特光学", scale: 2912620464, id: "688127.SH" },
                { name: "八亿时空", scale: 4042219287, id: "688181.SH" },
                { name: "腾景科技", scale: 2.7244536e9, id: "688195.SH" },
                { name: "长阳科技", scale: 4279561982, id: "688299.SH" },
                { name: "和辉光电-U", scale: 14303503168, id: "688538.SH" },
              ],
              name: "光学光电子",
              scale: 796761363463,
              id: "270300",
            },
            {
              children: [
                { name: "深圳华强", scale: 13777581855, id: "000062.SZ" },
                { name: "华工科技", scale: 36440779923, id: "000988.SZ" },
                { name: "大族激光", scale: 26665208655, id: "002008.SZ" },
                { name: "贤丰控股", scale: 4254961946, id: "002141.SZ" },
                { name: "远 望 谷", scale: 3526482133, id: "002161.SZ" },
                { name: "大立科技", scale: 6580147719, id: "002214.SZ" },
                { name: "新亚制程", scale: 3431470328, id: "002388.SZ" },
                { name: "高德红外", scale: 29798144881, id: "002414.SZ" },
                { name: "海洋王", scale: 3182537857, id: "002724.SZ" },
                { name: "好利科技", scale: 3.2881323e9, id: "002729.SZ" },
                { name: "金溢科技", scale: 3753587824, id: "002869.SZ" },
                { name: "力源信息", scale: 5137116777, id: "300184.SZ" },
                { name: "金运激光", scale: 1553989091, id: "300220.SZ" },
                { name: "科恒股份", scale: 2347401936, id: "300340.SZ" },
                { name: "天华新能", scale: 20894794627, id: "300390.SZ" },
                { name: "久之洋", scale: 5.832e9, id: "300516.SZ" },
                { name: "民德电子", scale: 3882633576, id: "300656.SZ" },
                { name: "百邦科技", scale: 1392627669, id: "300736.SZ" },
                { name: "锐科激光", scale: 12602472404, id: "300747.SZ" },
                { name: "安克创新", scale: 9702048887, id: "300866.SZ" },
                { name: "杰美特", scale: 977980289, id: "300868.SZ" },
                { name: "商络电子", scale: 2079678459, id: "300975.SZ" },
                { name: "英诺激光", scale: 1888960014, id: "301021.SZ" },
                { name: "金百泽", scale: 1122276995, id: "301041.SZ" },
                { name: "鸿富瀚", scale: 1.40862579e9, id: "301086.SZ" },
                { name: "雅创电子", scale: 1.87915e9, id: "301099.SZ" },
                { name: "凤凰光学", scale: 5831395241, id: "600071.SH" },
                { name: "诺德股份", scale: 10182861132, id: "600110.SH" },
                { name: "维科技术", scale: 5710961635, id: "600152.SH" },
                { name: "大恒科技", scale: 5.739552e9, id: "600288.SH" },
                { name: "旭光电子", scale: 7455803598, id: "600353.SH" },
                { name: "海航科技", scale: 6484436411, id: "600751.SH" },
                { name: "杉杉股份", scale: 28695671914, id: "600884.SH" },
                { name: "东尼电子", scale: 8191879452, id: "603595.SH" },
                { name: "格林达", scale: 3631399669, id: "603931.SH" },
                { name: "方邦股份", scale: 4369065935, id: "688020.SH" },
                { name: "杰普特", scale: 2668440028, id: "688025.SH" },
                { name: "世华科技", scale: 1191718483, id: "688093.SH" },
                { name: "国力股份", scale: 4264184232, id: "688103.SH" },
                { name: "富吉瑞", scale: 443278276, id: "688272.SH" },
                { name: "富信科技", scale: 2.1692012e9, id: "688662.SH" },
                { name: "晶赛科技", scale: 5.5262419e8, id: "871981.BJ" },
              ],
              name: "其他电子",
              scale: 304983265331,
              id: "270400",
            },
            {
              children: [
                { name: "深华发Ａ", scale: 1739187754, id: "000020.SZ" },
                { name: "深科技", scale: 31824349901, id: "000021.SZ" },
                { name: "德赛电池", scale: 11917398927, id: "000049.SZ" },
                { name: "国光电器", scale: 7161036828, id: "002045.SZ" },
                { name: "得润电子", scale: 5368798614, id: "002055.SZ" },
                { name: "拓邦股份", scale: 12034458849, id: "002139.SZ" },
                { name: "大华股份", scale: 48852872103, id: "002236.SZ" },
                { name: "歌尔股份", scale: 56545734902, id: "002241.SZ" },
                { name: "漫步者", scale: 9764361295, id: "002351.SZ" },
                { name: "卓翼科技", scale: 2801451876, id: "002369.SZ" },
                { name: "和而泰", scale: 12560427334, id: "002402.SZ" },
                { name: "海康威视", scale: 361800216621, id: "002415.SZ" },
                { name: "立讯精密", scale: 197324923285, id: "002475.SZ" },
                { name: "春兴精工", scale: 4.85763703e9, id: "002547.SZ" },
                { name: "领益智造", scale: 39763975795, id: "002600.SZ" },
                { name: "安洁科技", scale: 5623635063, id: "002635.SZ" },
                { name: "共达电声", scale: 4365429917, id: "002655.SZ" },
                { name: "茂硕电源", scale: 2259776614, id: "002660.SZ" },
                { name: "奋达科技", scale: 6548103716, id: "002681.SZ" },
                { name: "可立克", scale: 7493242857, id: "002782.SZ" },
                { name: "捷荣技术", scale: 2143650937, id: "002855.SZ" },
                { name: "洁美科技", scale: 10655480331, id: "002859.SZ" },
                { name: "瀛通通讯", scale: 1171397854, id: "002861.SZ" },
                { name: "传艺科技", scale: 4971719261, id: "002866.SZ" },
                { name: "美格智能", scale: 6139842057, id: "002881.SZ" },
                { name: "京泉华", scale: 4839328627, id: "002885.SZ" },
                { name: "惠威科技", scale: 1085771411, id: "002888.SZ" },
                { name: "伊戈尔", scale: 4170356237, id: "002922.SZ" },
                { name: "盈趣科技", scale: 13604938243, id: "002925.SZ" },
                { name: "兴瑞科技", scale: 6610513756, id: "002937.SZ" },
                { name: "恒铭达", scale: 3.05894237e9, id: "002947.SZ" },
                { name: "瑞玛精密", scale: 2.8884e9, id: "002976.SZ" },
                { name: "朝阳科技", scale: 2.352e9, id: "002981.SZ" },
                { name: "奥海科技", scale: 3.14308225e9, id: "002993.SZ" },
                { name: "振邦智能", scale: 1.14604164e9, id: "003028.SZ" },
                { name: "创世纪", scale: 11112588991, id: "300083.SZ" },
                { name: "长盈精密", scale: 14786908792, id: "300115.SZ" },
                { name: "英唐智控", scale: 5501558497, id: "300131.SZ" },
                { name: "信维通信", scale: 16710118146, id: "300136.SZ" },
                { name: "欣旺达", scale: 31142166361, id: "300207.SZ" },
                { name: "光韵达", scale: 3063819095, id: "300227.SZ" },
                { name: "ST星星", scale: 4688974698, id: "300256.SZ" },
                { name: "和晶科技", scale: 2114525244, id: "300279.SZ" },
                { name: "硕贝德", scale: 3510489244, id: "300322.SZ" },
                { name: "蓝思科技", scale: 62503242619, id: "300433.SZ" },
                { name: "朗科智能", scale: 1885802479, id: "300543.SZ" },
                { name: "飞荣达", scale: 5277159834, id: "300602.SZ" },
                { name: "超频三", scale: 3380040121, id: "300647.SZ" },
                { name: "电连技术", scale: 1.214371123e10, id: "300679.SZ" },
                { name: "中石科技", scale: 4372553612, id: "300684.SZ" },
                { name: "智动力", scale: 2051105319, id: "300686.SZ" },
                { name: "精研科技", scale: 4594423777, id: "300709.SZ" },
                { name: "光弘科技", scale: 8279694918, id: "300735.SZ" },
                { name: "海能实业", scale: 2593960032, id: "300787.SZ" },
                { name: "佳禾智能", scale: 5795732882, id: "300793.SZ" },
                { name: "贝仕达克", scale: 2331499231, id: "300822.SZ" },
                { name: "胜蓝股份", scale: 909486135, id: "300843.SZ" },
                { name: "协创数据", scale: 3384722114, id: "300857.SZ" },
                { name: "朗特智能", scale: 1341213728, id: "300916.SZ" },
                { name: "博硕科技", scale: 2.74569e9, id: "300951.SZ" },
                { name: "英力股份", scale: 801485984, id: "300956.SZ" },
                { name: "格林精密", scale: 1385005984, id: "300968.SZ" },
                { name: "达瑞电子", scale: 1787661765, id: "300976.SZ" },
                { name: "创益通", scale: 9.544896e8, id: "300991.SZ" },
                { name: "天禄科技", scale: 986453517, id: "301045.SZ" },
                { name: "显盈科技", scale: 1.2219375e9, id: "301067.SZ" },
                { name: "万祥科技", scale: 944013535, id: "301180.SZ" },
                { name: "超达装备", scale: 600500405, id: "301186.SZ" },
                { name: "奥尼电子", scale: 1319705703, id: "301189.SZ" },
                { name: "福日电子", scale: 3699546481, id: "600203.SH" },
                { name: "科力远", scale: 12586803962, id: "600478.SH" },
                { name: "闻泰科技", scale: 72517828536, id: "600745.SH" },
                { name: "工业富联", scale: 372019399463, id: "601138.SH" },
                { name: "环旭电子", scale: 37145961767, id: "601231.SH" },
                { name: "福蓉科技", scale: 7.496294e9, id: "603327.SH" },
                { name: "易德龙", scale: 3568212288, id: "603380.SH" },
                { name: "利通电子", scale: 3.23414e9, id: "603629.SH" },
                { name: "徕木股份", scale: 3581927713, id: "603633.SH" },
                { name: "春秋电子", scale: 4039160557, id: "603890.SH" },
                { name: "传音控股", scale: 82404910875, id: "688036.SH" },
                { name: "统联精密", scale: 1979504752, id: "688210.SH" },
                { name: "昀冢科技", scale: 1103483412, id: "688260.SH" },
                { name: "福立旺", scale: 1.74094152e9, id: "688678.SH" },
                { name: "莱尔科技", scale: 1.2374764e9, id: "688683.SH" },
                { name: "瑞可达", scale: 5946147561, id: "688800.SH" },
                { name: "同惠电子", scale: 843483413, id: "833509.BJ" },
                { name: "德瑞锂电", scale: 602897165, id: "833523.BJ" },
                { name: "长虹能源", scale: 995154276, id: "836239.BJ" },
                { name: "智新电子", scale: 3.4682949e8, id: "837212.BJ" },
              ],
              name: "电子制造",
              scale: 1741901028978,
              id: "270500",
            },
          ],
          name: "电子",
          scale: 5502795672488,
          id: "270000",
        },
        {
          children: [
            {
              children: [
                { name: "江铃汽车", scale: 6698544027, id: "000550.SZ" },
                { name: "海马汽车", scale: 7619600239, id: "000572.SZ" },
                { name: "长安汽车", scale: 86124184452, id: "000625.SZ" },
                { name: "一汽解放", scale: 38042466265, id: "000800.SZ" },
                { name: "安凯客车", scale: 3717978882, id: "000868.SZ" },
                { name: "中国铁物", scale: 13470557783, id: "000927.SZ" },
                { name: "中国重汽", scale: 17233961984, id: "000951.SZ" },
                { name: "中通客车", scale: 5845922061, id: "000957.SZ" },
                { name: "比亚迪", scale: 283037798772, id: "002594.SZ" },
                { name: "中集车辆", scale: 9123475485, id: "301039.SZ" },
                { name: "东风汽车", scale: 1.108e10, id: "600006.SH" },
                { name: "宇通客车", scale: 27939912994, id: "600066.SH" },
                { name: "上汽集团", scale: 162750616814, id: "600104.SH" },
                { name: "福田汽车", scale: 19725576141, id: "600166.SH" },
                { name: "亚星客车", scale: 1.8172e9, id: "600213.SH" },
                { name: "ST曙光", scale: 3702311076, id: "600303.SH" },
                { name: "江淮汽车", scale: 22076019284, id: "600418.SH" },
                { name: "金龙汽车", scale: 4072829329, id: "600686.SH" },
                { name: "北汽蓝谷", scale: 21869446257, id: "600733.SH" },
                { name: "赛力斯", scale: 46295996049, id: "601127.SH" },
                { name: "广汽集团", scale: 77456178718, id: "601238.SH" },
                { name: "长城汽车", scale: 167846559623, id: "601633.SH" },
                { name: "力帆科技", scale: 7.65153e9, id: "601777.SH" },
              ],
              name: "汽车整车",
              scale: 1045198666235,
              id: "280100",
            },
            {
              children: [
                { name: "富奥股份", scale: 7801085615, id: "000030.SZ" },
                { name: "潍柴动力", scale: 57752896779, id: "000338.SZ" },
                { name: "万向钱潮", scale: 13710127368, id: "000559.SZ" },
                { name: "威孚高科", scale: 14580123774, id: "000581.SZ" },
                { name: "恒立实业", scale: 1.8922557e9, id: "000622.SZ" },
                { name: "襄阳轴承", scale: 2293462867, id: "000678.SZ" },
                { name: "模塑科技", scale: 4750732281, id: "000700.SZ" },
                { name: "浩物股份", scale: 1957770905, id: "000757.SZ" },
                { name: "中鼎股份", scale: 1.491111429e10, id: "000887.SZ" },
                { name: "云内动力", scale: 4493412256, id: "000903.SZ" },
                { name: "众泰汽车", scale: 1.32911001e10, id: "000980.SZ" },
                { name: "宗申动力", scale: 5462009012, id: "001696.SZ" },
                { name: "宁波华翔", scale: 7416971951, id: "002048.SZ" },
                { name: "万丰奥威", scale: 13256302379, id: "002085.SZ" },
                { name: "广东鸿图", scale: 9095181395, id: "002101.SZ" },
                { name: "银轮股份", scale: 9893296818, id: "002126.SZ" },
                { name: "大为股份", scale: 2.8634e9, id: "002213.SZ" },
                { name: "奥特佳", scale: 8172618222, id: "002239.SZ" },
                { name: "西仪股份", scale: 4214630456, id: "002265.SZ" },
                { name: "天润工业", scale: 5061182834, id: "002283.SZ" },
                { name: "亚太股份", scale: 5517308971, id: "002284.SZ" },
                { name: "新朋股份", scale: 3232731765, id: "002328.SZ" },
                { name: "兴民智通", scale: 2318124938, id: "002355.SZ" },
                { name: "隆基机械", scale: 2800355026, id: "002363.SZ" },
                { name: "远东传动", scale: 2461199685, id: "002406.SZ" },
                { name: "万里扬", scale: 11121862592, id: "002434.SZ" },
                { name: "中原内配", scale: 2494396344, id: "002448.SZ" },
                { name: "松芝股份", scale: 4270768759, id: "002454.SZ" },
                { name: "双环传动", scale: 15796203888, id: "002472.SZ" },
                { name: "金固股份", scale: 6004721658, id: "002488.SZ" },
                { name: "天汽模", scale: 3436678548, id: "002510.SZ" },
                { name: "旷达科技", scale: 4.63147084e9, id: "002516.SZ" },
                { name: "飞龙股份", scale: 4758340805, id: "002536.SZ" },
                { name: "南方精工", scale: 2539748781, id: "002553.SZ" },
                { name: "万安科技", scale: 3708206621, id: "002590.SZ" },
                { name: "ST八菱", scale: 1.2227765e9, id: "002592.SZ" },
                { name: "光启技术", scale: 29644056455, id: "002625.SZ" },
                { name: "京威股份", scale: 5009936874, id: "002662.SZ" },
                { name: "浙江世宝", scale: 4.0594628e9, id: "002703.SZ" },
                { name: "光洋股份", scale: 2.21073633e9, id: "002708.SZ" },
                { name: "登云股份", scale: 1.86024e9, id: "002715.SZ" },
                { name: "跃岭股份", scale: 1780520823, id: "002725.SZ" },
                { name: "蓝黛科技", scale: 2998347627, id: "002765.SZ" },
                { name: "路畅科技", scale: 3564049557, id: "002813.SZ" },
                { name: "今飞凯达", scale: 2628966467, id: "002863.SZ" },
                { name: "钧达股份", scale: 17649006012, id: "002865.SZ" },
                { name: "香山股份", scale: 3002000708, id: "002870.SZ" },
                { name: "华阳集团", scale: 14030015782, id: "002906.SZ" },
                { name: "联诚精密", scale: 1360751804, id: "002921.SZ" },
                { name: "瑞鹄模具", scale: 2519751967, id: "002997.SZ" },
                { name: "征和工业", scale: 7.6815755e8, id: "003033.SZ" },
                { name: "双林股份", scale: 2666756717, id: "300100.SZ" },
                { name: "精锻科技", scale: 4558137195, id: "300258.SZ" },
                { name: "云意电气", scale: 3591959211, id: "300304.SZ" },
                { name: "鹏翎股份", scale: 1707301291, id: "300375.SZ" },
                { name: "立中集团", scale: 10944059601, id: "300428.SZ" },
                { name: "富临精工", scale: 14606331314, id: "300432.SZ" },
                { name: "德尔股份", scale: 2.27770177e9, id: "300473.SZ" },
                { name: "苏奥传感", scale: 3254253552, id: "300507.SZ" },
                { name: "川环科技", scale: 2660526825, id: "300547.SZ" },
                { name: "贝斯特", scale: 4456286342, id: "300580.SZ" },
                { name: "奥联电子", scale: 2660644094, id: "300585.SZ" },
                { name: "美力科技", scale: 1.18366681e9, id: "300611.SZ" },
                { name: "万通智控", scale: 2810058125, id: "300643.SZ" },
                { name: "雷迪克", scale: 1908119594, id: "300652.SZ" },
                { name: "隆盛科技", scale: 2849215873, id: "300680.SZ" },
                { name: "英搏尔", scale: 3165099107, id: "300681.SZ" },
                { name: "蠡湖股份", scale: 1959623308, id: "300694.SZ" },
                { name: "兆丰股份", scale: 3122332965, id: "300695.SZ" },
                { name: "威唐工业", scale: 1750120393, id: "300707.SZ" },
                { name: "西菱动力", scale: 2862297154, id: "300733.SZ" },
                { name: "越博动力", scale: 929868206, id: "300742.SZ" },
                { name: "艾可蓝", scale: 1768780581, id: "300816.SZ" },
                { name: "卡倍亿", scale: 1791017118, id: "300863.SZ" },
                { name: "松原股份", scale: 1.209375e9, id: "300893.SZ" },
                { name: "凯龙高科", scale: 1087115126, id: "300912.SZ" },
                { name: "博俊科技", scale: 1124552254, id: "300926.SZ" },
                { name: "华安鑫创", scale: 1526456299, id: "300928.SZ" },
                { name: "恒帅股份", scale: 1.1758e9, id: "300969.SZ" },
                { name: "东箭科技", scale: 1564524583, id: "300978.SZ" },
                { name: "宁波方正", scale: 1228784836, id: "300998.SZ" },
                { name: "肇民科技", scale: 1120520754, id: "301000.SZ" },
                { name: "超捷股份", scale: 1046702838, id: "301005.SZ" },
                { name: "德迈仕", scale: 1355977018, id: "301007.SZ" },
                { name: "密封科技", scale: 1360721534, id: "301020.SZ" },
                { name: "海泰科", scale: 953754497, id: "301022.SZ" },
                { name: "中熔电气", scale: 5433919173, id: "301031.SZ" },
                { name: "中捷精工", scale: 681105016, id: "301072.SZ" },
                { name: "正强股份", scale: 5.901e8, id: "301119.SZ" },
                { name: "金钟股份", scale: 647824701, id: "301133.SZ" },
                { name: "东风科技", scale: 3.4083972e9, id: "600081.SH" },
                { name: "长春一东", scale: 1873677798, id: "600148.SH" },
                { name: "东安动力", scale: 2.8048256e9, id: "600178.SH" },
                { name: "凌云股份", scale: 6.27061387e9, id: "600480.SH" },
                { name: "贵航股份", scale: 5.4222788e9, id: "600523.SH" },
                { name: "金杯汽车", scale: 4414375213, id: "600609.SH" },
                { name: "申达股份", scale: 2786992603, id: "600626.SH" },
                { name: "福耀玻璃", scale: 67400490072, id: "600660.SH" },
                { name: "交运股份", scale: 4134541635, id: "600676.SH" },
                { name: "湖南天雁", scale: 3926693793, id: "600698.SH" },
                { name: "均胜电子", scale: 19399439968, id: "600699.SH" },
                { name: "华域汽车", scale: 52083000216, id: "600741.SH" },
                { name: "一汽富维", scale: 5612337987, id: "600742.SH" },
                { name: "爱柯迪", scale: 18380720843, id: "600933.SH" },
                { name: "渤海汽车", scale: 3089175434, id: "600960.SH" },
                { name: "英利汽车", scale: 924432075, id: "601279.SH" },
                { name: "骆驼股份", scale: 10757749902, id: "601311.SH" },
                { name: "拓普集团", scale: 57141197511, id: "601689.SH" },
                { name: "郑煤机", scale: 20883076388, id: "601717.SH" },
                { name: "星宇股份", scale: 32616019267, id: "601799.SH" },
                { name: "联明股份", scale: 1687220382, id: "603006.SH" },
                { name: "北特科技", scale: 2047374269, id: "603009.SH" },
                { name: "亚普股份", scale: 7266034825, id: "603013.SH" },
                { name: "威帝股份", scale: 2023487305, id: "603023.SH" },
                { name: "常熟汽饰", scale: 6593536688, id: "603035.SH" },
                { name: "凯众股份", scale: 1726676221, id: "603037.SH" },
                { name: "新坐标", scale: 2438601784, id: "603040.SH" },
                { name: "浙江黎明", scale: 5.514664e8, id: "603048.SH" },
                { name: "天成自控", scale: 3520843877, id: "603085.SH" },
                { name: "正裕工业", scale: 1808933154, id: "603089.SH" },
                { name: "神驰机电", scale: 3090371211, id: "603109.SH" },
                { name: "华培动力", scale: 2393433365, id: "603121.SH" },
                { name: "腾龙股份", scale: 3366883239, id: "603158.SH" },
                { name: "科华控股", scale: 1.778222e9, id: "603161.SH" },
                { name: "福达股份", scale: 3625230532, id: "603166.SH" },
                { name: "圣龙股份", scale: 2193246074, id: "603178.SH" },
                { name: "新泉股份", scale: 18278696932, id: "603179.SH" },
                { name: "保隆科技", scale: 8022743444, id: "603197.SH" },
                { name: "浙江仙通", scale: 3.7603008e9, id: "603239.SH" },
                { name: "日盈电子", scale: 1.30264404e9, id: "603286.SH" },
                { name: "旭升集团", scale: 21575929251, id: "603305.SH" },
                { name: "华懋科技", scale: 12449834035, id: "603306.SH" },
                { name: "湘油泵", scale: 3040491513, id: "603319.SH" },
                { name: "迪生力", scale: 2209226136, id: "603335.SH" },
                { name: "文灿股份", scale: 11549067761, id: "603348.SH" },
                { name: "华达科技", scale: 8.9827584e9, id: "603358.SH" },
                { name: "通达电气", scale: 2292999136, id: "603390.SH" },
                { name: "金麒麟", scale: 2827081088, id: "603586.SH" },
                { name: "伯特利", scale: 26012562289, id: "603596.SH" },
                { name: "朗博科技", scale: 3.1482e9, id: "603655.SH" },
                { name: "德宏股份", scale: 3097138527, id: "603701.SH" },
                { name: "岱美股份", scale: 15538712591, id: "603730.SH" },
                { name: "秦安股份", scale: 4431850195, id: "603758.SH" },
                { name: "中马传动", scale: 2.02606255e9, id: "603767.SH" },
                { name: "常青股份", scale: 2.6214e9, id: "603768.SH" },
                { name: "科博达", scale: 2.2001499e10, id: "603786.SH" },
                { name: "宁波高发", scale: 2382334926, id: "603788.SH" },
                { name: "豪能股份", scale: 3987465502, id: "603809.SH" },
                { name: "合力科技", scale: 3.328864e9, id: "603917.SH" },
                { name: "金鸿顺", scale: 2.83136e9, id: "603922.SH" },
                { name: "铁流股份", scale: 1772310301, id: "603926.SH" },
                { name: "长源东谷", scale: 1774427034, id: "603950.SH" },
                { name: "泉峰汽车", scale: 1315799063, id: "603982.SH" },
                { name: "继峰股份", scale: 13920274352, id: "603997.SH" },
                { name: "合兴股份", scale: 781837778, id: "605005.SH" },
                { name: "长华集团", scale: 956365391, id: "605018.SH" },
                { name: "明新旭腾", scale: 1160173412, id: "605068.SH" },
                { name: "冠盛股份", scale: 1.22376538e9, id: "605088.SH" },
                { name: "上海沿浦", scale: 1.4627697e9, id: "605128.SH" },
                { name: "嵘泰股份", scale: 1452364331, id: "605133.SH" },
                { name: "神通科技", scale: 912942133, id: "605228.SH" },
                { name: "天普股份", scale: 4.481624e8, id: "605255.SH" },
                { name: "无锡振华", scale: 1.0262e9, id: "605319.SH" },
                { name: "沪光股份", scale: 1582388443, id: "605333.SH" },
                { name: "精进电动-UW", scale: 3705599843, id: "688280.SH" },
                { name: "泛亚微透", scale: 2044121822, id: "688386.SH" },
                { name: "上声电子", scale: 1.5316e9, id: "688533.SH" },
                { name: "菱电电控", scale: 1679774786, id: "688667.SH" },
                { name: "中自科技", scale: 1689001418, id: "688737.SH" },
                { name: "安徽凤凰", scale: 159135198, id: "832000.BJ" },
                { name: "同心传动", scale: 340023819, id: "833454.BJ" },
                { name: "华阳变速", scale: 205835679, id: "839946.BJ" },
                { name: "大地电气", scale: 2.7344007e8, id: "870436.BJ" },
              ],
              name: "汽车零部件",
              scale: 1072421094224,
              id: "280200",
            },
            {
              children: [
                { name: "特  力Ａ", scale: 6692942573, id: "000025.SZ" },
                { name: "漳州发展", scale: 4223709362, id: "000753.SZ" },
                { name: "中国中期", scale: 2.1942e9, id: "000996.SZ" },
                { name: "阿尔特", scale: 5628788466, id: "300825.SZ" },
                { name: "深城交", scale: 2.6674802e9, id: "301091.SZ" },
                { name: "光庭信息", scale: 2.13554289e9, id: "301221.SZ" },
                { name: "广汇汽车", scale: 16871438235, id: "600297.SH" },
                { name: "大东方", scale: 4105376964, id: "600327.SH" },
                { name: "国机汽车", scale: 13811178327, id: "600335.SH" },
                { name: "申华控股", scale: 3386701752, id: "600653.SH" },
                { name: "庞大集团", scale: 10124952819, id: "601258.SH" },
                { name: "中国汽研", scale: 23629414315, id: "601965.SH" },
                { name: "东方时尚", scale: 5398381585, id: "603377.SH" },
                { name: "建邦科技", scale: 280735483, id: "837242.BJ" },
                { name: "德众汽车", scale: 259103057, id: "838030.BJ" },
              ],
              name: "汽车服务",
              scale: 101409946028,
              id: "280300",
            },
            {
              children: [
                { name: "深中华A", scale: 1281609664, id: "000017.SZ" },
                { name: "钱江摩托", scale: 9.5696096e9, id: "000913.SZ" },
                { name: "信隆健康", scale: 2.08571e9, id: "002105.SZ" },
                { name: "久祺股份", scale: 1.2988976e9, id: "300994.SZ" },
                { name: "林海股份", scale: 1.75296e9, id: "600099.SH" },
                { name: "上海凤凰", scale: 2398967206, id: "600679.SH" },
                { name: "电科芯片", scale: 13285723903, id: "600877.SH" },
                { name: "春风动力", scale: 21281741356, id: "603129.SH" },
                { name: "爱玛科技", scale: 8631574936, id: "603529.SH" },
                { name: "隆鑫通用", scale: 9877536299, id: "603766.SH" },
                { name: "永安行", scale: 3360274479, id: "603776.SH" },
                { name: "新日股份", scale: 3.76992e9, id: "603787.SH" },
                { name: "九号公司-WD", scale: 16901465203, id: "689009.SH" },
              ],
              name: "其他交运设备",
              scale: 95495990246,
              id: "280400",
            },
          ],
          name: "汽车",
          scale: 2314525696733,
          id: "280000",
        },
        {
          children: [
            {
              children: [
                { name: "美的集团", scale: 391134494715, id: "000333.SZ" },
                { name: "长虹华意", scale: 4823408764, id: "000404.SZ" },
                { name: "长虹美菱", scale: 6.05183887e9, id: "000521.SZ" },
                { name: "格力电器", scale: 229198821423, id: "000651.SZ" },
                { name: "海信家电", scale: 23663234373, id: "000921.SZ" },
                { name: "盾安环境", scale: 11510321984, id: "002011.SZ" },
                { name: "苏 泊 尔", scale: 41835029893, id: "002032.SZ" },
                { name: "华帝股份", scale: 5261686763, id: "002035.SZ" },
                { name: "三花智控", scale: 80194133573, id: "002050.SZ" },
                { name: "九阳股份", scale: 12465688796, id: "002242.SZ" },
                { name: "禾盛新材", scale: 2153218881, id: "002290.SZ" },
                { name: "爱仕达", scale: 2499500829, id: "002403.SZ" },
                { name: "康盛股份", scale: 3237506663, id: "002418.SZ" },
                { name: "老板电器", scale: 25420017289, id: "002508.SZ" },
                { name: "万和电气", scale: 5545078317, id: "002543.SZ" },
                { name: "奥佳华", scale: 3518033027, id: "002614.SZ" },
                { name: "奥马电器", scale: 8.51027471e9, id: "002668.SZ" },
                { name: "顺威股份", scale: 2786248911, id: "002676.SZ" },
                { name: "浙江美大", scale: 4959191163, id: "002677.SZ" },
                { name: "新宝股份", scale: 14426636105, id: "002705.SZ" },
                { name: "小崧股份", scale: 3233316481, id: "002723.SZ" },
                { name: "天际股份", scale: 6063984001, id: "002759.SZ" },
                { name: "星帅尔", scale: 2736441852, id: "002860.SZ" },
                { name: "小熊电器", scale: 13094158667, id: "002959.SZ" },
                { name: "彩虹集团", scale: 965743937, id: "003023.SZ" },
                { name: "秀强股份", scale: 4046199364, id: "300160.SZ" },
                { name: "东方电热", scale: 6960009994, id: "300217.SZ" },
                { name: "融捷健康", scale: 2819496349, id: "300247.SZ" },
                { name: "依米康", scale: 4255273234, id: "300249.SZ" },
                { name: "开能健康", scale: 2178930546, id: "300272.SZ" },
                { name: "天银机电", scale: 4.05009411e9, id: "300342.SZ" },
                { name: "汉宇集团", scale: 2670653926, id: "300403.SZ" },
                { name: "香农芯创", scale: 9057223224, id: "300475.SZ" },
                { name: "北鼎股份", scale: 1.43417325e9, id: "300824.SZ" },
                { name: "火星人", scale: 3445243445, id: "300894.SZ" },
                { name: "亿田智能", scale: 1707929669, id: "300911.SZ" },
                { name: "宏昌科技", scale: 6.0673528e8, id: "301008.SZ" },
                { name: "澳柯玛", scale: 4843949648, id: "600336.SH" },
                { name: "海立股份", scale: 5003368219, id: "600619.SH" },
                { name: "海尔智家", scale: 145412138675, id: "600690.SH" },
                { name: "春兰股份", scale: 2721962739, id: "600854.SH" },
                { name: "惠而浦", scale: 6.5147315e9, id: "600983.SH" },
                { name: "东贝集团", scale: 1746533469, id: "601956.SH" },
                { name: "华翔股份", scale: 1614587386, id: "603112.SH" },
                { name: "富佳股份", scale: 2296003262, id: "603219.SH" },
                { name: "金海高科", scale: 2.4801e9, id: "603311.SH" },
                { name: "莱克电气", scale: 16201008824, id: "603355.SH" },
                { name: "日出东方", scale: 4433768686, id: "603366.SH" },
                { name: "立霸股份", scale: 3579446156, id: "603519.SH" },
                { name: "奥普家居", scale: 4.7100762e9, id: "603551.SH" },
                { name: "三星新材", scale: 2577301987, id: "603578.SH" },
                { name: "荣泰健康", scale: 3.15053829e9, id: "603579.SH" },
                { name: "春光科技", scale: 1.938048e9, id: "603657.SH" },
                { name: "奇精机械", scale: 2194273882, id: "603677.SH" },
                { name: "朗迪集团", scale: 2303931392, id: "603726.SH" },
                { name: "飞科电器", scale: 3.4538724e10, id: "603868.SH" },
                { name: "德业股份", scale: 20976412338, id: "605117.SH" },
                { name: "帅丰电器", scale: 9.7296667e8, id: "605336.SH" },
                { name: "德昌股份", scale: 2006397987, id: "605555.SH" },
                { name: "倍轻松", scale: 1048710538, id: "688793.SH" },
              ],
              name: "白色家电",
              scale: 1221784952226,
              id: "330100",
            },
            {
              children: [
                { name: "深康佳Ａ", scale: 7759445868, id: "000016.SZ" },
                { name: "四川九洲", scale: 7190330721, id: "000801.SZ" },
                { name: "创维数字", scale: 20747746797, id: "000810.SZ" },
                { name: "*ST同洲", scale: 1648570924, id: "002052.SZ" },
                { name: "毅昌科技", scale: 2358566418, id: "002420.SZ" },
                { name: "兆驰股份", scale: 21627135343, id: "002429.SZ" },
                { name: "银河电子", scale: 5.75913986e9, id: "002519.SZ" },
                { name: "高斯贝尔", scale: 1466279345, id: "002848.SZ" },
                { name: "海信视像", scale: 28475804194, id: "600060.SH" },
                { name: "四川长虹", scale: 20167369217, id: "600839.SH" },
                { name: "九联科技", scale: 3.2878182e9, id: "688609.SH" },
                { name: "极米科技", scale: 8.63584411e9, id: "688696.SH" },
              ],
              name: "视听器材",
              scale: 129124050997,
              id: "330200",
            },
          ],
          name: "家用电器",
          scale: 1350909003223,
          id: "330000",
        },
        {
          children: [
            {
              children: [
                { name: "泸州老窖", scale: 335547283642, id: "000568.SZ" },
                { name: "古井贡酒", scale: 1.11437478e11, id: "000596.SZ" },
                { name: "燕京啤酒", scale: 32398421123, id: "000729.SZ" },
                { name: "*ST西发", scale: 981181587, id: "000752.SZ" },
                { name: "酒鬼酒", scale: 36921679997, id: "000799.SZ" },
                { name: "承德露露", scale: 9676768539, id: "000848.SZ" },
                { name: "五 粮 液", scale: 6.6760858128e11, id: "000858.SZ" },
                { name: "顺鑫农业", scale: 24374463259, id: "000860.SZ" },
                { name: "张  裕Ａ", scale: 13381628208, id: "000869.SZ" },
                { name: "兰州黄河", scale: 1710796394, id: "000929.SZ" },
                { name: "*ST皇台", scale: 3.22350336e9, id: "000995.SZ" },
                { name: "洋河股份", scale: 225346393699, id: "002304.SZ" },
                { name: "珠江啤酒", scale: 2.051755501e10, id: "002461.SZ" },
                { name: "百润股份", scale: 2.808149497e10, id: "002568.SZ" },
                { name: "天佑德酒", scale: 6572649125, id: "002646.SZ" },
                { name: "欢乐家", scale: 1.1934e9, id: "300997.SZ" },
                { name: "古越龙山", scale: 8.85107683e9, id: "600059.SH" },
                { name: "中葡股份", scale: 8697645664, id: "600084.SH" },
                { name: "重庆啤酒", scale: 51862353578, id: "600132.SH" },
                { name: "泉阳泉", scale: 4284034894, id: "600189.SH" },
                { name: "伊力特", scale: 11161934907, id: "600197.SH" },
                { name: "金种子酒", scale: 1.629362733e10, id: "600199.SH" },
                { name: "海南椰岛", scale: 5406769197, id: "600238.SH" },
                { name: "维维股份", scale: 4948455071, id: "600300.SH" },
                { name: "ST通葡", scale: 1.28e9, id: "600365.SH" },
                { name: "贵州茅台", scale: 2167531617966, id: "600519.SH" },
                { name: "莫高股份", scale: 1.6152336e9, id: "600543.SH" },
                { name: "老白干酒", scale: 30857715199, id: "600559.SH" },
                { name: "惠泉啤酒", scale: 3.085e9, id: "600573.SH" },
                { name: "青岛啤酒", scale: 80076222696, id: "600600.SH" },
                { name: "金枫酒业", scale: 4656274452, id: "600616.SH" },
                { name: "舍得酒业", scale: 58838211746, id: "600702.SH" },
                { name: "水井坊", scale: 32051158551, id: "600779.SH" },
                { name: "山西汾酒", scale: 290875109565, id: "600809.SH" },
                { name: "会稽山", scale: 5336427742, id: "601579.SH" },
                { name: "养元饮品", scale: 28891218888, id: "603156.SH" },
                { name: "迎驾贡酒", scale: 4.8088e10, id: "603198.SH" },
                { name: "今世缘", scale: 7.4454575e10, id: "603369.SH" },
                { name: "口子窖", scale: 3.582e10, id: "603589.SH" },
                { name: "香飘飘", scale: 8.46136348e9, id: "603711.SH" },
                { name: "威龙股份", scale: 2109629636, id: "603779.SH" },
                { name: "金徽酒", scale: 12432942526, id: "603919.SH" },
                { name: "李子园", scale: 2769864329, id: "605337.SH" },
                { name: "均瑶健康", scale: 2014273447, id: "605388.SH" },
                { name: "东鹏饮料", scale: 1.33283535e10, id: "605499.SH" },
              ],
              name: "饮料制造",
              scale: 4535052367987,
              id: "340300",
            },
            {
              children: [
                { name: "西王食品", scale: 4997745954, id: "000639.SZ" },
                { name: "黑芝麻", scale: 5254245913, id: "000716.SZ" },
                { name: "双汇发展", scale: 9.065611838e10, id: "000895.SZ" },
                { name: "千味央厨", scale: 3.205345e9, id: "001215.SZ" },
                { name: "青岛食品", scale: 1305214836, id: "001219.SZ" },
                { name: "三全食品", scale: 10013169258, id: "002216.SZ" },
                { name: "皇氏集团", scale: 3443619383, id: "002329.SZ" },
                { name: "得利斯", scale: 4160420583, id: "002330.SZ" },
                { name: "双塔食品", scale: 5838534036, id: "002481.SZ" },
                { name: "佳隆股份", scale: 1699165069, id: "002495.SZ" },
                { name: "涪陵榨菜", scale: 21336210404, id: "002507.SZ" },
                { name: "金字火腿", scale: 3884631576, id: "002515.SZ" },
                { name: "洽洽食品", scale: 20898472482, id: "002557.SZ" },
                { name: "贝因美", scale: 4665599279, id: "002570.SZ" },
                { name: "好想你", scale: 2974455488, id: "002582.SZ" },
                { name: "金禾实业", scale: 15433268041, id: "002597.SZ" },
                { name: "加加食品", scale: 4273780875, id: "002650.SZ" },
                { name: "克明食品", scale: 3784020649, id: "002661.SZ" },
                { name: "煌上煌", scale: 5381857146, id: "002695.SZ" },
                { name: "海欣食品", scale: 2.19722195e9, id: "002702.SZ" },
                { name: "麦趣尔", scale: 1837250548, id: "002719.SZ" },
                { name: "龙大美食", scale: 9069284935, id: "002726.SZ" },
                { name: "燕塘乳业", scale: 2895426371, id: "002732.SZ" },
                { name: "桂发祥", scale: 1784983317, id: "002820.SZ" },
                { name: "华统股份", scale: 8467099907, id: "002840.SZ" },
                { name: "盐津铺子", scale: 14633833006, id: "002847.SZ" },
                { name: "庄园牧场", scale: 1.95181685e9, id: "002910.SZ" },
                { name: "新乳业", scale: 14371196092, id: "002946.SZ" },
                { name: "西麦食品", scale: 3.13845784e9, id: "002956.SZ" },
                { name: "甘源食品", scale: 2993718739, id: "002991.SZ" },
                { name: "劲仔食品", scale: 3097929683, id: "003000.SZ" },
                { name: "祖名股份", scale: 1217776004, id: "003030.SZ" },
                { name: "汤臣倍健", scale: 24512523785, id: "300146.SZ" },
                { name: "华宝股份", scale: 17534022461, id: "300741.SZ" },
                { name: "三只松鼠", scale: 7.59895e9, id: "300783.SZ" },
                { name: "仙乐健康", scale: 5206180092, id: "300791.SZ" },
                { name: "科拓生物", scale: 1452039239, id: "300858.SZ" },
                { name: "品渥食品", scale: 7.7144375e8, id: "300892.SZ" },
                { name: "熊猫乳品", scale: 1132243205, id: "300898.SZ" },
                { name: "仲景食品", scale: 1862863313, id: "300908.SZ" },
                { name: "海融科技", scale: 974986275, id: "300915.SZ" },
                { name: "立高食品", scale: 6646329913, id: "300973.SZ" },
                { name: "上海梅林", scale: 8.04571887e9, id: "600073.SH" },
                { name: "莲花健康", scale: 4933228138, id: "600186.SH" },
                { name: "恒顺醋业", scale: 11303314481, id: "600305.SH" },
                { name: "青海春天", scale: 5518370965, id: "600381.SH" },
                { name: "天润乳业", scale: 5821344372, id: "600419.SH" },
                { name: "三元股份", scale: 7053495476, id: "600429.SH" },
                { name: "光明乳业", scale: 13493615945, id: "600597.SH" },
                { name: "星湖科技", scale: 4397164038, id: "600866.SH" },
                { name: "中炬高新", scale: 27566695845, id: "600872.SH" },
                { name: "妙可蓝多", scale: 13712796667, id: "600882.SH" },
                { name: "伊利股份", scale: 176623691216, id: "600887.SH" },
                { name: "爱普股份", scale: 3460524793, id: "603020.SH" },
                { name: "千禾味业", scale: 21480849802, id: "603027.SH" },
                { name: "广州酒家", scale: 16227031067, id: "603043.SH" },
                { name: "海天味业", scale: 329882627297, id: "603288.SH" },
                { name: "天味食品", scale: 18017043827, id: "603317.SH" },
                { name: "安井食品", scale: 44686309188, id: "603345.SH" },
                { name: "绝味食品", scale: 24972117416, id: "603517.SH" },
                { name: "惠发食品", scale: 1478720145, id: "603536.SH" },
                { name: "安记食品", scale: 2.027424e9, id: "603696.SH" },
                { name: "有友食品", scale: 4203602339, id: "603697.SH" },
                { name: "良品铺子", scale: 1.314077e10, id: "603719.SH" },
                { name: "日辰股份", scale: 3567842979, id: "603755.SH" },
                { name: "来伊份", scale: 5435442514, id: "603777.SH" },
                { name: "桃李面包", scale: 18503418228, id: "603866.SH" },
                { name: "元祖股份", scale: 4.4904e9, id: "603886.SH" },
                { name: "华康股份", scale: 4329746153, id: "605077.SH" },
                { name: "味知香", scale: 1.7702e9, id: "605089.SH" },
                { name: "一鸣食品", scale: 6.4111e8, id: "605179.SH" },
                { name: "佳禾食品", scale: 1.07897276e9, id: "605300.SH" },
                { name: "巴比食品", scale: 2298064968, id: "605338.SH" },
                { name: "南侨食品", scale: 1543597017, id: "605339.SH" },
                { name: "春雪食品", scale: 1736412103, id: "605567.SH" },
                { name: "嘉必优", scale: 2467177526, id: "688089.SH" },
                { name: "朱老六", scale: 257365232, id: "831726.BJ" },
              ],
              name: "食品加工",
              scale: 1154719656994,
              id: "340400",
            },
          ],
          name: "食品饮料",
          scale: 5689772024981,
          id: "340000",
        },
        {
          children: [
            {
              children: [
                { name: "鲁  泰Ａ", scale: 4271638636, id: "000726.SZ" },
                { name: "华茂股份", scale: 3292388913, id: "000850.SZ" },
                { name: "欣龙控股", scale: 2376034869, id: "000955.SZ" },
                { name: "中银绒业", scale: 6733765744, id: "000982.SZ" },
                { name: "伟星股份", scale: 7827899986, id: "002003.SZ" },
                { name: "华孚时尚", scale: 5153064506, id: "002042.SZ" },
                { name: "孚日股份", scale: 3482959645, id: "002083.SZ" },
                { name: "新野纺织", scale: 2332726516, id: "002087.SZ" },
                { name: "浔兴股份", scale: 2.00838e9, id: "002098.SZ" },
                { name: "宏达高科", scale: 1457598825, id: "002144.SZ" },
                { name: "如意集团", scale: 1876091826, id: "002193.SZ" },
                { name: "联发股份", scale: 2310504439, id: "002394.SZ" },
                { name: "嘉欣丝绸", scale: 2931507758, id: "002404.SZ" },
                { name: "兴业科技", scale: 3113982509, id: "002674.SZ" },
                { name: "开润股份", scale: 2156593422, id: "300577.SZ" },
                { name: "延江股份", scale: 1449133873, id: "300658.SZ" },
                { name: "聚杰微纤", scale: 1738433025, id: "300819.SZ" },
                { name: "金春股份", scale: 856528166, id: "300877.SZ" },
                { name: "稳健医疗", scale: 8.25501699e9, id: "300888.SZ" },
                { name: "华升股份", scale: 1656696092, id: "600156.SH" },
                { name: "江苏阳光", scale: 4333516992, id: "600220.SH" },
                { name: "金鹰股份", scale: 1.9038308e9, id: "600232.SH" },
                { name: "三房巷", scale: 3390481728, id: "600370.SH" },
                { name: "华纺股份", scale: 1.76979325e9, id: "600448.SH" },
                { name: "凤竹纺织", scale: 1.43072e9, id: "600493.SH" },
                { name: "上海三毛", scale: 1.21306702e9, id: "600689.SH" },
                { name: "航民股份", scale: 7590503751, id: "600987.SH" },
                { name: "百隆东方", scale: 9.18e9, id: "601339.SH" },
                { name: "台华新材", scale: 9062561137, id: "603055.SH" },
                { name: "诺邦股份", scale: 1.92952283e9, id: "603238.SH" },
                { name: "巨星农牧", scale: 15429933134, id: "603477.SH" },
                { name: "新澳股份", scale: 4457311039, id: "603889.SH" },
                { name: "迎丰股份", scale: 566968419, id: "605055.SH" },
                { name: "浙江自然", scale: 1.52483026e9, id: "605080.SH" },
                { name: "华生科技", scale: 5.66605e8, id: "605180.SH" },
                { name: "富春染织", scale: 796656718, id: "605189.SH" },
              ],
              name: "纺织制造",
              scale: 130427247818,
              id: "350100",
            },
            {
              children: [
                { name: "洪兴股份", scale: 531799739, id: "001209.SZ" },
                { name: "七 匹 狼", scale: 4081683048, id: "002029.SZ" },
                { name: "报 喜 鸟", scale: 5835542596, id: "002154.SZ" },
                { name: "美邦服饰", scale: 4.1205e9, id: "002269.SZ" },
                { name: "遥望科技", scale: 14804523397, id: "002291.SZ" },
                { name: "罗莱生活", scale: 10620774059, id: "002293.SZ" },
                { name: "富安娜", scale: 3986533519, id: "002327.SZ" },
                { name: "梦洁股份", scale: 2.09385971e9, id: "002397.SZ" },
                { name: "*ST雪发", scale: 2.12704e9, id: "002485.SZ" },
                { name: "嘉麟杰", scale: 2.51264e9, id: "002486.SZ" },
                { name: "华斯股份", scale: 1201568135, id: "002494.SZ" },
                { name: "搜于特", scale: 2434394135, id: "002503.SZ" },
                { name: "森马服饰", scale: 10942545858, id: "002563.SZ" },
                { name: "ST步森", scale: 730502081, id: "002569.SZ" },
                { name: "朗姿股份", scale: 7215333224, id: "002612.SZ" },
                { name: "棒杰股份", scale: 3092387522, id: "002634.SZ" },
                { name: "ST摩登", scale: 1304239168, id: "002656.SZ" },
                { name: "乔治白", scale: 1785683724, id: "002687.SZ" },
                { name: "金发拉比", scale: 1966847937, id: "002762.SZ" },
                { name: "汇洁股份", scale: 1424618351, id: "002763.SZ" },
                { name: "ST柏龙", scale: 1479470042, id: "002776.SZ" },
                { name: "三夫户外", scale: 1416275637, id: "002780.SZ" },
                { name: "比音勒芬", scale: 12901427749, id: "002832.SZ" },
                { name: "安奈儿", scale: 1660615602, id: "002875.SZ" },
                { name: "欣贺股份", scale: 1622594478, id: "003016.SZ" },
                { name: "真爱美家", scale: 6.5938587e8, id: "003041.SZ" },
                { name: "探路者", scale: 6831017898, id: "300005.SZ" },
                { name: "*ST中潜", scale: 904735848, id: "300526.SZ" },
                { name: "万里马", scale: 1703265726, id: "300591.SZ" },
                { name: "酷特智能", scale: 1.66658594e9, id: "300840.SZ" },
                { name: "中胤时尚", scale: 1.14002916e9, id: "300901.SZ" },
                { name: "南山智尚", scale: 1182944025, id: "300918.SZ" },
                { name: "恒辉安防", scale: 792994905, id: "300952.SZ" },
                { name: "华利集团", scale: 6.9068988e9, id: "300979.SZ" },
                { name: "戎美股份", scale: 913956204, id: "301088.SZ" },
                { name: "美尔雅", scale: 2.0052e9, id: "600107.SH" },
                { name: "浪莎股份", scale: 1373684518, id: "600137.SH" },
                { name: "海澜之家", scale: 27515900316, id: "600398.SH" },
                { name: "红豆股份", scale: 7538613393, id: "600400.SH" },
                { name: "龙头股份", scale: 2137053833, id: "600630.SH" },
                { name: "益民集团", scale: 3573151777, id: "600824.SH" },
                { name: "九牧王", scale: 5.59121947e9, id: "601566.SH" },
                { name: "际华集团", scale: 13218804506, id: "601718.SH" },
                { name: "奥康国际", scale: 2.4940956e9, id: "603001.SH" },
                { name: "红蜻蜓", scale: 2.90981404e9, id: "603116.SH" },
                { name: "日播时尚", scale: 2112084131, id: "603196.SH" },
                { name: "水星家纺", scale: 3.5600445e9, id: "603365.SH" },
                { name: "爱慕股份", scale: 823099959, id: "603511.SH" },
                { name: "锦泓集团", scale: 3277630776, id: "603518.SH" },
                { name: "贵人鸟", scale: 5107392414, id: "603555.SH" },
                { name: "ST起步", scale: 1329062234, id: "603557.SH" },
                { name: "健盛集团", scale: 3111105664, id: "603558.SH" },
                { name: "地素时尚", scale: 7271514666, id: "603587.SH" },
                { name: "天创时尚", scale: 1670403715, id: "603608.SH" },
                { name: "康隆达", scale: 4735330279, id: "603665.SH" },
                { name: "歌力思", scale: 4085858159, id: "603808.SH" },
                { name: "安正时尚", scale: 2.57092631e9, id: "603839.SH" },
                { name: "太平鸟", scale: 10200134136, id: "603877.SH" },
                { name: "牧高笛", scale: 3.888027e9, id: "603908.SH" },
                { name: "哈森股份", scale: 1.305192e9, id: "603958.SH" },
                { name: "众望布艺", scale: 5.07925e8, id: "605003.SH" },
                { name: "盛泰集团", scale: 2.71751851e9, id: "605138.SH" },
              ],
              name: "服装家纺",
              scale: 251226000993,
              id: "350200",
            },
          ],
          name: "纺织服装",
          scale: 381653248811,
          id: "350000",
        },
        {
          children: [
            {
              children: [
                { name: "晨鸣纸业", scale: 8417809235, id: "000488.SZ" },
                { name: "美利云", scale: 8231914334, id: "000815.SZ" },
                { name: "依依股份", scale: 1509062599, id: "001206.SZ" },
                { name: "凯恩股份", scale: 2528634014, id: "002012.SZ" },
                { name: "景兴纸业", scale: 3539151328, id: "002067.SZ" },
                { name: "太阳纸业", scale: 31610333814, id: "002078.SZ" },
                { name: "安妮股份", scale: 3749940745, id: "002235.SZ" },
                { name: "中顺洁柔", scale: 15194299305, id: "002511.SZ" },
                { name: "齐峰新材", scale: 2207507205, id: "002521.SZ" },
                { name: "百亚股份", scale: 3980304588, id: "003006.SZ" },
                { name: "可靠股份", scale: 1118134771, id: "301009.SZ" },
                { name: "上海艾录", scale: 2299953251, id: "301062.SZ" },
                { name: "青山纸业", scale: 5718428161, id: "600103.SH" },
                { name: "民丰特纸", scale: 1.798656e9, id: "600235.SH" },
                { name: "华泰股份", scale: 5514906568, id: "600308.SH" },
                { name: "恒丰纸业", scale: 2225548766, id: "600356.SH" },
                { name: "冠豪高新", scale: 5397968974, id: "600433.SH" },
                { name: "山鹰国际", scale: 10894219678, id: "600567.SH" },
                { name: "宜宾纸业", scale: 2039703143, id: "600793.SH" },
                { name: "岳阳林纸", scale: 12390673204, id: "600963.SH" },
                { name: "博汇纸业", scale: 8609277215, id: "600966.SH" },
                { name: "荣晟环保", scale: 3833998671, id: "603165.SH" },
                { name: "仙鹤股份", scale: 17402292846, id: "603733.SH" },
                { name: "松炀资源", scale: 3.2027725e9, id: "603863.SH" },
                { name: "五洲特纸", scale: 1377850901, id: "605007.SH" },
                { name: "豪悦护理", scale: 2773401029, id: "605009.SH" },
                { name: "华旺科技", scale: 3213537952, id: "605377.SH" },
                { name: "森林包装", scale: 7.54578e8, id: "605500.SH" },
              ],
              name: "造纸",
              scale: 171534858797,
              id: "360100",
            },
            {
              children: [
                { name: "珠海中富", scale: 3869964585, id: "000659.SZ" },
                { name: "滨海能源", scale: 3308082378, id: "000695.SZ" },
                { name: "陕西金叶", scale: 4.15573577e9, id: "000812.SZ" },
                { name: "永新股份", scale: 5275543398, id: "002014.SZ" },
                { name: "东港股份", scale: 5438546726, id: "002117.SZ" },
                { name: "劲嘉股份", scale: 10594971239, id: "002191.SZ" },
                { name: "合兴包装", scale: 3.90123987e9, id: "002228.SZ" },
                { name: "鸿博股份", scale: 6292776481, id: "002229.SZ" },
                { name: "力合科创", scale: 10120267547, id: "002243.SZ" },
                { name: "美盈森", scale: 3161027627, id: "002303.SZ" },
                { name: "浙江众成", scale: 4412213384, id: "002522.SZ" },
                { name: "顺灏股份", scale: 3726378058, id: "002565.SZ" },
                { name: "双星新材", scale: 9982685064, id: "002585.SZ" },
                { name: "盛通股份", scale: 2258484749, id: "002599.SZ" },
                { name: "奥瑞金", scale: 12288753949, id: "002701.SZ" },
                { name: "王子新材", scale: 2773895023, id: "002735.SZ" },
                { name: "昇兴股份", scale: 4584216581, id: "002752.SZ" },
                { name: "华源控股", scale: 2087310894, id: "002787.SZ" },
                { name: "环球印务", scale: 2882831952, id: "002799.SZ" },
                { name: "吉宏股份", scale: 5307399352, id: "002803.SZ" },
                { name: "裕同科技", scale: 13331435713, id: "002831.SZ" },
                { name: "新宏泽", scale: 1.7472e9, id: "002836.SZ" },
                { name: "英联股份", scale: 1928043099, id: "002846.SZ" },
                { name: "金时科技", scale: 3.72195e9, id: "002951.SZ" },
                { name: "嘉美包装", scale: 1934306263, id: "002969.SZ" },
                { name: "天元股份", scale: 866755368, id: "003003.SZ" },
                { name: "金富科技", scale: 670926828, id: "003018.SZ" },
                { name: "万顺新材", scale: 4211285926, id: "300057.SZ" },
                { name: "海顺新材", scale: 1918466135, id: "300501.SZ" },
                { name: "锦盛新材", scale: 9.4292809e8, id: "300849.SZ" },
                { name: "龙利得", scale: 1.38922854e9, id: "300883.SZ" },
                { name: "嘉亨家化", scale: 992791368, id: "300955.SZ" },
                { name: "康欣新材", scale: 2895939561, id: "600076.SH" },
                { name: "紫江企业", scale: 8220709976, id: "600210.SH" },
                { name: "上海易连", scale: 3332867791, id: "600836.SH" },
                { name: "东风股份", scale: 7.83258261e9, id: "601515.SH" },
                { name: "宝钢包装", scale: 6281619099, id: "601968.SH" },
                { name: "新通联", scale: 1.75e9, id: "603022.SH" },
                { name: "永吉股份", scale: 4558915189, id: "603058.SH" },
                { name: "集友股份", scale: 4914428807, id: "603429.SH" },
                { name: "翔港科技", scale: 1705781197, id: "603499.SH" },
                { name: "京华激光", scale: 2367132768, id: "603607.SH" },
                { name: "大胜达", scale: 3611617328, id: "603687.SH" },
              ],
              name: "包装印刷",
              scale: 187549236283,
              id: "360200",
            },
            {
              children: [
                { name: "飞亚达", scale: 4107730169, id: "000026.SZ" },
                { name: "*ST金洲", scale: 873368532, id: "000587.SZ" },
                { name: "永安林业", scale: 2762808258, id: "000663.SZ" },
                { name: "大亚圣象", scale: 4.94601904e9, id: "000910.SZ" },
                { name: "双枪科技", scale: 827003187, id: "001211.SZ" },
                { name: "海鸥住工", scale: 2596118888, id: "002084.SZ" },
                { name: "盛新锂能", scale: 28725596604, id: "002240.SZ" },
                { name: "齐心集团", scale: 5219788921, id: "002301.SZ" },
                { name: "潮宏基", scale: 6421937301, id: "002345.SZ" },
                { name: "高乐股份", scale: 3769259805, id: "002348.SZ" },
                { name: "赫美集团", scale: 6526359142, id: "002356.SZ" },
                { name: "浙江永强", scale: 7036667416, id: "002489.SZ" },
                { name: "德力股份", scale: 1721226705, id: "002571.SZ" },
                { name: "索菲亚", scale: 12865015867, id: "002572.SZ" },
                { name: "明牌珠宝", scale: 3.4584e9, id: "002574.SZ" },
                { name: "群兴玩具", scale: 3.09078e9, id: "002575.SZ" },
                { name: "姚记科技", scale: 11108021716, id: "002605.SZ" },
                { name: "哈尔斯", scale: 2093928352, id: "002615.SZ" },
                { name: "德尔未来", scale: 3562850311, id: "002631.SZ" },
                { name: "珠江钢琴", scale: 7806053076, id: "002678.SZ" },
                { name: "金一文化", scale: 3129358359, id: "002721.SZ" },
                { name: "萃华珠宝", scale: 3227090481, id: "002731.SZ" },
                { name: "ST爱迪尔", scale: 1497496694, id: "002740.SZ" },
                { name: "瑞尔特", scale: 2232829883, id: "002790.SZ" },
                { name: "皮阿诺", scale: 2145729094, id: "002853.SZ" },
                { name: "实丰文化", scale: 1601544994, id: "002862.SZ" },
                { name: "周大生", scale: 17228885732, id: "002867.SZ" },
                { name: "英派斯", scale: 1.5084e9, id: "002899.SZ" },
                { name: "海象新材", scale: 1280289316, id: "003011.SZ" },
                { name: "海伦钢琴", scale: 1611177354, id: "300329.SZ" },
                { name: "尚品宅配", scale: 2892684574, id: "300616.SZ" },
                { name: "德艺文创", scale: 1215841284, id: "300640.SZ" },
                { name: "金陵体育", scale: 1622447464, id: "300651.SZ" },
                { name: "创源股份", scale: 1532804319, id: "300703.SZ" },
                { name: "乐歌股份", scale: 3909488971, id: "300729.SZ" },
                { name: "顶固集创", scale: 1122747329, id: "300749.SZ" },
                { name: "曼卡龙", scale: 1029125822, id: "300945.SZ" },
                { name: "玉马遮阳", scale: 1.00838862e9, id: "300993.SZ" },
                { name: "嘉益股份", scale: 7.7725e8, id: "301004.SZ" },
                { name: "张小泉", scale: 7.91413e8, id: "301055.SZ" },
                { name: "匠心家居", scale: 1.00096e9, id: "301061.SZ" },
                { name: "雅艺科技", scale: 457491994, id: "301113.SZ" },
                { name: "家联科技", scale: 1.76415e9, id: "301193.SZ" },
                { name: "乐凯胶片", scale: 3928480403, id: "600135.SH" },
                { name: "美克家居", scale: 3994172838, id: "600337.SH" },
                { name: "瑞贝卡", scale: 2.8299636e9, id: "600439.SH" },
                { name: "狮头股份", scale: 1.5456e9, id: "600539.SH" },
                { name: "老凤祥", scale: 18963155874, id: "600612.SH" },
                { name: "新华锦", scale: 2462947315, id: "600735.SH" },
                { name: "中国黄金", scale: 1.00220085e10, id: "600916.SH" },
                { name: "丰林集团", scale: 2886969456, id: "601996.SH" },
                { name: "喜临门", scale: 10948426661, id: "603008.SH" },
                { name: "山东华鹏", scale: 1698924252, id: "603021.SH" },
                { name: "倍加洁", scale: 2506278051, id: "603059.SH" },
                { name: "金牌厨柜", scale: 5793888488, id: "603180.SH" },
                { name: "公牛集团", scale: 90077329657, id: "603195.SH" },
                { name: "江山欧派", scale: 7.84682221e9, id: "603208.SH" },
                { name: "梦天家居", scale: 7.623072e8, id: "603216.SH" },
                { name: "爱丽家居", scale: 1.7112e9, id: "603221.SH" },
                { name: "菲林格尔", scale: 1763239179, id: "603226.SH" },
                { name: "内蒙新华", scale: 1.1711531e9, id: "603230.SH" },
                { name: "松发股份", scale: 1.83769824e9, id: "603268.SH" },
                { name: "梦百合", scale: 4823872448, id: "603313.SH" },
                { name: "我乐家居", scale: 2483084792, id: "603326.SH" },
                { name: "惠达卫浴", scale: 2878004691, id: "603385.SH" },
                { name: "亚振家居", scale: 1.22442432e9, id: "603389.SH" },
                { name: "沐邦高科", scale: 8.54873095e9, id: "603398.SH" },
                { name: "建霖家居", scale: 1329573534, id: "603408.SH" },
                { name: "永艺股份", scale: 2885970586, id: "603600.SH" },
                { name: "麒盛科技", scale: 2.358994e9, id: "603610.SH" },
                { name: "恒林股份", scale: 4868736755, id: "603661.SH" },
                { name: "中源家居", scale: 1.1808e9, id: "603709.SH" },
                { name: "志邦家居", scale: 10227692556, id: "603801.SH" },
                { name: "顾家家居", scale: 31725012633, id: "603816.SH" },
                { name: "曲美家居", scale: 3534608875, id: "603818.SH" },
                { name: "欧派家居", scale: 73439404543, id: "603833.SH" },
                { name: "四通股份", scale: 1.54370272e9, id: "603838.SH" },
                { name: "好太太", scale: 5.5739e9, id: "603848.SH" },
                { name: "好莱客", scale: 3436568316, id: "603898.SH" },
                { name: "晨光股份", scale: 41479896058, id: "603899.SH" },
                { name: "松霖科技", scale: 7242260827, id: "603992.SH" },
                { name: "王力安防", scale: 6.671886e8, id: "605268.SH" },
                { name: "舒华体育", scale: 1348988066, id: "605299.SH" },
                { name: "龙竹科技", scale: 553814279, id: "831445.BJ" },
              ],
              name: "家用轻工",
              scale: 560212323147,
              id: "360300",
            },
            {
              children: [
                { name: "*ST易尚", scale: 828125193, id: "002751.SZ" },
                { name: "可孚医疗", scale: 3.67570599e9, id: "301087.SZ" },
                { name: "共创草坪", scale: 8.675476e8, id: "605099.SH" },
              ],
              name: "其他轻工制造",
              scale: 5371378783,
              id: "360400",
            },
          ],
          name: "轻工制造",
          scale: 9.2466779701e11,
          id: "360000",
        },
        {
          children: [
            {
              children: [
                { name: "丰原药业", scale: 2885789378, id: "000153.SZ" },
                { name: "丽珠集团", scale: 21768563058, id: "000513.SZ" },
                { name: "海南海药", scale: 5663792926, id: "000566.SZ" },
                { name: "东北制药", scale: 7672398213, id: "000597.SZ" },
                { name: "吉林敖东", scale: 18885132223, id: "000623.SZ" },
                { name: "普洛药业", scale: 24221400276, id: "000739.SZ" },
                { name: "新华制药", scale: 11323240151, id: "000756.SZ" },
                { name: "通化金马", scale: 4319192969, id: "000766.SZ" },
                { name: "北大医药", scale: 4064634239, id: "000788.SZ" },
                { name: "德展健康", scale: 6896524744, id: "000813.SZ" },
                { name: "景峰医药", scale: 2197355828, id: "000908.SZ" },
                { name: "华特达因", scale: 8504064703, id: "000915.SZ" },
                { name: "中 关 村", scale: 4469594282, id: "000931.SZ" },
                { name: "广济药业", scale: 2624625502, id: "000952.SZ" },
                { name: "华东医药", scale: 72018765296, id: "000963.SZ" },
                { name: "新 和 成", scale: 52446334254, id: "002001.SZ" },
                { name: "亿帆医药", scale: 12810148499, id: "002019.SZ" },
                { name: "京新药业", scale: 9885395566, id: "002020.SZ" },
                { name: "海翔药业", scale: 12233901336, id: "002099.SZ" },
                { name: "ST冠福", scale: 9037022474, id: "002102.SZ" },
                { name: "恩华药业", scale: 23992082137, id: "002262.SZ" },
                { name: "信立泰", scale: 39464520494, id: "002294.SZ" },
                { name: "仙琚制药", scale: 13840270523, id: "002332.SZ" },
                { name: "永安药业", scale: 2559954201, id: "002365.SZ" },
                { name: "亚太药业", scale: 2259452097, id: "002370.SZ" },
                { name: "力生制药", scale: 4.11436007e9, id: "002393.SZ" },
                { name: "海普瑞", scale: 17772624282, id: "002399.SZ" },
                { name: "*ST必康", scale: 6.40484015e9, id: "002411.SZ" },
                { name: "科伦药业", scale: 3.486379953e10, id: "002422.SZ" },
                { name: "长江健康", scale: 5567820145, id: "002435.SZ" },
                { name: "誉衡药业", scale: 4819760697, id: "002437.SZ" },
                { name: "千红制药", scale: 5284100877, id: "002550.SZ" },
                { name: "金达威", scale: 13239729978, id: "002626.SZ" },
                { name: "海思科", scale: 12808350516, id: "002653.SZ" },
                { name: "东诚药业", scale: 11479401654, id: "002675.SZ" },
                { name: "奥赛康", scale: 10209589786, id: "002755.SZ" },
                { name: "康弘药业", scale: 13163942795, id: "002773.SZ" },
                { name: "罗欣药业", scale: 7694690266, id: "002793.SZ" },
                { name: "凯莱英", scale: 45533661732, id: "002821.SZ" },
                { name: "赛隆药业", scale: 1058323439, id: "002898.SZ" },
                { name: "哈三联", scale: 1910307248, id: "002900.SZ" },
                { name: "润都股份", scale: 3374409722, id: "002923.SZ" },
                { name: "昂利康", scale: 3641621273, id: "002940.SZ" },
                { name: "立方制药", scale: 2404192525, id: "003020.SZ" },
                { name: "莱美药业", scale: 2948114566, id: "300006.SZ" },
                { name: "北陆药业", scale: 3261372631, id: "300016.SZ" },
                { name: "康芝药业", scale: 2.51377615e9, id: "300086.SZ" },
                { name: "华仁药业", scale: 4827889608, id: "300110.SZ" },
                { name: "振东制药", scale: 6185311226, id: "300158.SZ" },
                { name: "福安药业", scale: 3719575702, id: "300194.SZ" },
                { name: "翰宇药业", scale: 6860148274, id: "300199.SZ" },
                { name: "金城医药", scale: 7165594228, id: "300233.SZ" },
                { name: "仟源医药", scale: 1344420282, id: "300254.SZ" },
                { name: "尔康制药", scale: 4589825168, id: "300267.SZ" },
                { name: "博腾股份", scale: 18410750544, id: "300363.SZ" },
                { name: "花园生物", scale: 6940461542, id: "300401.SZ" },
                { name: "金石亚药", scale: 3748586196, id: "300434.SZ" },
                { name: "广生堂", scale: 4141588741, id: "300436.SZ" },
                { name: "山河药辅", scale: 3359422217, id: "300452.SZ" },
                { name: "富祥药业", scale: 5.57119676e9, id: "300497.SZ" },
                { name: "贝达药业", scale: 28306854003, id: "300558.SZ" },
                { name: "兴齐眼药", scale: 9681290953, id: "300573.SZ" },
                { name: "赛托生物", scale: 2507377349, id: "300583.SZ" },
                { name: "海辰药业", scale: 1484568918, id: "300584.SZ" },
                { name: "普利制药", scale: 7397712825, id: "300630.SZ" },
                { name: "同和药业", scale: 4011817952, id: "300636.SZ" },
                { name: "天宇股份", scale: 5115999342, id: "300702.SZ" },
                { name: "九典制药", scale: 5461227487, id: "300705.SZ" },
                { name: "一品红", scale: 6169419261, id: "300723.SZ" },
                { name: "药石科技", scale: 11912996514, id: "300725.SZ" },
                { name: "新诺威", scale: 1.2285e10, id: "300765.SZ" },
                { name: "共同药业", scale: 1415701159, id: "300966.SZ" },
                { name: "金三江", scale: 846708928, id: "301059.SZ" },
                { name: "星华新材", scale: 921705043, id: "301077.SZ" },
                { name: "风光股份", scale: 1.089e9, id: "301100.SZ" },
                { name: "佳先股份", scale: 452067554, id: "430489.BJ" },
                { name: "华润双鹤", scale: 20509451162, id: "600062.SH" },
                { name: "人福医药", scale: 39349419678, id: "600079.SH" },
                { name: "江苏吴中", scale: 5.38281042e9, id: "600200.SH" },
                { name: "浙江医药", scale: 11298312493, id: "600216.SH" },
                { name: "圣济堂", scale: 3591684527, id: "600227.SH" },
                { name: "海正药业", scale: 12037858961, id: "600267.SH" },
                { name: "恒瑞医药", scale: 301854387606, id: "600276.SH" },
                { name: "健康元", scale: 25503883524, id: "600380.SH" },
                { name: "国药现代", scale: 13658881441, id: "600420.SH" },
                { name: "津药药业", scale: 4957165527, id: "600488.SH" },
                { name: "联环药业", scale: 3025836462, id: "600513.SH" },
                { name: "华海药业", scale: 28117672132, id: "600521.SH" },
                { name: "神奇制药", scale: 3609279434, id: "600613.SH" },
                { name: "哈药股份", scale: 7879868512, id: "600664.SH" },
                { name: "东阳光", scale: 24008087259, id: "600673.SH" },
                { name: "*ST辅仁", scale: 333094268, id: "600781.SH" },
                { name: "鲁抗医药", scale: 5991007174, id: "600789.SH" },
                { name: "华北制药", scale: 9833752516, id: "600812.SH" },
                { name: "海欣股份", scale: 4532585515, id: "600851.SH" },
                { name: "圣达生物", scale: 2088505288, id: "603079.SH" },
                { name: "莎普爱思", scale: 2796876966, id: "603168.SH" },
                { name: "济民医疗", scale: 5.79127598e9, id: "603222.SH" },
                { name: "奥翔药业", scale: 9186672853, id: "603229.SH" },
                { name: "威尔药业", scale: 3109268611, id: "603351.SH" },
                { name: "九洲药业", scale: 2.753895569e10, id: "603456.SH" },
                { name: "司太立", scale: 5932351157, id: "603520.SH" },
                { name: "美诺华", scale: 4875620325, id: "603538.SH" },
                { name: "灵康药业", scale: 3635040447, id: "603669.SH" },
                { name: "卫信康", scale: 5.85295128e9, id: "603676.SH" },
                { name: "健友股份", scale: 2.442933093e10, id: "603707.SH" },
                { name: "诚意药业", scale: 4250280384, id: "603811.SH" },
                { name: "美邦股份", scale: 5.74262e8, id: "605033.SH" },
                { name: "奥锐特", scale: 2.02221088e9, id: "605116.SH" },
                { name: "东亚药业", scale: 1324548111, id: "605177.SH" },
                { name: "国邦医药", scale: 6906420838, id: "605507.SH" },
                { name: "福莱蒽特", scale: 1303064374, id: "605566.SH" },
                { name: "迈威生物-U", scale: 4961957172, id: "688062.SH" },
                { name: "上海谊众", scale: 10005749206, id: "688091.SH" },
                { name: "圣诺生物", scale: 1.82568736e9, id: "688117.SH" },
                { name: "博瑞医药", scale: 9569409266, id: "688166.SH" },
                { name: "亚虹医药-U", scale: 3778823502, id: "688176.SH" },
                { name: "南新制药", scale: 2.74596e9, id: "688189.SH" },
                { name: "迪哲医药-U", scale: 2029245073, id: "688192.SH" },
                { name: "前沿生物-U", scale: 2692929163, id: "688221.SH" },
                { name: "泽璟制药-U", scale: 8040051117, id: "688266.SH" },
                { name: "微芯生物", scale: 12136272762, id: "688321.SH" },
                { name: "键凯科技", scale: 4765155328, id: "688356.SH" },
                { name: "复旦张江", scale: 2785818556, id: "688505.SH" },
                { name: "苑东生物", scale: 3.5616861e9, id: "688513.SH" },
                { name: "汇宇制药-W", scale: 4916865273, id: "688553.SH" },
                { name: "吉贝尔", scale: 2.51894448e9, id: "688566.SH" },
                { name: "艾力斯-U", scale: 6066778441, id: "688578.SH" },
                { name: "悦康药业", scale: 4.51756535e9, id: "688658.SH" },
                { name: "纳微科技", scale: 9803442069, id: "688690.SH" },
                { name: "博拓生物", scale: 1608158996, id: "688767.SH" },
                { name: "华纳药厂", scale: 2.14337875e9, id: "688799.SH" },
                { name: "齐鲁华信", scale: 659227029, id: "830832.BJ" },
                { name: "森萱医药", scale: 3473589038, id: "830946.BJ" },
              ],
              name: "化学制药",
              scale: 1507736531933,
              id: "370100",
            },
            {
              children: [
                { name: "东阿阿胶", scale: 32864582234, id: "000423.SZ" },
                { name: "云南白药", scale: 9.260216956e10, id: "000538.SZ" },
                { name: "启迪药业", scale: 1989216446, id: "000590.SZ" },
                { name: "仁和药业", scale: 8631110906, id: "000650.SZ" },
                { name: "华神科技", scale: 2766792163, id: "000790.SZ" },
                { name: "金陵药业", scale: 3756135416, id: "000919.SZ" },
                { name: "九 芝 堂", scale: 9027630387, id: "000989.SZ" },
                { name: "华润三九", scale: 53978069142, id: "000999.SZ" },
                { name: "沃华医药", scale: 3696812059, id: "002107.SZ" },
                { name: "紫鑫药业", scale: 1985010234, id: "002118.SZ" },
                { name: "嘉应制药", scale: 3892600534, id: "002198.SZ" },
                { name: "桂林三金", scale: 9944235869, id: "002275.SZ" },
                { name: "奇正藏药", scale: 13920644617, id: "002287.SZ" },
                { name: "众生药业", scale: 14883331209, id: "002317.SZ" },
                { name: "精华制药", scale: 8388653905, id: "002349.SZ" },
                { name: "信邦制药", scale: 8711961983, id: "002390.SZ" },
                { name: "汉森制药", scale: 3.14940725e9, id: "002412.SZ" },
                { name: "贵州百灵", scale: 9557370373, id: "002424.SZ" },
                { name: "ST太安", scale: 2255488444, id: "002433.SZ" },
                { name: "益盛药业", scale: 1765385825, id: "002566.SZ" },
                { name: "以岭药业", scale: 42435540698, id: "002603.SZ" },
                { name: "佛慈制药", scale: 7.3023951e9, id: "002644.SZ" },
                { name: "特一药业", scale: 3556285607, id: "002728.SZ" },
                { name: "葵花药业", scale: 1.562784e10, id: "002737.SZ" },
                { name: "龙津药业", scale: 3834412741, id: "002750.SZ" },
                { name: "黄山胶囊", scale: 2433429685, id: "002817.SZ" },
                { name: "易明医药", scale: 1841338425, id: "002826.SZ" },
                { name: "盘龙药业", scale: 2483178114, id: "002864.SZ" },
                { name: "新天药业", scale: 3060704564, id: "002873.SZ" },
                { name: "华森制药", scale: 5291965091, id: "002907.SZ" },
                { name: "红日药业", scale: 15572876786, id: "300026.SZ" },
                { name: "上海凯宝", scale: 6828359849, id: "300039.SZ" },
                { name: "*ST吉药", scale: 808821656, id: "300108.SZ" },
                { name: "香雪制药", scale: 3543016507, id: "300147.SZ" },
                { name: "佐力药业", scale: 8825060296, id: "300181.SZ" },
                { name: "新光药业", scale: 1.811908e9, id: "300519.SZ" },
                { name: "陇神戎发", scale: 3201552017, id: "300534.SZ" },
                { name: "维康药业", scale: 927546934, id: "300878.SZ" },
                { name: "金花股份", scale: 2821923355, id: "600080.SH" },
                { name: "同仁堂", scale: 75540582031, id: "600085.SH" },
                { name: "太极集团", scale: 23662287713, id: "600129.SH" },
                { name: "西藏药业", scale: 15285368021, id: "600211.SH" },
                { name: "太龙药业", scale: 3357234756, id: "600222.SH" },
                { name: "中恒集团", scale: 8871290543, id: "600252.SH" },
                { name: "羚锐制药", scale: 8954930936, id: "600285.SH" },
                { name: "达仁堂", scale: 2.308175882e10, id: "600329.SH" },
                { name: "白云山", scale: 4.768782099e10, id: "600332.SH" },
                { name: "亚宝药业", scale: 5320700159, id: "600351.SH" },
                { name: "昆药集团", scale: 14382539383, id: "600422.SH" },
                { name: "片仔癀", scale: 162388860244, id: "600436.SH" },
                { name: "千金药业", scale: 5340150813, id: "600479.SH" },
                { name: "ST康美", scale: 28178761177, id: "600518.SH" },
                { name: "天士力", scale: 23110379003, id: "600535.SH" },
                { name: "国发股份", scale: 2117246921, id: "600538.SH" },
                { name: "康缘药业", scale: 1.801340475e10, id: "600557.SH" },
                { name: "济川药业", scale: 29056689117, id: "600566.SH" },
                { name: "康恩贝", scale: 17174079622, id: "600572.SH" },
                { name: "益佰制药", scale: 4.63277529e9, id: "600594.SH" },
                { name: "ST目药", scale: 942116925, id: "600671.SH" },
                { name: "江中药业", scale: 14288966038, id: "600750.SH" },
                { name: "广誉远", scale: 17822372444, id: "600771.SH" },
                { name: "健民集团", scale: 10561167471, id: "600976.SH" },
                { name: "马应龙", scale: 10792099961, id: "600993.SH" },
                { name: "康惠制药", scale: 1.54814e9, id: "603139.SH" },
                { name: "贵州三力", scale: 3034702871, id: "603439.SH" },
                { name: "珍宝岛", scale: 1.484534621e10, id: "603567.SH" },
                { name: "步长制药", scale: 2.246372612e10, id: "603858.SH" },
                { name: "寿仙谷", scale: 9280491583, id: "603896.SH" },
                { name: "大理药业", scale: 2.385942e9, id: "603963.SH" },
                { name: "方盛制药", scale: 5453757444, id: "603998.SH" },
                { name: "葫芦娃", scale: 1572791671, id: "605199.SH" },
              ],
              name: "中药",
              scale: 1051123245008,
              id: "370200",
            },
            {
              children: [
                { name: "派林生物", scale: 1.533993081e10, id: "000403.SZ" },
                { name: "南华生物", scale: 3796426516, id: "000504.SZ" },
                { name: "四环生物", scale: 2.88269994e9, id: "000518.SZ" },
                { name: "万泽股份", scale: 7743701201, id: "000534.SZ" },
                { name: "长春高新", scale: 65742142868, id: "000661.SZ" },
                { name: "华兰生物", scale: 37120914829, id: "002007.SZ" },
                { name: "双鹭药业", scale: 7466805573, id: "002038.SZ" },
                { name: "莱茵生物", scale: 4090675441, id: "002166.SZ" },
                { name: "上海莱士", scale: 42787176344, id: "002252.SZ" },
                { name: "未名医药", scale: 7510826357, id: "002581.SZ" },
                { name: "双成药业", scale: 2661097713, id: "002693.SZ" },
                { name: "卫光生物", scale: 7.0308e9, id: "002880.SZ" },
                { name: "安科生物", scale: 1.346166599e10, id: "300009.SZ" },
                { name: "智飞生物", scale: 76662395461, id: "300122.SZ" },
                { name: "沃森生物", scale: 51085622705, id: "300142.SZ" },
                { name: "舒泰神", scale: 5721759022, id: "300204.SZ" },
                { name: "东宝生物", scale: 3243860695, id: "300239.SZ" },
                { name: "常山药业", scale: 4807463109, id: "300255.SZ" },
                { name: "博雅生物", scale: 16258136022, id: "300294.SZ" },
                { name: "我武生物", scale: 20889818718, id: "300357.SZ" },
                { name: "溢多利", scale: 4189567003, id: "300381.SZ" },
                { name: "赛升药业", scale: 2924155659, id: "300485.SZ" },
                { name: "康泰生物", scale: 27419586112, id: "300601.SZ" },
                { name: "海特生物", scale: 4051041945, id: "300683.SZ" },
                { name: "康华生物", scale: 8344402339, id: "300841.SZ" },
                { name: "义翘神州", scale: 6448514123, id: "301047.SZ" },
                { name: "百普赛斯", scale: 4263626511, id: "301080.SZ" },
                { name: "天坛生物", scale: 43815255615, id: "600161.SH" },
                { name: "复星医药", scale: 68783373813, id: "600196.SH" },
                { name: "交大昂立", scale: 2.3867536e9, id: "600530.SH" },
                { name: "中源协和", scale: 8.7894014e9, id: "600645.SH" },
                { name: "南京新百", scale: 9506891844, id: "600682.SH" },
                { name: "辽宁成大", scale: 19488503056, id: "600739.SH" },
                { name: "钱江生化", scale: 1552221042, id: "600796.SH" },
                { name: "通化东宝", scale: 23659324264, id: "600867.SH" },
                { name: "甘李药业", scale: 10678133046, id: "603087.SH" },
                { name: "康辰药业", scale: 5.6e9, id: "603590.SH" },
                { name: "诺唯赞", scale: 6529801958, id: "688105.SH" },
                { name: "科兴制药", scale: 1378599442, id: "688136.SH" },
                { name: "百奥泰", scale: 1.17681536e10, id: "688177.SH" },
                { name: "君实生物-U", scale: 23174292806, id: "688180.SH" },
                { name: "康希诺", scale: 7079277395, id: "688185.SH" },
                { name: "百济神州-U", scale: 17871303166, id: "688235.SH" },
                { name: "百克生物", scale: 15661349753, id: "688276.SH" },
                { name: "特宝生物", scale: 1.8273456e10, id: "688278.SH" },
                { name: "欧林生物", scale: 5844102629, id: "688319.SH" },
                { name: "三生国健", scale: 1871523288, id: "688336.SH" },
                { name: "华熙生物", scale: 19911097219, id: "688363.SH" },
                { name: "艾迪药业", scale: 3279252864, id: "688488.SH" },
                { name: "神州细胞-U", scale: 7056424926, id: "688520.SH" },
                { name: "金迪克", scale: 1840257351, id: "688670.SH" },
                { name: "凯因科技", scale: 3.6050085e9, id: "688687.SH" },
                { name: "成大生物", scale: 5959296317, id: "688739.SH" },
                { name: "永顺生物", scale: 6.4115409e8, id: "839729.BJ" },
              ],
              name: "生物制品",
              scale: 7.9994902199e11,
              id: "370300",
            },
            {
              children: [
                { name: "国药一致", scale: 1.991645313e10, id: "000028.SZ" },
                { name: "海王生物", scale: 8571322506, id: "000078.SZ" },
                { name: "英特集团", scale: 3486627917, id: "000411.SZ" },
                { name: "浙江震元", scale: 2198445608, id: "000705.SZ" },
                { name: "重药控股", scale: 10040753084, id: "000950.SZ" },
                { name: "嘉事堂", scale: 4247163313, id: "002462.SZ" },
                { name: "瑞康医药", scale: 4180844531, id: "002589.SZ" },
                { name: "一心堂", scale: 11453231723, id: "002727.SZ" },
                { name: "浙农股份", scale: 2697163043, id: "002758.SZ" },
                { name: "鹭燕医药", scale: 3456096967, id: "002788.SZ" },
                { name: "ST天圣", scale: 1175189481, id: "002872.SZ" },
                { name: "药易购", scale: 1143313095, id: "300937.SZ" },
                { name: "百洋医药", scale: 3.3736875e9, id: "301015.SZ" },
                { name: "漱玉平民", scale: 2.10949e9, id: "301017.SZ" },
                { name: "兰卫医学", scale: 4.06478403e9, id: "301060.SZ" },
                { name: "多瑞医药", scale: 683947801, id: "301075.SZ" },
                { name: "拓新药业", scale: 4584780854, id: "301089.SZ" },
                { name: "华兰股份", scale: 2.90955923e9, id: "301093.SZ" },
                { name: "百诚医药", scale: 4528828355, id: "301096.SZ" },
                { name: "粤万年青", scale: 1359985127, id: "301111.SZ" },
                { name: "优宁维", scale: 1998651277, id: "301166.SZ" },
                { name: "亨迪药业", scale: 1671608714, id: "301211.SZ" },
                { name: "诺思兰德", scale: 2601059832, id: "430047.BJ" },
                { name: "中国医药", scale: 20202198468, id: "600056.SH" },
                { name: "开开实业", scale: 1.4208e9, id: "600272.SH" },
                { name: "国药股份", scale: 22034254604, id: "600511.SH" },
                { name: "南京医药", scale: 5322633457, id: "600713.SH" },
                { name: "人民同泰", scale: 3838862512, id: "600829.SH" },
                { name: "第一医药", scale: 2458411544, id: "600833.SH" },
                { name: "九州通", scale: 29832001501, id: "600998.SH" },
                { name: "上海医药", scale: 42368530117, id: "601607.SH" },
                { name: "大参林", scale: 32527337288, id: "603233.SH" },
                { name: "柳药集团", scale: 8617411566, id: "603368.SH" },
                { name: "塞力医疗", scale: 1916598244, id: "603716.SH" },
                { name: "老百姓", scale: 19339660911, id: "603883.SH" },
                { name: "益丰药房", scale: 36361652338, id: "603939.SH" },
                { name: "健之佳", scale: 4220872359, id: "605266.SH" },
                { name: "梓橦宫", scale: 791177053, id: "832566.BJ" },
                { name: "德源药业", scale: 1476627598, id: "832735.BJ" },
                { name: "生物谷", scale: 650907528, id: "833266.BJ" },
                { name: "大唐药业", scale: 559829187, id: "836433.BJ" },
                { name: "三元基因", scale: 1723852883, id: "837344.BJ" },
              ],
              name: "医药商业",
              scale: 338116606276,
              id: "370400",
            },
            {
              children: [
                { name: "贝瑞基因", scale: 4.17481316e9, id: "000710.SZ" },
                { name: "科华生物", scale: 6077224715, id: "002022.SZ" },
                { name: "达安基因", scale: 22048137163, id: "002030.SZ" },
                { name: "鱼跃医疗", scale: 2.851876129e10, id: "002223.SZ" },
                { name: "蓝帆医疗", scale: 7481289523, id: "002382.SZ" },
                { name: "九安医疗", scale: 22026338507, id: "002432.SZ" },
                { name: "尚荣医疗", scale: 2453525917, id: "002551.SZ" },
                { name: "大博医疗", scale: 14075799005, id: "002901.SZ" },
                { name: "明德生物", scale: 5927375214, id: "002932.SZ" },
                { name: "奥美医疗", scale: 3867555808, id: "002950.SZ" },
                { name: "乐普医疗", scale: 38049106537, id: "300003.SZ" },
                { name: "阳普医疗", scale: 1744664883, id: "300030.SZ" },
                { name: "福瑞股份", scale: 7424779106, id: "300049.SZ" },
                { name: "理邦仪器", scale: 4881881852, id: "300206.SZ" },
                { name: "冠昊生物", scale: 3351294796, id: "300238.SZ" },
                { name: "迪安诊断", scale: 14240026565, id: "300244.SZ" },
                { name: "宝莱特", scale: 2206752519, id: "300246.SZ" },
                { name: "*ST和佳", scale: 1573753374, id: "300273.SZ" },
                { name: "利德曼", scale: 2322958743, id: "300289.SZ" },
                { name: "三诺生物", scale: 14070182594, id: "300298.SZ" },
                { name: "戴维医疗", scale: 3806028425, id: "300314.SZ" },
                { name: "博晖创新", scale: 4373544388, id: "300318.SZ" },
                { name: "凯利泰", scale: 5051624435, id: "300326.SZ" },
                { name: "楚天科技", scale: 7799260555, id: "300358.SZ" },
                { name: "迪瑞医疗", scale: 9126686439, id: "300396.SZ" },
                { name: "九强生物", scale: 7328943504, id: "300406.SZ" },
                { name: "美康生物", scale: 3347649901, id: "300439.SZ" },
                { name: "三鑫医疗", scale: 2773851275, id: "300453.SZ" },
                { name: "迈克生物", scale: 8643853713, id: "300463.SZ" },
                { name: "万孚生物", scale: 9760363004, id: "300482.SZ" },
                { name: "健帆生物", scale: 15597061893, id: "300529.SZ" },
                { name: "乐心医疗", scale: 1461714039, id: "300562.SZ" },
                { name: "欧普康视", scale: 21637782166, id: "300595.SZ" },
                { name: "开立医疗", scale: 23245728606, id: "300633.SZ" },
                { name: "凯普生物", scale: 7273449324, id: "300639.SZ" },
                { name: "透景生命", scale: 3124571059, id: "300642.SZ" },
                { name: "正海生物", scale: 8.3862e9, id: "300653.SZ" },
                { name: "华大基因", scale: 28074312308, id: "300676.SZ" },
                { name: "英科医疗", scale: 11345564996, id: "300677.SZ" },
                { name: "艾德生物", scale: 11338098507, id: "300685.SZ" },
                { name: "爱朋医疗", scale: 1049424959, id: "300753.SZ" },
                { name: "迈瑞医疗", scale: 365550786329, id: "300760.SZ" },
                { name: "新产业", scale: 15953082549, id: "300832.SZ" },
                { name: "康泰医学", scale: 3724301813, id: "300869.SZ" },
                { name: "爱美客", scale: 46693408396, id: "300896.SZ" },
                { name: "中红医疗", scale: 2.246265e9, id: "300981.SZ" },
                { name: "迈普医学", scale: 1543300954, id: "301033.SZ" },
                { name: "达嘉维康", scale: 1522587457, id: "301126.SZ" },
                { name: "万东医疗", scale: 12579384789, id: "600055.SH" },
                { name: "山东药玻", scale: 15498909809, id: "600529.SH" },
                { name: "新华医疗", scale: 11676325372, id: "600587.SH" },
                { name: "振德医疗", scale: 8.03850356e9, id: "603301.SH" },
                { name: "维力医疗", scale: 5552249619, id: "603309.SH" },
                { name: "辰欣药业", scale: 6.60999296e9, id: "603367.SH" },
                { name: "基蛋生物", scale: 6608210327, id: "603387.SH" },
                { name: "万泰生物", scale: 25865217625, id: "603392.SH" },
                { name: "安图生物", scale: 34519710433, id: "603658.SH" },
                { name: "南卫股份", scale: 1.5174705e9, id: "603880.SH" },
                { name: "正川股份", scale: 2919710137, id: "603976.SH" },
                { name: "康德莱", scale: 6.35530014e9, id: "603987.SH" },
                { name: "拱东医疗", scale: 1826411073, id: "605369.SH" },
                { name: "天臣医疗", scale: 861577068, id: "688013.SH" },
                { name: "心脉医疗", scale: 13254055989, id: "688016.SH" },
                { name: "洁特生物", scale: 2949801264, id: "688026.SH" },
                { name: "南微医学", scale: 15215641182, id: "688029.SH" },
                { name: "爱博医疗", scale: 14927439382, id: "688050.SH" },
                { name: "爱威科技", scale: 796514426, id: "688067.SH" },
                { name: "热景生物", scale: 4515081194, id: "688068.SH" },
                { name: "安旭生物", scale: 1767961111, id: "688075.SH" },
                { name: "三友医疗", scale: 6.34008248e9, id: "688085.SH" },
                { name: "赛诺医疗", scale: 2.5871e9, id: "688108.SH" },
                { name: "海尔生物", scale: 23388586488, id: "688139.SH" },
                { name: "华强科技", scale: 1.99644428e9, id: "688151.SH" },
                { name: "威高骨科", scale: 4280413887, id: "688161.SH" },
                { name: "佰仁医疗", scale: 16701295583, id: "688198.SH" },
                { name: "澳华内镜", scale: 5.84475551e9, id: "688212.SH" },
                { name: "睿昂基因", scale: 1622965766, id: "688217.SH" },
                { name: "春立医疗", scale: 2542671722, id: "688236.SH" },
                { name: "天智航-U", scale: 4795904901, id: "688277.SH" },
                { name: "圣湘生物", scale: 8028692843, id: "688289.SH" },
                { name: "东方生物", scale: 1.07352e10, id: "688298.SH" },
                { name: "奕瑞科技", scale: 1.494303294e10, id: "688301.SH" },
                { name: "康拓医疗", scale: 1339749314, id: "688314.SH" },
                { name: "之江生物", scale: 3809732604, id: "688317.SH" },
                { name: "赛科希德", scale: 2782613654, id: "688338.SH" },
                { name: "祥生医疗", scale: 5985207785, id: "688358.SH" },
                { name: "昊海生科", scale: 6.0327696e9, id: "688366.SH" },
                { name: "普门科技", scale: 1.154169532e10, id: "688389.SH" },
                { name: "安必平", scale: 1.55063296e9, id: "688393.SH" },
                { name: "硕世生物", scale: 5.082354e9, id: "688399.SH" },
                { name: "科美诊断", scale: 3046999934, id: "688468.SH" },
                { name: "亚辉龙", scale: 5105841389, id: "688575.SH" },
                { name: "伟思医疗", scale: 1619777823, id: "688580.SH" },
                { name: "奥泰生物", scale: 2.5414195e9, id: "688606.SH" },
                { name: "康众医疗", scale: 1444576066, id: "688607.SH" },
                { name: "奥精医疗", scale: 2937084792, id: "688613.SH" },
                { name: "惠泰医疗", scale: 1.57301908e10, id: "688617.SH" },
                { name: "翔宇医疗", scale: 2229523648, id: "688626.SH" },
                { name: "浩欧博", scale: 677006717, id: "688656.SH" },
                { name: "海泰新光", scale: 5.6478976e9, id: "688677.SH" },
                { name: "鹿得医疗", scale: 380269564, id: "832278.BJ" },
                { name: "锦好医疗", scale: 409485734, id: "872925.BJ" },
              ],
              name: "医疗器械",
              scale: 1215853110429,
              id: "370500",
            },
            {
              children: [
                { name: "*ST宜康", scale: 507773852, id: "000150.SZ" },
                { name: "国新健康", scale: 9796701259, id: "000503.SZ" },
                { name: "华塑控股", scale: 3884657505, id: "000509.SZ" },
                { name: "国际医学", scale: 20232612078, id: "000516.SZ" },
                { name: "美年健康", scale: 25705041448, id: "002044.SZ" },
                { name: "创新医疗", scale: 2473146833, id: "002173.SZ" },
                { name: "新里程", scale: 16506163101, id: "002219.SZ" },
                { name: "光正眼科", scale: 3.45205612e9, id: "002524.SZ" },
                { name: "爱尔眼科", scale: 167945301552, id: "300015.SZ" },
                { name: "盈康生命", scale: 5835017723, id: "300143.SZ" },
                { name: "睿智医药", scale: 5.0739075e9, id: "300149.SZ" },
                { name: "泰格医药", scale: 54777286221, id: "300347.SZ" },
                { name: "博济医药", scale: 2592537298, id: "300404.SZ" },
                { name: "康龙化成", scale: 48211303933, id: "300759.SZ" },
                { name: "百花医药", scale: 2376290206, id: "600721.SH" },
                { name: "通策医疗", scale: 3.8332512e10, id: "600763.SH" },
                { name: "*ST运盛", scale: 1.74205103e9, id: "600767.SH" },
                { name: "润达医疗", scale: 7412377046, id: "603108.SH" },
                { name: "昭衍新药", scale: 24125456655, id: "603127.SH" },
                { name: "药明康德", scale: 195543722813, id: "603259.SH" },
                { name: "金域医学", scale: 4.056933873e10, id: "603882.SH" },
                { name: "诺泰生物", scale: 4.68510154e9, id: "688076.SH" },
                { name: "皓元医药", scale: 7287360267, id: "688131.SH" },
                { name: "美迪西", scale: 10219161998, id: "688202.SH" },
                { name: "成都先导", scale: 8.0496612e9, id: "688222.SH" },
                { name: "南模生物", scale: 2.25239866e9, id: "688265.SH" },
                { name: "诺禾致源", scale: 4220448653, id: "688315.SH" },
                { name: "阳光诺和", scale: 5516163808, id: "688621.SH" },
              ],
              name: "医疗服务",
              scale: 719325551029,
              id: "370600",
            },
          ],
          name: "医药生物",
          scale: 5632104066665,
          id: "370000",
        },
        {
          children: [
            {
              children: [
                { name: "深圳能源", scale: 29828834773, id: "000027.SZ" },
                { name: "深南电A", scale: 2.43326722e9, id: "000037.SZ" },
                { name: "东旭蓝天", scale: 4.1141218e9, id: "000040.SZ" },
                { name: "川能动力", scale: 18753626526, id: "000155.SZ" },
                { name: "穗恒运Ａ", scale: 5508065873, id: "000531.SZ" },
                { name: "粤电力Ａ", scale: 16166267385, id: "000539.SZ" },
                { name: "皖能电力", scale: 1.253575422e10, id: "000543.SZ" },
                { name: "太阳能", scale: 25202105374, id: "000591.SZ" },
                { name: "建投能源", scale: 6365857696, id: "000600.SZ" },
                { name: "韶能股份", scale: 4816274889, id: "000601.SZ" },
                { name: "宝新能源", scale: 14373255789, id: "000690.SZ" },
                { name: "惠天热电", scale: 1507897158, id: "000692.SZ" },
                { name: "新能泰山", scale: 6533964169, id: "000720.SZ" },
                { name: "湖南发展", scale: 5045400525, id: "000722.SZ" },
                { name: "晋控电力", scale: 8940585003, id: "000767.SZ" },
                { name: "甘肃能源", scale: 6865782697, id: "000791.SZ" },
                { name: "银星能源", scale: 3459334941, id: "000862.SZ" },
                { name: "吉电股份", scale: 1.29620813e10, id: "000875.SZ" },
                { name: "湖北能源", scale: 27648723305, id: "000883.SZ" },
                { name: "赣能股份", scale: 7824918705, id: "000899.SZ" },
                { name: "长源电力", scale: 6500517966, id: "000966.SZ" },
                { name: "闽东电力", scale: 4256756497, id: "000993.SZ" },
                { name: "金房节能", scale: 953603137, id: "001210.SZ" },
                { name: "豫能控股", scale: 5811437852, id: "001896.SZ" },
                { name: "协鑫能科", scale: 23018743027, id: "002015.SZ" },
                { name: "黔源电力", scale: 6101254458, id: "002039.SZ" },
                { name: "兆新股份", scale: 3462153835, id: "002256.SZ" },
                { name: "江苏国信", scale: 24859764452, id: "002608.SZ" },
                { name: "爱康科技", scale: 12053899404, id: "002610.SZ" },
                { name: "长青集团", scale: 2318166734, id: "002616.SZ" },
                { name: "京能热力", scale: 1638217488, id: "002893.SZ" },
                { name: "南网能源", scale: 11648751508, id: "003035.SZ" },
                { name: "中国广核", scale: 1.180049583e11, id: "003816.SZ" },
                { name: "聆达股份", scale: 4195333681, id: "300125.SZ" },
                { name: "华能国际", scale: 96010007593, id: "600011.SH" },
                { name: "上海电力", scale: 26119298686, id: "600021.SH" },
                { name: "浙能电力", scale: 56853026856, id: "600023.SH" },
                { name: "华能水电", scale: 1.26e11, id: "600025.SH" },
                { name: "华电国际", scale: 48486502401, id: "600027.SH" },
                { name: "浙江新能", scale: 2.33584e9, id: "600032.SH" },
                { name: "广州发展", scale: 19593520743, id: "600098.SH" },
                { name: "明星电力", scale: 3611677982, id: "600101.SH" },
                { name: "三峡水利", scale: 14264145219, id: "600116.SH" },
                { name: "国网信通", scale: 22799454718, id: "600131.SH" },
                { name: "永泰能源", scale: 33993179142, id: "600157.SH" },
                { name: "中闽能源", scale: 5955472489, id: "600163.SH" },
                { name: "联美控股", scale: 13568548487, id: "600167.SH" },
                { name: "桂冠电力", scale: 43826020579, id: "600236.SH" },
                { name: "桂东电力", scale: 3.5487636e9, id: "600310.SH" },
                { name: "金山股份", scale: 3254682066, id: "600396.SH" },
                { name: "涪陵电力", scale: 16334901166, id: "600452.SH" },
                { name: "福能股份", scale: 21999955698, id: "600483.SH" },
                { name: "西昌电力", scale: 2810815425, id: "600505.SH" },
                { name: "天富能源", scale: 7749023064, id: "600509.SH" },
                { name: "京能电力", scale: 21420106829, id: "600578.SH" },
                { name: "申能股份", scale: 30746409968, id: "600642.SH" },
                { name: "乐山电力", scale: 3671892494, id: "600644.SH" },
                { name: "川投能源", scale: 6.186863658e10, id: "600674.SH" },
                { name: "大连热电", scale: 1849020172, id: "600719.SH" },
                { name: "*ST华源", scale: 4235703417, id: "600726.SH" },
                { name: "华银电力", scale: 3343642984, id: "600744.SH" },
                { name: "通宝能源", scale: 9.97457195e9, id: "600780.SH" },
                { name: "国电电力", scale: 69023845847, id: "600795.SH" },
                { name: "内蒙华电", scale: 24606367047, id: "600863.SH" },
                { name: "梅雁吉祥", scale: 5257871841, id: "600868.SH" },
                { name: "国投电力", scale: 7.829641642e10, id: "600886.SH" },
                { name: "长江电力", scale: 478943555384, id: "600900.SH" },
                { name: "三峡能源", scale: 7.410858e10, id: "600905.SH" },
                { name: "郴电国际", scale: 2.55334834e9, id: "600969.SH" },
                { name: "广安爱众", scale: 3869295741, id: "600979.SH" },
                { name: "宁波能源", scale: 4605966531, id: "600982.SH" },
                { name: "南网储能", scale: 6646731696, id: "600995.SH" },
                { name: "节能风电", scale: 22853997842, id: "601016.SH" },
                { name: "嘉泽新能", scale: 11032322012, id: "601619.SH" },
                { name: "晶科科技", scale: 9368110423, id: "601778.SH" },
                { name: "中国核电", scale: 126805577405, id: "601985.SH" },
                { name: "大唐发电", scale: 38303915338, id: "601991.SH" },
                { name: "芯能科技", scale: 7.3e9, id: "603105.SH" },
                { name: "江苏新能", scale: 9.72114e9, id: "603693.SH" },
                { name: "杭州热电", scale: 1.746262e9, id: "605011.SH" },
                { name: "世茂能源", scale: 6.884e8, id: "605028.SH" },
                { name: "新中港", scale: 8.5302588e8, id: "605162.SH" },
              ],
              name: "电力",
              scale: 2128519227742,
              id: "410100",
            },
            {
              children: [
                { name: "中原环保", scale: 6335449172, id: "000544.SZ" },
                { name: "兴蓉环境", scale: 15199110764, id: "000598.SZ" },
                { name: "渤海股份", scale: 1924569022, id: "000605.SZ" },
                { name: "中山公用", scale: 8872867749, id: "000685.SZ" },
                { name: "顺控发展", scale: 2061990226, id: "003039.SZ" },
                { name: "节能国祯", scale: 4770734759, id: "300388.SZ" },
                { name: "鹏鹞环保", scale: 3754781394, id: "300664.SZ" },
                { name: "中环环保", scale: 2.64452709e9, id: "300692.SZ" },
                { name: "华骐环保", scale: 1.06848336e9, id: "300929.SZ" },
                { name: "深水海纳", scale: 1572706606, id: "300961.SZ" },
                { name: "首创环保", scale: 21654742497, id: "600008.SH" },
                { name: "武汉控股", scale: 4250322455, id: "600168.SH" },
                { name: "国中水务", scale: 3937625891, id: "600187.SH" },
                { name: "钱江水利", scale: 4415976933, id: "600283.SH" },
                { name: "洪城环境", scale: 6743715991, id: "600461.SH" },
                { name: "创业环保", scale: 7148729074, id: "600874.SH" },
                { name: "重庆水务", scale: 2.5968e10, id: "601158.SH" },
                { name: "江南水务", scale: 7865118556, id: "601199.SH" },
                { name: "绿城水务", scale: 4547311347, id: "601368.SH" },
                { name: "海天股份", scale: 1766970906, id: "603759.SH" },
                { name: "联泰环保", scale: 3276902906, id: "603797.SH" },
                { name: "海峡环保", scale: 3011942817, id: "603817.SH" },
                { name: "中持股份", scale: 1853102368, id: "603903.SH" },
              ],
              name: "水务",
              scale: 144645681883,
              id: "410200",
            },
            {
              children: [
                { name: "胜利股份", scale: 3222824076, id: "000407.SZ" },
                { name: "南京公用", scale: 2.77733763e9, id: "000421.SZ" },
                { name: "德龙汇能", scale: 2297705005, id: "000593.SZ" },
                { name: "ST金鸿", scale: 1.27236445e9, id: "000669.SZ" },
                { name: "ST升达", scale: 2618102369, id: "002259.SZ" },
                { name: "陕天然气", scale: 8329445083, id: "002267.SZ" },
                { name: "ST浩源", scale: 1475511975, id: "002700.SZ" },
                { name: "佛燃能源", scale: 12100930053, id: "002911.SZ" },
                { name: "中泰股份", scale: 4993587569, id: "300435.SZ" },
                { name: "长春燃气", scale: 2880715135, id: "600333.SH" },
                { name: "国新能源", scale: 3899657376, id: "600617.SH" },
                { name: "大众公用", scale: 7207999192, id: "600635.SH" },
                { name: "百川能源", scale: 5897307424, id: "600681.SH" },
                { name: "新奥股份", scale: 30102406893, id: "600803.SH" },
                { name: "贵州燃气", scale: 8832917512, id: "600903.SH" },
                { name: "重庆燃气", scale: 11348759055, id: "600917.SH" },
                { name: "新天绿能", scale: 2603226816, id: "600956.SH" },
                { name: "深圳燃气", scale: 19590534664, id: "601139.SH" },
                { name: "成都燃气", scale: 8.1600102e9, id: "603053.SH" },
                { name: "新疆火炬", scale: 1.900345e9, id: "603080.SH" },
                { name: "新天然气", scale: 8797633031, id: "603393.SH" },
                { name: "皖天然气", scale: 3565688873, id: "603689.SH" },
                { name: "东方环宇", scale: 2662720959, id: "603706.SH" },
                { name: "九丰能源", scale: 5923663189, id: "605090.SH" },
                { name: "洪通燃气", scale: 7.305376e8, id: "605169.SH" },
                { name: "蓝天燃气", scale: 2.43108462e9, id: "605368.SH" },
                { name: "凯添燃气", scale: 571644441, id: "831010.BJ" },
              ],
              name: "燃气",
              scale: 1.6619466019e11,
              id: "410300",
            },
            {
              children: [
                { name: "ST星源", scale: 1819667536, id: "000005.SZ" },
                { name: "中国天楹", scale: 11383522545, id: "000035.SZ" },
                { name: "华控赛格", scale: 3332082546, id: "000068.SZ" },
                { name: "京蓝科技", scale: 1632596189, id: "000711.SZ" },
                { name: "神雾节能", scale: 1070083742, id: "000820.SZ" },
                { name: "启迪环境", scale: 4418036173, id: "000826.SZ" },
                { name: "沃顿科技", scale: 3.60368785e9, id: "000920.SZ" },
                { name: "盈峰环境", scale: 16174330217, id: "000967.SZ" },
                { name: "旺能环境", scale: 7150943076, id: "002034.SZ" },
                { name: "国统股份", scale: 1904893087, id: "002205.SZ" },
                { name: "浙富控股", scale: 12179193287, id: "002266.SZ" },
                { name: "富春环保", scale: 3.90171777e9, id: "002479.SZ" },
                { name: "清新环境", scale: 5.92461798e9, id: "002573.SZ" },
                { name: "雪迪龙", scale: 2677516842, id: "002658.SZ" },
                { name: "东江环保", scale: 4182753202, id: "002672.SZ" },
                { name: "绿茵生态", scale: 1433080052, id: "002887.SZ" },
                { name: "侨银股份", scale: 2159311122, id: "002973.SZ" },
                { name: "同兴环保", scale: 1437572485, id: "003027.SZ" },
                { name: "万邦达", scale: 4950601326, id: "300055.SZ" },
                { name: "中创环保", scale: 2524962402, id: "300056.SZ" },
                { name: "碧水源", scale: 14615923064, id: "300070.SZ" },
                { name: "先河环保", scale: 2.68727557e9, id: "300137.SZ" },
                { name: "中环装备", scale: 3412567198, id: "300140.SZ" },
                { name: "新动力", scale: 2030514064, id: "300152.SZ" },
                { name: "中电环保", scale: 2139135827, id: "300172.SZ" },
                { name: "永清环保", scale: 3695105054, id: "300187.SZ" },
                { name: "维尔利", scale: 3104657616, id: "300190.SZ" },
                { name: "聚光科技", scale: 11157436205, id: "300203.SZ" },
                { name: "巴安水务", scale: 1334426493, id: "300262.SZ" },
                { name: "隆华科技", scale: 6.27169485e9, id: "300263.SZ" },
                { name: "兴源环境", scale: 5.60912744e9, id: "300266.SZ" },
                { name: "天壕环境", scale: 10276746538, id: "300332.SZ" },
                { name: "津膜科技", scale: 2090045946, id: "300334.SZ" },
                { name: "迪森股份", scale: 1794475301, id: "300335.SZ" },
                { name: "博世科", scale: 2400277944, id: "300422.SZ" },
                { name: "中建环能", scale: 3291974213, id: "300425.SZ" },
                { name: "百川畅银", scale: 2427140853, id: "300614.SZ" },
                { name: "久吾高科", scale: 3985334239, id: "300631.SZ" },
                { name: "倍杰特", scale: 1413520725, id: "300774.SZ" },
                { name: "惠城环保", scale: 3255608035, id: "300779.SZ" },
                { name: "玉禾田", scale: 5.5938996e9, id: "300815.SZ" },
                { name: "中兰环保", scale: 7.0642355e8, id: "300854.SZ" },
                { name: "南大环境", scale: 8.15898e8, id: "300864.SZ" },
                { name: "圣元环保", scale: 2793473321, id: "300867.SZ" },
                { name: "上海凯鑫", scale: 674535282, id: "300899.SZ" },
                { name: "建工修复", scale: 1402381138, id: "300958.SZ" },
                { name: "超越科技", scale: 484657722, id: "301049.SZ" },
                { name: "大地海洋", scale: 1475231121, id: "301068.SZ" },
                { name: "天源环保", scale: 2398007569, id: "301127.SZ" },
                { name: "中再资环", scale: 6693340149, id: "600217.SH" },
                { name: "远达环保", scale: 4286684726, id: "600292.SH" },
                { name: "瀚蓝环境", scale: 15670972146, id: "600323.SH" },
                { name: "上海环境", scale: 1.055668889e10, id: "601200.SH" },
                { name: "绿色动力", scale: 7.348935e9, id: "601330.SH" },
                { name: "三峰环境", scale: 5.9180834e9, id: "601827.SH" },
                { name: "中材节能", scale: 4.83516e9, id: "603126.SH" },
                { name: "德创环保", scale: 2.6361e9, id: "603177.SH" },
                { name: "上海洗霸", scale: 3474037203, id: "603200.SH" },
                { name: "伟明环保", scale: 29818157952, id: "603568.SH" },
                { name: "高能环境", scale: 14173989851, id: "603588.SH" },
                { name: "*ST博天", scale: 3139364056, id: "603603.SH" },
                { name: "正和生态", scale: 738094408, id: "605069.SH" },
                { name: "德林海", scale: 1.61681412e9, id: "688069.SH" },
                { name: "京源环保", scale: 1349945525, id: "688096.SH" },
                { name: "三达膜", scale: 4.407216e9, id: "688101.SH" },
                { name: "复洁环保", scale: 1.65344277e9, id: "688335.SH" },
                { name: "金科环境", scale: 9.2039325e8, id: "688466.SH" },
                { name: "力源科技", scale: 7.2791664e8, id: "688565.SH" },
                { name: "通源环境", scale: 815360961, id: "688679.SH" },
                { name: "卓锦股份", scale: 530284647, id: "688701.SH" },
                { name: "新安洁", scale: 722183766, id: "831370.BJ" },
                { name: "中航泰达", scale: 493857128, id: "836263.BJ" },
              ],
              name: "环保工程及服务",
              scale: 319725686495,
              id: "410400",
            },
          ],
          name: "公用事业",
          scale: 2.75908525631e12,
          id: "410000",
        },
        {
          children: [
            {
              children: [
                { name: "盐 田 港", scale: 11943048877, id: "000088.SZ" },
                { name: "珠海港", scale: 5098208304, id: "000507.SZ" },
                { name: "北部湾港", scale: 1.193988901e10, id: "000582.SZ" },
                { name: "厦门港务", scale: 5630323456, id: "000905.SZ" },
                { name: "招商港口", scale: 33281158721, id: "001872.SZ" },
                { name: "南 京 港", scale: 3378088264, id: "002040.SZ" },
                { name: "日照港", scale: 8919396275, id: "600017.SH" },
                { name: "上港集团", scale: 131162998519, id: "600018.SH" },
                { name: "锦州港", scale: 5872298949, id: "600190.SH" },
                { name: "重庆港", scale: 3.80156871e9, id: "600279.SH" },
                { name: "天津港", scale: 13659684899, id: "600717.SH" },
                { name: "唐山港", scale: 20977787294, id: "601000.SH" },
                { name: "连云港", scale: 5731747588, id: "601008.SH" },
                { name: "宁波港", scale: 49925093196, id: "601018.SH" },
                { name: "广州港", scale: 20899257082, id: "601228.SH" },
                { name: "青岛港", scale: 3.61269025e10, id: "601298.SH" },
                { name: "秦港股份", scale: 1.432025259e10, id: "601326.SH" },
                { name: "辽港股份", scale: 30125359707, id: "601880.SH" },
              ],
              name: "港口",
              scale: 412793063941,
              id: "420100",
            },
            {
              children: [
                { name: "粤高速Ａ", scale: 9918296066, id: "000429.SZ" },
                { name: "湖南投资", scale: 2276300978, id: "000548.SZ" },
                { name: "山西路桥", scale: 3080721801, id: "000755.SZ" },
                { name: "东莞控股", scale: 9885793755, id: "000828.SZ" },
                { name: "城发环境", scale: 7371058367, id: "000885.SZ" },
                { name: "海南高速", scale: 5745707946, id: "000886.SZ" },
                { name: "现代投资", scale: 6313885069, id: "000900.SZ" },
                { name: "招商公路", scale: 55728506876, id: "001965.SZ" },
                { name: "皖通高速", scale: 1.0397152e10, id: "600012.SH" },
                { name: "中原高速", scale: 7371379609, id: "600020.SH" },
                { name: "福建高速", scale: 8.205756e9, id: "600033.SH" },
                { name: "楚天高速", scale: 5748113767, id: "600035.SH" },
                { name: "重庆路桥", scale: 6312869045, id: "600106.SH" },
                { name: "赣粤高速", scale: 8080508268, id: "600269.SH" },
                { name: "山东高速", scale: 32487139674, id: "600350.SH" },
                { name: "五洲交通", scale: 4626347799, id: "600368.SH" },
                { name: "宁沪高速", scale: 33649319559, id: "600377.SH" },
                { name: "深高速", scale: 12956763747, id: "600548.SH" },
                { name: "四川成渝", scale: 8.1967846e9, id: "601107.SH" },
                { name: "龙江交通", scale: 4052905999, id: "601188.SH" },
                { name: "吉林高速", scale: 4496815753, id: "601518.SH" },
              ],
              name: "高速公路",
              scale: 246902126678,
              id: "420200",
            },
            {
              children: [
                { name: "富临运业", scale: 1836979826, id: "002357.SZ" },
                { name: "三峡旅游", scale: 3743590597, id: "002627.SZ" },
                { name: "江西长运", scale: 1.2327328e9, id: "600561.SH" },
                { name: "大众交通", scale: 4674315928, id: "600611.SH" },
                { name: "锦江在线", scale: 3925128754, id: "600650.SH" },
                { name: "外服控股", scale: 6351774012, id: "600662.SH" },
                { name: "申通地铁", scale: 3904983983, id: "600834.SH" },
                { name: "德新科技", scale: 9.808988e9, id: "603032.SH" },
                { name: "海汽集团", scale: 6.98992e9, id: "603069.SH" },
              ],
              name: "公交",
              scale: 4.24684139e10,
              id: "420300",
            },
            {
              children: [
                { name: "中信海直", scale: 5418941488, id: "000099.SZ" },
                { name: "华夏航空", scale: 10804630286, id: "002928.SZ" },
                { name: "南方航空", scale: 78284392169, id: "600029.SH" },
                { name: "中国东航", scale: 58366230729, id: "600115.SH" },
                { name: "海航控股", scale: 55554823549, id: "600221.SH" },
                { name: "春秋航空", scale: 56005036391, id: "601021.SH" },
                { name: "中国国航", scale: 106096703894, id: "601111.SH" },
                { name: "吉祥航空", scale: 40162055562, id: "603885.SH" },
              ],
              name: "航空运输",
              scale: 410692814068,
              id: "420400",
            },
            {
              children: [
                { name: "深圳机场", scale: 1.511397151e10, id: "000089.SZ" },
                { name: "白云机场", scale: 36258124096, id: "600004.SH" },
                { name: "上海机场", scale: 103535477411, id: "600009.SH" },
                { name: "厦门空港", scale: 5.3933391e9, id: "600897.SH" },
              ],
              name: "机场",
              scale: 160300912117,
              id: "420500",
            },
            {
              children: [
                { name: "长航凤凰", scale: 3.26902956e9, id: "000520.SZ" },
                { name: "盛航股份", scale: 2532695829, id: "001205.SZ" },
                { name: "海峡股份", scale: 14577223043, id: "002320.SZ" },
                { name: "中远海能", scale: 47187463444, id: "600026.SH" },
                { name: "中远海特", scale: 15176820951, id: "600428.SH" },
                { name: "宁波海运", scale: 4403849834, id: "600798.SH" },
                { name: "中远海发", scale: 21320856905, id: "601866.SH" },
                { name: "招商轮船", scale: 56639962618, id: "601872.SH" },
                { name: "中远海控", scale: 144862626383, id: "601919.SH" },
                { name: "招商南油", scale: 17372966176, id: "601975.SH" },
                { name: "渤海轮渡", scale: 3424754872, id: "603167.SH" },
                { name: "中谷物流", scale: 7354952772, id: "603565.SH" },
              ],
              name: "航运",
              scale: 338123202387,
              id: "420600",
            },
            {
              children: [
                { name: "西部创业", scale: 7683218363, id: "000557.SZ" },
                { name: "中铁特货", scale: 4856666665, id: "001213.SZ" },
                { name: "铁龙物流", scale: 7859241681, id: "600125.SH" },
                { name: "大秦铁路", scale: 112394236243, id: "601006.SH" },
                { name: "广深铁路", scale: 1.384798065e10, id: "601333.SH" },
                { name: "京沪高铁", scale: 256335849669, id: "601816.SH" },
              ],
              name: "铁路运输",
              scale: 402977193271,
              id: "420700",
            },
            {
              children: [
                { name: "浙商中拓", scale: 6498468706, id: "000906.SZ" },
                { name: "炬申股份", scale: 5.4339922e8, id: "001202.SZ" },
                { name: "三羊马", scale: 1.0676328e9, id: "001317.SZ" },
                { name: "传化智联", scale: 15333252652, id: "002010.SZ" },
                { name: "韵达股份", scale: 32767839253, id: "002120.SZ" },
                { name: "怡 亚 通", scale: 13994119276, id: "002183.SZ" },
                { name: "飞马国际", scale: 5957163697, id: "002210.SZ" },
                { name: "蔚蓝锂芯", scale: 1.37491756e10, id: "002245.SZ" },
                { name: "顺丰控股", scale: 264622836397, id: "002352.SZ" },
                { name: "申通快递", scale: 15711240768, id: "002468.SZ" },
                { name: "恒基达鑫", scale: 2337033326, id: "002492.SZ" },
                { name: "龙洲股份", scale: 2265979352, id: "002682.SZ" },
                { name: "普路通", scale: 2905160705, id: "002769.SZ" },
                { name: "天顺股份", scale: 2.38990703e9, id: "002800.SZ" },
                { name: "东方嘉盛", scale: 2040022358, id: "002889.SZ" },
                { name: "宏川智慧", scale: 8624792737, id: "002930.SZ" },
                { name: "新宁物流", scale: 1699306158, id: "300013.SZ" },
                { name: "飞力达", scale: 2310605478, id: "300240.SZ" },
                { name: "华鹏飞", scale: 2051323009, id: "300350.SZ" },
                { name: "海晨股份", scale: 2.74001324e9, id: "300873.SZ" },
                { name: "厦门象屿", scale: 2.291131059e10, id: "600057.SH" },
                { name: "长江投资", scale: 1.850548e9, id: "600119.SH" },
                { name: "建发股份", scale: 35895899955, id: "600153.SH" },
                { name: "安通控股", scale: 11939705974, id: "600179.SH" },
                { name: "瑞茂通", scale: 6216743562, id: "600180.SH" },
                { name: "圆通速递", scale: 61778698754, id: "600233.SH" },
                { name: "淮河能源", scale: 9365889167, id: "600575.SH" },
                { name: "物产中大", scale: 28398841244, id: "600704.SH" },
                { name: "中储股份", scale: 12781768738, id: "600787.SH" },
                { name: "保税科技", scale: 4424355373, id: "600794.SH" },
                { name: "东航物流", scale: 11528669695, id: "601156.SH" },
                { name: "中国外运", scale: 23441389263, id: "601598.SH" },
                { name: "德邦股份", scale: 1.608e10, id: "603056.SH" },
                { name: "音飞储存", scale: 3193464798, id: "603066.SH" },
                { name: "ST万林", scale: 2260325872, id: "603117.SH" },
                { name: "华贸物流", scale: 12374425076, id: "603128.SH" },
                { name: "恒通股份", scale: 7.85530368e9, id: "603223.SH" },
                { name: "上海雅仕", scale: 2451195651, id: "603329.SH" },
                { name: "嘉诚国际", scale: 3.892728e9, id: "603535.SH" },
                { name: "长久物流", scale: 4706933473, id: "603569.SH" },
                { name: "畅联股份", scale: 3051515776, id: "603648.SH" },
                { name: "密尔克卫", scale: 16367992927, id: "603713.SH" },
                { name: "原尚股份", scale: 1.24649928e9, id: "603813.SH" },
                { name: "海程邦达", scale: 1350231325, id: "603836.SH" },
                { name: "嘉友国际", scale: 1.361132281e10, id: "603871.SH" },
                { name: "中创物流", scale: 3310667081, id: "603967.SH" },
                { name: "福然德", scale: 1.91496e9, id: "605050.SH" },
                { name: "西上海", scale: 1103661805, id: "605151.SH" },
              ],
              name: "物流",
              scale: 724914319631,
              id: "420800",
            },
          ],
          name: "交通运输",
          scale: 2739172045993,
          id: "420000",
        },
        {
          children: [
            {
              children: [
                { name: "万  科Ａ", scale: 1.4866500839e11, id: "000002.SZ" },
                { name: "深振业Ａ", scale: 6.46647627e9, id: "000006.SZ" },
                { name: "深物业A", scale: 5254225919, id: "000011.SZ" },
                { name: "沙河股份", scale: 2231666185, id: "000014.SZ" },
                { name: "深深房Ａ", scale: 9.897426e9, id: "000029.SZ" },
                { name: "大悦城", scale: 15210971242, id: "000031.SZ" },
                { name: "华联控股", scale: 6214636058, id: "000036.SZ" },
                { name: "中洲控股", scale: 5.31839781e9, id: "000042.SZ" },
                { name: "皇庭国际", scale: 3306392306, id: "000056.SZ" },
                { name: "华侨城Ａ", scale: 35140815198, id: "000069.SZ" },
                { name: "天健集团", scale: 10630660537, id: "000090.SZ" },
                { name: "金 融 街", scale: 15028780051, id: "000402.SZ" },
                { name: "渝 开 发", scale: 3349770731, id: "000514.SZ" },
                { name: "荣安地产", scale: 6815664672, id: "000517.SZ" },
                { name: "广宇发展", scale: 21437613487, id: "000537.SZ" },
                { name: "中天金融", scale: 5853760413, id: "000540.SZ" },
                { name: "莱茵体育", scale: 3595253974, id: "000558.SZ" },
                { name: "我爱我家", scale: 7.19939409e9, id: "000560.SZ" },
                { name: "粤宏远Ａ", scale: 2170949986, id: "000573.SZ" },
                { name: "阳光股份", scale: 1994769402, id: "000608.SZ" },
                { name: "中迪投资", scale: 1296875813, id: "000609.SZ" },
                { name: "奥园美谷", scale: 3419311533, id: "000615.SZ" },
                { name: "ST海投", scale: 1859304753, id: "000616.SZ" },
                { name: "新华联", scale: 3944978326, id: "000620.SZ" },
                { name: "顺发恒业", scale: 8270565171, id: "000631.SZ" },
                { name: "金科股份", scale: 7436965189, id: "000656.SZ" },
                { name: "美好置业", scale: 2683242409, id: "000667.SZ" },
                { name: "荣丰控股", scale: 1569565805, id: "000668.SZ" },
                { name: "阳 光 城", scale: 5880075638, id: "000671.SZ" },
                { name: "大连友谊", scale: 1.65726e9, id: "000679.SZ" },
                { name: "亚太实业", scale: 1.3480359e9, id: "000691.SZ" },
                { name: "苏宁环球", scale: 6594492159, id: "000718.SZ" },
                { name: "ST泰禾", scale: 2411114519, id: "000732.SZ" },
                { name: "中交地产", scale: 9777797667, id: "000736.SZ" },
                { name: "中国武夷", scale: 4820405046, id: "000797.SZ" },
                { name: "ST新城", scale: 2796042483, id: "000809.SZ" },
                { name: "财信发展", scale: 5096838738, id: "000838.SZ" },
                { name: "三湘印象", scale: 4554283461, id: "000863.SZ" },
                { name: "津滨发展", scale: 3493248409, id: "000897.SZ" },
                { name: "数源科技", scale: 3107139389, id: "000909.SZ" },
                { name: "嘉凯城", scale: 2543910015, id: "000918.SZ" },
                { name: "福星股份", scale: 3786899287, id: "000926.SZ" },
                { name: "中南建设", scale: 6.66928993e9, id: "000961.SZ" },
                { name: "天保基建", scale: 4672388068, id: "000965.SZ" },
                { name: "山子股份", scale: 10043900199, id: "000981.SZ" },
                { name: "招商积余", scale: 1.565973387e10, id: "001914.SZ" },
                { name: "招商蛇口", scale: 1.1266473716e11, id: "001979.SZ" },
                { name: "世荣兆业", scale: 4313390569, id: "002016.SZ" },
                { name: "广宇集团", scale: 2394296325, id: "002133.SZ" },
                { name: "荣盛发展", scale: 6468225443, id: "002146.SZ" },
                { name: "合肥城建", scale: 4143841211, id: "002208.SZ" },
                { name: "滨江集团", scale: 25267772231, id: "002244.SZ" },
                { name: "世联行", scale: 5440464676, id: "002285.SZ" },
                { name: "南国置业", scale: 3829172039, id: "002305.SZ" },
                { name: "南山控股", scale: 4308840711, id: "002314.SZ" },
                { name: "国创高新", scale: 2436550041, id: "002377.SZ" },
                { name: "新大正", scale: 3939198956, id: "002968.SZ" },
                { name: "特发服务", scale: 1.9297265e9, id: "300917.SZ" },
                { name: "中国国贸", scale: 19098076845, id: "600007.SH" },
                { name: "保利发展", scale: 172015271917, id: "600048.SH" },
                { name: "冠城大通", scale: 4.16108953e9, id: "600067.SH" },
                { name: "宋都股份", scale: 3135886243, id: "600077.SH" },
                { name: "大名城", scale: 6943645134, id: "600094.SH" },
                { name: "大龙地产", scale: 2066708048, id: "600159.SH" },
                { name: "香江控股", scale: 6079294907, id: "600162.SH" },
                { name: "卧龙地产", scale: 3565118682, id: "600173.SH" },
                { name: "雅戈尔", scale: 30956096697, id: "600177.SH" },
                { name: "格力地产", scale: 14721895259, id: "600185.SH" },
                { name: "新湖中宝", scale: 24504789975, id: "600208.SH" },
                { name: "鲁商发展", scale: 10592646636, id: "600223.SH" },
                { name: "卓朗科技", scale: 14282978489, id: "600225.SH" },
                { name: "ST云城", scale: 3195316949, id: "600239.SH" },
                { name: "万通发展", scale: 10824629022, id: "600246.SH" },
                { name: "城建发展", scale: 10515465216, id: "600266.SH" },
                { name: "天房发展", scale: 2.078716e9, id: "600322.SH" },
                { name: "华发股份", scale: 24326077813, id: "600325.SH" },
                { name: "华夏幸福", scale: 8.76004889e9, id: "600340.SH" },
                { name: "首开股份", scale: 11711226199, id: "600376.SH" },
                { name: "金地集团", scale: 37877356169, id: "600383.SH" },
                { name: "粤泰股份", scale: 1338120384, id: "600393.SH" },
                { name: "蓝光发展", scale: 2215499218, id: "600466.SH" },
                { name: "华丽家族", scale: 4.2460685e9, id: "600503.SH" },
                { name: "黑牡丹", scale: 6532570216, id: "600510.SH" },
                { name: "海南机场", scale: 41842617036, id: "600515.SH" },
                { name: "栖霞建设", scale: 3.57e9, id: "600533.SH" },
                { name: "迪马股份", scale: 4.5594565e9, id: "600565.SH" },
                { name: "ST中珠", scale: 2.66041209e9, id: "600568.SH" },
                { name: "绿地控股", scale: 40616690927, id: "600606.SH" },
                { name: "光大嘉宝", scale: 4499056206, id: "600622.SH" },
                { name: "新黄浦", scale: 3.55553503e9, id: "600638.SH" },
                { name: "万业企业", scale: 20864722806, id: "600641.SH" },
                { name: "同达创业", scale: 1831129118, id: "600647.SH" },
                { name: "城投控股", scale: 9789457704, id: "600649.SH" },
                { name: "信达地产", scale: 13175679109, id: "600657.SH" },
                { name: "天地源", scale: 3655238264, id: "600665.SH" },
                { name: "中华企业", scale: 1.621571977e10, id: "600675.SH" },
                { name: "京投发展", scale: 3311275859, id: "600683.SH" },
                { name: "珠江股份", scale: 2918835673, id: "600684.SH" },
                { name: "亚通股份", scale: 1461210262, id: "600692.SH" },
                { name: "光明地产", scale: 4917863874, id: "600708.SH" },
                { name: "凤凰股份", scale: 3425981759, id: "600716.SH" },
                { name: "宁波富达", scale: 5534130403, id: "600724.SH" },
                { name: "苏州高新", scale: 5549231812, id: "600736.SH" },
                { name: "华远地产", scale: 3777222407, id: "600743.SH" },
                { name: "上实发展", scale: 6.49286138e9, id: "600748.SH" },
                { name: "西藏城投", scale: 11598199528, id: "600773.SH" },
                { name: "京能置业", scale: 1831870469, id: "600791.SH" },
                { name: "济南高新", scale: 2463367792, id: "600807.SH" },
                { name: "世茂股份", scale: 7689894935, id: "600823.SH" },
                { name: "新城控股", scale: 34691479525, id: "601155.SH" },
                { name: "北辰实业", scale: 5.187e9, id: "601588.SH" },
                { name: "南都物业", scale: 2225166681, id: "603506.SH" },
              ],
              name: "房地产开发",
              scale: 1323968412217,
              id: "430100",
            },
            {
              children: [
                { name: "南京高科", scale: 11731702786, id: "600064.SH" },
                { name: "海泰发展", scale: 1890319528, id: "600082.SH" },
                { name: "派斯林", scale: 2818099253, id: "600215.SH" },
                { name: "空港股份", scale: 2.541e9, id: "600463.SH" },
                { name: "市北高新", scale: 7304690433, id: "600604.SH" },
                { name: "浦东金桥", scale: 10032793095, id: "600639.SH" },
                { name: "外高桥", scale: 11301630734, id: "600648.SH" },
                { name: "电子城", scale: 5827828084, id: "600658.SH" },
                { name: "陆家嘴", scale: 29657295158, id: "600663.SH" },
                { name: "上海临港", scale: 29660573062, id: "600848.SH" },
                { name: "张江高科", scale: 24391860413, id: "600895.SH" },
                { name: "中新集团", scale: 1.53936003e10, id: "601512.SH" },
              ],
              name: "园区开发",
              scale: 152551392846,
              id: "430200",
            },
          ],
          name: "房地产",
          scale: 1476519805063,
          id: "430000",
        },
        {
          children: [
            {
              children: [
                { name: "深粮控股", scale: 3225432448, id: "000019.SZ" },
                { name: "中成股份", scale: 3646321469, id: "000151.SZ" },
                { name: "远大控股", scale: 4101363947, id: "000626.SZ" },
                { name: "江苏国泰", scale: 12805160553, id: "002091.SZ" },
                { name: "鹏都农牧", scale: 16700564051, id: "002505.SZ" },
                { name: "五矿发展", scale: 1.038681479e10, id: "600058.SH" },
                { name: "南纺股份", scale: 1485958269, id: "600250.SH" },
                { name: "东方创业", scale: 4677719251, id: "600278.SH" },
                { name: "江苏舜天", scale: 2109725037, id: "600287.SH" },
                { name: "南化股份", scale: 3001324539, id: "600301.SH" },
                { name: "汇通能源", scale: 3042665828, id: "600605.SH" },
                { name: "ST沪科", scale: 1474059772, id: "600608.SH" },
                { name: "苏美达", scale: 8964301117, id: "600710.SH" },
                { name: "庚星股份", scale: 2.225664e9, id: "600753.SH" },
                { name: "厦门国贸", scale: 19062248122, id: "600755.SH" },
                { name: "上海物贸", scale: 3070146287, id: "600822.SH" },
                { name: "兰生股份", scale: 3995307027, id: "600826.SH" },
                { name: "汇鸿集团", scale: 5.71820464e9, id: "600981.SH" },
              ],
              name: "贸易",
              scale: 109692981147,
              id: "450200",
            },
            {
              children: [
                { name: "合肥百货", scale: 3567945726, id: "000417.SZ" },
                { name: "通程控股", scale: 2912087169, id: "000419.SZ" },
                { name: "武商集团", scale: 8479527488, id: "000501.SZ" },
                { name: "ST大集", scale: 22923837493, id: "000564.SZ" },
                { name: "中兴商业", scale: 3619318788, id: "000715.SZ" },
                { name: "中百集团", scale: 2.88510651e9, id: "000759.SZ" },
                { name: "居然之家", scale: 11361440202, id: "000785.SZ" },
                { name: "广百股份", scale: 3459472363, id: "002187.SZ" },
                { name: "步 步 高", scale: 4379993032, id: "002251.SZ" },
                { name: "新 华 都", scale: 3796184815, id: "002264.SZ" },
                { name: "友阿股份", scale: 4642595424, id: "002277.SZ" },
                { name: "人人乐", scale: 5.01920375e9, id: "002336.SZ" },
                { name: "天虹股份", scale: 6625579128, id: "002419.SZ" },
                { name: "徐家汇", scale: 4027887885, id: "002561.SZ" },
                { name: "跨境通", scale: 6130554131, id: "002640.SZ" },
                { name: "红旗连锁", scale: 6.6603714e9, id: "002697.SZ" },
                { name: "孩子王", scale: 6572697182, id: "301078.SZ" },
                { name: "迪阿股份", scale: 1.7812452e9, id: "301177.SZ" },
                { name: "中央商场", scale: 5991457724, id: "600280.SH" },
                { name: "*ST商城", scale: 1487219935, id: "600306.SH" },
                { name: "创新新材", scale: 2667958912, id: "600361.SH" },
                { name: "新世界", scale: 4605752734, id: "600628.SH" },
                { name: "东百集团", scale: 3405949593, id: "600693.SH" },
                { name: "大商股份", scale: 5480790065, id: "600694.SH" },
                { name: "欧亚集团", scale: 1882042462, id: "600697.SH" },
                { name: "南宁百货", scale: 2014544908, id: "600712.SH" },
                { name: "重庆百货", scale: 11169941727, id: "600729.SH" },
                { name: "汉商集团", scale: 3744495064, id: "600774.SH" },
                { name: "友好集团", scale: 1988663096, id: "600778.SH" },
                { name: "新华百货", scale: 3849269637, id: "600785.SH" },
                { name: "杭州解百", scale: 5591509248, id: "600814.SH" },
                { name: "金开新能", scale: 8400576454, id: "600821.SH" },
                { name: "百联股份", scale: 21339183936, id: "600827.SH" },
                { name: "茂业商业", scale: 6631109493, id: "600828.SH" },
                { name: "上海九百", scale: 2505512381, id: "600838.SH" },
                { name: "宁波中百", scale: 2205064804, id: "600857.SH" },
                { name: "银座股份", scale: 2717127152, id: "600858.SH" },
                { name: "王府井", scale: 24854562326, id: "600859.SH" },
                { name: "北京城乡", scale: 7495605093, id: "600861.SH" },
                { name: "百大集团", scale: 3472698117, id: "600865.SH" },
                { name: "文峰股份", scale: 4.28736e9, id: "601010.SH" },
                { name: "国芳集团", scale: 2.5641e9, id: "601086.SH" },
                { name: "华鼎股份", scale: 4.00807258e9, id: "601113.SH" },
                { name: "三江购物", scale: 6.5721408e9, id: "601116.SH" },
                { name: "利群股份", scale: 4420461306, id: "601366.SH" },
                { name: "永辉超市", scale: 29403119857, id: "601933.SH" },
                { name: "安孚科技", scale: 5.1408e9, id: "603031.SH" },
                { name: "汇嘉时代", scale: 2.56368e9, id: "603101.SH" },
                { name: "翠微股份", scale: 6281417389, id: "603123.SH" },
                { name: "家家悦", scale: 7227821759, id: "603708.SH" },
                { name: "国光连锁", scale: 425678986, id: "605188.SH" },
                { name: "菜百股份", scale: 6641192696, id: "605599.SH" },
              ],
              name: "一般零售",
              scale: 3.2188192792e11,
              id: "450300",
            },
            {
              children: [
                { name: "天音控股", scale: 11337115436, id: "000829.SZ" },
                { name: "ST易购", scale: 15057398129, id: "002024.SZ" },
                { name: "南极电商", scale: 9135701254, id: "002127.SZ" },
                { name: "爱施德", scale: 10659094003, id: "002416.SZ" },
                { name: "吉峰科技", scale: 1559533862, id: "300022.SZ" },
                { name: "博士眼镜", scale: 2362214814, id: "300622.SZ" },
                { name: "华致酒行", scale: 11315751683, id: "300755.SZ" },
                { name: "*ST宏图", scale: 1331997103, id: "600122.SH" },
                { name: "豫园股份", scale: 30633694754, id: "600655.SH" },
                { name: "国美通讯", scale: 1295447197, id: "600898.SH" },
                { name: "爱婴室", scale: 2444994686, id: "603214.SH" },
                { name: "莱绅通灵", scale: 2124556762, id: "603900.SH" },
              ],
              name: "专业零售",
              scale: 99257499683,
              id: "450400",
            },
            {
              children: [
                { name: "全新好", scale: 2091578258, id: "000007.SZ" },
                { name: "深 赛 格", scale: 6006571052, id: "000058.SZ" },
                { name: "农 产 品", scale: 10266467374, id: "000061.SZ" },
                { name: "海印股份", scale: 4831122684, id: "000861.SZ" },
                { name: "华联股份", scale: 4543997707, id: "000882.SZ" },
                { name: "海宁皮城", scale: 6138217791, id: "002344.SZ" },
                { name: "富森美", scale: 4102428083, id: "002818.SZ" },
                { name: "德必集团", scale: 1475147358, id: "300947.SZ" },
                { name: "浙江东日", scale: 2962304352, id: "600113.SH" },
                { name: "小商品城", scale: 40377269542, id: "600415.SH" },
                { name: "丽尚国潮", scale: 5933196329, id: "600738.SH" },
                { name: "轻纺城", scale: 6757296178, id: "600790.SH" },
                { name: "美凯龙", scale: 18392445429, id: "601828.SH" },
                { name: "锦和商管", scale: 2.490075e9, id: "603682.SH" },
                { name: "恒合股份", scale: 137740905, id: "832145.BJ" },
                { name: "华维设计", scale: 193618271, id: "833427.BJ" },
                { name: "中设咨询", scale: 320233779, id: "833873.BJ" },
                { name: "广咨国际", scale: 315238567, id: "836892.BJ" },
              ],
              name: "商业物业经营",
              scale: 117334948659,
              id: "450500",
            },
          ],
          name: "商业贸易",
          scale: 648167357409,
          id: "450000",
        },
        {
          children: [
            {
              children: [
                { name: "张家界", scale: 2697036444, id: "000430.SZ" },
                { name: "峨眉山Ａ", scale: 4594682249, id: "000888.SZ" },
                { name: "桂林旅游", scale: 2916420593, id: "000978.SZ" },
                { name: "宋城演艺", scale: 34429687333, id: "300144.SZ" },
                { name: "西域旅游", scale: 3789257875, id: "300859.SZ" },
                { name: "黄山旅游", scale: 6.873087e9, id: "600054.SH" },
                { name: "大连圣亚", scale: 1.871464e9, id: "600593.SH" },
                { name: "西藏旅游", scale: 3329584134, id: "600749.SH" },
                { name: "长白山", scale: 2.7280341e9, id: "603099.SH" },
                { name: "天目湖", scale: 5.40439715e9, id: "603136.SH" },
                { name: "九华旅游", scale: 2.977292e9, id: "603199.SH" },
              ],
              name: "景点",
              scale: 71610942878,
              id: "460100",
            },
            {
              children: [
                { name: "华天酒店", scale: 5267622525, id: "000428.SZ" },
                { name: "西安旅游", scale: 5200723121, id: "000610.SZ" },
                { name: "君亭酒店", scale: 2544507765, id: "301073.SZ" },
                { name: "首旅酒店", scale: 2.351739227e10, id: "600258.SH" },
                { name: "锦江酒店", scale: 49139008827, id: "600754.SH" },
                { name: "金陵饭店", scale: 3.8571e9, id: "601007.SH" },
              ],
              name: "酒店",
              scale: 89526354508,
              id: "460200",
            },
            {
              children: [
                { name: "岭南控股", scale: 7471410074, id: "000524.SZ" },
                { name: "ST凯撒", scale: 3675573353, id: "000796.SZ" },
                { name: "丽江股份", scale: 6203631243, id: "002033.SZ" },
                { name: "云南旅游", scale: 6.84299262e9, id: "002059.SZ" },
                { name: "三特索道", scale: 2.02902608e9, id: "002159.SZ" },
                { name: "众信旅游", scale: 7011188625, id: "002707.SZ" },
                { name: "中青旅", scale: 1.03436736e10, id: "600138.SH" },
                { name: "国旅联合", scale: 3034669327, id: "600358.SH" },
                { name: "曲江文旅", scale: 4851976534, id: "600706.SH" },
                { name: "中国中免", scale: 3.2639533669e11, id: "601888.SH" },
              ],
              name: "旅游综合",
              scale: 377859478146,
              id: "460300",
            },
            {
              children: [
                { name: "西安饮食", scale: 6.83999933e9, id: "000721.SZ" },
                { name: "全 聚 德", scale: 4534550538, id: "002186.SZ" },
                { name: "中科云网", scale: 3220628943, id: "002306.SZ" },
                { name: "同庆楼", scale: 2980402098, id: "605108.SH" },
              ],
              name: "餐饮",
              scale: 17575580909,
              id: "460400",
            },
            {
              children: [
                { name: "科锐国际", scale: 7943496765, id: "300662.SZ" },
                { name: "米奥会展", scale: 3891156507, id: "300795.SZ" },
                { name: "锋尚文化", scale: 2203983995, id: "300860.SZ" },
                { name: "零点有数", scale: 1305710403, id: "301169.SZ" },
                { name: "福成股份", scale: 5526231446, id: "600965.SH" },
              ],
              name: "其他休闲服务",
              scale: 20870579116,
              id: "460500",
            },
          ],
          name: "休闲服务",
          scale: 577442935557,
          id: "460000",
        },
        {
          children: [
            {
              children: [
                { name: "平安银行", scale: 242569336875, id: "000001.SZ" },
                { name: "宁波银行", scale: 176524329047, id: "002142.SZ" },
                { name: "江阴银行", scale: 8.82975804e9, id: "002807.SZ" },
                { name: "张家港行", scale: 9382952932, id: "002839.SZ" },
                { name: "郑州银行", scale: 13812178186, id: "002936.SZ" },
                { name: "青岛银行", scale: 9889033747, id: "002948.SZ" },
                { name: "青农商行", scale: 13884169316, id: "002958.SZ" },
                { name: "苏州银行", scale: 25679984358, id: "002966.SZ" },
                { name: "浦发银行", scale: 222783006421, id: "600000.SH" },
                { name: "华夏银行", scale: 73986901988, id: "600015.SH" },
                { name: "民生银行", scale: 126245158638, id: "600016.SH" },
                { name: "招商银行", scale: 711698582801, id: "600036.SH" },
                { name: "无锡银行", scale: 9891168984, id: "600908.SH" },
                { name: "江苏银行", scale: 108544895459, id: "600919.SH" },
                { name: "杭州银行", scale: 60143225392, id: "600926.SH" },
                { name: "西安银行", scale: 11854657977, id: "600928.SH" },
                { name: "南京银行", scale: 81486847079, id: "601009.SH" },
                { name: "渝农商行", scale: 22088533924, id: "601077.SH" },
                { name: "常熟银行", scale: 20512447945, id: "601128.SH" },
                { name: "兴业银行", scale: 355447651154, id: "601166.SH" },
                { name: "北京银行", scale: 99160596236, id: "601169.SH" },
                { name: "厦门银行", scale: 6539786134, id: "601187.SH" },
                { name: "上海银行", scale: 8.640910844e10, id: "601229.SH" },
                { name: "农业银行", scale: 996617512319, id: "601288.SH" },
                { name: "交通银行", scale: 215487243442, id: "601328.SH" },
                { name: "工商银行", scale: 1267177398933, id: "601398.SH" },
                { name: "瑞丰银行", scale: 4551557378, id: "601528.SH" },
                { name: "长沙银行", scale: 16664908205, id: "601577.SH" },
                { name: "邮储银行", scale: 60092879358, id: "601658.SH" },
                { name: "齐鲁银行", scale: 9510568378, id: "601665.SH" },
                { name: "光大银行", scale: 146645537173, id: "601818.SH" },
                { name: "沪农商行", scale: 26944880884, id: "601825.SH" },
                { name: "成都银行", scale: 51739384782, id: "601838.SH" },
                { name: "紫金银行", scale: 9.19041897e9, id: "601860.SH" },
                { name: "浙商银行", scale: 49642649431, id: "601916.SH" },
                { name: "建设银行", scale: 60056296614, id: "601939.SH" },
                { name: "重庆银行", scale: 5316874205, id: "601963.SH" },
                { name: "中国银行", scale: 754540543149, id: "601988.SH" },
                { name: "贵阳银行", scale: 19808096459, id: "601997.SH" },
                { name: "中信银行", scale: 202613450046, id: "601998.SH" },
                { name: "苏农银行", scale: 7301844357, id: "603323.SH" },
              ],
              name: "银行",
              scale: 6401266355156,
              id: "480100",
            },
          ],
          name: "银行",
          scale: 6401266355156,
          id: "480000",
        },
        {
          children: [
            {
              children: [
                { name: "申万宏源", scale: 9.915623219e10, id: "000166.SZ" },
                { name: "东北证券", scale: 17412969688, id: "000686.SZ" },
                { name: "锦龙股份", scale: 11933559531, id: "000712.SZ" },
                { name: "国元证券", scale: 29586344436, id: "000728.SZ" },
                { name: "国海证券", scale: 18239160472, id: "000750.SZ" },
                { name: "广发证券", scale: 90861123972, id: "000776.SZ" },
                { name: "长江证券", scale: 30359467279, id: "000783.SZ" },
                { name: "越秀资本", scale: 33205663409, id: "000987.SZ" },
                { name: "山西证券", scale: 19995027517, id: "002500.SZ" },
                { name: "国盛金控", scale: 12824470009, id: "002670.SZ" },
                { name: "西部证券", scale: 26175569653, id: "002673.SZ" },
                { name: "国信证券", scale: 82357016949, id: "002736.SZ" },
                { name: "第一创业", scale: 2.3678652e10, id: "002797.SZ" },
                { name: "华西证券", scale: 2.07375e10, id: "002926.SZ" },
                { name: "长城证券", scale: 30586453333, id: "002939.SZ" },
                { name: "华林证券", scale: 3.7017e10, id: "002945.SZ" },
                { name: "东方财富", scale: 226608082157, id: "300059.SZ" },
                { name: "中信证券", scale: 236540680409, id: "600030.SH" },
                { name: "国投资本", scale: 44463119326, id: "600061.SH" },
                { name: "湘财股份", scale: 9229137242, id: "600095.SH" },
                { name: "国金证券", scale: 2.803514462e10, id: "600109.SH" },
                { name: "华创阳安", scale: 11324513778, id: "600155.SH" },
                { name: "西南证券", scale: 2.094335485e10, id: "600369.SH" },
                { name: "华鑫股份", scale: 11913899049, id: "600621.SH" },
                { name: "海通证券", scale: 80747768738, id: "600837.SH" },
                { name: "哈投股份", scale: 10132378432, id: "600864.SH" },
                { name: "财达证券", scale: 9659664384, id: "600906.SH" },
                { name: "华安证券", scale: 22172968449, id: "600909.SH" },
                { name: "中泰证券", scale: 19202751711, id: "600918.SH" },
                { name: "东方证券", scale: 79998161473, id: "600958.SH" },
                { name: "招商证券", scale: 1.0205257249e11, id: "600999.SH" },
                { name: "中信建投", scale: 94254982705, id: "601066.SH" },
                { name: "太平洋", scale: 17586096235, id: "601099.SH" },
                { name: "财通证券", scale: 34270741976, id: "601108.SH" },
                { name: "天风证券", scale: 2.521735422e10, id: "601162.SH" },
                { name: "东兴证券", scale: 25730266339, id: "601198.SH" },
                { name: "国泰君安", scale: 109403075235, id: "601211.SH" },
                { name: "红塔证券", scale: 38866330994, id: "601236.SH" },
                { name: "中原证券", scale: 1.310057486e10, id: "601375.SH" },
                { name: "兴业证券", scale: 56133917411, id: "601377.SH" },
                { name: "国联证券", scale: 10018309801, id: "601456.SH" },
                { name: "东吴证券", scale: 35903794008, id: "601555.SH" },
                { name: "华泰证券", scale: 101857780338, id: "601688.SH" },
                { name: "中银证券", scale: 2.914122e10, id: "601696.SH" },
                { name: "光大证券", scale: 58209812701, id: "601788.SH" },
                { name: "浙商证券", scale: 39014550033, id: "601878.SH" },
                { name: "中国银河", scale: 64011771383, id: "601881.SH" },
                { name: "方正证券", scale: 5.647221557e10, id: "601901.SH" },
                { name: "南京证券", scale: 30081623012, id: "601990.SH" },
                { name: "中金公司", scale: 37519514901, id: "601995.SH" },
              ],
              name: "证券",
              scale: 2373944339268,
              id: "490100",
            },
            {
              children: [
                { name: "天茂集团", scale: 14476963245, id: "000627.SZ" },
                { name: "中国平安", scale: 506318738637, id: "601318.SH" },
                { name: "中国人保", scale: 203402145221, id: "601319.SH" },
                { name: "新华保险", scale: 67463962649, id: "601336.SH" },
                { name: "中国太保", scale: 202476326239, id: "601601.SH" },
                { name: "中国人寿", scale: 7.486059035e11, id: "601628.SH" },
              ],
              name: "保险",
              scale: 1742744039491,
              id: "490200",
            },
            {
              children: [
                { name: "泛海控股", scale: 4622514446, id: "000046.SZ" },
                { name: "渤海租赁", scale: 11486534358, id: "000415.SZ" },
                { name: "民生控股", scale: 1382266855, id: "000416.SZ" },
                { name: "陕国投Ａ", scale: 12169519437, id: "000563.SZ" },
                { name: "海德股份", scale: 16939292637, id: "000567.SZ" },
                { name: "中油资本", scale: 92666439649, id: "000617.SZ" },
                { name: "经纬纺机", scale: 2600385732, id: "000666.SZ" },
                { name: "法尔胜", scale: 1.83323234e9, id: "000890.SZ" },
                { name: "电投产融", scale: 22609962879, id: "000958.SZ" },
                { name: "中粮资本", scale: 16843011753, id: "002423.SZ" },
                { name: "仁东控股", scale: 3303626235, id: "002647.SZ" },
                { name: "瑞达期货", scale: 6.45292472e9, id: "002961.SZ" },
                { name: "派生科技", scale: 2480252063, id: "300176.SZ" },
                { name: "*ST吉艾", scale: 710511705, id: "300309.SZ" },
                { name: "九鼎投资", scale: 6208304256, id: "600053.SH" },
                { name: "浙江东方", scale: 13217526374, id: "600120.SH" },
                { name: "新力金融", scale: 3276329568, id: "600318.SH" },
                { name: "五矿资本", scale: 23839746933, id: "600390.SH" },
                { name: "ST熊猫", scale: 2.20116e9, id: "600599.SH" },
                { name: "爱建集团", scale: 8484101764, id: "600643.SH" },
                { name: "岩石股份", scale: 8649379486, id: "600696.SH" },
                { name: "中航产融", scale: 33456814365, id: "600705.SH" },
                { name: "鲁信创投", scale: 9081183387, id: "600783.SH" },
                { name: "ST安信", scale: 19109374588, id: "600816.SH" },
                { name: "香溢融通", scale: 2539664156, id: "600830.SH" },
                { name: "江苏金租", scale: 18070664349, id: "600901.SH" },
                { name: "永安期货", scale: 8730422966, id: "600927.SH" },
                { name: "南华期货", scale: 7198777537, id: "603093.SH" },
                { name: "华铁应急", scale: 10856038401, id: "603300.SH" },
              ],
              name: "多元金融",
              scale: 371019962939,
              id: "490300",
            },
          ],
          name: "非银金融",
          scale: 4487708341698,
          id: "490000",
        },
        {
          children: [
            {
              children: [
                { name: "中国宝安", scale: 27861619138, id: "000009.SZ" },
                { name: "云鼎科技", scale: 3573301838, id: "000409.SZ" },
                { name: "三木集团", scale: 1880343688, id: "000632.SZ" },
                { name: "万方发展", scale: 1842791119, id: "000638.SZ" },
                { name: "泰达股份", scale: 6060006388, id: "000652.SZ" },
                { name: "ST国安", scale: 9.01560061e9, id: "000839.SZ" },
                { name: "广电计量", scale: 10961452296, id: "002967.SZ" },
                { name: "开普检测", scale: 871260265, id: "003008.SZ" },
                { name: "华测检测", scale: 28400775556, id: "300012.SZ" },
                { name: "创业黑马", scale: 3314200253, id: "300688.SZ" },
                { name: "钢研纳克", scale: 3.941416e9, id: "300797.SZ" },
                { name: "谱尼测试", scale: 3815444591, id: "300887.SZ" },
                { name: "信测标准", scale: 2215279899, id: "300938.SZ" },
                { name: "易瑞生物", scale: 1508871647, id: "300942.SZ" },
                { name: "中金辐照", scale: 1883652521, id: "300962.SZ" },
                { name: "深圳瑞捷", scale: 603066469, id: "300977.SZ" },
                { name: "宁波联合", scale: 2.2134656e9, id: "600051.SH" },
                { name: "浙江富润", scale: 2670418258, id: "600070.SH" },
                { name: "博信股份", scale: 1573153949, id: "600083.SH" },
                { name: "弘业股份", scale: 1932189525, id: "600128.SH" },
                { name: "*ST西源", scale: 489798976, id: "600139.SH" },
                { name: "廊坊发展", scale: 2.0072448e9, id: "600149.SH" },
                { name: "绿能慧充", scale: 4630859778, id: "600212.SH" },
                { name: "科新发展", scale: 1170137186, id: "600234.SH" },
                { name: "华阳新材", scale: 2155344485, id: "600281.SH" },
                { name: "ST广珠", scale: 3605427535, id: "600382.SH" },
                { name: "广汇物流", scale: 9825247232, id: "600603.SH" },
                { name: "天宸股份", scale: 8.14399056e9, id: "600620.SH" },
                { name: "复旦复华", scale: 4169896141, id: "600624.SH" },
                { name: "中国高科", scale: 3343939211, id: "600730.SH" },
                { name: "综艺股份", scale: 7.761e9, id: "600770.SH" },
                { name: "鲁银投资", scale: 3806791568, id: "600784.SH" },
                { name: "悦达投资", scale: 3.60516756e9, id: "600805.SH" },
                { name: "东方集团", scale: 8378525901, id: "600811.SH" },
                { name: "宇通重工", scale: 2177602524, id: "600817.SH" },
                { name: "中路股份", scale: 5661018679, id: "600818.SH" },
                { name: "国检集团", scale: 8710445863, id: "603060.SH" },
                { name: "建研院", scale: 2364273927, id: "603183.SH" },
                { name: "行动教育", scale: 1639554995, id: "605098.SH" },
              ],
              name: "综合",
              scale: 199784576531,
              id: "510100",
            },
          ],
          name: "综合",
          scale: 199784576531,
          id: "510000",
        },
        {
          children: [
            {
              children: [
                { name: "冀东水泥", scale: 13569815773, id: "000401.SZ" },
                { name: "金圆股份", scale: 6075956968, id: "000546.SZ" },
                { name: "上峰水泥", scale: 10740901586, id: "000672.SZ" },
                { name: "万年青", scale: 6969133346, id: "000789.SZ" },
                { name: "天山股份", scale: 14501361165, id: "000877.SZ" },
                { name: "四川双马", scale: 1.476493604e10, id: "000935.SZ" },
                { name: "塔牌集团", scale: 9328769984, id: "002233.SZ" },
                { name: "西藏天路", scale: 6907564387, id: "600326.SH" },
                { name: "青松建化", scale: 6.09425218e9, id: "600425.SH" },
                { name: "宁夏建材", scale: 7502660549, id: "600449.SH" },
                { name: "海螺水泥", scale: 110231803077, id: "600585.SH" },
                { name: "尖峰集团", scale: 4211586055, id: "600668.SH" },
                { name: "祁连山", scale: 8498981423, id: "600720.SH" },
                { name: "华新水泥", scale: 21013806163, id: "600801.SH" },
                { name: "福建水泥", scale: 2456211424, id: "600802.SH" },
                { name: "亚泰集团", scale: 7115120758, id: "600881.SH" },
                { name: "博闻科技", scale: 1.66914216e9, id: "600883.SH" },
                { name: "金隅集团", scale: 19668613503, id: "601992.SH" },
                { name: "旭杰科技", scale: 169477291, id: "836149.BJ" },
              ],
              name: "水泥制造",
              scale: 271490093832,
              id: "610100",
            },
            {
              children: [
                { name: "南  玻Ａ", scale: 13129958579, id: "000012.SZ" },
                { name: "亚玛顿", scale: 5408861684, id: "002623.SZ" },
                { name: "金刚光伏", scale: 6836718769, id: "300093.SZ" },
                { name: "力诺特玻", scale: 2891603786, id: "301188.SZ" },
                { name: "金晶科技", scale: 1.18302156e10, id: "600586.SH" },
                { name: "耀皮玻璃", scale: 3998675958, id: "600819.SH" },
                { name: "凯盛新能", scale: 6975801159, id: "600876.SH" },
                { name: "旗滨集团", scale: 30565070741, id: "601636.SH" },
                { name: "福莱特", scale: 53178228844, id: "601865.SH" },
              ],
              name: "玻璃制造",
              scale: 1.3481513512e11,
              id: "610200",
            },
            {
              children: [
                { name: "深天地Ａ", scale: 1198817461, id: "000023.SZ" },
                { name: "海螺新材", scale: 2.2176e9, id: "000619.SZ" },
                { name: "北新建材", scale: 42639603403, id: "000786.SZ" },
                { name: "兔 宝 宝", scale: 7384219227, id: "002043.SZ" },
                { name: "瑞泰科技", scale: 2524829923, id: "002066.SZ" },
                { name: "万邦德", scale: 2852880917, id: "002082.SZ" },
                { name: "鲁阳节能", scale: 9396603926, id: "002088.SZ" },
                { name: "悦心健康", scale: 3649182938, id: "002162.SZ" },
                { name: "海南发展", scale: 8.9917245e9, id: "002163.SZ" },
                { name: "濮耐股份", scale: 3310232785, id: "002225.SZ" },
                { name: "东方雨虹", scale: 62823432334, id: "002271.SZ" },
                { name: "西部建设", scale: 1.133594165e10, id: "002302.SZ" },
                { name: "雅博股份", scale: 6191748579, id: "002323.SZ" },
                { name: "罗普斯金", scale: 2.30859774e9, id: "002333.SZ" },
                { name: "伟星新材", scale: 3.357743235e10, id: "002372.SZ" },
                { name: "北京利尔", scale: 3031251064, id: "002392.SZ" },
                { name: "垒知集团", scale: 3490241082, id: "002398.SZ" },
                { name: "青龙管业", scale: 2929734929, id: "002457.SZ" },
                { name: "海南瑞泽", scale: 3.82871569e9, id: "002596.SZ" },
                { name: "公元股份", scale: 5683223003, id: "002641.SZ" },
                { name: "扬子新材", scale: 1.1867188e9, id: "002652.SZ" },
                { name: "龙泉股份", scale: 1849802181, id: "002671.SZ" },
                { name: "顾地科技", scale: 2687427354, id: "002694.SZ" },
                { name: "友邦吊顶", scale: 872220464, id: "002718.SZ" },
                { name: "ST三圣", scale: 1653657001, id: "002742.SZ" },
                { name: "万里石", scale: 3298835729, id: "002785.SZ" },
                { name: "坚朗五金", scale: 12002470167, id: "002791.SZ" },
                { name: "帝欧家居", scale: 1953030474, id: "002798.SZ" },
                { name: "蒙娜丽莎", scale: 3862527557, id: "002918.SZ" },
                { name: "东鹏控股", scale: 5301603838, id: "003012.SZ" },
                { name: "三和管桩", scale: 1084977269, id: "003037.SZ" },
                { name: "嘉寓股份", scale: 2.2864644e9, id: "300117.SZ" },
                { name: "纳川股份", scale: 2333998126, id: "300198.SZ" },
                { name: "开尔新材", scale: 1911452327, id: "300234.SZ" },
                { name: "中铁装配", scale: 3302425134, id: "300374.SZ" },
                { name: "雄塑科技", scale: 1500277242, id: "300599.SZ" },
                { name: "凯伦股份", scale: 4041421882, id: "300715.SZ" },
                { name: "科顺股份", scale: 10190328721, id: "300737.SZ" },
                { name: "正源股份", scale: 2.447091e9, id: "600321.SH" },
                { name: "四川金顶", scale: 1.8775662e9, id: "600678.SH" },
                { name: "华立股份", scale: 1587261673, id: "603038.SH" },
                { name: "韩建河山", scale: 1.9449768e9, id: "603616.SH" },
                { name: "东宏股份", scale: 3.0769752e9, id: "603856.SH" },
                { name: "丽岛新材", scale: 2.3227456e9, id: "603937.SH" },
                { name: "四方新材", scale: 8.6074758e8, id: "605122.SH" },
                { name: "华达新材", scale: 9.2216007e8, id: "605158.SH" },
                { name: "法狮龙", scale: 500215611, id: "605318.SH" },
              ],
              name: "其他建材",
              scale: 296225391901,
              id: "610300",
            },
          ],
          name: "建筑材料",
          scale: 702530620853,
          id: "610000",
        },
        {
          children: [
            {
              children: [
                { name: "高新发展", scale: 2742817291, id: "000628.SZ" },
                { name: "浙江建投", scale: 8182025141, id: "002761.SZ" },
                { name: "华阳国际", scale: 1947716369, id: "002949.SZ" },
                { name: "华图山鼎", scale: 7433139128, id: "300492.SZ" },
                { name: "启迪设计", scale: 2.48774583e9, id: "300500.SZ" },
                { name: "筑博设计", scale: 1.556126e9, id: "300564.SZ" },
                { name: "杰恩设计", scale: 2202593288, id: "300668.SZ" },
                { name: "建科院", scale: 2178000495, id: "300675.SZ" },
                { name: "汉嘉设计", scale: 2268822466, id: "300746.SZ" },
                { name: "新城市", scale: 3448714848, id: "300778.SZ" },
                { name: "尤安设计", scale: 9.6896e8, id: "300983.SZ" },
                { name: "霍普股份", scale: 3.9554625e8, id: "301024.SZ" },
                { name: "华蓝集团", scale: 1343561544, id: "301027.SZ" },
                { name: "上海建工", scale: 25110401593, id: "600170.SH" },
                { name: "龙元建设", scale: 7786467991, id: "600491.SH" },
                { name: "华建集团", scale: 6622059268, id: "600629.SH" },
                { name: "祥龙电业", scale: 3134809392, id: "600769.SH" },
                { name: "同济科技", scale: 6216377084, id: "600846.SH" },
                { name: "重庆建工", scale: 7283848706, id: "600939.SH" },
                { name: "中国建筑", scale: 263210887128, id: "601668.SH" },
                { name: "宁波建工", scale: 5575276767, id: "601789.SH" },
                { name: "中衡设计", scale: 2604550544, id: "603017.SH" },
                { name: "城地香江", scale: 3804378623, id: "603887.SH" },
              ],
              name: "房屋建设",
              scale: 368504825746,
              id: "620100",
            },
            {
              children: [
                { name: "宝鹰股份", scale: 4594429941, id: "002047.SZ" },
                { name: "金 螳 螂", scale: 13601519823, id: "002081.SZ" },
                { name: "洪涛股份", scale: 2464534747, id: "002325.SZ" },
                { name: "亚厦股份", scale: 5909611176, id: "002375.SZ" },
                { name: "ST广田", scale: 2553930325, id: "002482.SZ" },
                { name: "ST弘高", scale: 518092464, id: "002504.SZ" },
                { name: "瑞和股份", scale: 1648996853, id: "002620.SZ" },
                { name: "东易日盛", scale: 2836290857, id: "002713.SZ" },
                { name: "*ST奇信", scale: 476952665, id: "002781.SZ" },
                { name: "建艺集团", scale: 1771200317, id: "002789.SZ" },
                { name: "郑中设计", scale: 1750104584, id: "002811.SZ" },
                { name: "中装建设", scale: 2862509012, id: "002822.SZ" },
                { name: "名雕股份", scale: 7.8217425e8, id: "002830.SZ" },
                { name: "美芝股份", scale: 967318718, id: "002856.SZ" },
                { name: "豪尔赛", scale: 1938139498, id: "002963.SZ" },
                { name: "中天精装", scale: 1329137392, id: "002989.SZ" },
                { name: "名家汇", scale: 3566783751, id: "300506.SZ" },
                { name: "华凯易佰", scale: 3954475925, id: "300592.SZ" },
                { name: "维业股份", scale: 1954337702, id: "300621.SZ" },
                { name: "创兴资源", scale: 2.34380523e9, id: "600193.SH" },
                { name: "江河集团", scale: 7783724152, id: "601886.SH" },
                { name: "全筑股份", scale: 1142738653, id: "603030.SH" },
                { name: "大丰实业", scale: 6.39070276e9, id: "603081.SH" },
                { name: "风语筑", scale: 9.48197066e9, id: "603466.SH" },
                { name: "柯利达", scale: 1728224913, id: "603828.SH" },
                { name: "时空科技", scale: 1254076822, id: "605178.SH" },
                { name: "德才股份", scale: 1401017771, id: "605287.SH" },
                { name: "罗曼股份", scale: 1.4894523e9, id: "605289.SH" },
              ],
              name: "装修装饰",
              scale: 88496253261,
              id: "620200",
            },
            {
              children: [
                { name: "山东路桥", scale: 11677723491, id: "000498.SZ" },
                { name: "甘咨询", scale: 4151716465, id: "000779.SZ" },
                { name: "粤 水 电", scale: 7932564625, id: "002060.SZ" },
                { name: "浙江交科", scale: 12104556509, id: "002061.SZ" },
                { name: "宏润建设", scale: 5075349094, id: "002062.SZ" },
                { name: "中国海诚", scale: 4.8677676e9, id: "002116.SZ" },
                { name: "北新路桥", scale: 6404350309, id: "002307.SZ" },
                { name: "ST围海", scale: 3254945716, id: "002586.SZ" },
                { name: "成都路桥", scale: 2634155132, id: "002628.SZ" },
                { name: "中设股份", scale: 1317835123, id: "002883.SZ" },
                { name: "新疆交建", scale: 11897503313, id: "002941.SZ" },
                { name: "地铁设计", scale: 1121654472, id: "003013.SZ" },
                { name: "苏交科", scale: 5651715191, id: "300284.SZ" },
                { name: "永福股份", scale: 6988883774, id: "300712.SZ" },
                { name: "设研院", scale: 3185899771, id: "300732.SZ" },
                { name: "苏文电能", scale: 2044228903, id: "300982.SZ" },
                { name: "蕾奥规划", scale: 6.4476e8, id: "300989.SZ" },
                { name: "四川路桥", scale: 73269401575, id: "600039.SH" },
                { name: "东湖高新", scale: 4749839359, id: "600133.SH" },
                { name: "浦东建设", scale: 6.82089968e9, id: "600284.SH" },
                { name: "安徽建工", scale: 10951486524, id: "600502.SH" },
                { name: "腾达建设", scale: 4317037646, id: "600512.SH" },
                { name: "隧道股份", scale: 19021781369, id: "600820.SH" },
                { name: "龙建股份", scale: 5486762441, id: "600853.SH" },
                { name: "中国铁建", scale: 131021966245, id: "601186.SH" },
                { name: "中国中铁", scale: 178995510298, id: "601390.SH" },
                { name: "中国核建", scale: 22561719341, id: "601611.SH" },
                { name: "中国电建", scale: 83534652456, id: "601669.SH" },
                { name: "中国交建", scale: 142846382768, id: "601800.SH" },
                { name: "中国能建", scale: 37974077571, id: "601868.SH" },
                { name: "华设集团", scale: 6024274778, id: "603018.SH" },
                { name: "设计总院", scale: 5086332791, id: "603357.SH" },
                { name: "勘设股份", scale: 2985557333, id: "603458.SH" },
                { name: "交建股份", scale: 4580039339, id: "603815.SH" },
                { name: "正平股份", scale: 2973398757, id: "603843.SH" },
                { name: "中公高科", scale: 1.9343868e9, id: "603860.SH" },
                { name: "建发合诚", scale: 3069927518, id: "603909.SH" },
              ],
              name: "基础建设",
              scale: 839161044077,
              id: "620300",
            },
            {
              children: [
                { name: "方大集团", scale: 3237446897, id: "000055.SZ" },
                { name: "北方国际", scale: 13860511052, id: "000065.SZ" },
                { name: "中钢国际", scale: 10953042471, id: "000928.SZ" },
                { name: "中工国际", scale: 17603796719, id: "002051.SZ" },
                { name: "东南网架", scale: 6935321701, id: "002135.SZ" },
                { name: "东华科技", scale: 5343076558, id: "002140.SZ" },
                { name: "延华智能", scale: 2782060271, id: "002178.SZ" },
                { name: "中电兴发", scale: 4177490723, id: "002298.SZ" },
                { name: "三维化学", scale: 4256430948, id: "002469.SZ" },
                { name: "鸿路钢构", scale: 1.656026422e10, id: "002541.SZ" },
                { name: "中化岩土", scale: 4310394934, id: "002542.SZ" },
                { name: "日上集团", scale: 1899661051, id: "002593.SZ" },
                { name: "富煌钢构", scale: 2306934693, id: "002743.SZ" },
                { name: "中岩大地", scale: 730140876, id: "003001.SZ" },
                { name: "三联虹普", scale: 3564179869, id: "300384.SZ" },
                { name: "海波重科", scale: 1496615257, id: "300517.SZ" },
                { name: "中达安", scale: 1407214097, id: "300635.SZ" },
                { name: "测绘股份", scale: 1.73680066e9, id: "300826.SZ" },
                { name: "深水规院", scale: 6.74817e8, id: "301038.SZ" },
                { name: "能辉科技", scale: 1798469919, id: "301046.SZ" },
                { name: "中粮科工", scale: 2788800456, id: "301058.SZ" },
                { name: "新瀚新材", scale: 1446182602, id: "301076.SZ" },
                { name: "陕西建工", scale: 8573418602, id: "600248.SH" },
                { name: "杭萧钢构", scale: 10305002753, id: "600477.SH" },
                { name: "精工钢构", scale: 8031399958, id: "600496.SH" },
                { name: "中材国际", scale: 24239543647, id: "600970.SH" },
                { name: "中铝国际", scale: 15895058042, id: "601068.SH" },
                { name: "中国化学", scale: 61160552045, id: "601117.SH" },
                { name: "华电重工", scale: 8.2236e9, id: "601226.SH" },
                { name: "中国中冶", scale: 76409210048, id: "601618.SH" },
                { name: "森特股份", scale: 13087451466, id: "603098.SH" },
                { name: "汇通集团", scale: 1030454205, id: "603176.SH" },
                { name: "镇海股份", scale: 2056645468, id: "603637.SH" },
                { name: "航天工程", scale: 7.6003382e9, id: "603698.SH" },
                { name: "亚翔集成", scale: 3.6655248e9, id: "603929.SH" },
                { name: "百利科技", scale: 4608810525, id: "603959.SH" },
                { name: "利柏特", scale: 2093869255, id: "605167.SH" },
                { name: "上海港湾", scale: 1821463958, id: "605598.SH" },
                { name: "润农节水", scale: 5.6266215e8, id: "830964.BJ" },
              ],
              name: "专业工程",
              scale: 359234658096,
              id: "620400",
            },
            {
              children: [
                { name: "美丽生态", scale: 1274097906, id: "000010.SZ" },
                { name: "汇绿生态", scale: 2123210041, id: "001267.SZ" },
                { name: "ST交投", scale: 1878155478, id: "002200.SZ" },
                { name: "东方园林", scale: 4819729403, id: "002310.SZ" },
                { name: "中锐股份", scale: 4628537926, id: "002374.SZ" },
                { name: "棕榈股份", scale: 4.02493358e9, id: "002431.SZ" },
                { name: "普邦股份", scale: 2316935172, id: "002663.SZ" },
                { name: "岭南股份", scale: 4885415463, id: "002717.SZ" },
                { name: "文科园林", scale: 1575589809, id: "002775.SZ" },
                { name: "节能铁汉", scale: 5392419666, id: "300197.SZ" },
                { name: "美晨生态", scale: 2848140514, id: "300237.SZ" },
                { name: "蒙草生态", scale: 4338678893, id: "300355.SZ" },
                { name: "*ST美尚", scale: 1233681855, id: "300495.SZ" },
                { name: "农尚环境", scale: 3630419401, id: "300536.SZ" },
                { name: "杭州园林", scale: 1907151616, id: "300649.SZ" },
                { name: "山水比德", scale: 4.255364e8, id: "300844.SZ" },
                { name: "冠中生态", scale: 9.167256e8, id: "300948.SZ" },
                { name: "奥雅股份", scale: 556055325, id: "300949.SZ" },
                { name: "建研设计", scale: 1109620882, id: "301167.SZ" },
                { name: "中毅达", scale: 6003274511, id: "600610.SH" },
                { name: "ST花王", scale: 1898338678, id: "603007.SH" },
                { name: "诚邦股份", scale: 1.41909768e9, id: "603316.SH" },
                { name: "东珠生态", scale: 4.51449152e9, id: "603359.SH" },
                { name: "元成股份", scale: 2606198428, id: "603388.SH" },
                { name: "天域生态", scale: 2010713443, id: "603717.SH" },
                { name: "乾景园林", scale: 3188571424, id: "603778.SH" },
                { name: "大千生态", scale: 2.1253752e9, id: "603955.SH" },
                { name: "太和水", scale: 1472454177, id: "605081.SH" },
                { name: "园林股份", scale: 712480788, id: "605303.SH" },
              ],
              name: "园林工程",
              scale: 75836030779,
              id: "620500",
            },
          ],
          name: "建筑装饰",
          scale: 1731232811959,
          id: "620000",
        },
        {
          children: [
            {
              children: [
                { name: "佳电股份", scale: 7360790768, id: "000922.SZ" },
                { name: "江特电机", scale: 24003688962, id: "002176.SZ" },
                { name: "方正电机", scale: 3105428798, id: "002196.SZ" },
                { name: "大洋电机", scale: 8500367473, id: "002249.SZ" },
                { name: "通达动力", scale: 2.60177753e9, id: "002576.SZ" },
                { name: "微光股份", scale: 2875381041, id: "002801.SZ" },
                { name: "凯中精密", scale: 1.63395793e9, id: "002823.SZ" },
                { name: "科力尔", scale: 2189518036, id: "002892.SZ" },
                { name: "兆威机电", scale: 4.45048448e9, id: "003021.SZ" },
                { name: "华瑞股份", scale: 1430823105, id: "300626.SZ" },
                { name: "江苏雷利", scale: 7523253123, id: "300660.SZ" },
                { name: "康平科技", scale: 6.6673134e8, id: "300907.SZ" },
                { name: "江南奕帆", scale: 8.785695e8, id: "301023.SZ" },
                { name: "卧龙电驱", scale: 16183561229, id: "600580.SH" },
                { name: "迪贝电气", scale: 1523848605, id: "603320.SH" },
                { name: "八方股份", scale: 11286817089, id: "603489.SH" },
                { name: "鸣志电器", scale: 1.68729792e10, id: "603728.SH" },
                { name: "神力股份", scale: 3113541674, id: "603819.SH" },
                { name: "中电电机", scale: 2.154432e9, id: "603988.SH" },
              ],
              name: "电机",
              scale: 118355951883,
              id: "630100",
            },
            {
              children: [
                { name: "许继电气", scale: 21082922354, id: "000400.SZ" },
                { name: "东方电子", scale: 12132388433, id: "000682.SZ" },
                { name: "威尔泰", scale: 1462663722, id: "002058.SZ" },
                { name: "金智科技", scale: 4.4527179e9, id: "002090.SZ" },
                { name: "科陆电子", scale: 11031418094, id: "002121.SZ" },
                { name: "智光电气", scale: 5636562578, id: "002169.SZ" },
                { name: "海得控制", scale: 3162788723, id: "002184.SZ" },
                { name: "理工能科", scale: 3786355023, id: "002322.SZ" },
                { name: "英威腾", scale: 8276120792, id: "002334.SZ" },
                { name: "积成电子", scale: 3.53781867e9, id: "002339.SZ" },
                { name: "新时达", scale: 3392126428, id: "002527.SZ" },
                { name: "新联电子", scale: 3343916164, id: "002546.SZ" },
                { name: "先锋电子", scale: 1585853625, id: "002767.SZ" },
                { name: "雷赛智能", scale: 4350590623, id: "002979.SZ" },
                { name: "中元股份", scale: 2357633048, id: "300018.SZ" },
                { name: "九洲集团", scale: 2659098695, id: "300040.SZ" },
                { name: "合康新能", scale: 5577874631, id: "300048.SZ" },
                { name: "汇川技术", scale: 141681692081, id: "300124.SZ" },
                { name: "青岛中程", scale: 6482128456, id: "300208.SZ" },
                { name: "安科瑞", scale: 6170053246, id: "300286.SZ" },
                { name: "*ST光一", scale: 1811006704, id: "300356.SZ" },
                { name: "炬华科技", scale: 6757110796, id: "300360.SZ" },
                { name: "凯发电气", scale: 1746343426, id: "300407.SZ" },
                { name: "红相股份", scale: 3740141676, id: "300427.SZ" },
                { name: "赛摩智能", scale: 2276325513, id: "300466.SZ" },
                { name: "蓝海华腾", scale: 2059821604, id: "300484.SZ" },
                { name: "华自科技", scale: 4526903214, id: "300490.SZ" },
                { name: "友讯达", scale: 1.847904e9, id: "300514.SZ" },
                { name: "欣锐科技", scale: 3616058186, id: "300745.SZ" },
                { name: "迦南智能", scale: 1344999648, id: "300880.SZ" },
                { name: "万胜智能", scale: 1.00062395e9, id: "300882.SZ" },
                { name: "国电南自", scale: 5430021087, id: "600268.SH" },
                { name: "国电南瑞", scale: 173191457457, id: "600406.SH" },
                { name: "长园集团", scale: 7.39068736e9, id: "600525.SH" },
                { name: "泰豪科技", scale: 5204823957, id: "600590.SH" },
                { name: "四方股份", scale: 1.104287576e10, id: "601126.SH" },
                { name: "林洋能源", scale: 15162844988, id: "601222.SH" },
                { name: "三星医疗", scale: 17207321948, id: "601567.SH" },
                { name: "弘讯科技", scale: 2.8699549e9, id: "603015.SH" },
                { name: "大豪科技", scale: 13929760246, id: "603025.SH" },
                { name: "科林电气", scale: 3148498041, id: "603050.SH" },
                { name: "禾望电气", scale: 12916318686, id: "603063.SH" },
                { name: "川仪股份", scale: 1.5252705e10, id: "603100.SH" },
                { name: "信捷电气", scale: 5.23586e9, id: "603416.SH" },
                { name: "捷昌驱动", scale: 8580902808, id: "603583.SH" },
                { name: "能科科技", scale: 7570530735, id: "603859.SH" },
                { name: "凯迪股份", scale: 603532899, id: "605288.SH" },
                { name: "智洋创新", scale: 1164779588, id: "688191.SH" },
                { name: "南网科技", scale: 3.57357192e9, id: "688248.SH" },
                { name: "宏力达", scale: 3479449965, id: "688330.SH" },
                { name: "正弦电气", scale: 747116858, id: "688395.SH" },
                { name: "煜邦电力", scale: 1636288692, id: "688597.SH" },
                { name: "杭州柯林", scale: 6.57943e8, id: "688611.SH" },
                { name: "西力科技", scale: 6.711579e8, id: "688616.SH" },
                { name: "科汇股份", scale: 979336288, id: "688681.SH" },
                { name: "伟创电气", scale: 1.179e9, id: "688698.SH" },
                { name: "中控技术", scale: 34618709066, id: "688777.SH" },
              ],
              name: "电气自动化设备",
              scale: 636335411152,
              id: "630200",
            },
            {
              children: [
                { name: "山高环能", scale: 3054846246, id: "000803.SZ" },
                { name: "国轩高科", scale: 33972922474, id: "002074.SZ" },
                { name: "TCL中环", scale: 138624007665, id: "002129.SZ" },
                { name: "金风科技", scale: 36988354616, id: "002202.SZ" },
                { name: "拓日新能", scale: 6.76705549e9, id: "002218.SZ" },
                { name: "奥 特 迅", scale: 3019209922, id: "002227.SZ" },
                { name: "海陆重工", scale: 3603960449, id: "002255.SZ" },
                { name: "ST中利", scale: 3396475987, id: "002309.SZ" },
                { name: "科华数据", scale: 17523060523, id: "002335.SZ" },
                { name: "中恒电气", scale: 4002766005, id: "002364.SZ" },
                { name: "晶澳科技", scale: 129981149247, id: "002459.SZ" },
                { name: "协鑫集成", scale: 17373025737, id: "002506.SZ" },
                { name: "科士达", scale: 26684841621, id: "002518.SZ" },
                { name: "天顺风能", scale: 23078471659, id: "002531.SZ" },
                { name: "西子洁能", scale: 12846255755, id: "002534.SZ" },
                { name: "圣阳股份", scale: 2987201518, id: "002580.SZ" },
                { name: "露笑科技", scale: 12532800163, id: "002617.SZ" },
                { name: "华西能源", scale: 2.42845563e9, id: "002630.SZ" },
                { name: "首航高科", scale: 9821568556, id: "002665.SZ" },
                { name: "雄韬股份", scale: 6093015583, id: "002733.SZ" },
                { name: "科达利", scale: 20532724485, id: "002850.SZ" },
                { name: "麦格米特", scale: 12059200071, id: "002851.SZ" },
                { name: "鼎汉技术", scale: 3410393527, id: "300011.SZ" },
                { name: "亿纬锂能", scale: 116050763373, id: "300014.SZ" },
                { name: "ST天龙", scale: 1622097585, id: "300029.SZ" },
                { name: "南都电源", scale: 17075696083, id: "300068.SZ" },
                { name: "龙源技术", scale: 3515512646, id: "300105.SZ" },
                { name: "向日葵", scale: 3.840914e9, id: "300111.SZ" },
                { name: "保力新", scale: 6360965387, id: "300116.SZ" },
                { name: "东方日升", scale: 17536643647, id: "300118.SZ" },
                { name: "泰胜风能", scale: 4.79142824e9, id: "300129.SZ" },
                { name: "和顺电气", scale: 1587806197, id: "300141.SZ" },
                { name: "科泰电源", scale: 2840492736, id: "300153.SZ" },
                { name: "通裕重工", scale: 8818272308, id: "300185.SZ" },
                { name: "阳光电源", scale: 1.2417322698e11, id: "300274.SZ" },
                { name: "晶盛机电", scale: 83050182493, id: "300316.SZ" },
                { name: "珈伟新能", scale: 5095687683, id: "300317.SZ" },
                { name: "易事特", scale: 19480806785, id: "300376.SZ" },
                { name: "中来股份", scale: 13306796455, id: "300393.SZ" },
                { name: "鹏辉能源", scale: 18343135972, id: "300438.SZ" },
                { name: "金雷股份", scale: 7366497593, id: "300443.SZ" },
                { name: "通合科技", scale: 3132696062, id: "300491.SZ" },
                { name: "天能重工", scale: 5376635132, id: "300569.SZ" },
                { name: "新雷能", scale: 8811200792, id: "300593.SZ" },
                { name: "盛弘股份", scale: 9.09795711e9, id: "300693.SZ" },
                { name: "英可瑞", scale: 1402394988, id: "300713.SZ" },
                { name: "宁德时代", scale: 8.736409706e11, id: "300750.SZ" },
                { name: "锦浪科技", scale: 35755137216, id: "300763.SZ" },
                { name: "运达股份", scale: 6470637407, id: "300772.SZ" },
                { name: "英杰电气", scale: 9327545558, id: "300820.SZ" },
                { name: "上能电气", scale: 9270523836, id: "300827.SZ" },
                { name: "新强联", scale: 8284375174, id: "300850.SZ" },
                { name: "欧陆通", scale: 3175044875, id: "300870.SZ" },
                { name: "中环海陆", scale: 1431325437, id: "301040.SZ" },
                { name: "绿岛风", scale: 4.248e8, id: "301043.SZ" },
                { name: "百胜智能", scale: 624243201, id: "301083.SZ" },
                { name: "华研精机", scale: 8.91e8, id: "301138.SZ" },
                { name: "通灵股份", scale: 2.47718817e9, id: "301168.SZ" },
                { name: "迈赫股份", scale: 7.158098e8, id: "301199.SZ" },
                { name: "苏轴股份", scale: 537258683, id: "430418.BJ" },
                { name: "航天机电", scale: 1.219114444e10, id: "600151.SH" },
                { name: "哈空调", scale: 1.95120402e9, id: "600202.SH" },
                { name: "安彩高科", scale: 5246772322, id: "600207.SH" },
                { name: "ST时万", scale: 2707579458, id: "600241.SH" },
                { name: "ST华仪", scale: 1193048512, id: "600290.SH" },
                { name: "动力源", scale: 3.34731646e9, id: "600405.SH" },
                { name: "湘电股份", scale: 1.702501785e10, id: "600416.SH" },
                { name: "通威股份", scale: 176251570666, id: "600438.SH" },
                { name: "华光环能", scale: 10113335108, id: "600475.SH" },
                { name: "亿晶光电", scale: 7458117759, id: "600537.SH" },
                { name: "爱旭股份", scale: 33457541817, id: "600732.SH" },
                { name: "万里股份", scale: 1687694274, id: "600847.SH" },
                { name: "东方电气", scale: 34680458945, id: "600875.SH" },
                { name: "隆基绿能", scale: 283721479142, id: "601012.SH" },
                { name: "吉鑫科技", scale: 3725688765, id: "601218.SH" },
                { name: "明阳智能", scale: 44288935152, id: "601615.SH" },
                { name: "上海电气", scale: 57328631727, id: "601727.SH" },
                { name: "京运通", scale: 14729077452, id: "601908.SH" },
                { name: "赛伍技术", scale: 6556986509, id: "603212.SH" },
                { name: "日月股份", scale: 1.989371391e10, id: "603218.SH" },
                { name: "金辰股份", scale: 7377592495, id: "603396.SH" },
                { name: "振江股份", scale: 4.78241946e9, id: "603507.SH" },
                { name: "清源股份", scale: 3.841414e9, id: "603628.SH" },
                { name: "璞泰来", scale: 70912106086, id: "603659.SH" },
                { name: "福斯特", scale: 67136511354, id: "603806.SH" },
                { name: "野马电池", scale: 6.958058e8, id: "605378.SH" },
                { name: "恒盛能源", scale: 7.114512e8, id: "605580.SH" },
                { name: "禾迈股份", scale: 1.739389949e10, id: "688032.SH" },
                { name: "派能科技", scale: 20824673654, id: "688063.SH" },
                { name: "晶科能源", scale: 2.43628e10, id: "688223.SH" },
                { name: "大全能源", scale: 25699607911, id: "688303.SH" },
                { name: "亿华通-U", scale: 6502441953, id: "688339.SH" },
                { name: "博力威", scale: 9.5600438e8, id: "688345.SH" },
                { name: "固德威", scale: 2.199626072e10, id: "688390.SH" },
                { name: "中信博", scale: 5407354857, id: "688408.SH" },
                { name: "奥特维", scale: 12731213961, id: "688516.SH" },
                { name: "明冠新材", scale: 2754690948, id: "688560.SH" },
                { name: "孚能科技", scale: 17055052917, id: "688567.SH" },
                { name: "天合光能", scale: 63141473016, id: "688599.SH" },
                { name: "电气风电", scale: 3192231816, id: "688660.SH" },
                { name: "海优新材", scale: 6678799198, id: "688680.SH" },
                { name: "珠海冠宇", scale: 13954725126, id: "688772.SH" },
                { name: "天能股份", scale: 4.20189e9, id: "688819.SH" },
                { name: "球冠电缆", scale: 434036733, id: "834682.BJ" },
                { name: "连城数控", scale: 6466153407, id: "835368.BJ" },
                { name: "同享科技", scale: 7.161825e8, id: "839167.BJ" },
              ],
              name: "电源设备",
              scale: 3113967540403,
              id: "630300",
            },
            {
              children: [
                { name: "顺钠股份", scale: 2623176192, id: "000533.SZ" },
                { name: "*ST银河", scale: 1009685662, id: "000806.SZ" },
                { name: "华菱线缆", scale: 2401429056, id: "001208.SZ" },
                { name: "思源电气", scale: 27039748311, id: "002028.SZ" },
                { name: "三变科技", scale: 2641769364, id: "002112.SZ" },
                { name: "华明装备", scale: 7675762404, id: "002270.SZ" },
                { name: "万马股份", scale: 9649002161, id: "002276.SZ" },
                { name: "太阳电缆", scale: 5732262499, id: "002300.SZ" },
                { name: "柘中股份", scale: 4895081474, id: "002346.SZ" },
                { name: "北京科锐", scale: 3693933264, id: "002350.SZ" },
                { name: "森源电气", scale: 4.40282001e9, id: "002358.SZ" },
                { name: "众业达", scale: 3.79781102e9, id: "002441.SZ" },
                { name: "摩恩电气", scale: 2.5909791e9, id: "002451.SZ" },
                { name: "长高电新", scale: 3364310084, id: "002452.SZ" },
                { name: "中超控股", scale: 2950222045, id: "002471.SZ" },
                { name: "汉缆股份", scale: 1.317411216e10, id: "002498.SZ" },
                { name: "金杯电工", scale: 4795955082, id: "002533.SZ" },
                { name: "通达股份", scale: 3529915823, id: "002560.SZ" },
                { name: "大连电瓷", scale: 4048372951, id: "002606.SZ" },
                { name: "皓宸医疗", scale: 2545125008, id: "002622.SZ" },
                { name: "ST远程", scale: 2658325608, id: "002692.SZ" },
                { name: "良信股份", scale: 1.015762741e10, id: "002706.SZ" },
                { name: "长缆科技", scale: 1978890267, id: "002879.SZ" },
                { name: "金龙羽", scale: 3588575625, id: "002882.SZ" },
                { name: "泰永长征", scale: 2626742867, id: "002927.SZ" },
                { name: "日丰股份", scale: 2160067207, id: "002953.SZ" },
                { name: "特锐德", scale: 21648549499, id: "300001.SZ" },
                { name: "中能电气", scale: 2200901241, id: "300062.SZ" },
                { name: "金利华电", scale: 1.404e9, id: "300069.SZ" },
                { name: "电科院", scale: 3463750061, id: "300215.SZ" },
                { name: "通光线缆", scale: 3179701357, id: "300265.SZ" },
                { name: "温州宏丰", scale: 1594459781, id: "300283.SZ" },
                { name: "昇辉科技", scale: 3265151976, id: "300423.SZ" },
                { name: "双杰电气", scale: 3346500045, id: "300444.SZ" },
                { name: "全信股份", scale: 3795450925, id: "300447.SZ" },
                { name: "合纵科技", scale: 4758096556, id: "300477.SZ" },
                { name: "金冠股份", scale: 4.0289111e9, id: "300510.SZ" },
                { name: "安靠智电", scale: 3360473391, id: "300617.SZ" },
                { name: "大烨智能", scale: 1615009313, id: "300670.SZ" },
                { name: "三友联众", scale: 1.31503893e9, id: "300932.SZ" },
                { name: "中辰股份", scale: 1765380446, id: "300933.SZ" },
                { name: "扬电科技", scale: 1.38642e9, id: "301012.SZ" },
                { name: "久盛电气", scale: 1205273604, id: "301082.SZ" },
                { name: "特变电工", scale: 88968966692, id: "600089.SH" },
                { name: "ST天成", scale: 1660007798, id: "600112.SH" },
                { name: "长城电工", scale: 2.2308274e9, id: "600192.SH" },
                { name: "平高电气", scale: 13799889713, id: "600312.SH" },
                { name: "宝光股份", scale: 3447304328, id: "600379.SH" },
                { name: "百利电气", scale: 4992705123, id: "600468.SH" },
                { name: "国网英大", scale: 28191888218, id: "600517.SH" },
                { name: "保变电气", scale: 8820921419, id: "600550.SH" },
                { name: "精达股份", scale: 9080911622, id: "600577.SH" },
                { name: "远东股份", scale: 11474053697, id: "600869.SH" },
                { name: "宏发股份", scale: 32865102194, id: "600885.SH" },
                { name: "宝胜股份", scale: 6541417003, id: "600973.SH" },
                { name: "中国西电", scale: 2.737221176e10, id: "601179.SH" },
                { name: "广电电气", scale: 3.13417625e9, id: "601616.SH" },
                { name: "风范股份", scale: 5814035703, id: "601700.SH" },
                { name: "正泰电器", scale: 5.607131021e10, id: "601877.SH" },
                { name: "新宏泰", scale: 3.77808e9, id: "603016.SH" },
                { name: "尚纬股份", scale: 3704304413, id: "603333.SH" },
                { name: "神马电力", scale: 6008460245, id: "603530.SH" },
                { name: "汇金通", scale: 2614592891, id: "603577.SH" },
                { name: "东方电缆", scale: 28918431224, id: "603606.SH" },
                { name: "杭电股份", scale: 3697149702, id: "603618.SH" },
                { name: "洛凯股份", scale: 1.7344e9, id: "603829.SH" },
                { name: "白云电器", scale: 3074230101, id: "603861.SH" },
                { name: "长城科技", scale: 3812867028, id: "603897.SH" },
                { name: "天正电气", scale: 1673156795, id: "605066.SH" },
                { name: "华通线缆", scale: 2195846044, id: "605196.SH" },
                { name: "起帆电缆", scale: 2194131899, id: "605222.SH" },
                { name: "新亚电子", scale: 1460855166, id: "605277.SH" },
                { name: "威腾电气", scale: 1.4857316e9, id: "688226.SH" },
                { name: "金冠电气", scale: 1444998333, id: "688517.SH" },
                { name: "金盘科技", scale: 6451107768, id: "688676.SH" },
              ],
              name: "高低压设备",
              scale: 577778843218,
              id: "630400",
            },
          ],
          name: "电气设备",
          scale: 4446437746656,
          id: "630000",
        },
        {
          children: [
            {
              children: [
                { name: "*ST沈机", scale: 11127663549, id: "000410.SZ" },
                { name: "冰山冷热", scale: 2679912162, id: "000530.SZ" },
                { name: "苏常柴Ａ", scale: 2324754359, id: "000570.SZ" },
                { name: "宝塔实业", scale: 7113124775, id: "000595.SZ" },
                { name: "中核科技", scale: 4524197302, id: "000777.SZ" },
                { name: "冰轮环境", scale: 10486260919, id: "000811.SZ" },
                { name: "智慧农业", scale: 4634283194, id: "000816.SZ" },
                { name: "秦川机床", scale: 7958890677, id: "000837.SZ" },
                { name: "潍柴重机", scale: 1.55513358e9, id: "000880.SZ" },
                { name: "山东威达", scale: 4050625501, id: "002026.SZ" },
                { name: "国机精工", scale: 6208293084, id: "002046.SZ" },
                { name: "天马股份", scale: 9097307602, id: "002122.SZ" },
                { name: "汉钟精机", scale: 13109198479, id: "002158.SZ" },
                { name: "宁波东力", scale: 2683423216, id: "002164.SZ" },
                { name: "华东数控", scale: 2.95195776e9, id: "002248.SZ" },
                { name: "川润股份", scale: 2008518005, id: "002272.SZ" },
                { name: "博深股份", scale: 3030913898, id: "002282.SZ" },
                { name: "泰尔股份", scale: 1707526651, id: "002347.SZ" },
                { name: "胜利精密", scale: 6395601699, id: "002426.SZ" },
                { name: "江苏神通", scale: 5613054598, id: "002438.SZ" },
                { name: "巨星科技", scale: 21459118854, id: "002444.SZ" },
                { name: "新筑股份", scale: 2921434866, id: "002480.SZ" },
                { name: "宝馨科技", scale: 4853340153, id: "002514.SZ" },
                { name: "日发精机", scale: 3626893398, id: "002520.SZ" },
                { name: "天山铝业", scale: 17859352855, id: "002532.SZ" },
                { name: "宝鼎科技", scale: 3893489164, id: "002552.SZ" },
                { name: "亚威股份", scale: 4249068761, id: "002559.SZ" },
                { name: "山东章鼓", scale: 2.96671898e9, id: "002598.SZ" },
                { name: "申科股份", scale: 1.5659085e9, id: "002633.SZ" },
                { name: "雪人股份", scale: 5152624536, id: "002639.SZ" },
                { name: "华东重机", scale: 2864770072, id: "002685.SZ" },
                { name: "亿利达", scale: 2557978871, id: "002686.SZ" },
                { name: "埃斯顿", scale: 18962882046, id: "002747.SZ" },
                { name: "凤形股份", scale: 2.07371052e9, id: "002760.SZ" },
                { name: "永和智控", scale: 2722754813, id: "002795.SZ" },
                { name: "伟隆股份", scale: 1.39876964e9, id: "002871.SZ" },
                { name: "智能自控", scale: 1855322676, id: "002877.SZ" },
                { name: "凌霄泵业", scale: 4251515553, id: "002884.SZ" },
                { name: "中大力德", scale: 3470892704, id: "002896.SZ" },
                { name: "宇环数控", scale: 2760786133, id: "002903.SZ" },
                { name: "锋龙股份", scale: 1821214544, id: "002931.SZ" },
                { name: "宇晶股份", scale: 2824856356, id: "002943.SZ" },
                { name: "思进智能", scale: 1.77993416e9, id: "003025.SZ" },
                { name: "机器人", scale: 16977121358, id: "300024.SZ" },
                { name: "易成新能", scale: 6451116656, id: "300080.SZ" },
                { name: "金通灵", scale: 3534835541, id: "300091.SZ" },
                { name: "科新机电", scale: 2536585653, id: "300092.SZ" },
                { name: "华伍股份", scale: 3010073899, id: "300095.SZ" },
                { name: "锐奇股份", scale: 1.15864391e9, id: "300126.SZ" },
                { name: "中金环境", scale: 5321008095, id: "300145.SZ" },
                { name: "瑞凌股份", scale: 1865462148, id: "300154.SZ" },
                { name: "华中数控", scale: 7255060026, id: "300161.SZ" },
                { name: "四方达", scale: 3741662904, id: "300179.SZ" },
                { name: "佳士科技", scale: 3263373374, id: "300193.SZ" },
                { name: "科大智能", scale: 4365520177, id: "300222.SZ" },
                { name: "开山股份", scale: 17031424561, id: "300257.SZ" },
                { name: "新莱应材", scale: 12397817729, id: "300260.SZ" },
                { name: "华昌达", scale: 5.28660101e9, id: "300278.SZ" },
                { name: "华民股份", scale: 3583319322, id: "300345.SZ" },
                { name: "长药控股", scale: 2624017479, id: "300391.SZ" },
                { name: "劲拓股份", scale: 4.09681555e9, id: "300400.SZ" },
                { name: "五洋停车", scale: 2895880512, id: "300420.SZ" },
                { name: "力星股份", scale: 2.01130744e9, id: "300421.SZ" },
                { name: "诚益通", scale: 3589628495, id: "300430.SZ" },
                { name: "鲍斯股份", scale: 3423488932, id: "300441.SZ" },
                { name: "星徽股份", scale: 1718848721, id: "300464.SZ" },
                { name: "中密控股", scale: 8786886261, id: "300470.SZ" },
                { name: "恒锋工具", scale: 2918472901, id: "300488.SZ" },
                { name: "昊志机电", scale: 2009029675, id: "300503.SZ" },
                { name: "三超新材", scale: 1611376132, id: "300554.SZ" },
                { name: "金太阳", scale: 1795207157, id: "300606.SZ" },
                { name: "拓斯达", scale: 4202774456, id: "300607.SZ" },
                { name: "新劲刚", scale: 3518144323, id: "300629.SZ" },
                { name: "岱勒新材", scale: 2768647846, id: "300700.SZ" },
                { name: "长盛轴承", scale: 3101384679, id: "300718.SZ" },
                { name: "德恩精工", scale: 1125621615, id: "300780.SZ" },
                { name: "华辰装备", scale: 2.7199156e9, id: "300809.SZ" },
                { name: "双飞股份", scale: 2049474355, id: "300817.SZ" },
                { name: "耐普矿机", scale: 1359231964, id: "300818.SZ" },
                { name: "浙江力诺", scale: 8.8351068e8, id: "300838.SZ" },
                { name: "申昊科技", scale: 2665765983, id: "300853.SZ" },
                { name: "美畅股份", scale: 11320374799, id: "300861.SZ" },
                { name: "春晖智控", scale: 1310713226, id: "300943.SZ" },
                { name: "博亚精工", scale: 1.1873472e9, id: "300971.SZ" },
                { name: "金沃股份", scale: 624157632, id: "300984.SZ" },
                { name: "同飞股份", scale: 2.22768e9, id: "300990.SZ" },
                { name: "泰福泵业", scale: 775310708, id: "300992.SZ" },
                { name: "东亚机械", scale: 1057151496, id: "301028.SZ" },
                { name: "怡合达", scale: 1.322013103e10, id: "301029.SZ" },
                { name: "新柴股份", scale: 702428874, id: "301032.SZ" },
                { name: "森赫股份", scale: 514898269, id: "301056.SZ" },
                { name: "开勒股份", scale: 1205974795, id: "301070.SZ" },
                { name: "海力风电", scale: 6412024529, id: "301155.SZ" },
                { name: "黄河旋风", scale: 6113265043, id: "600172.SH" },
                { name: "全柴动力", scale: 3453953679, id: "600218.SH" },
                { name: "青海华鼎", scale: 1.7861195e9, id: "600243.SH" },
                { name: "华嵘控股", scale: 2.042064e9, id: "600421.SH" },
                { name: "双良节能", scale: 27910265865, id: "600481.SH" },
                { name: "龙溪股份", scale: 2968683033, id: "600592.SH" },
                { name: "动力新科", scale: 3223626163, id: "600841.SH" },
                { name: "晋亿实业", scale: 4135723525, id: "601002.SH" },
                { name: "恒立液压", scale: 8.78637816e10, id: "601100.SH" },
                { name: "杭齿前进", scale: 3.700555e9, id: "601177.SH" },
                { name: "陕鼓动力", scale: 16351016347, id: "601369.SH" },
                { name: "海天精工", scale: 1.745046e10, id: "601882.SH" },
                { name: "宁波精达", scale: 3394745088, id: "603088.SH" },
                { name: "宏盛股份", scale: 1.984e9, id: "603090.SH" },
                { name: "上海沪工", scale: 3.95891264e9, id: "603131.SH" },
                { name: "海容冷链", scale: 7785737909, id: "603187.SH" },
                { name: "海鸥股份", scale: 1649526576, id: "603269.SH" },
                { name: "银都股份", scale: 8.20752146e9, id: "603277.SH" },
                { name: "应流股份", scale: 12788510361, id: "603308.SH" },
                { name: "福鞍股份", scale: 4298367696, id: "603315.SH" },
                { name: "百达精工", scale: 2651653263, id: "603331.SH" },
                { name: "四方科技", scale: 4226966451, id: "603339.SH" },
                { name: "科沃斯", scale: 43084709996, id: "603486.SH" },
                { name: "君禾股份", scale: 3148086155, id: "603617.SH" },
                { name: "亿嘉和", scale: 7627165879, id: "603666.SH" },
                { name: "五洲新春", scale: 3.85476179e9, id: "603667.SH" },
                { name: "纽威股份", scale: 9.91758088e9, id: "603699.SH" },
                { name: "大元泵业", scale: 4.91169048e9, id: "603757.SH" },
                { name: "国茂股份", scale: 12118173612, id: "603915.SH" },
                { name: "恒润股份", scale: 8.80393432e9, id: "603985.SH" },
                { name: "联德股份", scale: 2.32968e9, id: "605060.SH" },
                { name: "华丰股份", scale: 1.01495072e9, id: "605100.SH" },
                { name: "绿田机械", scale: 1.32517907e9, id: "605259.SH" },
                { name: "长龄液压", scale: 8.5882302e8, id: "605389.SH" },
                { name: "天准科技", scale: 7.64785528e9, id: "688003.SH" },
                { name: "绿的谐波", scale: 11082680454, id: "688017.SH" },
                { name: "沃尔德", scale: 2568872171, id: "688028.SH" },
                { name: "步科股份", scale: 971477555, id: "688160.SH" },
                { name: "埃夫特-U", scale: 3076212126, id: "688165.SH" },
                { name: "石头科技", scale: 29325475808, id: "688169.SH" },
                { name: "江苏北人", scale: 2010772599, id: "688218.SH" },
                { name: "科德数控", scale: 5130473565, id: "688305.SH" },
                { name: "铂力特", scale: 15838581764, id: "688333.SH" },
                { name: "德马科技", scale: 1124619953, id: "688360.SH" },
                { name: "兰剑智能", scale: 1483837488, id: "688557.SH" },
                { name: "国盛智科", scale: 1376324906, id: "688558.SH" },
                { name: "浙海德曼", scale: 920677904, id: "688577.SH" },
                { name: "纽威数控", scale: 1992478523, id: "688697.SH" },
                { name: "万通液压", scale: 395601064, id: "830839.BJ" },
                { name: "常辅股份", scale: 252658482, id: "871396.BJ" },
              ],
              name: "通用机械",
              scale: 839506019605,
              id: "640100",
            },
            {
              children: [
                { name: "中联重科", scale: 44532979993, id: "000157.SZ" },
                { name: "徐工机械", scale: 3.317975337e10, id: "000425.SZ" },
                { name: "柳    工", scale: 9862344402, id: "000528.SZ" },
                { name: "创元科技", scale: 3.81276626e9, id: "000551.SZ" },
                { name: "哈工智能", scale: 5109955897, id: "000584.SZ" },
                { name: "山推股份", scale: 4746567724, id: "000680.SZ" },
                { name: "京山轻机", scale: 11892658674, id: "000821.SZ" },
                { name: "石化机械", scale: 6405245531, id: "000852.SZ" },
                { name: "冀东装备", scale: 1.8841e9, id: "000856.SZ" },
                { name: "运机集团", scale: 869700127, id: "001288.SZ" },
                { name: "精工科技", scale: 9.4172604e9, id: "002006.SZ" },
                { name: "天奇股份", scale: 4818582452, id: "002009.SZ" },
                { name: "ST中捷", scale: 1272416199, id: "002021.SZ" },
                { name: "巨轮智能", scale: 5414678441, id: "002031.SZ" },
                { name: "软控股份", scale: 6080746798, id: "002073.SZ" },
                { name: "山河智能", scale: 6102128917, id: "002097.SZ" },
                { name: "威海广泰", scale: 4801653181, id: "002111.SZ" },
                { name: "融捷股份", scale: 19128255231, id: "002192.SZ" },
                { name: "大连重工", scale: 9734104961, id: "002204.SZ" },
                { name: "达 意 隆", scale: 1410804869, id: "002209.SZ" },
                { name: "神开股份", scale: 1714482572, id: "002278.SZ" },
                { name: "赛象科技", scale: 2791721067, id: "002337.SZ" },
                { name: "杰瑞股份", scale: 19067473127, id: "002353.SZ" },
                { name: "*ST海核", scale: 4478745518, id: "002366.SZ" },
                { name: "康力电梯", scale: 4335751214, id: "002367.SZ" },
                { name: "杭氧股份", scale: 35838732513, id: "002430.SZ" },
                { name: "润邦股份", scale: 4532484091, id: "002483.SZ" },
                { name: "山东墨龙", scale: 2.25312828e9, id: "002490.SZ" },
                { name: "天桥起重", scale: 3858548683, id: "002523.SZ" },
                { name: "山东矿机", scale: 3944431425, id: "002526.SZ" },
                { name: "海源复材", scale: 3.4086e9, id: "002529.SZ" },
                { name: "ST林重", scale: 1.88965435e9, id: "002535.SZ" },
                { name: "天沃科技", scale: 4307192123, id: "002564.SZ" },
                { name: "豪迈科技", scale: 15996201935, id: "002595.SZ" },
                { name: "东方精工", scale: 5118549646, id: "002611.SZ" },
                { name: "北玻股份", scale: 2603186802, id: "002613.SZ" },
                { name: "华宏科技", scale: 7242681713, id: "002645.SZ" },
                { name: "利君股份", scale: 3907787905, id: "002651.SZ" },
                { name: "鞍重股份", scale: 3.74096799e9, id: "002667.SZ" },
                { name: "远大智能", scale: 4256857783, id: "002689.SZ" },
                { name: "美亚光电", scale: 13640229889, id: "002690.SZ" },
                { name: "冀凯股份", scale: 1784669271, id: "002691.SZ" },
                { name: "博实股份", scale: 12460926269, id: "002698.SZ" },
                { name: "物产金轮", scale: 2361928348, id: "002722.SZ" },
                { name: "电光科技", scale: 2858206809, id: "002730.SZ" },
                { name: "南兴股份", scale: 4169083966, id: "002757.SZ" },
                { name: "快意电梯", scale: 1.84286203e9, id: "002774.SZ" },
                { name: "中坚科技", scale: 2713334968, id: "002779.SZ" },
                { name: "银宝山新", scale: 2.69785152e9, id: "002786.SZ" },
                { name: "世嘉科技", scale: 2691613441, id: "002796.SZ" },
                { name: "和科达", scale: 1044189167, id: "002816.SZ" },
                { name: "弘亚数控", scale: 4267218864, id: "002833.SZ" },
                { name: "英维克", scale: 1.516212925e10, id: "002837.SZ" },
                { name: "弘宇股份", scale: 1205962942, id: "002890.SZ" },
                { name: "科瑞技术", scale: 6707599266, id: "002957.SZ" },
                { name: "青鸟消防", scale: 11060124312, id: "002960.SZ" },
                { name: "博杰股份", scale: 3208239916, id: "002975.SZ" },
                { name: "泰坦股份", scale: 690682125, id: "003036.SZ" },
                { name: "南风股份", scale: 2560108143, id: "300004.SZ" },
                { name: "海默科技", scale: 2044463522, id: "300084.SZ" },
                { name: "智云股份", scale: 1390597582, id: "300097.SZ" },
                { name: "精准信息", scale: 3302254806, id: "300099.SZ" },
                { name: "达刚控股", scale: 1541259429, id: "300103.SZ" },
                { name: "昌红科技", scale: 7.33930464e9, id: "300151.SZ" },
                { name: "东富龙", scale: 10532861424, id: "300171.SZ" },
                { name: "福能东方", scale: 2.93216843e9, id: "300173.SZ" },
                { name: "长荣股份", scale: 1689565198, id: "300195.SZ" },
                { name: "海伦哲", scale: 4.14578974e9, id: "300201.SZ" },
                { name: "森远股份", scale: 1151889739, id: "300210.SZ" },
                { name: "梅安森", scale: 3095452591, id: "300275.SZ" },
                { name: "三丰智能", scale: 3112183305, id: "300276.SZ" },
                { name: "金明精机", scale: 1934977191, id: "300281.SZ" },
                { name: "蓝英装备", scale: 2985577516, id: "300293.SZ" },
                { name: "慈星股份", scale: 4082636305, id: "300307.SZ" },
                { name: "斯莱克", scale: 8489001085, id: "300382.SZ" },
                { name: "雪浪环境", scale: 1666352226, id: "300385.SZ" },
                { name: "金盾股份", scale: 1.66194335e9, id: "300411.SZ" },
                { name: "迦南科技", scale: 2343367604, id: "300412.SZ" },
                { name: "伊之密", scale: 8699752365, id: "300415.SZ" },
                { name: "润泽科技", scale: 4.69742225e9, id: "300442.SZ" },
                { name: "先导智能", scale: 52685576331, id: "300450.SZ" },
                { name: "赢合科技", scale: 9784123457, id: "300457.SZ" },
                { name: "田中精机", scale: 1690847022, id: "300461.SZ" },
                { name: "厚普股份", scale: 4707881135, id: "300471.SZ" },
                { name: "新元科技", scale: 2.53117218e9, id: "300472.SZ" },
                { name: "光力科技", scale: 4950103611, id: "300480.SZ" },
                { name: "首华燃气", scale: 3321084277, id: "300483.SZ" },
                { name: "东杰智能", scale: 3171556793, id: "300486.SZ" },
                { name: "高澜股份", scale: 5710134612, id: "300499.SZ" },
                { name: "新美星", scale: 1405631445, id: "300509.SZ" },
                { name: "中亚股份", scale: 2559438521, id: "300512.SZ" },
                { name: "爱司凯", scale: 1851827847, id: "300521.SZ" },
                { name: "蜀道装备", scale: 2008234567, id: "300540.SZ" },
                { name: "优德精密", scale: 1236909222, id: "300549.SZ" },
                { name: "长川科技", scale: 23494512037, id: "300604.SZ" },
                { name: "金银河", scale: 4047160525, id: "300619.SZ" },
                { name: "沪宁股份", scale: 2056265726, id: "300669.SZ" },
                { name: "捷佳伟创", scale: 28819647637, id: "300724.SZ" },
                { name: "迈为股份", scale: 32729769762, id: "300751.SZ" },
                { name: "金马游乐", scale: 1455740647, id: "300756.SZ" },
                { name: "罗博特科", scale: 6.08712e9, id: "300757.SZ" },
                { name: "帝尔激光", scale: 10466676359, id: "300776.SZ" },
                { name: "国林科技", scale: 2970153362, id: "300786.SZ" },
                { name: "力合科技", scale: 2078836125, id: "300800.SZ" },
                { name: "矩子科技", scale: 4547146043, id: "300802.SZ" },
                { name: "易天股份", scale: 1636708091, id: "300812.SZ" },
                { name: "泰林生物", scale: 1809739889, id: "300813.SZ" },
                { name: "建科机械", scale: 1539982638, id: "300823.SZ" },
                { name: "浩洋股份", scale: 2.47376188e9, id: "300833.SZ" },
                { name: "佰奥智能", scale: 871071555, id: "300836.SZ" },
                { name: "浙矿股份", scale: 1.5378125e9, id: "300837.SZ" },
                { name: "蓝盾光电", scale: 2206721711, id: "300862.SZ" },
                { name: "大宏立", scale: 5.4064851e8, id: "300865.SZ" },
                { name: "大叶股份", scale: 8.987e8, id: "300879.SZ" },
                { name: "国安达", scale: 1751692155, id: "300902.SZ" },
                { name: "通用电梯", scale: 7.0812354e8, id: "300931.SZ" },
                { name: "德固特", scale: 1.0236e9, id: "300950.SZ" },
                { name: "华立科技", scale: 1735295445, id: "301011.SZ" },
                { name: "利和兴", scale: 2003072402, id: "301013.SZ" },
                { name: "申菱环境", scale: 4.0363853e9, id: "301018.SZ" },
                { name: "仕净科技", scale: 4167329517, id: "301030.SZ" },
                { name: "远信工业", scale: 554194937, id: "301053.SZ" },
                { name: "万事利", scale: 979860688, id: "301066.SZ" },
                { name: "邵阳液压", scale: 9.8865614e8, id: "301079.SZ" },
                { name: "严牌股份", scale: 7.960224e8, id: "301081.SZ" },
                { name: "明月镜片", scale: 2678147934, id: "301101.SZ" },
                { name: "强瑞技术", scale: 857497324, id: "301128.SZ" },
                { name: "三一重工", scale: 140505982894, id: "600031.SH" },
                { name: "太原重工", scale: 6.2047711e9, id: "600169.SH" },
                { name: "北方股份", scale: 2.7999e9, id: "600262.SH" },
                { name: "标准股份", scale: 1643546569, id: "600302.SH" },
                { name: "振华重工", scale: 13088670784, id: "600320.SH" },
                { name: "汉马科技", scale: 4.90736133e9, id: "600375.SH" },
                { name: "ST龙净", scale: 18638046754, id: "600388.SH" },
                { name: "国机通用", scale: 1758527403, id: "600444.SH" },
                { name: "科达制造", scale: 21873068179, id: "600499.SH" },
                { name: "航天晨光", scale: 6475128932, id: "600501.SH" },
                { name: "文一科技", scale: 2.1483108e9, id: "600520.SH" },
                { name: "菲达环保", scale: 3494084018, id: "600526.SH" },
                { name: "卓郎智能", scale: 4984936177, id: "600545.SH" },
                { name: "金自天正", scale: 2.36616939e9, id: "600560.SH" },
                { name: "克劳斯", scale: 2.9916852e9, id: "600579.SH" },
                { name: "天地科技", scale: 20775716238, id: "600582.SH" },
                { name: "安徽合力", scale: 15195911865, id: "600761.SH" },
                { name: "厦工股份", scale: 5002946434, id: "600815.SH" },
                { name: "上海机电", scale: 10541011201, id: "600835.SH" },
                { name: "上工申贝", scale: 2289806922, id: "600843.SH" },
                { name: "广日股份", scale: 5.97663092e9, id: "600894.SH" },
                { name: "建设机械", scale: 6.15921491e9, id: "600984.SH" },
                { name: "一拖股份", scale: 6.5627055e9, id: "601038.SH" },
                { name: "中国一重", scale: 23179306293, id: "601106.SH" },
                { name: "国机重装", scale: 10359479275, id: "601399.SH" },
                { name: "中信重工", scale: 17053917821, id: "601608.SH" },
                { name: "蓝科高新", scale: 2.48878795e9, id: "601798.SH" },
                { name: "合锻智能", scale: 3238414562, id: "603011.SH" },
                { name: "创力集团", scale: 3.4883488e9, id: "603012.SH" },
                { name: "天鹅股份", scale: 2.33704692e9, id: "603029.SH" },
                { name: "如通股份", scale: 2624516759, id: "603036.SH" },
                { name: "乐惠国际", scale: 5156361416, id: "603076.SH" },
                { name: "越剑智能", scale: 2.94096e9, id: "603095.SH" },
                { name: "上海亚虹", scale: 1.8984e9, id: "603159.SH" },
                { name: "兰石重装", scale: 9666559305, id: "603169.SH" },
                { name: "上机数控", scale: 39088084738, id: "603185.SH" },
                { name: "快克智能", scale: 7.94869302e9, id: "603203.SH" },
                { name: "景津装备", scale: 15311014127, id: "603279.SH" },
                { name: "赛腾股份", scale: 8769838472, id: "603283.SH" },
                { name: "泰瑞机器", scale: 2473864372, id: "603289.SH" },
                { name: "杭叉集团", scale: 19216813919, id: "603298.SH" },
                { name: "水发燃气", scale: 2838863774, id: "603318.SH" },
                { name: "梅轮电梯", scale: 2.0262e9, id: "603321.SH" },
                { name: "盛剑环境", scale: 1737913007, id: "603324.SH" },
                { name: "杰克股份", scale: 9196404974, id: "603337.SH" },
                { name: "浙江鼎力", scale: 26380724496, id: "603338.SH" },
                { name: "华菱精工", scale: 1.8187576e9, id: "603356.SH" },
                { name: "展鹏科技", scale: 1935896617, id: "603488.SH" },
                { name: "诺力股份", scale: 6201357676, id: "603611.SH" },
                { name: "艾迪精密", scale: 13404961236, id: "603638.SH" },
                { name: "泰禾智能", scale: 2013083744, id: "603656.SH" },
                { name: "福龙马", scale: 3927946715, id: "603686.SH" },
                { name: "至纯科技", scale: 13904165487, id: "603690.SH" },
                { name: "星光农机", scale: 2.1294e9, id: "603789.SH" },
                { name: "道森股份", scale: 5.59104e9, id: "603800.SH" },
                { name: "华荣股份", scale: 8.71914897e9, id: "603855.SH" },
                { name: "天永智能", scale: 2.78306e9, id: "603895.SH" },
                { name: "永创智能", scale: 6667799075, id: "603901.SH" },
                { name: "佳力图", scale: 4519826248, id: "603912.SH" },
                { name: "威派格", scale: 4311531878, id: "603956.SH" },
                { name: "克来机电", scale: 4.44630248e9, id: "603960.SH" },
                { name: "法兰泰克", scale: 4288685911, id: "603966.SH" },
                { name: "健麾信息", scale: 3071724966, id: "605186.SH" },
                { name: "同力日升", scale: 1.4784e9, id: "605286.SH" },
                { name: "中际联合", scale: 4.2068334e9, id: "605305.SH" },
                { name: "华兴源创", scale: 14214938531, id: "688001.SH" },
                { name: "杭可科技", scale: 18545670886, id: "688006.SH" },
                { name: "中微公司", scale: 113537801128, id: "688012.SH" },
                { name: "瀚川智能", scale: 5714446199, id: "688022.SH" },
                { name: "芯源微", scale: 26914906749, id: "688037.SH" },
                { name: "金达莱", scale: 2.14072232e9, id: "688057.SH" },
                { name: "华依科技", scale: 1992812898, id: "688071.SH" },
                { name: "瑞松科技", scale: 1782361158, id: "688090.SH" },
                { name: "爱科科技", scale: 7.1922119e8, id: "688092.SH" },
                { name: "博众精工", scale: 1479654123, id: "688097.SH" },
                { name: "联测科技", scale: 2.03188938e9, id: "688113.SH" },
                { name: "卓然股份", scale: 5238190638, id: "688121.SH" },
                { name: "中国电研", scale: 9.137655e9, id: "688128.SH" },
                { name: "先惠技术", scale: 1820749575, id: "688155.SH" },
                { name: "华峰测控", scale: 27321166564, id: "688200.SH" },
                { name: "中科微至", scale: 2616206078, id: "688211.SH" },
                { name: "瑞晟智能", scale: 515383443, id: "688215.SH" },
                { name: "凯尔达", scale: 1757010898, id: "688255.SH" },
                { name: "*ST恒誉", scale: 1060597931, id: "688309.SH" },
                { name: "迈得医疗", scale: 3090920871, id: "688310.SH" },
                { name: "燕麦科技", scale: 1167543266, id: "688312.SH" },
                { name: "深科达", scale: 1148346362, id: "688328.SH" },
                { name: "艾隆科技", scale: 1.63018695e9, id: "688329.SH" },
                { name: "迪威尔", scale: 3268259044, id: "688377.SH" },
                { name: "奥来德", scale: 3852955814, id: "688378.SH" },
                { name: "新益昌", scale: 3797836109, id: "688383.SH" },
                { name: "铁建重工", scale: 9351377392, id: "688425.SH" },
                { name: "利元亨", scale: 4791109674, id: "688499.SH" },
                { name: "青达环保", scale: 1417911699, id: "688501.SH" },
                { name: "联赢激光", scale: 7017957212, id: "688518.SH" },
                { name: "豪森股份", scale: 1016667312, id: "688529.SH" },
                { name: "科威尔", scale: 2898295838, id: "688551.SH" },
                { name: "高测股份", scale: 11249266964, id: "688556.SH" },
                { name: "海目星", scale: 6046424865, id: "688559.SH" },
                { name: "正帆科技", scale: 9545089243, id: "688596.SH" },
                { name: "皖仪科技", scale: 1695890874, id: "688600.SH" },
                { name: "芯碁微装", scale: 5513814567, id: "688630.SH" },
                { name: "星球石墨", scale: 1063597363, id: "688633.SH" },
                { name: "东威科技", scale: 7774144247, id: "688700.SH" },
                { name: "宏华数科", scale: 5924026917, id: "688789.SH" },
                { name: "浩淼科技", scale: 275324593, id: "831856.BJ" },
                { name: "三友科技", scale: 2.1173519e8, id: "834475.BJ" },
                { name: "同力股份", scale: 1436141784, id: "834599.BJ" },
                { name: "五新隧装", scale: 380105541, id: "835174.BJ" },
                { name: "凯腾精工", scale: 302871383, id: "871553.BJ" },
              ],
              name: "专用设备",
              scale: 1705525992043,
              id: "640200",
            },
            {
              children: [
                { name: "航天科技", scale: 7694661554, id: "000901.SZ" },
                { name: "奥普光电", scale: 7.15902102e9, id: "002338.SZ" },
                { name: "东方中科", scale: 5813083283, id: "002819.SZ" },
                { name: "威星智能", scale: 2129288035, id: "002849.SZ" },
                { name: "三晖电气", scale: 2.32448e9, id: "002857.SZ" },
                { name: "华盛昌", scale: 3996001998, id: "002980.SZ" },
                { name: "汉威科技", scale: 4895661519, id: "300007.SZ" },
                { name: "三川智慧", scale: 5257963448, id: "300066.SZ" },
                { name: "万讯自控", scale: 2207605962, id: "300112.SZ" },
                { name: "中航电测", scale: 28829112351, id: "300114.SZ" },
                { name: "天瑞仪器", scale: 2179413916, id: "300165.SZ" },
                { name: "新天科技", scale: 2807680263, id: "300259.SZ" },
                { name: "远方信息", scale: 1754429568, id: "300306.SZ" },
                { name: "麦克奥迪", scale: 6360791866, id: "300341.SZ" },
                { name: "金卡智能", scale: 4853453459, id: "300349.SZ" },
                { name: "东华测试", scale: 3630284905, id: "300354.SZ" },
                { name: "*ST安控", scale: 3191658442, id: "300370.SZ" },
                { name: "汇中股份", scale: 1.43740958e9, id: "300371.SZ" },
                { name: "正业科技", scale: 3035007582, id: "300410.SZ" },
                { name: "苏试试验", scale: 10920866755, id: "300416.SZ" },
                { name: "南华仪器", scale: 793426714, id: "300417.SZ" },
                { name: "康斯特", scale: 1820209672, id: "300445.SZ" },
                { name: "三德科技", scale: 2441214179, id: "300515.SZ" },
                { name: "集智股份", scale: 1994458608, id: "300553.SZ" },
                { name: "理工光科", scale: 2.11625983e9, id: "300557.SZ" },
                { name: "精测电子", scale: 2.343587514e10, id: "300567.SZ" },
                { name: "安车检测", scale: 2616246893, id: "300572.SZ" },
                { name: "星云股份", scale: 3008643335, id: "300648.SZ" },
                { name: "必创科技", scale: 2531708817, id: "300667.SZ" },
                { name: "海川智能", scale: 1935135082, id: "300720.SZ" },
                { name: "山科智能", scale: 8.4800685e8, id: "300897.SZ" },
                { name: "迈拓股份", scale: 1.4415795e9, id: "301006.SZ" },
                { name: "瑞纳智能", scale: 1.3608696e9, id: "301129.SZ" },
                { name: "海兴电力", scale: 10702180476, id: "603556.SH" },
                { name: "柯力传感", scale: 5139186584, id: "603662.SH" },
                { name: "宁水集团", scale: 2.70718344e9, id: "603700.SH" },
                { name: "咸亨国际", scale: 2001752408, id: "605056.SH" },
                { name: "莱伯泰科", scale: 1.29034032e9, id: "688056.SH" },
                { name: "鼎阳科技", scale: 2785202052, id: "688112.SH" },
                { name: "秦川物联", scale: 5.1355803e8, id: "688528.SH" },
                { name: "禾信仪器", scale: 1347086332, id: "688622.SH" },
                { name: "优利德", scale: 1.9270484e9, id: "688628.SH" },
                { name: "四方光电", scale: 1.7427485e9, id: "688665.SH" },
                { name: "奥普特", scale: 5376206423, id: "688686.SH" },
                { name: "容知日新", scale: 4654775993, id: "688768.SH" },
                { name: "海希通讯", scale: 473737088, id: "831305.BJ" },
                { name: "创远信科", scale: 1083914237, id: "831961.BJ" },
                { name: "中寰股份", scale: 210254375, id: "836260.BJ" },
              ],
              name: "仪器仪表",
              scale: 198776684384,
              id: "640300",
            },
            {
              children: [
                { name: "中集集团", scale: 16293962565, id: "000039.SZ" },
                { name: "恒星科技", scale: 5680696829, id: "002132.SZ" },
                { name: "通润装备", scale: 6392695104, id: "002150.SZ" },
                { name: "巨力索具", scale: 3.5543415e9, id: "002342.SZ" },
                { name: "大金重工", scale: 16620916347, id: "002487.SZ" },
                { name: "泰嘉股份", scale: 3.26828709e9, id: "002843.SZ" },
                { name: "祥鑫科技", scale: 5.09440277e9, id: "002965.SZ" },
                { name: "华亚智能", scale: 2004847242, id: "003043.SZ" },
                { name: "富瑞特装", scale: 2833915679, id: "300228.SZ" },
                { name: "宝色股份", scale: 3.90062e9, id: "300402.SZ" },
                { name: "海昌新材", scale: 7.81869e8, id: "300885.SZ" },
                { name: "恒而达", scale: 1.01481912e9, id: "300946.SZ" },
                { name: "震裕科技", scale: 3.4763866e9, id: "300953.SZ" },
                { name: "致远新能", scale: 9.4103506e8, id: "300985.SZ" },
                { name: "津荣天宇", scale: 979151167, id: "300988.SZ" },
                { name: "海锅股份", scale: 1.10489022e9, id: "301063.SZ" },
                { name: "丰光精密", scale: 5.594155e8, id: "430510.BJ" },
                { name: "大西洋", scale: 3096736667, id: "600558.SH" },
                { name: "京城股份", scale: 4376118463, id: "600860.SH" },
                { name: "贵绳股份", scale: 4.2130971e9, id: "600992.SH" },
                { name: "玉龙股份", scale: 9224043453, id: "601028.SH" },
                { name: "赛福天", scale: 3.3755904e9, id: "603028.SH" },
                { name: "大业股份", scale: 2248704331, id: "603278.SH" },
                { name: "科森科技", scale: 3995133768, id: "603626.SH" },
                { name: "银龙股份", scale: 3.98531e9, id: "603969.SH" },
                { name: "华锐精密", scale: 3694488035, id: "688059.SH" },
                { name: "新锐股份", scale: 1.97642622e9, id: "688257.SH" },
                { name: "欧科亿", scale: 4272380088, id: "688308.SH" },
                { name: "明志科技", scale: 909620951, id: "688355.SH" },
                { name: "华光新材", scale: 8.740785e8, id: "688379.SH" },
                { name: "拾比佰", scale: 366471802, id: "831768.BJ" },
                { name: "美之高", scale: 254304365, id: "834765.BJ" },
                { name: "吉冈精密", scale: 308407982, id: "836720.BJ" },
              ],
              name: "金属制品",
              scale: 121673163918,
              id: "640400",
            },
            {
              children: [
                { name: "神州高铁", scale: 6206974753, id: "000008.SZ" },
                { name: "众合科技", scale: 4313229636, id: "000925.SZ" },
                { name: "华铁股份", scale: 5804143243, id: "000976.SZ" },
                { name: "科安达", scale: 1586091116, id: "002972.SZ" },
                { name: "永贵电器", scale: 3511404427, id: "300351.SZ" },
                { name: "朗进科技", scale: 1856267149, id: "300594.SZ" },
                { name: "交大思诺", scale: 8.0991144e8, id: "300851.SZ" },
                { name: "日月明", scale: 762245436, id: "300906.SZ" },
                { name: "研奥股份", scale: 669353495, id: "300923.SZ" },
                { name: "通业科技", scale: 4.47488e8, id: "300960.SZ" },
                { name: "雷尔伟", scale: 6.003e8, id: "301016.SZ" },
                { name: "金鹰重工", scale: 1734667534, id: "301048.SZ" },
                { name: "晋西车轴", scale: 4869009271, id: "600495.SH" },
                { name: "中铁工业", scale: 23504015801, id: "600528.SH" },
                { name: "中国中车", scale: 167861806531, id: "601766.SH" },
                { name: "康尼机电", scale: 4054518763, id: "603111.SH" },
                { name: "祥和实业", scale: 2873612708, id: "603500.SH" },
                { name: "今创集团", scale: 6669446707, id: "603680.SH" },
                { name: "威奥股份", scale: 1555701336, id: "605001.SH" },
                { name: "必得科技", scale: 5.577e8, id: "605298.SH" },
                { name: "中国通号", scale: 5.655387808e10, id: "688009.SH" },
                { name: "交控科技", scale: 4621529731, id: "688015.SH" },
                { name: "天宜上佳", scale: 8485673916, id: "688033.SH" },
                { name: "时代电气", scale: 10055076027, id: "688187.SH" },
                { name: "高铁电气", scale: 9.6278415e8, id: "688285.SH" },
                { name: "工大高科", scale: 1086606289, id: "688367.SH" },
                { name: "铁科轨道", scale: 5432568042, id: "688569.SH" },
              ],
              name: "运输设备",
              scale: 327446003581,
              id: "640500",
            },
          ],
          name: "机械设备",
          scale: 3192927863531,
          id: "640000",
        },
        {
          children: [
            {
              children: [
                { name: "航天电器", scale: 28004476413, id: "002025.SZ" },
                { name: "北斗星通", scale: 13420234158, id: "002151.SZ" },
                { name: "星网宇达", scale: 3828109921, id: "002829.SZ" },
                { name: "天奥电子", scale: 6.46377113e9, id: "002935.SZ" },
                { name: "天箭科技", scale: 2001266891, id: "002977.SZ" },
                { name: "中天火箭", scale: 2.14786773e9, id: "003009.SZ" },
                { name: "钢研高纳", scale: 16588112765, id: "300034.SZ" },
                { name: "振芯科技", scale: 1.308143249e10, id: "300101.SZ" },
                { name: "亚光科技", scale: 7594682781, id: "300123.SZ" },
                { name: "景嘉微", scale: 32943384579, id: "300474.SZ" },
                { name: "新余国科", scale: 5.42365824e9, id: "300722.SZ" },
                { name: "中国卫星", scale: 34528682742, id: "600118.SH" },
                { name: "航天动力", scale: 6094870623, id: "600343.SH" },
                { name: "航天电子", scale: 21128737877, id: "600879.SH" },
                { name: "中国卫通", scale: 9.136e10, id: "601698.SH" },
                { name: "鸿远电子", scale: 16838945928, id: "603267.SH" },
                { name: "火炬电子", scale: 18754823224, id: "603678.SH" },
                { name: "国光电气", scale: 3481787389, id: "688776.SH" },
              ],
              name: "航天装备",
              scale: 323684844881,
              id: "650100",
            },
            {
              children: [
                { name: "烽火电子", scale: 5267733503, id: "000561.SZ" },
                { name: "*ST炼石", scale: 3951687821, id: "000697.SZ" },
                { name: "航发控制", scale: 28690086596, id: "000738.SZ" },
                { name: "中航西飞", scale: 70711070606, id: "000768.SZ" },
                { name: "中航机电", scale: 0.0, id: "002013.SZ" },
                { name: "海特高新", scale: 6180268926, id: "002023.SZ" },
                { name: "中航光电", scale: 85320655085, id: "002179.SZ" },
                { name: "成飞集成", scale: 8017600816, id: "002190.SZ" },
                { name: "博云新材", scale: 4263899853, id: "002297.SZ" },
                { name: "航天彩虹", scale: 20314564448, id: "002389.SZ" },
                { name: "雷科防务", scale: 6040144729, id: "002413.SZ" },
                { name: "信质集团", scale: 4992903453, id: "002664.SZ" },
                { name: "新兴装备", scale: 1720148566, id: "002933.SZ" },
                { name: "北摩高科", scale: 8377286624, id: "002985.SZ" },
                { name: "ST新研", scale: 4957435606, id: "300159.SZ" },
                { name: "天和防务", scale: 4262385522, id: "300397.SZ" },
                { name: "航新科技", scale: 3100264969, id: "300424.SZ" },
                { name: "晨曦航空", scale: 5497859528, id: "300581.SZ" },
                { name: "爱乐达", scale: 4688895054, id: "300696.SZ" },
                { name: "安达维尔", scale: 2.01254047e9, id: "300719.SZ" },
                { name: "三角防务", scale: 18157565789, id: "300775.SZ" },
                { name: "广联航空", scale: 4027222961, id: "300900.SZ" },
                { name: "恒宇信通", scale: 8.1946605e8, id: "300965.SZ" },
                { name: "中直股份", scale: 24280545932, id: "600038.SH" },
                { name: "洪都航空", scale: 17805953333, id: "600316.SH" },
                { name: "中航电子", scale: 71491531065, id: "600372.SH" },
                { name: "航发科技", scale: 6777555905, id: "600391.SH" },
                { name: "中航沈飞", scale: 1.1098539356e11, id: "600760.SH" },
                { name: "中航重机", scale: 3.543155332e10, id: "600765.SH" },
                { name: "中航高科", scale: 30326679059, id: "600862.SH" },
                { name: "航发动力", scale: 107864019394, id: "600893.SH" },
                { name: "派克新材", scale: 6174891841, id: "605123.SH" },
                { name: "新光光电", scale: 1.32719708e9, id: "688011.SH" },
                { name: "纵横股份", scale: 1.6146466e9, id: "688070.SH" },
                { name: "航宇科技", scale: 7742908508, id: "688239.SH" },
                { name: "航亚科技", scale: 2642150869, id: "688510.SH" },
                { name: "江航装备", scale: 4.35187549e9, id: "688586.SH" },
                { name: "智明达", scale: 2644059664, id: "688636.SH" },
                { name: "迈信林", scale: 1050252713, id: "688685.SH" },
                { name: "星辰科技", scale: 460178061, id: "832885.BJ" },
              ],
              name: "航空装备",
              scale: 734343079369,
              id: "650200",
            },
            {
              children: [
                { name: "中兵红箭", scale: 27050771314, id: "000519.SZ" },
                { name: "航天发展", scale: 16632529498, id: "000547.SZ" },
                { name: "甘化科工", scale: 4780215542, id: "000576.SZ" },
                { name: "奥维通信", scale: 1913364063, id: "002231.SZ" },
                { name: "海格通信", scale: 21563549042, id: "002465.SZ" },
                { name: "中船应急", scale: 7.27243248e9, id: "300527.SZ" },
                { name: "上海瀚讯", scale: 9042338477, id: "300762.SZ" },
                { name: "捷强装备", scale: 1680749494, id: "300875.SZ" },
                { name: "天秦装备", scale: 1.65890639e9, id: "300922.SZ" },
                { name: "光电股份", scale: 6.14074317e9, id: "600184.SH" },
                { name: "北方导航", scale: 15950116978, id: "600435.SH" },
                { name: "国睿科技", scale: 10248053111, id: "600562.SH" },
                { name: "中国海防", scale: 1.848347033e10, id: "600764.SH" },
                { name: "内蒙一机", scale: 16423221261, id: "600967.SH" },
                { name: "四创电子", scale: 6.64254426e9, id: "600990.SH" },
                { name: "长城军工", scale: 9328061792, id: "601606.SH" },
                { name: "兴图新科", scale: 1.417536e9, id: "688081.SH" },
                { name: "盟升电子", scale: 4745771436, id: "688311.SH" },
                { name: "天微电子", scale: 1528485945, id: "688511.SH" },
                { name: "霍莱沃", scale: 2997601002, id: "688682.SH" },
                { name: "科思科技", scale: 3242985031, id: "688788.SH" },
              ],
              name: "地面兵装",
              scale: 188743446616,
              id: "650300",
            },
            {
              children: [
                { name: "天海防务", scale: 6354395115, id: "300008.SZ" },
                { name: "海兰信", scale: 9349297131, id: "300065.SZ" },
                { name: "江龙船艇", scale: 2.86926465e9, id: "300589.SZ" },
                { name: "国瑞科技", scale: 2598557472, id: "300600.SZ" },
                { name: "中科海讯", scale: 2.410581e9, id: "300810.SZ" },
                { name: "中船科技", scale: 11964060599, id: "600072.SH" },
                { name: "中国船舶", scale: 110424266035, id: "600150.SH" },
                { name: "中国动力", scale: 33878395337, id: "600482.SH" },
                { name: "中船防务", scale: 20790524431, id: "600685.SH" },
                { name: "亚星锚链", scale: 8.97039e9, id: "601890.SH" },
                { name: "中国重工", scale: 92751973784, id: "601989.SH" },
              ],
              name: "船舶制造",
              scale: 302361705554,
              id: "650400",
            },
          ],
          name: "国防军工",
          scale: 1.54913307642e12,
          id: "650000",
        },
        {
          children: [
            {
              children: [
                { name: "中国长城", scale: 39177576286, id: "000066.SZ" },
                { name: "浪潮信息", scale: 64251142874, id: "000977.SZ" },
                { name: "新 大 陆", scale: 16195978963, id: "000997.SZ" },
                { name: "广电运通", scale: 29537391185, id: "002152.SZ" },
                { name: "*ST御银", scale: 2603274225, id: "002177.SZ" },
                { name: "纳思达", scale: 52194168337, id: "002180.SZ" },
                { name: "证通电子", scale: 5641949935, id: "002197.SZ" },
                { name: "电科网安", scale: 3.081380153e10, id: "002268.SZ" },
                { name: "辉煌科技", scale: 2748440294, id: "002296.SZ" },
                { name: "威创股份", scale: 4581173412, id: "002308.SZ" },
                { name: "新北洋", scale: 4791408157, id: "002376.SZ" },
                { name: "合众思壮", scale: 3876631471, id: "002383.SZ" },
                { name: "达华智能", scale: 3872246547, id: "002512.SZ" },
                { name: "英飞拓", scale: 10244640267, id: "002528.SZ" },
                { name: "雷柏科技", scale: 4.26277555e9, id: "002577.SZ" },
                { name: "同为股份", scale: 1737398822, id: "002835.SZ" },
                { name: "中新赛克", scale: 6.93661319e9, id: "002912.SZ" },
                { name: "锐明技术", scale: 2989947855, id: "002970.SZ" },
                { name: "盛视科技", scale: 2.46996261e9, id: "002990.SZ" },
                { name: "声迅股份", scale: 845063692, id: "003004.SZ" },
                { name: "朗科科技", scale: 5194933067, id: "300042.SZ" },
                { name: "华力创通", scale: 4154075724, id: "300045.SZ" },
                { name: "新国都", scale: 5746473736, id: "300130.SZ" },
                { name: "安居宝", scale: 1542290112, id: "300155.SZ" },
                { name: "中海达", scale: 4140725796, id: "300177.SZ" },
                { name: "中威电子", scale: 1479139051, id: "300270.SZ" },
                { name: "同有科技", scale: 4.92102049e9, id: "300302.SZ" },
                { name: "兆日科技", scale: 2149897831, id: "300333.SZ" },
                { name: "汇金股份", scale: 3352130583, id: "300368.SZ" },
                { name: "飞天诚信", scale: 2833808445, id: "300386.SZ" },
                { name: "汉邦高科", scale: 1779982956, id: "300449.SZ" },
                { name: "康拓红外", scale: 6413033046, id: "300455.SZ" },
                { name: "华铭智能", scale: 1333012016, id: "300462.SZ" },
                { name: "神思电子", scale: 3.89746831e9, id: "300479.SZ" },
                { name: "雄帝科技", scale: 2354271184, id: "300546.SZ" },
                { name: "古鳌科技", scale: 4124341533, id: "300551.SZ" },
                { name: "智莱科技", scale: 2284169444, id: "300771.SZ" },
                { name: "唐源电气", scale: 1306005627, id: "300789.SZ" },
                { name: "天迈科技", scale: 1166352645, id: "300807.SZ" },
                { name: "捷安高科", scale: 1499999049, id: "300845.SZ" },
                { name: "狄耐克", scale: 1993555273, id: "300884.SZ" },
                { name: "创识科技", scale: 1804647259, id: "300941.SZ" },
                { name: "安联锐视", scale: 1.35063731e9, id: "301042.SZ" },
                { name: "凯旺科技", scale: 732024095, id: "301182.SZ" },
                { name: "同方股份", scale: 25756281884, id: "600100.SH" },
                { name: "渤海化学", scale: 3082028961, id: "600800.SH" },
                { name: "航天长峰", scale: 5343279318, id: "600855.SH" },
                { name: "中科曙光", scale: 77672029268, id: "603019.SH" },
                { name: "恒银科技", scale: 2.7951924e9, id: "603106.SH" },
                { name: "恒为科技", scale: 4448621272, id: "603496.SH" },
                { name: "淳中科技", scale: 3896352112, id: "603516.SH" },
                { name: "苏州科达", scale: 3.29634012e9, id: "603660.SH" },
                { name: "冠石科技", scale: 832046187, id: "605588.SH" },
                { name: "云涌科技", scale: 1504232033, id: "688060.SH" },
                { name: "道通科技", scale: 12304485289, id: "688208.SH" },
                { name: "鸿泉物联", scale: 2055043482, id: "688288.SH" },
              ],
              name: "计算机设备",
              scale: 5.0031151211e11,
              id: "710100",
            },
            {
              children: [
                { name: "ST国华", scale: 1256951136, id: "000004.SZ" },
                { name: "神州数码", scale: 16128579273, id: "000034.SZ" },
                { name: "常山北明", scale: 11669447172, id: "000158.SZ" },
                { name: "神州信息", scale: 13191695938, id: "000555.SZ" },
                { name: "*ST顺利", scale: 9.1130123e8, id: "000606.SZ" },
                { name: "紫光股份", scale: 92952595905, id: "000938.SZ" },
                { name: "南天信息", scale: 7336263935, id: "000948.SZ" },
                { name: "远光软件", scale: 13388046428, id: "002063.SZ" },
                { name: "东华软件", scale: 22362264124, id: "002065.SZ" },
                { name: "凯瑞德", scale: 1780053314, id: "002072.SZ" },
                { name: "石基信息", scale: 25307014739, id: "002153.SZ" },
                { name: "二三四五", scale: 17532261281, id: "002195.SZ" },
                { name: "天融信", scale: 13441011499, id: "002212.SZ" },
                { name: "科大讯飞", scale: 123500718362, id: "002230.SZ" },
                { name: "启明信息", scale: 6965751158, id: "002232.SZ" },
                { name: "川大智胜", scale: 3526050924, id: "002253.SZ" },
                { name: "久其软件", scale: 5776510344, id: "002279.SZ" },
                { name: "联络互动", scale: 7271478919, id: "002280.SZ" },
                { name: "川发龙蟒", scale: 12694903431, id: "002312.SZ" },
                { name: "亚联发展", scale: 1546686825, id: "002316.SZ" },
                { name: "皖通科技", scale: 2814763624, id: "002331.SZ" },
                { name: "汉王科技", scale: 5211768076, id: "002362.SZ" },
                { name: "太极股份", scale: 27364449797, id: "002368.SZ" },
                { name: "千方科技", scale: 2.060258139e10, id: "002373.SZ" },
                { name: "科远智慧", scale: 2817352405, id: "002380.SZ" },
                { name: "中远海科", scale: 8888966311, id: "002401.SZ" },
                { name: "四维图新", scale: 28679677083, id: "002405.SZ" },
                { name: "广联达", scale: 62183521457, id: "002410.SZ" },
                { name: "*ST深南", scale: 360860182, id: "002417.SZ" },
                { name: "达实智能", scale: 6977907689, id: "002421.SZ" },
                { name: "启明星辰", scale: 25861527535, id: "002439.SZ" },
                { name: "榕基软件", scale: 4580878412, id: "002474.SZ" },
                { name: "金财互联", scale: 5525040825, id: "002530.SZ" },
                { name: "海联金汇", scale: 8617282908, id: "002537.SZ" },
                { name: "捷顺科技", scale: 4631855984, id: "002609.SZ" },
                { name: "荣联科技", scale: 4342721762, id: "002642.SZ" },
                { name: "博彦科技", scale: 7.21056243e9, id: "002649.SZ" },
                { name: "中科金财", scale: 5.05747993e9, id: "002657.SZ" },
                { name: "索菱股份", scale: 3788990091, id: "002766.SZ" },
                { name: "真视通", scale: 2077899954, id: "002771.SZ" },
                { name: "久远银海", scale: 13439495431, id: "002777.SZ" },
                { name: "德赛西威", scale: 5.7987181e10, id: "002920.SZ" },
                { name: "京北方", scale: 4027314994, id: "002987.SZ" },
                { name: "竞业达", scale: 1640036973, id: "003005.SZ" },
                { name: "直真科技", scale: 1032603077, id: "003007.SZ" },
                { name: "吉大正元", scale: 3722781433, id: "003029.SZ" },
                { name: "神州泰岳", scale: 21444119038, id: "300002.SZ" },
                { name: "豆神教育", scale: 2283381461, id: "300010.SZ" },
                { name: "银江技术", scale: 5175132311, id: "300020.SZ" },
                { name: "同花顺", scale: 53277360712, id: "300033.SZ" },
                { name: "超图软件", scale: 9519241182, id: "300036.SZ" },
                { name: "赛为智能", scale: 2589800668, id: "300044.SZ" },
                { name: "天源迪科", scale: 3998465242, id: "300047.SZ" },
                { name: "华平股份", scale: 2095789519, id: "300074.SZ" },
                { name: "数字政通", scale: 12271107238, id: "300075.SZ" },
                { name: "思创医惠", scale: 4109921724, id: "300078.SZ" },
                { name: "数码视讯", scale: 8.43798666e9, id: "300079.SZ" },
                { name: "银之杰", scale: 5966689443, id: "300085.SZ" },
                { name: "易联众", scale: 2364550178, id: "300096.SZ" },
                { name: "世纪瑞尔", scale: 2192766572, id: "300150.SZ" },
                { name: "东方国信", scale: 10720323993, id: "300166.SZ" },
                { name: "迪威迅", scale: 1495224575, id: "300167.SZ" },
                { name: "万达信息", scale: 16269235153, id: "300168.SZ" },
                { name: "汉得信息", scale: 9799276574, id: "300170.SZ" },
                { name: "美亚柏科", scale: 17106680009, id: "300188.SZ" },
                { name: "有棵树", scale: 1985984927, id: "300209.SZ" },
                { name: "易华录", scale: 25603294716, id: "300212.SZ" },
                { name: "拓尔思", scale: 20804728997, id: "300229.SZ" },
                { name: "银信科技", scale: 3250308017, id: "300231.SZ" },
                { name: "方直科技", scale: 2153829738, id: "300235.SZ" },
                { name: "天玑科技", scale: 2835842153, id: "300245.SZ" },
                { name: "新开普", scale: 4869415557, id: "300248.SZ" },
                { name: "初灵信息", scale: 2562117027, id: "300250.SZ" },
                { name: "卫宁健康", scale: 23057536843, id: "300253.SZ" },
                { name: "佳创视讯", scale: 2196040678, id: "300264.SZ" },
                { name: "华宇软件", scale: 6602654218, id: "300271.SZ" },
                { name: "海联讯", scale: 2444718936, id: "300277.SZ" },
                { name: "飞利信", scale: 4661859872, id: "300287.SZ" },
                { name: "朗玛信息", scale: 4301151304, id: "300288.SZ" },
                { name: "荣科科技", scale: 3071792594, id: "300290.SZ" },
                { name: "*ST蓝盾", scale: 760934022, id: "300297.SZ" },
                { name: "海峡创新", scale: 2940309155, id: "300300.SZ" },
                { name: "任子行", scale: 3911620035, id: "300311.SZ" },
                { name: "旋极信息", scale: 5359363233, id: "300324.SZ" },
                { name: "*ST计通", scale: 910313818, id: "300330.SZ" },
                { name: "润和软件", scale: 1.973402973e10, id: "300339.SZ" },
                { name: "立方数科", scale: 3541231106, id: "300344.SZ" },
                { name: "长亮科技", scale: 7693281771, id: "300348.SZ" },
                { name: "北信源", scale: 6267616324, id: "300352.SZ" },
                { name: "恒华科技", scale: 3372421923, id: "300365.SZ" },
                { name: "创意信息", scale: 5705072693, id: "300366.SZ" },
                { name: "绿盟科技", scale: 10695361797, id: "300369.SZ" },
                { name: "赢时胜", scale: 6316266666, id: "300377.SZ" },
                { name: "鼎捷软件", scale: 5814331324, id: "300378.SZ" },
                { name: "东方通", scale: 12062998935, id: "300379.SZ" },
                { name: "安硕信息", scale: 2268151852, id: "300380.SZ" },
                { name: "天利科技", scale: 2596699941, id: "300399.SZ" },
                { name: "浩丰科技", scale: 2.41612995e9, id: "300419.SZ" },
                { name: "运达科技", scale: 3227447605, id: "300440.SZ" },
                { name: "浩云科技", scale: 3104245476, id: "300448.SZ" },
                { name: "创业慧康", scale: 12283930873, id: "300451.SZ" },
                { name: "深信服", scale: 3.428674509e10, id: "300454.SZ" },
                { name: "高伟达", scale: 5119895465, id: "300465.SZ" },
                { name: "四方精创", scale: 5.95218672e9, id: "300468.SZ" },
                { name: "信息发展", scale: 4138328854, id: "300469.SZ" },
                { name: "中科创达", scale: 33663136905, id: "300496.SZ" },
                { name: "维宏股份", scale: 1391325415, id: "300508.SZ" },
                { name: "科大国创", scale: 5225777522, id: "300520.SZ" },
                { name: "辰安科技", scale: 5.59622823e9, id: "300523.SZ" },
                { name: "博思软件", scale: 10703447336, id: "300525.SZ" },
                { name: "今天国际", scale: 3416356577, id: "300532.SZ" },
                { name: "先进数通", scale: 3601362428, id: "300541.SZ" },
                { name: "新晨科技", scale: 3069617436, id: "300542.SZ" },
                { name: "和仁科技", scale: 4804745792, id: "300550.SZ" },
                { name: "万集科技", scale: 2822279641, id: "300552.SZ" },
                { name: "丝路视觉", scale: 2440109646, id: "300556.SZ" },
                { name: "佳发教育", scale: 4562900226, id: "300559.SZ" },
                { name: "汇金科技", scale: 2109038482, id: "300561.SZ" },
                { name: "数字认证", scale: 9008360302, id: "300579.SZ" },
                { name: "熙菱信息", scale: 1486629527, id: "300588.SZ" },
                { name: "诚迈科技", scale: 7736461142, id: "300598.SZ" },
                { name: "恒锋信息", scale: 1732756556, id: "300605.SZ" },
                { name: "思特奇", scale: 2022037159, id: "300608.SZ" },
                { name: "汇纳科技", scale: 2073508342, id: "300609.SZ" },
                { name: "万兴科技", scale: 1.324561605e10, id: "300624.SZ" },
                { name: "彩讯股份", scale: 11854222611, id: "300634.SZ" },
                { name: "正元智慧", scale: 3931597153, id: "300645.SZ" },
                { name: "中孚信息", scale: 4.13826945e9, id: "300659.SZ" },
                { name: "科蓝软件", scale: 5933182819, id: "300663.SZ" },
                { name: "宇信科技", scale: 12201516584, id: "300674.SZ" },
                { name: "中科信息", scale: 7467685632, id: "300678.SZ" },
                { name: "朗新科技", scale: 24555495959, id: "300682.SZ" },
                { name: "赛意信息", scale: 1.037834558e10, id: "300687.SZ" },
                { name: "科创信息", scale: 2429572805, id: "300730.SZ" },
                { name: "奥飞数据", scale: 8753716439, id: "300738.SZ" },
                { name: "每日互动", scale: 6972939893, id: "300766.SZ" },
                { name: "迪普科技", scale: 7179942159, id: "300768.SZ" },
                { name: "拉卡拉", scale: 11641141938, id: "300773.SZ" },
                { name: "左江科技", scale: 1.27218123e10, id: "300799.SZ" },
                { name: "指南针", scale: 20121943153, id: "300803.SZ" },
                { name: "金现代", scale: 2159060875, id: "300830.SZ" },
                { name: "首都在线", scale: 6226078879, id: "300846.SZ" },
                { name: "天阳科技", scale: 3631369748, id: "300872.SZ" },
                { name: "铜牛信息", scale: 2333738442, id: "300895.SZ" },
                { name: "法本信息", scale: 3146915164, id: "300925.SZ" },
                { name: "盈建科", scale: 1253329648, id: "300935.SZ" },
                { name: "普联软件", scale: 3850731736, id: "300996.SZ" },
                { name: "亚康股份", scale: 1494324632, id: "301085.SZ" },
                { name: "同辉信息", scale: 362269831, id: "430090.BJ" },
                { name: "航天信息", scale: 27200346486, id: "600271.SH" },
                { name: "华胜天成", scale: 6853091769, id: "600410.SH" },
                { name: "金证股份", scale: 15589304633, id: "600446.SH" },
                { name: "湘邮科技", scale: 2.7607398e9, id: "600476.SH" },
                { name: "中国软件", scale: 40581843665, id: "600536.SH" },
                { name: "恒生电子", scale: 93404316689, id: "600570.SH" },
                { name: "信雅达", scale: 4144456678, id: "600571.SH" },
                { name: "用友网络", scale: 78044220822, id: "600588.SH" },
                { name: "云赛智联", scale: 11258695335, id: "600602.SH" },
                { name: "*ST中安", scale: 6526583383, id: "600654.SH" },
                { name: "东软集团", scale: 1.355370105e10, id: "600718.SH" },
                { name: "佳都科技", scale: 11744333339, id: "600728.SH" },
                { name: "浪潮软件", scale: 5305496587, id: "600756.SH" },
                { name: "浙大网新", scale: 7727003807, id: "600797.SH" },
                { name: "宝信软件", scale: 80216688125, id: "600845.SH" },
                { name: "电科数字", scale: 14455350691, id: "600850.SH" },
                { name: "三六零", scale: 114182903888, id: "601360.SH" },
                { name: "大智慧", scale: 14968876032, id: "601519.SH" },
                { name: "泛微网络", scale: 2.202617173e10, id: "603039.SH" },
                { name: "海量数据", scale: 5806595485, id: "603138.SH" },
                { name: "税友股份", scale: 3998036849, id: "603171.SH" },
                { name: "网达软件", scale: 4226518112, id: "603189.SH" },
                { name: "格尔软件", scale: 3873206321, id: "603232.SH" },
                { name: "顶点软件", scale: 8.76427598e9, id: "603383.SH" },
                { name: "思维列控", scale: 7282340601, id: "603508.SH" },
                { name: "多伦科技", scale: 4631135777, id: "603528.SH" },
                { name: "南威软件", scale: 9.54722422e9, id: "603636.SH" },
                { name: "新智认知", scale: 4545549577, id: "603869.SH" },
                { name: "数据港", scale: 11176946154, id: "603881.SH" },
                { name: "金桥信息", scale: 5.80915261e9, id: "603918.SH" },
                { name: "中科软", scale: 2.4290112e10, id: "603927.SH" },
                { name: "麦迪科技", scale: 3711287265, id: "603990.SH" },
                { name: "新炬网络", scale: 941979653, id: "605398.SH" },
                { name: "博汇科技", scale: 1653896213, id: "688004.SH" },
                { name: "安恒信息", scale: 17262980505, id: "688023.SH" },
                { name: "山石网科", scale: 4276831133, id: "688030.SH" },
                { name: "中科通达", scale: 1107361404, id: "688038.SH" },
                { name: "当虹科技", scale: 4900109665, id: "688039.SH" },
                { name: "佳华科技", scale: 2.93018526e9, id: "688051.SH" },
                { name: "宝兰德", scale: 2.9344e9, id: "688058.SH" },
                { name: "航天宏图", scale: 17117521471, id: "688066.SH" },
                { name: "龙软科技", scale: 3.1877424e9, id: "688078.SH" },
                { name: "中望软件", scale: 10255151917, id: "688083.SH" },
                { name: "虹软科技", scale: 1.386896e10, id: "688088.SH" },
                { name: "福昕软件", scale: 4440894328, id: "688095.SH" },
                { name: "品茗科技", scale: 941675113, id: "688109.SH" },
                { name: "金山办公", scale: 2.0664671552e11, id: "688111.SH" },
                { name: "普元信息", scale: 2.37546e9, id: "688118.SH" },
                { name: "优刻得-W", scale: 8064181109, id: "688158.SH" },
                { name: "安博通", scale: 3.24244009e9, id: "688168.SH" },
                { name: "纬德信息", scale: 836823281, id: "688171.SH" },
                { name: "柏楚电子", scale: 26700246095, id: "688188.SH" },
                { name: "信安世纪", scale: 3059938758, id: "688201.SH" },
                { name: "亚信安全", scale: 2532782259, id: "688225.SH" },
                { name: "品高股份", scale: 1666155212, id: "688227.SH" },
                { name: "开普云", scale: 3477512192, id: "688228.SH" },
                { name: "博睿数据", scale: 1.38782921e9, id: "688229.SH" },
                { name: "新点软件", scale: 5710446419, id: "688232.SH" },
                { name: "嘉和美康", scale: 4.57612847e9, id: "688246.SH" },
                { name: "卓易信息", scale: 7340005846, id: "688258.SH" },
                { name: "和达科技", scale: 1020442401, id: "688296.SH" },
                { name: "青云科技-U", scale: 2202986962, id: "688316.SH" },
                { name: "财富趋势", scale: 4.00206399e9, id: "688318.SH" },
                { name: "光云科技", scale: 2890206858, id: "688365.SH" },
                { name: "致远互联", scale: 6.08869342e9, id: "688369.SH" },
                { name: "慧辰股份", scale: 1224907113, id: "688500.SH" },
                { name: "正元地信", scale: 1783625028, id: "688509.SH" },
                { name: "*ST泽达", scale: 1.7322588e8, id: "688555.SH" },
                { name: "奇安信-U", scale: 31530103518, id: "688561.SH" },
                { name: "中科星图", scale: 11078374776, id: "688568.SH" },
                { name: "山大地纬", scale: 4644698724, id: "688579.SH" },
                { name: "凌志软件", scale: 3930391505, id: "688588.SH" },
                { name: "新致软件", scale: 1921108031, id: "688590.SH" },
                { name: "罗普特", scale: 1844152582, id: "688619.SH" },
                { name: "海天瑞声", scale: 5026521299, id: "688787.SH" },
                { name: "艾融软件", scale: 846671302, id: "830799.BJ" },
                { name: "科达自控", scale: 480597366, id: "831832.BJ" },
                { name: "志晟信息", scale: 270667829, id: "832171.BJ" },
                { name: "恒拓开源", scale: 306174959, id: "834415.BJ" },
                { name: "数字人", scale: 555838484, id: "835670.BJ" },
                { name: "广道数字", scale: 574658281, id: "839680.BJ" },
              ],
              name: "计算机应用",
              scale: 2599472196312,
              id: "710200",
            },
          ],
          name: "计算机",
          scale: 3099783708422,
          id: "710000",
        },
        {
          children: [
            {
              children: [
                { name: "华数传媒", scale: 13975942141, id: "000156.SZ" },
                { name: "广弘控股", scale: 4445098141, id: "000529.SZ" },
                { name: "湖北广电", scale: 6453621568, id: "000665.SZ" },
                { name: "中原传媒", scale: 8005770516, id: "000719.SZ" },
                { name: "华闻集团", scale: 4922131624, id: "000793.SZ" },
                { name: "北京文化", scale: 4042378691, id: "000802.SZ" },
                { name: "欢瑞世纪", scale: 3.39779825e9, id: "000892.SZ" },
                { name: "电广传媒", scale: 8503781112, id: "000917.SZ" },
                { name: "东方智造", scale: 3804776766, id: "002175.SZ" },
                { name: "粤 传 媒", scale: 6387023717, id: "002181.SZ" },
                { name: "中天服务", scale: 1421211216, id: "002188.SZ" },
                { name: "天威视讯", scale: 5826579502, id: "002238.SZ" },
                { name: "奥飞娱乐", scale: 8660634163, id: "002292.SZ" },
                { name: "慈文传媒", scale: 5187152077, id: "002343.SZ" },
                { name: "中南文化", scale: 5712746093, id: "002445.SZ" },
                { name: "中公教育", scale: 23512704027, id: "002607.SZ" },
                { name: "美吉姆", scale: 3.01524806e9, id: "002621.SZ" },
                { name: "勤上股份", scale: 2.96361238e9, id: "002638.SZ" },
                { name: "凯文教育", scale: 2506121445, id: "002659.SZ" },
                { name: "ST美盛", scale: 2528403676, id: "002699.SZ" },
                { name: "万达电影", scale: 28602820651, id: "002739.SZ" },
                { name: "力盛体育", scale: 3.18910269e9, id: "002858.SZ" },
                { name: "金逸影视", scale: 3.0715776e9, id: "002905.SZ" },
                { name: "传智教育", scale: 2524263255, id: "003032.SZ" },
                { name: "华谊兄弟", scale: 6384378665, id: "300027.SZ" },
                { name: "*ST文化", scale: 498921126, id: "300089.SZ" },
                { name: "华策影视", scale: 14800992489, id: "300133.SZ" },
                { name: "捷成股份", scale: 15417586343, id: "300182.SZ" },
                { name: "科德教育", scale: 3009319787, id: "300192.SZ" },
                { name: "光线传媒", scale: 29154356283, id: "300251.SZ" },
                { name: "ST三盛", scale: 1.66192066e9, id: "300282.SZ" },
                { name: "百纳千成", scale: 6453688699, id: "300291.SZ" },
                { name: "ST开元", scale: 1473192021, id: "300338.SZ" },
                { name: "中文在线", scale: 14905676447, id: "300364.SZ" },
                { name: "唐德影视", scale: 4132180981, id: "300426.SZ" },
                { name: "幸福蓝海", scale: 3223059667, id: "300528.SZ" },
                { name: "世纪天鸿", scale: 2928636554, id: "300654.SZ" },
                { name: "中信出版", scale: 7273295449, id: "300788.SZ" },
                { name: "读客文化", scale: 1379933395, id: "301025.SZ" },
                { name: "果麦文化", scale: 3167949103, id: "301052.SZ" },
                { name: "歌华有线", scale: 12901780985, id: "600037.SH" },
                { name: "东望时代", scale: 3.97615723e9, id: "600052.SH" },
                { name: "中视传媒", scale: 4561692408, id: "600088.SH" },
                { name: "ST明诚", scale: 1184270314, id: "600136.SH" },
                { name: "中体产业", scale: 7011400635, id: "600158.SH" },
                { name: "城市传媒", scale: 5.2689828e9, id: "600229.SH" },
                { name: "博通股份", scale: 1.35596318e9, id: "600455.SH" },
                { name: "时代出版", scale: 5603642228, id: "600551.SH" },
                { name: "祥源文旅", scale: 5159622067, id: "600576.SH" },
                { name: "国新文化", scale: 4536625061, id: "600636.SH" },
                { name: "东方明珠", scale: 27418436614, id: "600637.SH" },
                { name: "昂立教育", scale: 2725079373, id: "600661.SH" },
                { name: "文投控股", scale: 4.71132789e9, id: "600715.SH" },
                { name: "长江传媒", scale: 8785719026, id: "600757.SH" },
                { name: "新华传媒", scale: 5099052708, id: "600825.SH" },
                { name: "广电网络", scale: 4334108969, id: "600831.SH" },
                { name: "博瑞传播", scale: 6569111352, id: "600880.SH" },
                { name: "广西广电", scale: 6550422857, id: "600936.SH" },
                { name: "江苏有线", scale: 16952432956, id: "600959.SH" },
                { name: "中国电影", scale: 2.93119e10, id: "600977.SH" },
                { name: "贵广网络", scale: 13307176337, id: "600996.SH" },
                { name: "山东出版", scale: 1.8281244e10, id: "601019.SH" },
                { name: "中南传媒", scale: 2.232428e10, id: "601098.SH" },
                { name: "上海电影", scale: 1.431999e10, id: "601595.SH" },
                { name: "浙文影业", scale: 3.22273712e9, id: "601599.SH" },
                { name: "皖新传媒", scale: 13307779691, id: "601801.SH" },
                { name: "新华文轩", scale: 10492726675, id: "601811.SH" },
                { name: "中国科传", scale: 2.6299935e10, id: "601858.SH" },
                { name: "南方传媒", scale: 12524354393, id: "601900.SH" },
                { name: "浙版传媒", scale: 4011108639, id: "601921.SH" },
                { name: "凤凰传媒", scale: 3.0106167e10, id: "601928.SH" },
                { name: "吉视传媒", scale: 6800668376, id: "601929.SH" },
                { name: "中国出版", scale: 1.5509475e10, id: "601949.SH" },
                { name: "出版传媒", scale: 3867421194, id: "601999.SH" },
                { name: "新经典", scale: 3883835682, id: "603096.SH" },
                { name: "横店影视", scale: 9.92523e9, id: "603103.SH" },
                { name: "中广天择", scale: 2.1411e9, id: "603721.SH" },
                { name: "读者传媒", scale: 3.79584e9, id: "603999.SH" },
                { name: "龙版传媒", scale: 2203864007, id: "605577.SH" },
                { name: "流金科技", scale: 684635119, id: "834021.BJ" },
              ],
              name: "文化传媒",
              scale: 659552883916,
              id: "720100",
            },
            {
              children: [
                { name: "*ST大通", scale: 867067025, id: "000038.SZ" },
                { name: "华媒控股", scale: 4920142935, id: "000607.SZ" },
                { name: "分众传媒", scale: 91563546263, id: "002027.SZ" },
                { name: "利欧股份", scale: 12952712952, id: "002131.SZ" },
                { name: "实益达", scale: 2597269001, id: "002137.SZ" },
                { name: "省广集团", scale: 9633849653, id: "002400.SZ" },
                { name: "恒大高新", scale: 1291412627, id: "002591.SZ" },
                { name: "万润科技", scale: 5181633238, id: "002654.SZ" },
                { name: "思美传媒", scale: 4123726749, id: "002712.SZ" },
                { name: "元隆雅图", scale: 3564049722, id: "002878.SZ" },
                { name: "天地在线", scale: 1.39309117e9, id: "002995.SZ" },
                { name: "若羽臣", scale: 1262333967, id: "003010.SZ" },
                { name: "蓝色光标", scale: 2.372389263e10, id: "300058.SZ" },
                { name: "旗天科技", scale: 3.91259966e9, id: "300061.SZ" },
                { name: "天龙集团", scale: 2640152892, id: "300063.SZ" },
                { name: "福石控股", scale: 4.27014061e9, id: "300071.SZ" },
                { name: "佳云科技", scale: 2377470222, id: "300242.SZ" },
                { name: "联建光电", scale: 1960747619, id: "300269.SZ" },
                { name: "紫天科技", scale: 3723000721, id: "300280.SZ" },
                { name: "*ST新文", scale: 944166767, id: "300336.SZ" },
                { name: "联创股份", scale: 8934132278, id: "300343.SZ" },
                { name: "*ST腾信", scale: 6.117264e8, id: "300392.SZ" },
                { name: "宣亚国际", scale: 3.69290822e9, id: "300612.SZ" },
                { name: "因赛集团", scale: 2073022969, id: "300781.SZ" },
                { name: "壹网壹创", scale: 6117837458, id: "300792.SZ" },
                { name: "电声股份", scale: 3.4662537e9, id: "300805.SZ" },
                { name: "凯淳股份", scale: 8.38328e8, id: "301001.SZ" },
                { name: "*ST中昌", scale: 261750836, id: "600242.SH" },
                { name: "北巴传媒", scale: 3.515904e9, id: "600386.SH" },
                { name: "天下秀", scale: 14082354131, id: "600556.SH" },
                { name: "浙文互联", scale: 8384178361, id: "600986.SH" },
                { name: "引力传媒", scale: 2662557226, id: "603598.SH" },
                { name: "龙韵股份", scale: 1.28246412e9, id: "603729.SH" },
                { name: "华扬联众", scale: 3528978169, id: "603825.SH" },
                { name: "丽人丽妆", scale: 3172921477, id: "605136.SH" },
                { name: "三人行", scale: 6741593185, id: "605168.SH" },
              ],
              name: "营销传播",
              scale: 252269916953,
              id: "720200",
            },
            {
              children: [
                { name: "学大教育", scale: 1913644021, id: "000526.SZ" },
                { name: "智度股份", scale: 7787000473, id: "000676.SZ" },
                { name: "视觉中国", scale: 10487555691, id: "000681.SZ" },
                { name: "生 意 宝", scale: 5653371001, id: "002095.SZ" },
                { name: "广博股份", scale: 2229610219, id: "002103.SZ" },
                { name: "ST天润", scale: 1.15234541e9, id: "002113.SZ" },
                { name: "梦网科技", scale: 11324862135, id: "002123.SZ" },
                { name: "北纬科技", scale: 2.66791993e9, id: "002148.SZ" },
                { name: "惠程科技", scale: 3232221811, id: "002168.SZ" },
                { name: "游族网络", scale: 16128733245, id: "002174.SZ" },
                { name: "聚力文化", scale: 1467272732, id: "002247.SZ" },
                { name: "拓维信息", scale: 15790396595, id: "002261.SZ" },
                { name: "焦点科技", scale: 5.08742788e9, id: "002315.SZ" },
                { name: "天娱数科", scale: 8830163313, id: "002354.SZ" },
                { name: "凯撒文化", scale: 5611490471, id: "002425.SZ" },
                { name: "鼎龙文化", scale: 2873869886, id: "002502.SZ" },
                { name: "恺英网络", scale: 27495643588, id: "002517.SZ" },
                { name: "三七互娱", scale: 44028343041, id: "002555.SZ" },
                { name: "巨人网络", scale: 29332228427, id: "002558.SZ" },
                { name: "世纪华通", scale: 44432511956, id: "002602.SZ" },
                { name: "*ST艾格", scale: 0.0, id: "002619.SZ" },
                { name: "完美世界", scale: 37789823247, id: "002624.SZ" },
                { name: "宝通科技", scale: 6507178208, id: "300031.SZ" },
                { name: "星辉娱乐", scale: 3844768034, id: "300043.SZ" },
                { name: "三五互联", scale: 3776955472, id: "300051.SZ" },
                { name: "中青宝", scale: 5637004119, id: "300052.SZ" },
                { name: "顺网科技", scale: 6347045281, id: "300113.SZ" },
                { name: "天舟文化", scale: 3559456514, id: "300148.SZ" },
                { name: "上海钢联", scale: 12749545642, id: "300226.SZ" },
                { name: "吴通控股", scale: 3.93928519e9, id: "300292.SZ" },
                { name: "三六五网", scale: 1826280002, id: "300295.SZ" },
                { name: "富春股份", scale: 6590533853, id: "300299.SZ" },
                { name: "掌趣科技", scale: 11208020335, id: "300315.SZ" },
                { name: "全通教育", scale: 4318822438, id: "300359.SZ" },
                { name: "芒果超媒", scale: 33348286629, id: "300413.SZ" },
                { name: "昆仑万维", scale: 53197190762, id: "300418.SZ" },
                { name: "汤姆猫", scale: 23436116854, id: "300459.SZ" },
                { name: "迅游科技", scale: 2173893519, id: "300467.SZ" },
                { name: "盛天网络", scale: 7205034849, id: "300494.SZ" },
                { name: "盛讯达", scale: 4778437265, id: "300518.SZ" },
                { name: "冰川网络", scale: 6820680175, id: "300533.SZ" },
                { name: "新媒股份", scale: 11143836716, id: "300770.SZ" },
                { name: "值得买", scale: 3.3256151e9, id: "300785.SZ" },
                { name: "川网传媒", scale: 1.9216652e9, id: "300987.SZ" },
                { name: "天亿马", scale: 1349820582, id: "301178.SZ" },
                { name: "泽宇智能", scale: 1.741014e9, id: "301179.SZ" },
                { name: "鸥玛软件", scale: 2606072255, id: "301185.SZ" },
                { name: "观想科技", scale: 1329120762, id: "301213.SZ" },
                { name: "ST瀚叶", scale: 8.78476605e9, id: "600226.SH" },
                { name: "中文传媒", scale: 20312405148, id: "600373.SH" },
                { name: "浙数文化", scale: 17846800374, id: "600633.SH" },
                { name: "国脉文化", scale: 9619963915, id: "600640.SH" },
                { name: "大晟文化", scale: 3171341769, id: "600892.SH" },
                { name: "人民网", scale: 23672845509, id: "603000.SH" },
                { name: "电魂网络", scale: 1.182229923e10, id: "603258.SH" },
                { name: "吉比特", scale: 38389121675, id: "603444.SH" },
                { name: "掌阅科技", scale: 10608136502, id: "603533.SH" },
                { name: "国联股份", scale: 32243058746, id: "603613.SH" },
                { name: "新华网", scale: 17491289432, id: "603888.SH" },
                { name: "国义招标", scale: 7.690995e8, id: "831039.BJ" },
                { name: "国源科技", scale: 407749498, id: "835184.BJ" },
                { name: "云创数据", scale: 908289484, id: "835305.BJ" },
                { name: "殷图网联", scale: 1.5778725e8, id: "835508.BJ" },
                { name: "汉鑫科技", scale: 193980656, id: "837092.BJ" },
              ],
              name: "互联网传媒",
              scale: 706397049566,
              id: "720300",
            },
          ],
          name: "传媒",
          scale: 1618219850435,
          id: "720000",
        },
        {
          children: [
            {
              children: [
                { name: "ST中嘉", scale: 1574427914, id: "000889.SZ" },
                { name: "二六三", scale: 7132060026, id: "002467.SZ" },
                { name: "会畅通讯", scale: 3796377371, id: "300578.SZ" },
                { name: "线上线下", scale: 1429386286, id: "300959.SZ" },
                { name: "中国联通", scale: 170620744239, id: "600050.SH" },
                { name: "中国移动", scale: 76840910198, id: "600941.SH" },
                { name: "中国电信", scale: 130080424536, id: "601728.SH" },
                { name: "广脉科技", scale: 279163412, id: "838924.BJ" },
              ],
              name: "通信运营",
              scale: 391753493982,
              id: "730100",
            },
            {
              children: [
                { name: "深桑达Ａ", scale: 22979382224, id: "000032.SZ" },
                { name: "中兴通讯", scale: 145561656953, id: "000063.SZ" },
                { name: "特发信息", scale: 7687029069, id: "000070.SZ" },
                { name: "汇源通信", scale: 2.0291856e9, id: "000586.SZ" },
                { name: "富通信息", scale: 3926872053, id: "000836.SZ" },
                { name: "高鸿股份", scale: 6643328751, id: "000851.SZ" },
                { name: "ST高升", scale: 1592951363, id: "000971.SZ" },
                { name: "东信和平", scale: 7374746789, id: "002017.SZ" },
                { name: "*ST新海", scale: 1.18446278e9, id: "002089.SZ" },
                { name: "国脉科技", scale: 8120540761, id: "002093.SZ" },
                { name: "恒宝股份", scale: 4901742446, id: "002104.SZ" },
                { name: "三维通信", scale: 4578877842, id: "002115.SZ" },
                { name: "武汉凡谷", scale: 5827300937, id: "002194.SZ" },
                { name: "光迅科技", scale: 19098805399, id: "002281.SZ" },
                { name: "*ST日海", scale: 3435447376, id: "002313.SZ" },
                { name: "星网锐捷", scale: 13829575391, id: "002396.SZ" },
                { name: "盛路通信", scale: 8151276268, id: "002446.SZ" },
                { name: "通鼎互联", scale: 6776292217, id: "002491.SZ" },
                { name: "普天科技", scale: 14552798396, id: "002544.SZ" },
                { name: "海能达", scale: 7221225039, id: "002583.SZ" },
                { name: "通宇通讯", scale: 4235652102, id: "002792.SZ" },
                { name: "意华股份", scale: 6625705916, id: "002897.SZ" },
                { name: "铭普光磁", scale: 2556265371, id: "002902.SZ" },
                { name: "德生科技", scale: 4966472812, id: "002908.SZ" },
                { name: "润建股份", scale: 6809102191, id: "002929.SZ" },
                { name: "中瓷电子", scale: 8759851549, id: "003031.SZ" },
                { name: "楚天龙", scale: 4090901667, id: "003040.SZ" },
                { name: "网宿科技", scale: 16046987841, id: "300017.SZ" },
                { name: "华星创业", scale: 4088181561, id: "300025.SZ" },
                { name: "世纪鼎利", scale: 2.1803826e9, id: "300050.SZ" },
                { name: "恒信东方", scale: 3571650618, id: "300081.SZ" },
                { name: "高新兴", scale: 5521243482, id: "300098.SZ" },
                { name: "大富科技", scale: 6903330478, id: "300134.SZ" },
                { name: "东软载波", scale: 6279641073, id: "300183.SZ" },
                { name: "天喻信息", scale: 5508066449, id: "300205.SZ" },
                { name: "亿通科技", scale: 2851159706, id: "300211.SZ" },
                { name: "佳讯飞鸿", scale: 3805463868, id: "300213.SZ" },
                { name: "金信诺", scale: 5042325222, id: "300252.SZ" },
                { name: "中际旭创", scale: 58512775753, id: "300308.SZ" },
                { name: "宜通世纪", scale: 2884510747, id: "300310.SZ" },
                { name: "东土科技", scale: 5482196319, id: "300353.SZ" },
                { name: "光环新网", scale: 22442275107, id: "300383.SZ" },
                { name: "天孚通信", scale: 22889746624, id: "300394.SZ" },
                { name: "中光防雷", scale: 2698632306, id: "300414.SZ" },
                { name: "新易盛", scale: 33210014828, id: "300502.SZ" },
                { name: "天邑股份", scale: 4365766656, id: "300504.SZ" },
                { name: "恒实科技", scale: 3347945153, id: "300513.SZ" },
                { name: "优博讯", scale: 4438328569, id: "300531.SZ" },
                { name: "博创科技", scale: 8.20275652e9, id: "300548.SZ" },
                { name: "ST路通", scale: 1341484771, id: "300555.SZ" },
                { name: "中富通", scale: 2597872396, id: "300560.SZ" },
                { name: "神宇股份", scale: 1577934267, id: "300563.SZ" },
                { name: "科信技术", scale: 3445742411, id: "300565.SZ" },
                { name: "太辰光", scale: 6386735075, id: "300570.SZ" },
                { name: "平治信息", scale: 4760048252, id: "300571.SZ" },
                { name: "移为通信", scale: 4.24204878e9, id: "300590.SZ" },
                { name: "吉大通信", scale: 1966866076, id: "300597.SZ" },
                { name: "立昂技术", scale: 2925023594, id: "300603.SZ" },
                { name: "欣天科技", scale: 1.83991625e9, id: "300615.SZ" },
                { name: "光库科技", scale: 10808806993, id: "300620.SZ" },
                { name: "华测导航", scale: 11159749755, id: "300627.SZ" },
                { name: "亿联网络", scale: 30422998558, id: "300628.SZ" },
                { name: "广和通", scale: 9408246101, id: "300638.SZ" },
                { name: "澄天伟业", scale: 1994367299, id: "300689.SZ" },
                { name: "万马科技", scale: 3080623609, id: "300698.SZ" },
                { name: "万隆光电", scale: 1699481511, id: "300710.SZ" },
                { name: "广哈通信", scale: 2870602118, id: "300711.SZ" },
                { name: "兆龙互连", scale: 1.5600375e9, id: "300913.SZ" },
                { name: "南凌科技", scale: 1346525176, id: "300921.SZ" },
                { name: "信濠光电", scale: 3.27184344e9, id: "301051.SZ" },
                { name: "微创光电", scale: 297934288, id: "430198.BJ" },
                { name: "永鼎股份", scale: 9362637458, id: "600105.SH" },
                { name: "波导股份", scale: 3.11808e9, id: "600130.SH" },
                { name: "*ST凯乐", scale: 0.0, id: "600260.SH" },
                { name: "ST信通", scale: 1601561196, id: "600289.SH" },
                { name: "三峡新材", scale: 2900362615, id: "600293.SH" },
                { name: "长江通信", scale: 3.9204e9, id: "600345.SH" },
                { name: "精伦电子", scale: 1535318304, id: "600355.SH" },
                { name: "ST九有", scale: 1.389563e9, id: "600462.SH" },
                { name: "亨通光电", scale: 37716372906, id: "600487.SH" },
                { name: "烽火通信", scale: 22619595265, id: "600498.SH" },
                { name: "中天科技", scale: 52627683634, id: "600522.SH" },
                { name: "ST实达", scale: 9.11621326e9, id: "600734.SH" },
                { name: "南京熊猫", scale: 6704948519, id: "600775.SH" },
                { name: "东方通信", scale: 10582920708, id: "600776.SH" },
                { name: "ST鹏博士", scale: 7060633892, id: "600804.SH" },
                { name: "长飞光纤", scale: 15956905591, id: "601869.SH" },
                { name: "华脉科技", scale: 1947954759, id: "603042.SH" },
                { name: "剑桥科技", scale: 1.472059333e10, id: "603083.SH" },
                { name: "共进股份", scale: 7436508776, id: "603118.SH" },
                { name: "中贝通信", scale: 4593389605, id: "603220.SH" },
                { name: "移远通信", scale: 20372267793, id: "603236.SH" },
                { name: "超讯通信", scale: 3.5963235e9, id: "603322.SH" },
                { name: "鼎信通讯", scale: 6945828942, id: "603421.SH" },
                { name: "中通国脉", scale: 1656700673, id: "603559.SH" },
                { name: "纵横通信", scale: 2462499508, id: "603602.SH" },
                { name: "盛洋科技", scale: 4.4373446e9, id: "603703.SH" },
                { name: "七一二", scale: 2.610132e10, id: "603712.SH" },
                { name: "瑞斯康达", scale: 3675815013, id: "603803.SH" },
                { name: "国盾量子", scale: 7.36879793e9, id: "688027.SH" },
                { name: "映翰通", scale: 3355177971, id: "688080.SH" },
                { name: "XD威胜信", scale: 1.338e10, id: "688100.SH" },
                { name: "有方科技", scale: 1.92618619e9, id: "688159.SH" },
                { name: "灿勤科技", scale: 2.04096e9, id: "688182.SH" },
                { name: "坤恒顺维", scale: 3136868822, id: "688283.SH" },
                { name: "仕佳光子", scale: 5637338649, id: "688313.SH" },
                { name: "震有科技", scale: 2380305307, id: "688418.SH" },
                { name: "三旺通信", scale: 1571472854, id: "688618.SH" },
                { name: "鼎通科技", scale: 2289034966, id: "688668.SH" },
                { name: "富士达", scale: 2852409804, id: "835640.BJ" },
              ],
              name: "通信设备",
              scale: 1002894014302,
              id: "730200",
            },
          ],
          name: "通信",
          scale: 1394647508284,
          id: "730000",
        },
      ],
      name: "总量",
      scale: 12669.20014237675,
      id: "9",
    },
  };
  const result = response.data;

  sessionStorage.setItem(tmpCode, JSON.stringify(result));
  render(treemap, result, color, ignoreAuth);

  function render(treemap, result, color, ignoreAuth) {
    const nodes = treemap.nodes(result);

    const mapPerf = nodes.reduce((obj, node) => {
      if (node.condition) {
        obj[node.name] = node.condition;
      }
      return obj;
    }, {});

    const mapData = nodes[0];
    initMap(width, mapData, color, ignoreAuth);
  }
}

function getRangeLegend(colorArr, valueRangeArr) {
  const map_scaleHtml = colorArr
    .map(
      (color, i) =>
        `<div class="step" style="background:${color}">${valueRangeArr[i]}</div>`
    )
    .join("");
  $(".map_scale").html(map_scaleHtml);
}

$(function () {
  // $('#select-change').val('mkt_idx.cur_chng_pct');
  // var color1dArr = ['#00d641', '#1aa448', '#0e6f2f', '#085421', '#424453', '#6d1414', '#961010', '#be0808', '#e41414'],
  var color1dArr = [
      "#e41414",
      "#be0808",
      "#961010",
      "#6d1414",
      "#424453",
      "#085421",
      "#0e6f2f",
      "#1aa448",
      "#00d641",
    ],
    valueRange1dArr = [
      "-4%",
      "-3%",
      "-2%",
      "-1%",
      "0%",
      "1%",
      "2%",
      "3%",
      "4%",
    ];
  getRangeLegend(color1dArr, valueRange1dArr);
  // var selectedColor = '';
  // drawMap(selectedColor, true);

  //下面的功能可以在窗口大小变动时进行重绘，但是在微信电脑版情况下会形成不断刷新页面的情况，所以将其删掉 ——2022-07-09
  $(window).resize(function () {
    // window.location.reload();
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

!(function (__webpack_modules__) {
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId])
      return __webpack_module_cache__[moduleId].exports;
    var module = (__webpack_module_cache__[moduleId] = {
      id: moduleId,
      loaded: !1,
      exports: {},
    });
    return (
      __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ),
      (module.loaded = !0),
      module.exports
    );
  }

  var __webpack_module_cache__ = {};
  (__webpack_require__.m = __webpack_modules__),
    (__webpack_require__.c = __webpack_module_cache__),
    (__webpack_require__.i = function (e) {
      return e;
    }),
    (__webpack_require__.d = function (trackedResult, key, c) {
      __webpack_require__.o(trackedResult, key) ||
        Object.defineProperty(trackedResult, key, {
          configurable: !1,
          enumerable: !0,
          get: c,
        });
    }),
    (__webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function () {
              return module.default;
            }
          : function () {
              return module;
            };
      return __webpack_require__.d(getter, "a", getter), getter;
    }),
    (__webpack_require__.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (__webpack_require__.p = "/js/dist/"),
    __webpack_require__((__webpack_require__.s = 92));
})({
  Gradient: function (event, target) {
    // defining parameters
    const redGreenGradientSmall = {
        colors: [
          "#e01427",
          "#ce252b",
          "#bb2f30",
          "#aa3534",
          "#993938",
          "#853c3c",
          "#743d3f",
          "#414554",
          "#3e5f50",
          "#3f704f",
          "#3f814d",
          "#3c924a",
          "#36a446",
          "#2bb642",
          "#12c93b",
        ],
        nullColor: "#2f323d",
      },
      redGreenGradient = {
        colors: [
          "#f63538",
          "#ee373a",
          "#e6393b",
          "#df3a3d",
          "#d73c3f",
          "#ce3d41",
          "#c73e43",
          "#bf4045",
          "#b64146",
          "#ae4248",
          "#a5424a",
          "#9d434b",
          "#94444d",
          "#8b444e",
          "#824450",
          "#784551",
          "#6f4552",
          "#644553",
          "#5a4554",
          "#4f4554",
          "#414554",
          "#3f4c53",
          "#3d5451",
          "#3b5a50",
          "#3a614f",
          "#38694f",
          "#366f4e",
          "#35764e",
          "#347d4e",
          "#32844e",
          "#31894e",
          "#31904e",
          "#30974f",
          "#2f9e4f",
          "#2fa450",
          "#2faa51",
          "#2fb152",
          "#2fb854",
          "#30be56",
          "#30c558",
          "#30cc5a",
        ],
        nullColor: "#2f323d",
      },
      greenRedGradient = {
        colors: redGreenGradient.colors.slice(), //.reverse(),
        nullColor: redGreenGradient.nullColor,
      },
      redGradient = {
        colors: redGreenGradient.colors.slice(0, 22), //.reverse(),
        nullColor: redGreenGradient.nullColor,
      },
      greenGradient = {
        colors: greenRedGradient.colors.slice(21),
        nullColor: greenRedGradient.nullColor,
      },
      blueGradient = {
        colors: [
          "#3d4251",
          "#3d4250",
          "#3d4250",
          "#3e4251",
          "#3e4251",
          "#3d4350",
          "#3d4350",
          "#3d4350",
          "#3e4351",
          "#3e4350",
          "#3d4351",
          "#3d4352",
          "#3f4353",
          "#3f4353",
          "#3f4453",
          "#3f4554",
          "#3e4354",
          "#3e4354",
          "#3f4454",
          "#3f4454",
          "#3f4454",
          "#3f4454",
          "#3f4454",
          "#3f4555",
          "#3f4556",
          "#3f4457",
          "#3f4457",
          "#3f4457",
          "#3f4557",
          "#3f4657",
          "#3f4657",
          "#3f4657",
          "#3f4557",
          "#3e4557",
          "#3e4558",
          "#3f465a",
          "#3f4659",
          "#3f4759",
          "#3f4759",
          "#3f475a",
          "#3f4759",
          "#3f465a",
          "#3f465a",
          "#3f4759",
          "#3f475b",
          "#40475b",
          "#40475b",
          "#40465b",
          "#40465c",
          "#40465d",
          "#40485d",
          "#40485c",
          "#40475c",
          "#40465c",
          "#40465c",
          "#40465c",
          "#40485d",
          "#40485d",
          "#40485e",
          "#40485f",
          "#40495e",
          "#40495e",
          "#40485e",
          "#40485f",
          "#40495e",
          "#40485e",
          "#40485f",
          "#404960",
          "#404960",
          "#404860",
          "#404861",
          "#404a62",
          "#404962",
          "#404962",
          "#404a62",
          "#404a62",
          "#404861",
          "#404961",
          "#404a63",
          "#404a64",
          "#404a65",
          "#404b64",
          "#404b64",
          "#404a65",
          "#404a65",
          "#404a65",
          "#404a65",
          "#404b65",
          "#404b65",
          "#414c65",
          "#424c65",
          "#424b65",
          "#414b66",
          "#414b67",
          "#414b67",
          "#414c67",
          "#424b67",
          "#424c67",
          "#414c67",
          "#414b67",
          "#414c67",
          "#414c67",
          "#414c69",
          "#414c6a",
          "#414c6a",
          "#414c6a",
          "#414d6a",
          "#424e6a",
          "#414d6a",
          "#414d6a",
          "#414d6a",
          "#414d6a",
          "#414d6a",
          "#414d6b",
          "#414d6c",
          "#414e6c",
          "#414f6c",
          "#414e6c",
          "#414d6c",
          "#414d6c",
          "#414e6c",
          "#424e6d",
          "#424e6d",
          "#414f6d",
          "#424f6f",
          "#414e6f",
          "#414e6f",
          "#424f70",
          "#414f6f",
          "#414f6f",
          "#414f6f",
          "#414e6f",
          "#414e6f",
          "#414f6f",
          "#414f6f",
          "#414f71",
          "#414f72",
          "#425073",
          "#425173",
          "#415072",
          "#425173",
          "#425173",
          "#425173",
          "#415072",
          "#415072",
          "#415172",
          "#415173",
          "#415174",
          "#415174",
          "#415074",
          "#415074",
          "#415174",
          "#415074",
          "#415074",
          "#415074",
          "#415175",
          "#415275",
          "#425276",
          "#425277",
          "#415177",
          "#415177",
          "#425278",
          "#425378",
          "#415277",
          "#415378",
          "#415378",
          "#415277",
          "#415378",
          "#42537a",
          "#42537c",
          "#42537b",
          "#41537a",
          "#41527a",
          "#41537a",
          "#41547a",
          "#42547b",
          "#41547a",
          "#41547a",
          "#41547c",
          "#41547c",
          "#41557c",
          "#41557c",
          "#41557c",
          "#41557c",
          "#41557d",
          "#41547d",
          "#41547c",
          "#42557d",
          "#41557d",
          "#41557d",
          "#41557f",
          "#415580",
          "#41567f",
          "#41567f",
          "#415580",
          "#41567f",
          "#415580",
          "#415580",
          "#41557f",
          "#415680",
          "#415680",
          "#415680",
          "#415681",
          "#415681",
          "#415781",
          "#415781",
          "#415681",
          "#415781",
          "#415781",
          "#415781",
          "#415782",
          "#415784",
          "#415784",
          "#425885",
          "#425885",
          "#415784",
          "#415784",
          "#415784",
          "#415784",
          "#425885",
          "#425885",
          "#415885",
          "#415885",
          "#425987",
          "#415887",
          "#415887",
          "#415987",
          "#415887",
          "#425988",
          "#425988",
          "#415887",
          "#415987",
          "#415988",
          "#415988",
          "#415988",
          "#415989",
          "#415989",
          "#415989",
          "#415989",
          "#415989",
          "#415989",
          "#41598a",
          "#405a8b",
          "#405a8c",
          "#405b8c",
          "#405b8c",
          "#405b8c",
          "#405a8c",
          "#405a8c",
          "#405a8c",
          "#405a8c",
          "#405b8c",
          "#415c8d",
          "#415c8e",
          "#405b8e",
          "#415c90",
          "#405b8f",
          "#405c8f",
          "#415d90",
          "#405b8f",
          "#405c8f",
          "#405c8f",
          "#405b8f",
          "#405c8f",
          "#405c90",
          "#405c91",
          "#405c91",
          "#405c91",
          "#405d91",
          "#405e91",
          "#405d91",
          "#415e91",
          "#405e91",
          "#415e91",
          "#415e92",
          "#3f5d94",
          "#3f5d93",
          "#3f5d93",
          "#3f5e94",
          "#405e94",
          "#3f5d94",
          "#3f5d94",
          "#3f5d94",
          "#3f5e94",
          "#3f5e95",
          "#3f5e96",
          "#3f5e96",
          "#3f5e96",
          "#405f97",
          "#405f97",
          "#3f5e96",
          "#3f5e97",
          "#3f5f97",
          "#3f6097",
          "#3f5f97",
          "#3f6097",
          "#3f5f98",
          "#3f5f99",
          "#3e5f99",
          "#3e6199",
          "#3e6099",
          "#3e5f99",
          "#3e5f99",
          "#3e5f98",
          "#3e6099",
          "#3d609a",
          "#3d6099",
          "#3e609b",
          "#3e619c",
          "#3e619c",
          "#3e619c",
          "#3e609b",
          "#3e609c",
          "#3e609c",
          "#3e619b",
          "#3e629c",
          "#3e629c",
          "#3e619c",
          "#3d619d",
          "#3d639f",
          "#3d629f",
          "#3d629f",
          "#3d639f",
          "#3d629f",
          "#3c619e",
          "#3c619e",
          "#3d629f",
          "#3d62a0",
          "#3d63a0",
          "#3d63a0",
          "#3d62a0",
          "#3d63a1",
          "#3d62a0",
          "#3d63a0",
          "#3d64a1",
          "#3d63a0",
          "#3c63a0",
          "#3b63a2",
          "#3c64a3",
          "#3c65a3",
          "#3b63a3",
          "#3b63a3",
          "#3b63a3",
          "#3b63a3",
          "#3c63a3",
          "#3c65a3",
          "#3c65a3",
          "#3b64a4",
          "#3a65a5",
          "#3b66a6",
          "#3c65a6",
          "#3a65a5",
          "#3a64a5",
          "#3a64a5",
          "#3b65a5",
          "#3a65a5",
          "#3a66a6",
          "#3b66a6",
          "#3b66a6",
          "#3a66a8",
          "#3a67a8",
          "#3b67a8",
          "#3b66a8",
          "#3b66a8",
          "#3b66a8",
          "#3b67a8",
          "#3a66a8",
          "#3966a9",
          "#3967a9",
          "#3a67aa",
          "#3a67ab",
          "#3967ab",
          "#3a68ab",
          "#3a68ab",
          "#3968ab",
          "#3966aa",
          "#3966aa",
          "#3968ab",
          "#3968ab",
          "#3867ac",
          "#3867ac",
          "#3868ac",
          "#3869ad",
          "#3969ad",
          "#3968ad",
          "#3868ac",
          "#3868ac",
          "#3869ae",
          "#3868ad",
          "#3868ad",
          "#3769af",
          "#3869b0",
          "#3769af",
          "#3769af",
          "#386ab0",
          "#386ab0",
          "#376aaf",
          "#376aaf",
          "#376ab0",
          "#366ab1",
          "#366ab2",
          "#366ab2",
          "#366ab2",
          "#366ab3",
          "#366bb3",
          "#366ab2",
          "#3669b2",
          "#366ab2",
          "#366ab2",
          "#366ab2",
          "#356bb3",
          "#346bb4",
          "#356cb4",
          "#356cb4",
          "#346bb4",
          "#356cb4",
          "#356cb5",
          "#356cb5",
          "#356cb5",
          "#346cb5",
          "#346cb5",
          "#346cb6",
          "#336db7",
          "#326cb7",
          "#326db7",
          "#336db7",
          "#336cb7",
          "#326bb6",
          "#326cb6",
          "#326db7",
          "#326db8",
          "#316dba",
          "#316eb9",
          "#316eb9",
          "#326eba",
          "#316eba",
          "#316db9",
          "#316db9",
          "#316eb9",
          "#306eba",
          "#306dba",
          "#306dba",
          "#306ebb",
          "#306dbb",
          "#306dbc",
          "#306fbc",
          "#306fbc",
          "#306ebb",
          "#306eba",
          "#306fbc",
          "#2f6fbd",
          "#2d6ebe",
          "#2d6ebe",
          "#2d6fbe",
          "#2e70be",
          "#2e70be",
          "#2e6fbe",
          "#2e6fbe",
          "#2e6fbe",
          "#2c6fc0",
          "#2d70c0",
          "#2d70c0",
          "#2b70c1",
          "#2b70c1",
          "#2c70c1",
          "#2c70c1",
          "#2b71c1",
          "#2c70c1",
          "#2c70c1",
          "#2c71c1",
          "#2c71c1",
          "#2a72c3",
          "#2971c3",
          "#2a71c2",
          "#2972c3",
          "#2a71c3",
          "#2a71c3",
          "#2972c3",
          "#2972c3",
          "#2972c3",
          "#2872c5",
          "#2872c6",
          "#2872c5",
          "#2773c6",
          "#2773c6",
          "#2772c6",
          "#2772c5",
          "#2672c5",
          "#2673c5",
          "#2673c5",
          "#2673c7",
          "#2472c8",
          "#2473c8",
          "#2474c8",
          "#2573c9",
          "#2573c9",
          "#2573c9",
          "#2573c9",
          "#2474c8",
          "#2374c9",
          "#2374c9",
          "#2374c9",
          "#2375c9",
          "#2374c9",
          "#2374c9",
          "#2475c9",
          "#2575ca",
          "#2476ca",
          "#2476ca",
          "#2476ca",
          "#2575cb",
          "#2577ca",
          "#2577ca",
          "#2576ca",
          "#2577ca",
          "#2577ca",
          "#2577ca",
          "#2677ca",
          "#2678ca",
          "#2678cb",
          "#2778cb",
          "#2778cb",
          "#2679cb",
          "#2779cb",
          "#2779cb",
          "#2779cb",
          "#2779cb",
          "#2879cb",
          "#287acb",
          "#287acb",
          "#2879cb",
          "#287acb",
          "#287bcb",
          "#287acb",
          "#287acb",
          "#287bcc",
          "#287bcc",
          "#297bcc",
          "#297bcc",
          "#297bcc",
          "#297bcc",
          "#297ccc",
          "#297ccc",
          "#297dcc",
          "#297dcc",
          "#2a7dcc",
          "#2a7dcc",
          "#2a7ecd",
          "#2a7ecd",
          "#2a7ecc",
          "#2a7ecc",
          "#2b7ecd",
          "#2c7ecd",
          "#2c7fcd",
          "#2c7fcd",
          "#2b7ecc",
          "#2b7ecc",
          "#2c7fcd",
          "#2c7fcd",
          "#2c7fcd",
          "#2c7fcd",
          "#2b7fcd",
          "#2b80cd",
          "#2c80ce",
          "#2d80ce",
          "#2d80ce",
          "#2c81cd",
          "#2d82ce",
          "#2d82ce",
          "#2d81ce",
          "#2d82ce",
          "#2d82ce",
          "#2d82cd",
          "#2e82cd",
          "#2e83ce",
          "#2e82ce",
          "#2d82cd",
          "#2d83cd",
          "#2e83cf",
          "#2e84cf",
          "#2e84cf",
          "#2e83ce",
          "#2e83ce",
          "#3084cf",
          "#3085cf",
          "#2f85ce",
          "#3085cf",
          "#2f86ce",
          "#2f86ce",
          "#2f86cf",
          "#2f85cf",
          "#2f86ce",
          "#2f86cf",
          "#2f86cf",
          "#2f87cf",
          "#2f86d0",
          "#2f86d0",
          "#2f86d0",
          "#3087cf",
          "#3088d0",
          "#3088d0",
          "#3087cf",
          "#3088cf",
          "#3188d0",
          "#3188d1",
          "#3088d0",
          "#3089d0",
          "#3089d0",
          "#3088d0",
          "#3188d0",
          "#3189d0",
          "#3289d0",
          "#3289d0",
          "#328ad1",
          "#328ad1",
          "#318ad0",
          "#318ad0",
          "#318ad0",
          "#328bd1",
          "#328ad1",
          "#328ad1",
          "#338bd2",
          "#338bd2",
          "#338cd1",
          "#338cd1",
          "#338cd2",
          "#338cd2",
          "#338dd1",
          "#338dd1",
          "#338dd2",
          "#338dd1",
          "#338ed2",
          "#338ed2",
          "#338ed2",
          "#348ed2",
          "#348ed2",
          "#348ed2",
          "#348fd2",
          "#348fd2",
          "#348fd2",
          "#348fd2",
          "#348fd2",
          "#348fd2",
          "#3390d2",
          "#3391d2",
          "#3491d3",
          "#3490d3",
          "#3491d3",
          "#3491d3",
          "#3591d3",
          "#3591d3",
          "#3691d4",
          "#3690d4",
          "#3590d3",
          "#3592d3",
          "#3592d4",
          "#3592d4",
          "#3592d3",
          "#3593d3",
          "#3592d4",
          "#3592d4",
          "#3592d4",
          "#3593d4",
          "#3694d4",
          "#3695d4",
          "#3694d4",
          "#3693d4",
          "#3693d4",
          "#3695d4",
          "#3695d4",
          "#3695d4",
          "#3796d4",
          "#3796d4",
          "#3695d4",
          "#3695d5",
          "#3696d5",
          "#3696d5",
          "#3696d5",
          "#3695d4",
          "#3696d4",
          "#3797d5",
          "#3796d5",
          "#3797d5",
          "#3898d5",
          "#3898d5",
          "#3797d5",
          "#3798d5",
          "#3899d5",
          "#3899d5",
          "#3899d6",
          "#3799d6",
          "#3799d6",
          "#3799d6",
          "#389ad6",
          "#389ad6",
          "#3799d5",
          "#3799d5",
          "#3799d6",
          "#379ad6",
          "#379ad6",
          "#399ad6",
          "#399ad6",
          "#389bd5",
          "#389bd5",
          "#389bd6",
          "#389bd6",
          "#399cd7",
          "#399bd7",
          "#399cd7",
          "#399dd7",
          "#389cd7",
          "#389cd6",
          "#389dd6",
          "#399ed7",
          "#389dd6",
          "#389dd6",
          "#389fd6",
          "#399fd7",
          "#399ed6",
          "#399ed6",
          "#399fd7",
          "#399fd7",
          "#399fd7",
          "#3aa0d8",
          "#3aa0d8",
          "#3a9fd8",
          "#3a9fd8",
          "#3a9fd8",
          "#3aa0d8",
          "#3aa1d8",
          "#3aa1d8",
          "#3aa1d8",
          "#3aa1d8",
          "#3aa1d8",
          "#3aa2d9",
          "#3aa1d9",
          "#3aa1d8",
          "#39a2d8",
          "#3aa2d9",
          "#3aa3d9",
          "#3ba3d9",
          "#3ba3d9",
          "#3ba2d8",
          "#3aa2d8",
          "#3aa4d8",
          "#3ba4d9",
          "#3aa3d8",
          "#3aa3d9",
          "#3ba5da",
          "#3ba5d9",
          "#3ba4d9",
          "#3ba4d9",
          "#3ba4d9",
          "#3aa5d9",
          "#3ba5da",
          "#3ba6da",
          "#3ba6da",
          "#3ba6da",
          "#3ba6d9",
          "#3ba6d9",
          "#3ba6da",
          "#3aa5da",
          "#3ba6da",
          "#3ca7da",
          "#3ca7da",
          "#3ba7da",
          "#3ba6da",
          "#3ca7da",
          "#3ca8da",
          "#3ca8da",
          "#3ca8da",
          "#3ca9db",
          "#3ca9db",
          "#3ca9da",
          "#3ca8db",
          "#3ba8db",
          "#3baadb",
          "#3caadb",
          "#3ca9db",
          "#3caadb",
          "#3caadb",
          "#3ca9db",
          "#3ca9db",
          "#3ca9db",
          "#3cabdb",
          "#3cabdc",
          "#3caadb",
          "#3cabdb",
          "#3cacdc",
          "#3cacdc",
          "#3cacdc",
          "#3caddc",
          "#3caddc",
          "#3caddc",
          "#3caedc",
          "#3caddd",
          "#3caddd",
          "#3caedc",
          "#3eaedd",
          "#3eaddd",
          "#3daddc",
          "#3daedc",
          "#3daedc",
          "#3dafdd",
          "#3dafdd",
          "#3daedd",
          "#3dafdd",
          "#3dafdd",
          "#3dafdd",
          "#3db0dd",
          "#3db0dd",
          "#3db0dc",
          "#3db0dc",
          "#3db1dd",
          "#3db1dd",
          "#3db0dd",
          "#3db0dd",
          "#3db1dd",
          "#3db1de",
          "#3db1de",
          "#3db1de",
          "#3db2de",
          "#3db2de",
          "#3db2dd",
          "#3db2dd",
          "#3db3dd",
          "#3db2de",
          "#3db3de",
          "#3db4de",
          "#3db3dd",
          "#3db4de",
          "#3db4de",
          "#3db4de",
          "#3db5df",
          "#3db5df",
          "#3db4df",
          "#3db4df",
          "#3db5df",
          "#3db5de",
          "#3db5de",
          "#3db5de",
          "#3db6df",
          "#3db6df",
          "#3db6de",
          "#3db6de",
          "#3db7df",
          "#3db7e0",
          "#3db8e0",
          "#3db8e0",
          "#3db7e0",
          "#3db7df",
          "#3db7df",
          "#3eb7df",
          "#3eb8df",
          "#3eb8df",
          "#3eb9e0",
          "#3eb9e0",
          "#3eb8df",
          "#3eb9df",
          "#3fb9df",
          "#3fb9e0",
          "#3ebae1",
          "#3ebae0",
          "#3ebae0",
          "#3ebae0",
          "#3eb9e0",
          "#3fbae1",
          "#3fbbe1",
          "#3ebae0",
          "#3ebbe1",
          "#3ebae0",
          "#3ebbe0",
          "#3ebce1",
          "#3fbce1",
          "#3ebce0",
          "#3ebce2",
          "#3ebce2",
          "#3ebde2",
          "#3fbde2",
          "#3fbde2",
          "#3ebde1",
          "#3ebee1",
          "#3ebde2",
          "#3fbde2",
          "#3fbde2",
          "#3ebee1",
          "#3ebfe1",
          "#3ebfe1",
          "#3ebfe1",
          "#3fbfe2",
          "#3ebfe1",
          "#3ebee1",
          "#3ebee2",
          "#3ebfe2",
          "#3ebfe2",
          "#3ebfe2",
          "#3ec0e2",
          "#3ec1e2",
          "#3fc0e3",
          "#3fc0e3",
          "#3ec0e2",
          "#3ec1e2",
          "#3ec2e2",
          "#3ec2e2",
          "#3ec2e2",
          "#3ec3e3",
          "#3ec3e3",
          "#3ec3e3",
          "#3ec2e3",
          "#3ec2e3",
          "#3fc3e3",
          "#3fc4e3",
          "#3ec4e3",
          "#3ec3e3",
          "#3ec3e3",
          "#3ec5e4",
          "#3fc5e4",
          "#3fc5e3",
          "#3fc4e4",
          "#3fc5e4",
          "#3ec6e4",
          "#3ec5e4",
          "#3ec4e4",
          "#3ec5e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec7e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec6e4",
          "#3ec7e4",
          "#3dc8e4",
          "#3dc8e4",
          "#3dc7e5",
          "#3dc7e5",
          "#3dc8e5",
          "#3dc8e4",
          "#3dc8e4",
          "#3dc9e5",
          "#3dc9e5",
          "#3dc9e5",
          "#3dc9e5",
          "#3dc9e5",
          "#3dc9e4",
          "#3dc9e5",
          "#3dcae6",
          "#3dcbe6",
          "#3dcae6",
          "#3dcae6",
          "#3dcae6",
          "#3dcbe6",
          "#3dcce6",
          "#3ecce6",
          "#3ecce6",
          "#3dcbe6",
          "#3dcce6",
          "#3dcce6",
          "#3dcce6",
          "#3dcce5",
          "#3dcce5",
          "#3dcce6",
          "#3dcde7",
          "#3dcde7",
          "#3dcde7",
          "#3dcfe7",
          "#3dcfe7",
          "#3dcfe7",
          "#3dcee7",
          "#3dcee6",
          "#3dcee6",
          "#3dcfe7",
          "#3dcfe7",
          "#3dcfe6",
          "#3dcfe6",
          "#3dd0e8",
          "#3ed1e8",
          "#3ed1e7",
          "#3dd0e7",
          "#3dd0e8",
          "#3dd0e7",
          "#3dd1e7",
          "#3dd1e7",
          "#3dd0e7",
          "#3cd1e8",
          "#3cd2e8",
          "#3cd1e8",
          "#3cd1e7",
          "#3cd1e7",
          "#3cd2e8",
          "#3cd3e9",
          "#3cd2e8",
          "#3cd2e9",
          "#3cd2e9",
          "#3cd3e8",
          "#3cd4e8",
          "#3cd3e8",
          "#3cd3e8",
        ],
        nullColor: "#2f323d",
      },
      earningsGradient = {
        colors: [
          /*"#592d48", "#592d49", "#5b2d49", "#5b2d49", "#5b2d49", "#5b2e49", "#5b2e49", "#5b2e4a", "#5c2e4a", "#5d2f4b", "#5c2f4b", "#5c2e4b", "#5f2f4c", "#5f2f4c", "#5e2e4c", "#5e2e4c", "#60304d", "#60304d", "#5f2f4d", "#5f2f4d", "#62304f", "#62304f", "#61304f", "#62314f", "#62314f", "#633150", "#633150", "#63314f", "#63304f", "#643150", "#643151", "#643151", "#653152", "#653051", "#653051", "#663152", "#673253", "#673253", "#673253", "#673253", "#683254", "#683254", "#683254", "#693254", "#693354", "#6a3354", "#6a3354", "#6a3355", "#6a3356", "#6a3456", "#6c3456", "#6c3356", "#6c3457", "#6c3457", "#6c3457", "#6c3457", "#6d3458", "#6e3559", "#6f3559", "#6f3459", "#6f345a", "#70355b", "#70365b", "#6f355a", "#70365b", "#71355a", "#71355a", "#71365b", "#72355b", "#72365c", "#72365d", "#72355c", "#73355c", "#73355d", "#73375d", "#73375d", "#76375e", "#76375f", "#76375f", "#76375f", "#76365e", "#76365e", "#76375f", "#763860", "#773861", "#783860", "#783860", "#783861", "#793861", "#793862", "#793762", "#793761", "#7b3962", "#7b3962", "#7a3962", "#7a3962", "#7b3963", "#7c3964", "#7d3a64", "#7d3b64", "#7d3a65", "#7d3a65", "#7d3a65", "#7e3b65", "#803b66", "#7f3a66", "#7e3a66", "#7f3a67", "#7f3b67", "#803c67", "#803c67", "#7f3b67", "#813c68", "#823b69", "#823b69", "#813b69", "#823c69", "#823c69", "#823c69", "#823c69", "#843d6a", "#843d6a", "#843d6a", "#843c6b", "#863c6c", "#853c6c", "#853d6c", "#863e6c", "#863d6c", "#873d6c", "#873d6c", "#873d6d", "#893e6e", "#8a3e6f", "#8a3e6f", "#893e6e", "#893d6e", "#893e6e", "#8a3f6f", "#8b3f70", "#8b3f71", "#8b3e70", "#8b3e70", "#8c3f70", "#8c4071", "#8c4070", "#8c4070", "#8d4071", "#8d4072", "#8d4072", "#8f4073", "#8f4074", "#8f4073", "#8f4173", "#8f4173", "#904173", "#904174", "#904175", "#904175", "#914175", "#924175", "#924275", "#924275", "#914175", "#924277", "#934277", "#934277", "#944278", "#954277", "#954278", "#954278", "#954278", "#954378", "#964378", "#964379", "#96447a", "#96437a", "#96437a", "#98437a", "#98447b", "#98457b", "#98457b", "#98457b", "#99447b", "#9a457d", "#9b457d", "#9b457d", "#9a447c", "#9a457c", "#9b457c", "#9b457e", "#9b467e", "#9c467e", "#9d467f", "#9e467f", "#9d467f", "#9e467e", "#9e477f", "#9e4780", "#9e477f", "#9f4680", "#a04680", "#a04880", "#a04881", "#a04881", "#a04881", "#a24883", "#a24883", "#a24882", "#a24883", "#a24883", "#a24883", "#a24883", "#a34983", "#a34983", "#a34984", "#a44985", "#a54986", "#a54986", "#a54986", "#a54a85", "#a54a85", "#a54a85", "#a64a86", "#a74a87", "#a84a88", "#a84a88", "#a74a87", "#a84b87", "#a84b88", "#a84b88", "#a84b88", "#a94b89", "#aa4b89", "#ab4b89", "#ab4b89", "#ab4c8a", "#aa4c8a", "#aa4c8a", "#ab4c8a", "#ad4c8b", "#ad4c8b", "#ad4c8b", "#ad4c8c", "#ae4d8d", "#ae4c8c", "#ae4d8d", "#af4e8e", "#af4e8d", "#b04e8d", "#b04e8d", "#b04d8e", "#b04e8e", "#b04d8e", "#b04e8e", "#b14f8f", "#b14e90", "#b14e90", "#b14f90", "#b25090", "#b34f90", "#b34f90", "#b34f90", "#b35091", "#b44f91", "#b55092", "#b55092", "#b55092", "#b55192", "#b55092", "#b55092", "#b55093", "#b65094", "#b75194", "#b85193", "#b75093", "#b85095", "#b85095", "#b85295", "#b85295", "#ba5296", "#b95197", "#b95197", "#ba5297", "#ba5297", "#ba5296", "#ba5296", "#bb5397", "#bc5297", "#bd5298", "#bd5499", "#bc5499", "#bc5499", "#bc5499", "#bd5499", "#be549a", "#bf549b", "#bf549b", "#bf549b", "#bf549b", "#c0559b", "#c0559b", "#c0559b", "#c0559b", "#c0549c", "#c0549c", "#c2569c", "#c2569d", "#c2569e", "#c2569e", "#c4569e", "#c4569e", "#c4569f", "#c3579e", "#c3579e", "#c5579e", "#c658a0", "#c5579f", "#c4579f", "#c557a0", "#c757a0", "#c657a0", "#c658a1", "#c759a2", "#c758a2", "#c758a2", "#c858a2", "#c959a3", "#ca59a3", "#c958a2", "#c958a2", "#c959a3", "#ca59a4", "#cb59a4", "#cb59a4", "#cb59a4", "#cb5aa5", "#cc5ba5", "#cc5ba5", "#cc5aa5", "#cd5ba6", "#cd5ba6", "#cd5ba6", "#ce5ba7", "#ce5ca7", "#cf5ca7", "#cf5ca7", "#cf5ca7", "#d05ca8", "#d05ba9", "#d05ba9", "#d05ba9", "#d15ca9", "#d15da9", "#d15da9", "#d15ca9", "#d25caa", "#d25dab", "#d25eab", "#d25eab", "#d35eab", "#d35dab", "#d35dab", "#d45eac", "#d45dac", "#d55ead", "#d55ead", "#d55dad", "#d65eac", "#d65fad", "#d65fae", "#d65fae", "#d75fae", "#d75fae", "#d75fae", "#d75fae", "#d75faf", "#d760b0", "#d960b0", "#d95fb0", "#d961b0", "#d961b1", "#d961b1", "#da61b0", "#dc61b2", "#dc60b2", "#db60b2", "#db61b2", "#dc61b2", "#dd61b3", "#dd61b3", "#dd62b3", "#de62b3", "#de63b4", "#de63b5", "#dd62b4", "#de62b4", "#df63b5", "#e063b5", "#e063b5", "#e063b6", "#e164b6", "#e164b6", "#e164b6", "#e164b7", "#e264b7", "#e264b7", "#e264b7", "#e264b8", "#e265b8", "#e265b8", "#e365b8", "#e364b8", "#e465b9", "#e565ba", "#e565ba", "#e566b9", "#e566ba", "#e566bb", "#e666ba", "#e766bb", "#e665bb", "#e665bb", "#e666bb", "#e867bc", "#e867bc", "#e867bc", "#e867bc", "#e968bd", "#e967be", "#e968be", "#e969bd", "#ea68bf", "#ea69bf", "#ea69bf", "#eb69c0", "#eb69c0", "#eb6ac0", "#eb6ac0", "#ec6ac1", "#ed6ac2", "#ec6bc2", "#ec6bc2", "#ed6bc2", "#ed6bc3", "#ed6bc3", "#ed6bc3", "#ee6bc2", "#ef6bc3", "#ef6cc3", "#ef6cc3", "#f06cc4", "#f06cc5", "#f16cc4", "#f16cc4", "#f16cc5", "#f16dc6", "#f16dc6", "#f36dc6", "#f36dc7", "#f36dc6", "#f36dc7", "#f36dc7", "#f46dc7", "#f56ec7", "#f46ec7", "#f46ec7", "#f46ec8", "#f56ec8", "#f56fc8", "#f66fc8", "#f76fc9", "#f76fc9", "#f76fc9", "#f86fca", "#f970cb", "#f971cb", "#f870cb", "#f870cb", "#f870cc", "#f970cd", "#fa71cd", "#fa71cd", "#fa71cd", "#fa72ce", "#fb71ce", "#fb71ce", "#fb71ce", "#fc72cf", "#fb72ce", "#fb72ce", "#fc72cf", "#fd72d0", "#fe73d1", "#ff73d1", "#ff72d1", "#fe72d1", "#ff73d2", "#ff74d2", "#fe74d2", "#02dfce", "#02dece", "#02dece", "#03dfce", "#03dfce", "#03dfcd", "#03ddcd", "#03ddcd", "#03ddcc", "#02dccb", "#02dccb", "#03dccc", "#03dbcb", "#03dbca", "#03dbca", "#03dbca", "#03daca", "#04dbcb", "#04dacb", "#03d9ca", "#03d8c9", "#04d9c9", "#04dac9", "#04d9c9", "#04d9c8", "#04d7c7", "#04d6c7", "#04d7c8", "#05d7c7", "#05d6c7", "#05d6c7", "#04d6c7", "#05d5c6", "#05d5c6", "#05d5c6", "#05d5c5", "#06d4c5", "#05d4c5", "#05d4c5", "#06d4c5", "#06d3c4", "#06d2c4", "#06d2c4", "#06d2c3", "#06d2c3", "#07d2c2", "#07d0c1", "#07d0c2", "#07d0c1", "#07cfc1", "#07cfc1", "#07d0c1", "#09cfc0", "#08cfc0", "#09cfc0", "#0acec1", "#0acec0", "#09cdbf", "#09cdbf", "#0acebf", "#0accbe", "#0bccbf", "#0bccbf", "#0bccbe", "#0bcbbe", "#0bcbbe", "#0bcbbd", "#0ccabc", "#0ccbbd", "#0dcbbd", "#0dcabc", "#0cc9bb", "#0dc8ba", "#0ec9bb", "#0ec9bb", "#0dc8ba", "#0ec8bb", "#0dc7ba", "#0ec7ba", "#0fc7ba", "#0ec6b9", "#0fc6b9", "#0fc6b9", "#0fc5b8", "#0fc6b8", "#0fc6b8", "#0fc4b8", "#10c4b7", "#10c4b7", "#10c3b6", "#10c3b6", "#10c3b6", "#12c2b6", "#11c2b6", "#11c2b6", "#12c3b6", "#12c2b5", "#12c1b5", "#12c0b5", "#13c0b4", "#13c1b4", "#13c0b3", "#13bfb3", "#13c0b4", "#13bfb2", "#13beb3", "#13beb3", "#13bfb2", "#14beb1", "#14beb1", "#14beb1", "#14bdb1", "#14bdb1", "#15bdb1", "#16bdb1", "#15bcb0", "#16baaf", "#16bab0", "#16bbb0", "#15bbaf", "#15b9ae", "#15b9ae", "#16baae", "#17baae", "#17b9ae", "#17b8ae", "#17b8ac", "#17b8ac", "#18b8ac", "#18b7ab", "#18b7ab", "#18b7ab", "#19b7ac", "#18b7ac", "#18b5ac", "#18b5ab", "#18b5aa", "#19b4aa", "#1ab4aa", "#1ab5aa", "#19b3a9", "#19b3a9", "#19b4a9", "#19b4a9", "#19b2a8", "#1ab3a8", "#1ab3a8", "#1ab2a7", "#1bb1a7", "#1ab0a7", "#1ab0a7", "#1ab0a7", "#1bb1a6", "#1bb1a6", "#1bafa6", "#1bafa6", "#1cafa5", "#1cafa5", "#1cafa5", "#1caea4", "#1caea4", "#1caea4", "#1caea4", "#1cada3", "#1caca2", "#1caca2", "#1caca2", "#1caca2", "#1eaba2", "#1eaca2", "#1eaca2", "#1eaba2", "#1daaa1", "#1ea9a1", "#1ea9a1", "#1daaa0", "#1ea89f", "#1fa9a0", "#1fa8a0", "#1ea79f", "#1fa79e", "#1fa89f", "#1fa79e", "#1ea69d", "#1ea79d", "#1ea79c", "#1ea59c", "#1ea59c", "#20a59c", "#1fa59c", "#1fa59c", "#20a49b", "#20a49c", "#1fa49c", "#1fa49a", "#1fa39a", "#20a29a", "#20a39a", "#20a39a", "#20a29a", "#21a199", "#21a099", "#21a099", "#21a198", "#21a098", "#219f98", "#219f98", "#21a098", "#219f97", "#219f97", "#219e97", "#219d96", "#219d97", "#229d96", "#229d96", "#229d96", "#229c95", "#239d95", "#239d95", "#239c95", "#229a94", "#229a93", "#229a93", "#239b93", "#229a93", "#239892", "#239892", "#239992", "#249991", "#249991", "#249791", "#239791", "#249791", "#249791", "#249791", "#239690", "#239590", "#24968f", "#24968f", "#23958f", "#24958e", "#24948e", "#24948e", "#24958e", "#25938d", "#25938d", "#25938d", "#24938c", "#24928c", "#25928c", "#25928c", "#25928c", "#25918c", "#25908b", "#25908b", "#25908b", "#248f8a", "#258f8a", "#258f8a", "#25908b", "#258f8a", "#248e89", "#258e89", "#268e89", "#268e88", "#268e88", "#268d88", "#268c88", "#268c86", "#268c86", "#268c87", "#268c87", "#268b86", "#268a87", "#268a86", "#268a85", "#268a86", "#268a86", "#268884", "#268884", "#268884", "#278783", "#278783", "#268883", "#278682", "#278682", "#278682", "#278682", "#278681", "#278681", "#278581", "#278480", "#278580", "#278480", "#278381", "#278481", "#27837f", "#288480", "#288380", "#27827f", "#27827f", "#27817e", "#27817e", "#27817e", "#27807d", "#27807d", "#27807d", "#28807d", "#27807c", "#277f7b", "#277f7b", "#277f7b", "#287e7b", "#287d7a", "#287d7a", "#297e7b", "#297d7b", "#297c7b", "#297c7b", "#297d7b", "#287b79", "#287c79", "#287b79", "#297a79", "#297a78", "#297b78", "#297b78", "#287a77", "#287976", "#287876", "#287876", "#287876", "#287775", "#297876", "#297976", "#297776", "#287675", "#297776", "#297775", "#287674", "#297574", "#297574", "#297574", "#297474", "#287472", "#297472", "#297472", "#297472", "#297271", "#287271", "#287271", "#297271", "#297271", "#287171", "#28716f", "#29716f", "#28706f", "#297070", "#297070", "#296f6f", "#296f6f", "#286e6e", "#286e6e", "#286f6e", "#296e6e", "#286d6d", "#286d6d", "#296d6d", "#296e6d", "#296e6d", "#296c6b", "#286c6b", "#286c6b", "#296c6b", "#296a6b", "#286a6a", "#286a6a", "#296969", "#2a6969", "#296969", "#296869", "#2a6969", "#2a6969", "#2a6969", "#2a6868", "#296768", "#296768", "#2a6767", "#2a6767", "#2a6767", "#2a6567", "#296566", "#286666", "#286565", "#286565", "#296565", "#286465", "#296464", "#296464", "#286364", "#286263", "#286263", "#286263", "#286163", "#286062", "#286062","#286162", "#296163", "#285f62", "#296062", "#296062", "#295f61", "#296061", "#285f60", "#285d5f", "#285d5f", "#285d60", "#285c5f", "#285c5e", "#285c5f", "#295b5e", "#285b5d", "#285b5d", "#285c5d", "#295c5d", "#285b5c", "#285b5c", "#285b5c", "#285a5d", "#28595d", "#28595b", "#28595b", "#29585c", "#28585b", "#28585a", "#28575a", "#29585b", "#29585b", "#29575a", "#295659", "#285558", "#285658", "#285658", "#295558", "#295557", "#285457", "#285357", "#285457", "#285356", "#295456", "#295356", "#285256", "#295256", "#285255", "#285255", "#295255", "#295155", "#284f54", "#274f54", "#275054", "#275054", "#275054", "#274e52", "#274e52", "#284e52", "#274d51", "#274d51", "#274e52", "#274c50", "#274c50", "#274e51", "#284e51", "#274c50", "#284c50", "#284b50", "#274a50", "#284a50", "#284a50", "#28494e", "#27484e", "#274a4e", "#274a4d", "#27494d", "#28484e", "#27474c", "#26484d", "#26484d", "#26484c", "#25464b", "#26464b", "#26474b", "#26474b", "#26454a", "#26454a", "#26464a", "#26464a", "#254349", "#264349", "#264349", "#26444a"*/
          "#20A29A",
          "#BA5297",
        ],
        nullColor: "#414554",
      },
      redGreenGradientBubbles = {
        colors: [
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f63538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f53538",
          "#f43538",
          "#f43538",
          "#f43538",
          "#f43538",
          "#f43538",
          "#f43538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f33538",
          "#f23538",
          "#f23538",
          "#f23538",
          "#f23538",
          "#f13538",
          "#f13538",
          "#f13538",
          "#f13538",
          "#f03538",
          "#f03538",
          "#f03538",
          "#f03538",
          "#f03538",
          "#f03538",
          "#ef3538",
          "#ef3538",
          "#ef3538",
          "#ef3538",
          "#ef3538",
          "#ef3538",
          "#ee3639",
          "#ee3639",
          "#ee3639",
          "#ed3639",
          "#ed3639",
          "#ed3639",
          "#ec3639",
          "#ec3639",
          "#ec3639",
          "#eb3639",
          "#eb3639",
          "#eb3639",
          "#eb3639",
          "#eb3639",
          "#ea3639",
          "#ea3639",
          "#ea3639",
          "#e93639",
          "#e93639",
          "#e83538",
          "#e83538",
          "#e83538",
          "#e73538",
          "#e73538",
          "#e73538",
          "#e63538",
          "#e63639",
          "#e63639",
          "#e63639",
          "#e63639",
          "#e53639",
          "#e53639",
          "#e53639",
          "#e53639",
          "#e53639",
          "#e53639",
          "#e43639",
          "#e43639",
          "#e43639",
          "#e33639",
          "#e33639",
          "#e33639",
          "#e23639",
          "#e23639",
          "#e23639",
          "#e13639",
          "#e13639",
          "#e13639",
          "#e03639",
          "#e0363a",
          "#e0363a",
          "#e0363a",
          "#df363a",
          "#df363a",
          "#df363a",
          "#de363a",
          "#de363a",
          "#de363a",
          "#de363a",
          "#de363a",
          "#de363a",
          "#dd363a",
          "#dd373b",
          "#dd373b",
          "#dc373b",
          "#dc373b",
          "#dc373b",
          "#db373b",
          "#db373b",
          "#db373b",
          "#da373b",
          "#da373d",
          "#da373d",
          "#d9373d",
          "#d9373d",
          "#d9373d",
          "#d9373d",
          "#d9373d",
          "#d8373e",
          "#d8373e",
          "#d7383e",
          "#d7383e",
          "#d7383e",
          "#d6383e",
          "#d6383e",
          "#d5383e",
          "#d5383e",
          "#d4383e",
          "#d4383e",
          "#d4383f",
          "#d3383f",
          "#d3383f",
          "#d3393f",
          "#d33940",
          "#d23940",
          "#d23940",
          "#d13940",
          "#d13941",
          "#d03941",
          "#d03941",
          "#cf3941",
          "#cf3942",
          "#cf3942",
          "#cf3a42",
          "#ce3a42",
          "#cd3a43",
          "#cd3a43",
          "#cc3943",
          "#cc3943",
          "#cb3944",
          "#cb3944",
          "#ca3944",
          "#ca3944",
          "#c93a45",
          "#c93a45",
          "#c83a45",
          "#c73a45",
          "#c73a45",
          "#c53a45",
          "#c53a45",
          "#c43a45",
          "#c43a46",
          "#c43a46",
          "#c43c46",
          "#c33c47",
          "#c33c47",
          "#c23c47",
          "#c23c47",
          "#c13c48",
          "#c13c48",
          "#c03c48",
          "#c03c48",
          "#bf3c48",
          "#bf3d4a",
          "#be3d4a",
          "#be3d4a",
          "#bd3d4a",
          "#bd3d4b",
          "#bc3d4b",
          "#bc3d4b",
          "#bb3d4b",
          "#bb3d4b",
          "#bb3d4c",
          "#bb3d4c",
          "#ba3d4c",
          "#ba3e4c",
          "#b83e4c",
          "#b83e4c",
          "#b83e4c",
          "#b73e4c",
          "#b73e4c",
          "#b63e4c",
          "#b63e4c",
          "#b53e4d",
          "#b53e4d",
          "#b53e4d",
          "#b43e4d",
          "#b43e4d",
          "#b33e4d",
          "#b33f4d",
          "#b23f4e",
          "#b23f4e",
          "#b23f4e",
          "#b13f4e",
          "#b13f4e",
          "#b03e4e",
          "#b03e4e",
          "#b03e4f",
          "#b03e4f",
          "#b03e4f",
          "#ae3e4f",
          "#ae3e4f",
          "#ad3e4f",
          "#ad3e4f",
          "#ac3e4f",
          "#ac3f50",
          "#ab3f50",
          "#ab3f50",
          "#aa3f50",
          "#aa3f50",
          "#a93f50",
          "#a93f50",
          "#a73f50",
          "#a73f50",
          "#a63f50",
          "#a63f51",
          "#a53f51",
          "#a53f51",
          "#a43f50",
          "#a43f50",
          "#a43f50",
          "#a43f50",
          "#a24050",
          "#a24050",
          "#a14050",
          "#a04051",
          "#a04051",
          "#9f4051",
          "#9f4051",
          "#9e4051",
          "#9c4051",
          "#9c4051",
          "#9b4051",
          "#9a4051",
          "#9a4053",
          "#994053",
          "#994153",
          "#984153",
          "#974153",
          "#974153",
          "#964153",
          "#954153",
          "#954153",
          "#934054",
          "#934054",
          "#924054",
          "#914054",
          "#914054",
          "#904053",
          "#8e4053",
          "#8e4153",
          "#8d4153",
          "#8d4153",
          "#8d4154",
          "#8b4154",
          "#8b4154",
          "#8a4154",
          "#894154",
          "#894154",
          "#884154",
          "#884154",
          "#864154",
          "#864154",
          "#854154",
          "#844155",
          "#844255",
          "#824255",
          "#824255",
          "#824255",
          "#824255",
          "#814255",
          "#814255",
          "#804255",
          "#804255",
          "#7e4255",
          "#7e4255",
          "#7d4255",
          "#7d4256",
          "#7c4256",
          "#7c4256",
          "#7b4256",
          "#7b4256",
          "#7b4256",
          "#794256",
          "#794256",
          "#784256",
          "#784356",
          "#774256",
          "#774256",
          "#774256",
          "#764256",
          "#764256",
          "#764256",
          "#754256",
          "#754256",
          "#744255",
          "#744255",
          "#744255",
          "#734255",
          "#734255",
          "#734255",
          "#724255",
          "#724255",
          "#724255",
          "#714255",
          "#714255",
          "#6f4255",
          "#6f4255",
          "#6f4255",
          "#6e4255",
          "#6e4255",
          "#6e4255",
          "#6d4255",
          "#6d4255",
          "#6d4255",
          "#6c4255",
          "#6c4255",
          "#6c4255",
          "#6b4155",
          "#6b4155",
          "#694155",
          "#694155",
          "#694155",
          "#684155",
          "#684155",
          "#684155",
          "#684155",
          "#684155",
          "#674155",
          "#674155",
          "#674155",
          "#664154",
          "#664154",
          "#654154",
          "#654154",
          "#654154",
          "#634154",
          "#634154",
          "#624154",
          "#624154",
          "#614154",
          "#614154",
          "#614154",
          "#604054",
          "#604054",
          "#5f4054",
          "#5f4054",
          "#5f4054",
          "#5e4054",
          "#5e4054",
          "#5d4054",
          "#5d4054",
          "#5d4054",
          "#5c4053",
          "#5c4053",
          "#5c4053",
          "#5b4053",
          "#5b4053",
          "#5a4053",
          "#5a4053",
          "#5a4053",
          "#593f53",
          "#593f53",
          "#593f53",
          "#583f53",
          "#583f53",
          "#583f53",
          "#573f53",
          "#573e53",
          "#573e53",
          "#563e53",
          "#563e53",
          "#563e53",
          "#563e53",
          "#553e52",
          "#553e52",
          "#553e52",
          "#543e52",
          "#543e52",
          "#543e52",
          "#543e52",
          "#543e52",
          "#533e52",
          "#533e52",
          "#533e52",
          "#533e52",
          "#533e52",
          "#523e51",
          "#523e51",
          "#523e51",
          "#523e51",
          "#523e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#513e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503e51",
          "#503f51",
          "#503f51",
          "#4f3f51",
          "#4f3f51",
          "#4f3f51",
          "#4d3f51",
          "#4d3f51",
          "#4d4151",
          "#4b4151",
          "#4b4151",
          "#4a4152",
          "#494152",
          "#484253",
          "#484253",
          "#474253",
          "#474253",
          "#464353",
          "#454353",
          "#454353",
          "#444454",
          "#444454",
          "#434454",
          "#434454",
          "#424454",
          "#424554",
          "#424554",
          "#424554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#414554",
          "#404654",
          "#404654",
          "#404654",
          "#404653",
          "#404653",
          "#3f4653",
          "#3f4753",
          "#3f4753",
          "#3e4753",
          "#3e4753",
          "#3e4852",
          "#3d4852",
          "#3d4852",
          "#3c4951",
          "#3c4951",
          "#3b4951",
          "#3b4a51",
          "#3b4a50",
          "#3b4a50",
          "#3a4c50",
          "#394c50",
          "#394c50",
          "#394c50",
          "#394c50",
          "#394c50",
          "#384c4f",
          "#384c4f",
          "#384c4f",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384d50",
          "#384e50",
          "#364e50",
          "#364e4f",
          "#364e4f",
          "#364e4f",
          "#364e4f",
          "#364e4f",
          "#364f4f",
          "#364f4f",
          "#354f4f",
          "#354f4f",
          "#354f4f",
          "#354f4f",
          "#35514f",
          "#35514f",
          "#35514f",
          "#34514f",
          "#34514f",
          "#34524f",
          "#34524f",
          "#34524f",
          "#34524f",
          "#33524e",
          "#33534e",
          "#33534e",
          "#33534e",
          "#32534e",
          "#32544e",
          "#32544e",
          "#32544e",
          "#32544e",
          "#31554e",
          "#31554e",
          "#31554e",
          "#31564d",
          "#31564d",
          "#31564d",
          "#31564d",
          "#31574d",
          "#30574d",
          "#30574d",
          "#30584d",
          "#30584d",
          "#2f584d",
          "#2f594d",
          "#2f594d",
          "#2f594c",
          "#2e5a4c",
          "#2e5a4c",
          "#2e5a4c",
          "#2d5b4c",
          "#2d5b4c",
          "#2d5b4c",
          "#2d5b4c",
          "#2c5c4c",
          "#2c5c4c",
          "#2c5c4c",
          "#2b5d4b",
          "#2b5d4b",
          "#2b5d4b",
          "#2b5e4b",
          "#2a5e4b",
          "#2a5e4b",
          "#2a5f4b",
          "#2a5f4b",
          "#2a5f4b",
          "#2a604b",
          "#2a604b",
          "#2a604b",
          "#29624b",
          "#29624b",
          "#29624b",
          "#29624b",
          "#29634b",
          "#29634b",
          "#29634b",
          "#29644b",
          "#28644b",
          "#28644b",
          "#28644b",
          "#28654b",
          "#28654a",
          "#27654a",
          "#27664a",
          "#27664a",
          "#27664a",
          "#27664a",
          "#26684a",
          "#26684a",
          "#26684a",
          "#26684a",
          "#26694a",
          "#25694a",
          "#25694a",
          "#25694a",
          "#256a4a",
          "#256a4a",
          "#256a4a",
          "#256a4a",
          "#246a4a",
          "#246b49",
          "#246b49",
          "#246b49",
          "#246b49",
          "#246c49",
          "#246c49",
          "#236c49",
          "#236c49",
          "#236e49",
          "#236e49",
          "#236e49",
          "#236e49",
          "#236f49",
          "#236f49",
          "#236f49",
          "#226f49",
          "#227049",
          "#227049",
          "#227049",
          "#227149",
          "#227149",
          "#227149",
          "#227149",
          "#227349",
          "#217349",
          "#217349",
          "#217449",
          "#217449",
          "#217449",
          "#217449",
          "#217549",
          "#217549",
          "#217549",
          "#207649",
          "#207649",
          "#207649",
          "#207847",
          "#207847",
          "#207847",
          "#207947",
          "#207947",
          "#207947",
          "#207947",
          "#207947",
          "#207947",
          "#207b47",
          "#207b47",
          "#207b47",
          "#207c47",
          "#207c47",
          "#207c47",
          "#207d47",
          "#207d47",
          "#207e48",
          "#207e48",
          "#207e48",
          "#208048",
          "#208048",
          "#208048",
          "#208148",
          "#208148",
          "#208148",
          "#208248",
          "#1f8247",
          "#1f8247",
          "#1f8347",
          "#1f8347",
          "#1f8347",
          "#1f8547",
          "#1f8547",
          "#1f8547",
          "#1f8647",
          "#1f8647",
          "#1f8647",
          "#1e8747",
          "#1e8747",
          "#1e8747",
          "#1e8747",
          "#1e8947",
          "#1e8947",
          "#1e8947",
          "#1e8a47",
          "#1e8a47",
          "#1e8a47",
          "#1e8b47",
          "#1e8b47",
          "#1e8b47",
          "#1e8b47",
          "#1e8c47",
          "#1e8c47",
          "#1e8c47",
          "#1e8c47",
          "#1e8e47",
          "#1e8e47",
          "#1e8e47",
          "#1e8f47",
          "#1d8f47",
          "#1d8f47",
          "#1d8f47",
          "#1d9047",
          "#1d9047",
          "#1e9047",
          "#1e9047",
          "#1e9147",
          "#1e9147",
          "#1e9147",
          "#1e9347",
          "#1e9347",
          "#1e9347",
          "#1e9347",
          "#1e9447",
          "#1e9447",
          "#1e9447",
          "#1e9548",
          "#1e9548",
          "#1e9548",
          "#1e9648",
          "#1e9648",
          "#1e9648",
          "#1f9848",
          "#1f9848",
          "#1f9848",
          "#209948",
          "#209948",
          "#209948",
          "#209a48",
          "#209a48",
          "#209a48",
          "#209b48",
          "#209b48",
          "#209b48",
          "#209b48",
          "#219c48",
          "#219c48",
          "#219d48",
          "#219d48",
          "#219e48",
          "#219e48",
          "#219e48",
          "#219f48",
          "#219f48",
          "#21a048",
          "#21a048",
          "#21a048",
          "#21a148",
          "#21a148",
          "#21a348",
          "#21a348",
          "#22a449",
          "#22a449",
          "#22a449",
          "#22a549",
          "#22a549",
          "#22a649",
          "#22a649",
          "#22a64a",
          "#23a74a",
          "#23a74a",
          "#23a84a",
          "#23a84a",
          "#23aa4a",
          "#23aa4a",
          "#23aa4a",
          "#24ab4a",
          "#24ab4a",
          "#24ab4a",
          "#25ac4a",
          "#25ac4a",
          "#25ad4a",
          "#25ad4a",
          "#25ad4a",
          "#26ae4a",
          "#26ae4a",
          "#26ae4a",
          "#26af4a",
          "#26af4a",
          "#26b04a",
          "#26b04a",
          "#26b04a",
          "#27b14a",
          "#27b14a",
          "#27b14a",
          "#27b24a",
          "#27b24a",
          "#27b24a",
          "#27b24a",
          "#27b34a",
          "#27b34a",
          "#27b34a",
          "#28b54b",
          "#28b54b",
          "#28b54b",
          "#28b54b",
          "#28b64b",
          "#28b64b",
          "#28b64d",
          "#28b64d",
          "#28b74d",
          "#28b74d",
          "#28b74d",
          "#29b74d",
          "#29b84d",
          "#29b84d",
          "#29b84d",
          "#29b84d",
          "#29b94d",
          "#29b94d",
          "#29b94d",
          "#29b94d",
          "#29b94d",
          "#29b94d",
          "#29b94d",
          "#29b94e",
          "#2aba4e",
          "#2aba4e",
          "#2aba4e",
          "#2aba4e",
          "#2aba4e",
          "#2aba4e",
          "#2aba4e",
          "#2abb4e",
          "#2abb4e",
          "#2abb4f",
          "#2abb4f",
          "#2abc4f",
          "#2abc4f",
          "#2abc4f",
          "#2bbc4f",
          "#2bbc4f",
          "#2bbd4f",
          "#2bbd4f",
          "#2bbd50",
          "#2bbd50",
          "#2bbd50",
          "#2bbe50",
          "#2bbe50",
          "#2bbe50",
          "#2bbe50",
          "#2bbe50",
          "#2bbf51",
          "#2cbf51",
          "#2cbf51",
          "#2cbf51",
          "#2cc051",
          "#2cc051",
          "#2cc051",
          "#2cc052",
          "#2cc052",
          "#2cc152",
          "#2cc152",
          "#2cc152",
          "#2cc152",
          "#2dc353",
          "#2dc353",
          "#2dc353",
          "#2dc353",
          "#2dc353",
          "#2ec453",
          "#2ec453",
          "#2ec454",
          "#2ec454",
          "#2ec454",
          "#2ec554",
          "#2ec554",
          "#2fc554",
          "#2fc554",
          "#2fc655",
          "#2fc655",
          "#2fc655",
          "#2fc655",
          "#2fc655",
          "#2fc755",
          "#2fc755",
          "#2fc756",
          "#2fc756",
          "#2fc756",
          "#2fc756",
          "#2fc856",
          "#2fc856",
          "#2fc856",
          "#2fc856",
          "#2fc856",
          "#2fc858",
          "#2fc958",
          "#2fc958",
          "#2fc958",
          "#2fc958",
          "#2fc958",
          "#2fc958",
          "#2fc958",
          "#2fca58",
          "#2fca58",
          "#2fca58",
          "#2fca59",
          "#2fca59",
          "#2fca59",
          "#2fca59",
          "#2fca59",
          "#30ca59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb59",
          "#30cb5a",
          "#30cb5a",
          "#30cb5a",
          "#30cb5a",
          "#30cb5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
          "#30cc5a",
        ],
        nullColor: "pink",
      },
      blueGradientBubbles = {
        colors: [
          "#0c3574",
          "#0b3475",
          "#0b3475",
          "#0c3475",
          "#0c3575",
          "#0c3475",
          "#0c3475",
          "#0c3576",
          "#0c3677",
          "#0c3677",
          "#0d3776",
          "#0d3676",
          "#0e3677",
          "#0e3576",
          "#0d3576",
          "#0d3677",
          "#0d3777",
          "#0e3778",
          "#0e3778",
          "#0d3877",
          "#0d3878",
          "#0d3878",
          "#0d3878",
          "#0d3878",
          "#0d3978",
          "#0e3778",
          "#0e3779",
          "#0e397a",
          "#0f3979",
          "#0f3a7a",
          "#0f3a7b",
          "#0f3a7b",
          "#0e3a7a",
          "#0e3a7a",
          "#0f3a7a",
          "#0e3a7a",
          "#0f3a7c",
          "#0f3a7c",
          "#0f3a7b",
          "#0f3b7b",
          "#0f3a7b",
          "#0e3a7b",
          "#0e3b7c",
          "#0f3c7c",
          "#0f3c7c",
          "#0f3d7d",
          "#0f3d7d",
          "#0f3c7d",
          "#0f3c7e",
          "#0f3d7e",
          "#0f3d7e",
          "#0f3d7e",
          "#0f3e7e",
          "#0f3d7e",
          "#103e7e",
          "#113e7f",
          "#103e7e",
          "#103d7e",
          "#103e7f",
          "#103e7e",
          "#113e80",
          "#113f80",
          "#103f7f",
          "#114080",
          "#113f81",
          "#114081",
          "#113f81",
          "#103e80",
          "#103f81",
          "#104181",
          "#104181",
          "#103f81",
          "#114082",
          "#103f82",
          "#103f81",
          "#114081",
          "#114282",
          "#114282",
          "#114282",
          "#124182",
          "#114082",
          "#114182",
          "#114283",
          "#124384",
          "#114384",
          "#114383",
          "#124383",
          "#124485",
          "#114384",
          "#114384",
          "#114384",
          "#114484",
          "#124585",
          "#124585",
          "#124585",
          "#134587",
          "#134586",
          "#134586",
          "#134687",
          "#134687",
          "#134586",
          "#134686",
          "#134687",
          "#134787",
          "#134788",
          "#134688",
          "#134688",
          "#134687",
          "#124788",
          "#124789",
          "#134688",
          "#134688",
          "#134688",
          "#134788",
          "#134889",
          "#13488a",
          "#13488a",
          "#13488a",
          "#134889",
          "#134789",
          "#13478a",
          "#13498a",
          "#14498a",
          "#15498b",
          "#14488b",
          "#14498c",
          "#15498c",
          "#14498b",
          "#15498c",
          "#15498c",
          "#14498c",
          "#154a8d",
          "#144b8c",
          "#144b8c",
          "#154b8d",
          "#144c8d",
          "#154b8d",
          "#154b8d",
          "#154c8d",
          "#144c8d",
          "#154c8d",
          "#154c8d",
          "#164c8e",
          "#164c8e",
          "#164c8e",
          "#164c8e",
          "#154d8e",
          "#154d8f",
          "#164e90",
          "#164e90",
          "#164e90",
          "#154e8f",
          "#154d90",
          "#154e90",
          "#164e90",
          "#154e91",
          "#154f91",
          "#155091",
          "#165091",
          "#164f91",
          "#164f92",
          "#165092",
          "#165092",
          "#165092",
          "#165092",
          "#155192",
          "#155192",
          "#175093",
          "#175293",
          "#175293",
          "#175093",
          "#175093",
          "#175293",
          "#175293",
          "#175193",
          "#175294",
          "#175394",
          "#175394",
          "#175294",
          "#175395",
          "#175295",
          "#175295",
          "#175395",
          "#175395",
          "#185495",
          "#185495",
          "#175396",
          "#175497",
          "#175397",
          "#175497",
          "#175597",
          "#175597",
          "#175597",
          "#175497",
          "#185497",
          "#195698",
          "#195798",
          "#185597",
          "#185497",
          "#185599",
          "#195799",
          "#195799",
          "#185799",
          "#185699",
          "#195699",
          "#195799",
          "#195799",
          "#19589a",
          "#185899",
          "#185899",
          "#18589a",
          "#18589a",
          "#18599a",
          "#18589a",
          "#18579a",
          "#19589b",
          "#19599b",
          "#19599a",
          "#18599a",
          "#1a5a9c",
          "#1a5a9d",
          "#1a5a9c",
          "#1a599d",
          "#1a5a9d",
          "#1a5a9e",
          "#1a5a9e",
          "#195a9d",
          "#195a9d",
          "#195a9d",
          "#195a9d",
          "#1a5a9e",
          "#1a5b9f",
          "#1a5b9e",
          "#1a5b9e",
          "#1a5d9e",
          "#1a5c9f",
          "#195c9f",
          "#195c9f",
          "#195da0",
          "#195d9f",
          "#195ca0",
          "#1a5ca0",
          "#1a5d9f",
          "#1a5ea1",
          "#1a5ea1",
          "#1a5da0",
          "#1a5da0",
          "#195ea0",
          "#195ea0",
          "#1a5ea0",
          "#1a5ea1",
          "#1c5fa3",
          "#1c5fa3",
          "#1b5fa3",
          "#1b5ea2",
          "#1b5ea2",
          "#1b5ea2",
          "#1b5fa3",
          "#1b60a3",
          "#1b60a3",
          "#1b5fa3",
          "#1b60a3",
          "#1c61a4",
          "#1b60a4",
          "#1b60a4",
          "#1b61a4",
          "#1b60a4",
          "#1b60a4",
          "#1b60a4",
          "#1b62a4",
          "#1b62a5",
          "#1b61a5",
          "#1b62a5",
          "#1b62a5",
          "#1b61a5",
          "#1d61a6",
          "#1d63a6",
          "#1c62a6",
          "#1d63a6",
          "#1d62a6",
          "#1c62a6",
          "#1c63a7",
          "#1d64a8",
          "#1c64a7",
          "#1c64a7",
          "#1d65a8",
          "#1c63a8",
          "#1d64a9",
          "#1d65a9",
          "#1d65a9",
          "#1d65a9",
          "#1d65a9",
          "#1d66a9",
          "#1d66a9",
          "#1c65a9",
          "#1d66aa",
          "#1d66aa",
          "#1c65aa",
          "#1c66aa",
          "#1c66aa",
          "#1d66aa",
          "#1c66ab",
          "#1c68ab",
          "#1c67ab",
          "#1c67ab",
          "#1d68ab",
          "#1d68ac",
          "#1e68ac",
          "#1e67ab",
          "#1d67ab",
          "#1e69ac",
          "#1e69ac",
          "#1d68ac",
          "#1d68ac",
          "#1e69ae",
          "#1e6aae",
          "#1e6aad",
          "#1e69ad",
          "#1e6aae",
          "#1d69ae",
          "#1d6aae",
          "#1e6bae",
          "#1e6aaf",
          "#1e6baf",
          "#1e6baf",
          "#1e6bb0",
          "#1e6cb0",
          "#1d6baf",
          "#1d6baf",
          "#1e6bb0",
          "#1d6ab0",
          "#1d6cb0",
          "#1d6db1",
          "#1e6cb1",
          "#1e6db0",
          "#1e6cb1",
          "#1d6cb1",
          "#1d6cb0",
          "#1f6db1",
          "#1f6cb1",
          "#1f6cb1",
          "#1f6db2",
          "#1f6cb1",
          "#1f6db1",
          "#1f6eb3",
          "#1f6fb3",
          "#1f6eb3",
          "#1f6eb3",
          "#1f6fb3",
          "#1f6fb3",
          "#1f6fb4",
          "#1f6fb4",
          "#1f6fb4",
          "#2070b5",
          "#1f70b4",
          "#1f70b4",
          "#1f70b4",
          "#1f71b5",
          "#1f71b5",
          "#1f71b5",
          "#1f71b5",
          "#1f70b5",
          "#1f71b5",
          "#1f72b6",
          "#1f72b6",
          "#1f71b6",
          "#1f71b6",
          "#1f72b5",
          "#2072b6",
          "#2172b7",
          "#2172b7",
          "#2172b6",
          "#2172b6",
          "#2172b7",
          "#2072b7",
          "#2073b8",
          "#2173b9",
          "#2173b9",
          "#2075b8",
          "#2075b8",
          "#2174b8",
          "#2174b9",
          "#2175ba",
          "#2174ba",
          "#2174ba",
          "#2175ba",
          "#2175ba",
          "#2176bb",
          "#2176bb",
          "#2076ba",
          "#2076ba",
          "#2176bb",
          "#2176bb",
          "#2076bb",
          "#2077bb",
          "#2177bc",
          "#2077bb",
          "#2077bb",
          "#2077bc",
          "#2077bc",
          "#2077bc",
          "#2177bd",
          "#2078bc",
          "#2078bc",
          "#2178bd",
          "#2279be",
          "#2178be",
          "#2179be",
          "#2179be",
          "#2279bf",
          "#2278bf",
          "#2179bf",
          "#217abf",
          "#227ac0",
          "#2279c0",
          "#227ac0",
          "#227abf",
          "#227ac0",
          "#217bc0",
          "#227bc0",
          "#227bc0",
          "#217bc0",
          "#217ac0",
          "#217bc0",
          "#217cc1",
          "#227cc1",
          "#217cc1",
          "#217cc1",
          "#227cc1",
          "#217cc1",
          "#227cc2",
          "#227cc2",
          "#227dc2",
          "#217dc1",
          "#217dc2",
          "#217dc2",
          "#217dc3",
          "#217ec3",
          "#217ec3",
          "#217ec3",
          "#227ec4",
          "#237fc4",
          "#237ec5",
          "#237ec5",
          "#237ec5",
          "#237ec4",
          "#237ec4",
          "#237ec6",
          "#237fc6",
          "#2380c6",
          "#237fc5",
          "#237fc5",
          "#2380c5",
          "#2380c7",
          "#2381c6",
          "#2381c6",
          "#2380c6",
          "#2381c7",
          "#2380c6",
          "#2380c7",
          "#2381c8",
          "#2382c7",
          "#2381c7",
          "#2381c7",
          "#2382c8",
          "#2382c8",
          "#2383c8",
          "#2384c9",
          "#2384c9",
          "#2383c8",
          "#2383c9",
          "#2383ca",
          "#2384ca",
          "#2384ca",
          "#2383ca",
          "#2383ca",
          "#2384ca",
          "#2384ca",
          "#2484cb",
          "#2485cb",
          "#2385cb",
          "#2384cb",
          "#2385cb",
          "#2485cb",
          "#2585cc",
          "#2586cc",
          "#2485cc",
          "#2485cc",
          "#2485cc",
          "#2486cd",
          "#2586cd",
          "#2587cd",
          "#2487cc",
          "#2486cd",
          "#2587cd",
          "#2587cd",
          "#2487ce",
          "#2588ce",
          "#2588ce",
          "#2588ce",
          "#2488cf",
          "#2588cf",
          "#2589ce",
          "#2589ce",
          "#2688cf",
          "#2589ce",
          "#2789cf",
          "#2889d0",
          "#2889d0",
          "#288ad0",
          "#2889d0",
          "#298ad0",
          "#2b8bd0",
          "#2a89cf",
          "#2989cf",
          "#2b8bcf",
          "#2c8cd0",
          "#2c8ccf",
          "#2d8cd0",
          "#2d8cd0",
          "#2c8bd0",
          "#2e8cd1",
          "#2e8cd1",
          "#2e8cd0",
          "#2e8cd1",
          "#2e8dd0",
          "#308ed0",
          "#318ed1",
          "#318dd1",
          "#308dd0",
          "#308dd0",
          "#318fd0",
          "#338fd1",
          "#328dd1",
          "#338ed1",
          "#348fd1",
          "#348fd2",
          "#338ed2",
          "#338ed1",
          "#348fd1",
          "#3590d1",
          "#368fd2",
          "#3690d1",
          "#3690d1",
          "#3690d2",
          "#3791d3",
          "#3791d3",
          "#3791d2",
          "#3790d2",
          "#3790d2",
          "#3892d2",
          "#3892d2",
          "#3992d2",
          "#3a92d3",
          "#3a93d3",
          "#3b92d3",
          "#3b92d3",
          "#3a93d3",
          "#3a93d3",
          "#3b93d3",
          "#3c94d3",
          "#3d94d3",
          "#3d94d3",
          "#3d94d3",
          "#3d93d3",
          "#3f93d4",
          "#3f96d4",
          "#3f96d4",
          "#3e95d3",
          "#3e96d3",
          "#3f96d4",
          "#4095d4",
          "#4095d4",
          "#3f96d4",
          "#3f96d4",
          "#4096d4",
          "#4297d4",
          "#4197d4",
          "#4096d3",
          "#4196d3",
          "#4397d5",
          "#4398d5",
          "#4397d5",
          "#4398d5",
          "#4398d5",
          "#4499d5",
          "#4499d5",
          "#4499d5",
          "#4499d5",
          "#459ad5",
          "#459ad4",
          "#459ad4",
          "#459ad4",
          "#459ad5",
          "#459ad6",
          "#469bd6",
          "#469bd5",
          "#469ad5",
          "#469ad5",
          "#479bd5",
          "#499cd6",
          "#499cd6",
          "#499cd5",
          "#499cd5",
          "#499cd6",
          "#4a9dd6",
          "#4a9fd6",
          "#4a9ed6",
          "#4a9ed5",
          "#4a9ed6",
          "#4b9ed7",
          "#4b9ed7",
          "#4b9fd7",
          "#4a9ed7",
          "#4b9ed7",
          "#4ca0d7",
          "#4c9ed7",
          "#4b9ed7",
          "#4c9fd7",
          "#4da0d7",
          "#4da0d8",
          "#4da0d8",
          "#4c9fd8",
          "#4c9fd7",
          "#4da0d7",
          "#4ea2d8",
          "#4ea2d8",
          "#4ea1d8",
          "#4ea2d7",
          "#4ea2d7",
          "#4ea2d8",
          "#4ea2d7",
          "#4ea2d7",
          "#4fa3d9",
          "#50a3d9",
          "#50a3d8",
          "#4fa2d8",
          "#4fa3d8",
          "#51a3d8",
          "#51a3d8",
          "#51a3d9",
          "#51a3d8",
          "#51a3d8",
          "#52a4d9",
          "#52a5da",
          "#52a4d9",
          "#52a4d9",
          "#52a5da",
          "#53a5da",
          "#53a5da",
          "#53a5da",
          "#54a5da",
          "#54a5da",
          "#54a6d9",
          "#54a7d9",
          "#54a6d9",
          "#54a7d9",
          "#55a8da",
          "#55a8da",
          "#56a8db",
          "#55a7da",
          "#56a8db",
          "#57a8db",
          "#56a7da",
          "#57a8db",
          "#57a8db",
          "#57a8db",
          "#58a9da",
          "#58aada",
          "#57a9da",
          "#57a8da",
          "#57a9da",
          "#58aadb",
          "#59aadb",
          "#59aadb",
          "#59aadc",
          "#59abdb",
          "#5aacdb",
          "#5aabdb",
          "#59abdb",
          "#5babdb",
          "#5babdc",
          "#5babdc",
          "#5aabdc",
          "#5baddc",
          "#5bacdc",
          "#5cacdc",
          "#5bacdc",
          "#5caedc",
          "#5caddc",
          "#5cacdc",
          "#5caddc",
          "#5dafdc",
          "#5dafdc",
          "#5caedc",
          "#5daedc",
          "#5eb0dd",
          "#5db0dd",
          "#5eafdd",
          "#5eafdd",
          "#5fb1dd",
          "#5fb1dd",
          "#5fafdd",
          "#5fafdd",
          "#60b1dd",
          "#60b1dd",
          "#60b1dd",
          "#60b1dd",
          "#60b1dd",
          "#61b1de",
          "#61b1de",
          "#61b1de",
          "#61b1de",
          "#61b2dd",
          "#61b2dd",
          "#62b2dd",
          "#62b2de",
          "#62b2de",
          "#62b2de",
          "#63b3dd",
          "#63b4de",
          "#63b4df",
          "#63b4df",
          "#63b3df",
          "#63b4de",
          "#63b4de",
          "#63b4df",
          "#63b5df",
          "#64b6df",
          "#64b6df",
          "#64b6df",
          "#64b5de",
          "#65b6e0",
          "#65b7e0",
          "#65b7df",
          "#65b6e0",
          "#65b6e0",
          "#65b6df",
          "#66b6df",
          "#67b7e0",
          "#67b8e0",
          "#66b8df",
          "#66b8e0",
          "#67b8df",
          "#67b7df",
          "#67b8e0",
          "#67b9e0",
          "#67b8e0",
          "#68b9e1",
          "#69bae1",
          "#69bae1",
          "#68b8e0",
          "#69b9e0",
          "#69bae0",
          "#69bae0",
          "#6abbe1",
          "#69bbe0",
          "#69bbe0",
          "#69bbe1",
          "#6abce1",
          "#6abbe0",
          "#6abbe0",
          "#6abbe1",
          "#6abce1",
          "#6abce2",
          "#6bbde2",
          "#6bbee1",
          "#6cbde2",
          "#6cbde2",
          "#6bbde1",
          "#6cbde1",
          "#6cbde2",
          "#6cbde2",
          "#6cbde2",
          "#6cbee2",
          "#6cbee2",
          "#6dbfe2",
          "#6dbfe2",
          "#6dbee2",
          "#6ebee3",
          "#6fbfe3",
          "#6fc0e3",
          "#6fc0e2",
          "#6ebfe3",
          "#6ec0e3",
          "#6ec1e3",
          "#6ec1e3",
          "#6ec1e4",
          "#6fc0e3",
          "#70c1e3",
          "#70c2e3",
          "#70c2e4",
          "#6fc1e3",
          "#6fc1e3",
          "#70c2e3",
          "#71c2e4",
          "#70c3e4",
          "#70c2e4",
          "#70c2e4",
          "#72c4e4",
          "#72c4e4",
          "#71c2e4",
          "#71c2e4",
          "#73c4e4",
          "#72c3e4",
          "#72c3e4",
          "#72c3e4",
          "#72c4e4",
          "#73c5e4",
          "#73c5e4",
          "#72c5e4",
          "#73c6e4",
          "#73c5e4",
          "#73c6e4",
          "#74c7e5",
          "#73c6e4",
          "#75c8e5",
          "#74c7e5",
          "#74c7e5",
          "#74c6e5",
          "#75c6e5",
          "#76c7e5",
          "#75c7e5",
          "#76c8e5",
          "#75c8e5",
          "#75c8e6",
          "#76c8e6",
          "#77c8e5",
          "#76c9e6",
          "#76c9e5",
          "#76c9e5",
          "#77cae6",
          "#77c9e6",
          "#77c9e6",
          "#77c9e6",
          "#78cae6",
          "#77cbe7",
          "#77cbe7",
          "#78cbe7",
          "#78cbe7",
          "#79cae6",
          "#78cae6",
          "#78cbe7",
          "#78cae6",
          "#79cae6",
          "#7acce6",
          "#7acde7",
          "#7acbe7",
          "#79cce6",
          "#79cee7",
          "#7acee8",
          "#7acde8",
          "#79cde7",
          "#7acde7",
          "#7bcee8",
          "#7acee7",
          "#7acfe7",
          "#7acee7",
          "#7ccee8",
          "#7bcee7",
          "#7bcfe7",
          "#7bcfe7",
          "#7bcfe8",
          "#7dd0e9",
          "#7dd0e9",
          "#7ccfe8",
          "#7ccfe8",
          "#7cd1e8",
          "#7cd1e8",
          "#7cd0e8",
          "#7cd0e8",
          "#7dd1e8",
          "#7dd2e9",
          "#7dd2e9",
          "#7ed2e9",
          "#7dd1e8",
          "#7dd2e8",
          "#7fd3ea",
          "#7fd3ea",
          "#7ed3e9",
          "#7ed2ea",
          "#80d2ea",
          "#7fd3e9",
          "#7fd2e9",
          "#80d4ea",
          "#80d5ea",
          "#7fd4e9",
          "#7fd4e9",
          "#80d4e9",
          "#81d6ea",
          "#81d6eb",
          "#80d4ea",
          "#80d5ea",
          "#80d6ea",
          "#80d5ea",
          "#81d6ea",
          "#81d6ea",
          "#82d6ea",
          "#82d7ea",
          "#82d8ea",
          "#81d6ea",
          "#81d6ea",
          "#82d8ea",
          "#82d7eb",
          "#82d8eb",
          "#82d8eb",
          "#82d7eb",
          "#83d9eb",
          "#84d9ec",
          "#84d9ec",
          "#83d8eb",
          "#83d8eb",
          "#85d8eb",
          "#85d9eb",
          "#84daeb",
          "#85daeb",
          "#85dbec",
          "#85dbec",
          "#84daec",
          "#85dbec",
          "#86dbec",
          "#86dbec",
          "#85dbec",
          "#85dbec",
          "#85dbec",
          "#85dcec",
          "#86ddec",
          "#86dceb",
          "#86dceb",
          "#87ddec",
          "#86dced",
          "#86dcec",
          "#86deec",
          "#86deed",
          "#87ddec",
          "#87deed",
          "#87dfec",
          "#87deec",
          "#88deed",
          "#89deec",
          "#88deec",
          "#88dfed",
          "#88dfec",
          "#89e0ed",
          "#89e0ee",
          "#88dfee",
          "#89e0ee",
          "#88dfed",
          "#88dfed",
          "#8ae1ee",
          "#89e1ed",
          "#8ae2ee",
          "#8ae2ee",
          "#8ae2ee",
          "#8ae1ee",
          "#8be3ee",
          "#8be3ee",
          "#8be2ee",
          "#8be2ee",
          "#8be2ef",
          "#8ce2ef",
          "#8ce3ef",
          "#8be3ee",
          "#8ce4ef",
          "#8be3ef",
          "#8be3ee",
          "#8de5ef",
          "#8de4ef",
          "#8de4ef",
          "#8de5ef",
          "#8ce4ef",
          "#8de4ef",
          "#8de4ef",
          "#8de4f0",
          "#8ee6f0",
          "#8ee6f0",
          "#8ee6ef",
          "#8ee6ef",
          "#8de7ef",
          "#8de6ef",
          "#8fe7f0",
          "#8fe8f1",
          "#8ee6ef",
          "#8ee6ef",
          "#8ee8f1",
          "#8fe8f1",
          "#8fe7f0",
          "#90e8f1",
          "#90e8f1",
          "#8fe8f0",
          "#90eaf1",
          "#8fe9f0",
          "#8fe9f0",
          "#90eaf1",
          "#90eaf1",
          "#91eaf1",
          "#91eaf1",
          "#91eaf1",
          "#92ebf2",
          "#91eaf1",
        ],
        nullColor: "pink",
      },
      gradientSettings = {
        w: 800,
        h: 600,
        color: d3.scale.category20c(),
        scale: 1,
        padding: {
          top: 15,
          right: 1,
          bottom: 1,
          left: 1,
        },
        minZoom: 1,
        maxZoom: 3,
        dataIndex: 75,
        background: "#262931",
        map: "#262931",
        sectorColor: "#ffffff",
        sectorFontSize: 13,
        sectorPaddingLeft: 3,
        industryFontSize: 10,
        industryColor: "#f2f3f4",
        stockColor: "#ffffff",
        gradients: {
          "": greenRedGradient,
          _5: greenRedGradient,
          _10: greenRedGradient,
          _15: greenRedGradient,
          _20: greenRedGradient,
          _25: greenRedGradient,
          _relvol: blueGradient,
          _pe: redGreenGradient,
          _fpe: redGreenGradient,
          _peg: redGreenGradient,
          _ps: redGreenGradient,
          _pb: redGreenGradient,
          _div: greenGradient,
          _eps5y: greenRedGradient,
          /*_short: d,*/
          _rec: greenRedGradient,
          _earndate: earningsGradient,
        },
        gradientSmall: redGreenGradientSmall,
        bubbleGradients: {
          "": redGreenGradientBubbles,
          _5: redGreenGradientBubbles,
          _10: redGreenGradientBubbles,
          _15: redGreenGradientBubbles,
          _20: redGreenGradientBubbles,
          _25: redGreenGradientBubbles,
          _relvol: blueGradientBubbles,
          _pe: redGreenGradientBubbles,
          _fpe: redGreenGradientBubbles,
          _peg: redGreenGradientBubbles,
          _ps: redGreenGradientBubbles,
          _pb: redGreenGradientBubbles,
          _div: redGreenGradientBubbles,
          _eps5y: redGreenGradientBubbles,
          _short: redGreenGradientBubbles,
          _rec: redGreenGradientBubbles,
          _earndate: redGreenGradientBubbles,
        },
        scaleFontSizes: {
          1: [30, 24, 21, 18, 15, 12, 11, 8],
          1.5: [30, 24, 21, 18, 15, 12, 11, 8],
          2.25: [30, 24, 21, 18, 15, 12, 11, 8, 6, 4],
          3: [30, 24, 21, 18, 15, 12, 11, 8, 6, 4],
        },
        fontSizes: [30, 24, 20, 18, 14, 12, 11, 8, 6, 4],
        fontSizePadding: {
          36: 20,
          30: 16,
          24: 12,
          20: 8,
          18: 4,
          14: 2,
          12: 1,
          11: 1,
          8: 1,
          6: 1,
          4: 0,
        },
        fontSizesWidths: {
          4: {
            0: 2.32,
            1: 2.32,
            2: 2.32,
            3: 2.32,
            4: 2.32,
            5: 2.32,
            6: 2.32,
            7: 2.32,
            8: 2.32,
            9: 2.32,
            "+": 2.32,
            "-": 1.436,
            "%": 3.212,
            ".": 0.9,
            a: 2.094,
            b: 2.28,
            c: 1.908,
            d: 2.28,
            e: 2.138,
            f: 1.402,
            g: 2.07,
            h: 2.274,
            i: 1.084,
            j: 1.076,
            k: 2.206,
            l: 1.084,
            m: 3.368,
            n: 2.274,
            o: 2.274,
            p: 2.262,
            q: 2.28,
            r: 1.634,
            s: 1.748,
            t: 1.548,
            u: 2.274,
            v: 2.134,
            w: 3.164,
            x: 2.16,
            y: 2.134,
            z: 1.878,
            A: 2.84,
            B: 2.606,
            C: 2.682,
            D: 2.99,
            E: 2.29,
            F: 2.246,
            G: 2.892,
            H: 3.024,
            I: 1.256,
            J: 1.748,
            K: 2.792,
            L: 2.068,
            M: 3.72,
            N: 3.024,
            O: 3.198,
            P: 2.5,
            Q: 3.198,
            R: 2.62,
            S: 2.146,
            T: 2.38,
            U: 2.912,
            V: 2.84,
            W: 4.186,
            X: 2.716,
            Y: 2.618,
            Z: 2.468,
          },
          6: {
            0: 3.48,
            1: 3.48,
            2: 3.48,
            3: 3.48,
            4: 3.48,
            5: 3.48,
            6: 3.48,
            7: 3.48,
            8: 3.48,
            9: 3.48,
            "+": 3.48,
            "-": 2.154,
            "%": 4.818,
            ".": 1.35,
            a: 3.141,
            b: 3.42,
            c: 2.862,
            d: 3.42,
            e: 3.207,
            f: 2.103,
            g: 3.105,
            h: 3.411,
            i: 1.626,
            j: 1.614,
            k: 3.309,
            l: 1.626,
            m: 5.052,
            n: 3.411,
            o: 3.411,
            p: 3.393,
            q: 3.42,
            r: 2.451,
            s: 2.622,
            t: 2.322,
            u: 3.411,
            v: 3.201,
            w: 4.746,
            x: 3.24,
            y: 3.201,
            z: 2.817,
            A: 4.26,
            B: 3.909,
            C: 4.023,
            D: 4.485,
            E: 3.435,
            F: 3.369,
            G: 4.338,
            H: 4.536,
            I: 1.884,
            J: 2.622,
            K: 4.188,
            L: 3.102,
            M: 5.58,
            N: 4.536,
            O: 4.797,
            P: 3.75,
            Q: 4.797,
            R: 3.93,
            S: 3.219,
            T: 3.57,
            U: 4.368,
            V: 4.26,
            W: 6.279,
            X: 4.074,
            Y: 3.927,
            Z: 3.702,
          },
          8: {
            0: 4.64,
            1: 4.64,
            2: 4.64,
            3: 4.64,
            4: 4.64,
            5: 4.64,
            6: 4.64,
            7: 4.64,
            8: 4.64,
            9: 4.64,
            "+": 4.64,
            "-": 2.872,
            "%": 6.424,
            ".": 1.8,
            a: 4.188,
            b: 4.56,
            c: 3.816,
            d: 4.56,
            e: 4.276,
            f: 2.804,
            g: 4.14,
            h: 4.548,
            i: 2.168,
            j: 2.152,
            k: 4.412,
            l: 2.168,
            m: 6.736,
            n: 4.548,
            o: 4.548,
            p: 4.524,
            q: 4.56,
            r: 3.268,
            s: 3.496,
            t: 3.096,
            u: 4.548,
            v: 4.268,
            w: 6.328,
            x: 4.32,
            y: 4.268,
            z: 3.756,
            A: 5.68,
            B: 5.212,
            C: 5.364,
            D: 5.98,
            E: 4.58,
            F: 4.492,
            G: 5.784,
            H: 6.048,
            I: 2.512,
            J: 3.496,
            K: 5.584,
            L: 4.136,
            M: 7.44,
            N: 6.048,
            O: 6.396,
            P: 5,
            Q: 6.396,
            R: 5.24,
            S: 4.292,
            T: 4.76,
            U: 5.824,
            V: 5.68,
            W: 8.372,
            X: 5.432,
            Y: 5.236,
            Z: 4.936,
          },
          10: {
            0: 5.8,
            1: 5.8,
            2: 5.8,
            3: 5.8,
            4: 5.8,
            5: 5.8,
            6: 5.8,
            7: 5.8,
            8: 5.8,
            9: 5.8,
            "+": 5.8,
            "-": 3.59,
            "%": 8.03,
            ".": 2.25,
            a: 5.235,
            b: 5.7,
            c: 4.77,
            d: 5.7,
            e: 5.345,
            f: 3.505,
            g: 5.175,
            h: 5.685,
            i: 2.71,
            j: 2.69,
            k: 5.515,
            l: 2.71,
            m: 8.42,
            n: 5.685,
            o: 5.685,
            p: 5.655,
            q: 5.7,
            r: 4.085,
            s: 4.37,
            t: 3.87,
            u: 5.685,
            v: 5.335,
            w: 7.91,
            x: 5.4,
            y: 5.335,
            z: 4.695,
            A: 7.1,
            B: 6.515,
            C: 6.705,
            D: 7.475,
            E: 5.725,
            F: 5.615,
            G: 7.23,
            H: 7.56,
            I: 3.14,
            J: 4.37,
            K: 6.98,
            L: 5.17,
            M: 9.3,
            N: 7.56,
            O: 7.995,
            P: 6.25,
            Q: 7.995,
            R: 6.55,
            S: 5.365,
            T: 5.95,
            U: 7.28,
            V: 7.1,
            W: 10.465,
            X: 6.79,
            Y: 6.545,
            Z: 6.17,
          },
          11: {
            0: 6.38,
            1: 6.38,
            2: 6.38,
            3: 6.38,
            4: 6.38,
            5: 6.38,
            6: 6.38,
            7: 6.38,
            8: 6.38,
            9: 6.38,
            "+": 6.38,
            "-": 3.949,
            "%": 8.833,
            ".": 2.475,
            a: 5.758,
            b: 6.27,
            c: 5.247,
            d: 6.27,
            e: 5.879,
            f: 3.855,
            g: 5.692,
            h: 6.253,
            i: 2.981,
            j: 2.959,
            k: 6.066,
            l: 2.981,
            m: 9.262,
            n: 6.253,
            o: 6.253,
            p: 6.22,
            q: 6.27,
            r: 4.493,
            s: 4.807,
            t: 4.257,
            u: 6.253,
            v: 5.868,
            w: 8.701,
            x: 5.94,
            y: 5.868,
            z: 5.164,
            A: 7.81,
            B: 7.166,
            C: 7.375,
            D: 8.222,
            E: 6.297,
            F: 6.176,
            G: 7.953,
            H: 8.316,
            I: 3.454,
            J: 4.807,
            K: 7.678,
            L: 5.687,
            M: 10.23,
            N: 8.316,
            O: 8.794,
            P: 6.875,
            Q: 8.794,
            R: 7.205,
            S: 5.901,
            T: 6.545,
            U: 8.008,
            V: 7.81,
            W: 11.511,
            X: 7.469,
            Y: 7.199,
            Z: 6.787,
          },
          12: {
            0: 6.96,
            1: 6.96,
            2: 6.96,
            3: 6.96,
            4: 6.96,
            5: 6.96,
            6: 6.96,
            7: 6.96,
            8: 6.96,
            9: 6.96,
            "+": 6.96,
            "-": 4.308,
            "%": 9.636,
            ".": 2.7,
            a: 6.282,
            b: 6.84,
            c: 5.724,
            d: 6.84,
            e: 6.414,
            f: 4.206,
            g: 6.21,
            h: 6.822,
            i: 3.252,
            j: 3.228,
            k: 6.618,
            l: 3.252,
            m: 10.104,
            n: 6.822,
            o: 6.822,
            p: 6.786,
            q: 6.84,
            r: 4.902,
            s: 5.244,
            t: 4.644,
            u: 6.822,
            v: 6.402,
            w: 9.492,
            x: 6.48,
            y: 6.402,
            z: 5.634,
            A: 8.52,
            B: 7.818,
            C: 8.046,
            D: 8.97,
            E: 6.87,
            F: 6.738,
            G: 8.676,
            H: 9.072,
            I: 3.768,
            J: 5.244,
            K: 8.376,
            L: 6.204,
            M: 11.16,
            N: 9.072,
            O: 9.594,
            P: 7.5,
            Q: 9.594,
            R: 7.86,
            S: 6.438,
            T: 7.14,
            U: 8.736,
            V: 8.52,
            W: 12.558,
            X: 8.148,
            Y: 7.854,
            Z: 7.404,
          },
          14: {
            0: 8.12,
            1: 8.12,
            2: 8.12,
            3: 8.12,
            4: 8.12,
            5: 8.12,
            6: 8.12,
            7: 8.12,
            8: 8.12,
            9: 8.12,
            "+": 8.12,
            "-": 5.026,
            "%": 11.242,
            ".": 3.15,
            a: 7.329,
            b: 7.98,
            c: 6.678,
            d: 7.98,
            e: 7.483,
            f: 4.907,
            g: 7.245,
            h: 7.959,
            i: 3.794,
            j: 3.766,
            k: 7.721,
            l: 3.794,
            m: 11.788,
            n: 7.959,
            o: 7.959,
            p: 7.917,
            q: 7.98,
            r: 5.719,
            s: 6.118,
            t: 5.418,
            u: 7.959,
            v: 7.469,
            w: 11.074,
            x: 7.56,
            y: 7.469,
            z: 6.573,
            A: 9.94,
            B: 9.121,
            C: 9.387,
            D: 10.465,
            E: 8.015,
            F: 7.861,
            G: 10.122,
            H: 10.584,
            I: 4.396,
            J: 6.118,
            K: 9.772,
            L: 7.238,
            M: 13.02,
            N: 10.584,
            O: 11.193,
            P: 8.75,
            Q: 11.193,
            R: 9.17,
            S: 7.511,
            T: 8.33,
            U: 10.192,
            V: 9.94,
            W: 14.651,
            X: 9.506,
            Y: 9.163,
            Z: 8.638,
          },
          18: {
            0: 10.44,
            1: 10.44,
            2: 10.44,
            3: 10.44,
            4: 10.44,
            5: 10.44,
            6: 10.44,
            7: 10.44,
            8: 10.44,
            9: 10.44,
            "+": 10.44,
            "-": 6.462,
            "%": 14.454,
            ".": 4.05,
            a: 9.423,
            b: 10.26,
            c: 8.586,
            d: 10.26,
            e: 9.621,
            f: 6.309,
            g: 9.315,
            h: 10.233,
            i: 4.878,
            j: 4.842,
            k: 9.927,
            l: 4.878,
            m: 15.156,
            n: 10.233,
            o: 10.233,
            p: 10.179,
            q: 10.26,
            r: 7.353,
            s: 7.866,
            t: 6.966,
            u: 10.233,
            v: 9.603,
            w: 14.238,
            x: 9.72,
            y: 9.603,
            z: 8.451,
            A: 12.78,
            B: 11.727,
            C: 12.069,
            D: 13.455,
            E: 10.305,
            F: 10.107,
            G: 13.014,
            H: 13.608,
            I: 5.652,
            J: 7.866,
            K: 12.564,
            L: 9.306,
            M: 16.74,
            N: 13.608,
            O: 14.391,
            P: 11.25,
            Q: 14.391,
            R: 11.79,
            S: 9.657,
            T: 10.71,
            U: 13.104,
            V: 12.78,
            W: 18.837,
            X: 12.222,
            Y: 11.781,
            Z: 11.106,
          },
          20: {
            0: 11.6,
            1: 11.6,
            2: 11.6,
            3: 11.6,
            4: 11.6,
            5: 11.6,
            6: 11.6,
            7: 11.6,
            8: 11.6,
            9: 11.6,
            "+": 11.6,
            "-": 7.18,
            "%": 16.06,
            ".": 4.5,
            a: 10.47,
            b: 11.4,
            c: 9.54,
            d: 11.4,
            e: 10.69,
            f: 7.01,
            g: 10.35,
            h: 11.37,
            i: 5.42,
            j: 5.38,
            k: 11.03,
            l: 5.42,
            m: 16.84,
            n: 11.37,
            o: 11.37,
            p: 11.31,
            q: 11.4,
            r: 8.17,
            s: 8.74,
            t: 7.74,
            u: 11.37,
            v: 10.67,
            w: 15.82,
            x: 10.8,
            y: 10.67,
            z: 9.39,
            A: 14.2,
            B: 13.03,
            C: 13.41,
            D: 14.95,
            E: 11.45,
            F: 11.23,
            G: 14.46,
            H: 15.12,
            I: 6.28,
            J: 8.74,
            K: 13.96,
            L: 10.34,
            M: 18.6,
            N: 15.12,
            O: 15.99,
            P: 12.5,
            Q: 15.99,
            R: 13.1,
            S: 10.73,
            T: 11.9,
            U: 14.56,
            V: 14.2,
            W: 20.93,
            X: 13.58,
            Y: 13.09,
            Z: 12.34,
          },
          24: {
            0: 13.92,
            1: 13.92,
            2: 13.92,
            3: 13.92,
            4: 13.92,
            5: 13.92,
            6: 13.92,
            7: 13.92,
            8: 13.92,
            9: 13.92,
            "+": 13.92,
            "-": 8.616,
            "%": 19.272,
            ".": 5.4,
            a: 12.564,
            b: 13.68,
            c: 11.448,
            d: 13.68,
            e: 12.828,
            f: 8.412,
            g: 12.42,
            h: 13.644,
            i: 6.504,
            j: 6.456,
            k: 13.236,
            l: 6.504,
            m: 20.208,
            n: 13.644,
            o: 13.644,
            p: 13.572,
            q: 13.68,
            r: 9.804,
            s: 10.488,
            t: 9.288,
            u: 13.644,
            v: 12.804,
            w: 18.984,
            x: 12.96,
            y: 12.804,
            z: 11.268,
            A: 17.04,
            B: 15.636,
            C: 16.092,
            D: 17.94,
            E: 13.74,
            F: 13.476,
            G: 17.352,
            H: 18.144,
            I: 7.536,
            J: 10.488,
            K: 16.752,
            L: 12.408,
            M: 22.32,
            N: 18.144,
            O: 19.188,
            P: 15,
            Q: 19.188,
            R: 15.72,
            S: 12.876,
            T: 14.28,
            U: 17.472,
            V: 17.04,
            W: 25.116,
            X: 16.296,
            Y: 15.708,
            Z: 14.808,
          },
          30: {
            0: 17.4,
            1: 17.4,
            2: 17.4,
            3: 17.4,
            4: 17.4,
            5: 17.4,
            6: 17.4,
            7: 17.4,
            8: 17.4,
            9: 17.4,
            "+": 17.4,
            "-": 10.77,
            "%": 24.09,
            ".": 6.75,
            a: 15.705,
            b: 17.1,
            c: 14.31,
            d: 17.1,
            e: 16.035,
            f: 10.515,
            g: 15.525,
            h: 17.055,
            i: 8.13,
            j: 8.07,
            k: 16.545,
            l: 8.13,
            m: 25.26,
            n: 17.055,
            o: 17.055,
            p: 16.965,
            q: 17.1,
            r: 12.255,
            s: 13.11,
            t: 11.61,
            u: 17.055,
            v: 16.005,
            w: 23.73,
            x: 16.2,
            y: 16.005,
            z: 14.085,
            A: 21.3,
            B: 19.545,
            C: 20.115,
            D: 22.425,
            E: 17.175,
            F: 16.845,
            G: 21.69,
            H: 22.68,
            I: 9.42,
            J: 13.11,
            K: 20.94,
            L: 15.51,
            M: 27.9,
            N: 22.68,
            O: 23.985,
            P: 18.75,
            Q: 23.985,
            R: 19.65,
            S: 16.095,
            T: 17.85,
            U: 21.84,
            V: 21.3,
            W: 31.395,
            X: 20.37,
            Y: 19.635,
            Z: 18.51,
          },
          36: {
            0: 20.88,
            1: 20.88,
            2: 20.88,
            3: 20.88,
            4: 20.88,
            5: 20.88,
            6: 20.88,
            7: 20.88,
            8: 20.88,
            9: 20.88,
            "+": 20.88,
            "-": 12.924,
            "%": 28.908,
            ".": 8.1,
            a: 18.846,
            b: 20.52,
            c: 17.172,
            d: 20.52,
            e: 19.242,
            f: 12.618,
            g: 18.63,
            h: 20.466,
            i: 9.756,
            j: 9.684,
            k: 19.854,
            l: 9.756,
            m: 30.312,
            n: 20.466,
            o: 20.466,
            p: 20.358,
            q: 20.52,
            r: 14.706,
            s: 15.732,
            t: 13.932,
            u: 20.466,
            v: 19.206,
            w: 28.476,
            x: 19.44,
            y: 19.206,
            z: 16.902,
            A: 25.56,
            B: 23.454,
            C: 24.138,
            D: 26.91,
            E: 20.61,
            F: 20.214,
            G: 26.028,
            H: 27.216,
            I: 11.304,
            J: 15.732,
            K: 25.128,
            L: 18.612,
            M: 33.48,
            N: 27.216,
            O: 28.782,
            P: 22.5,
            Q: 28.782,
            R: 23.58,
            S: 19.314,
            T: 21.42,
            U: 26.208,
            V: 25.56,
            W: 37.674,
            X: 24.444,
            Y: 23.562,
            Z: 22.212,
          },
        },
        scaleMinMax: {
          "": [-4, 4],
          _5: [-8, 8],
          _10: [-12, 12],
          _15: [-24, 24],
          _20: [-32, 32],
          _25: [-36, 36],
          _relvol: [0.2, 1.8],
          _pe: [0, 120],
          _fpe: [0, 120],
          _peg: [0, 4],
          _ps: [0, 16],
          _pb: [0, 9.6],
          _div: [0, 1.6],
          _eps5y: [-36, 36],
          _short: [0, 15],
          _rec: [5, 1],
          _earndate: [-1, 1],
        },
        scaleStepFormat: {
          "": "%N%",
          _5: "%N%",
          _10: "%N%",
          _15: "%N%",
          _20: "%N%",
          _25: "%N%",
          _relvol: "%N",
          _pe: "%N",
          _fpe: "%N",
          _peg: "%N",
          _ps: "%N",
          _pb: "%N",
          _div: "%N%",
          _eps5y: "%N%",
          _short: "%N%",
          _rec: {
            1: "%N Strong Buy",
            2: "%N Buy",
            3: "%N Hold",
            4: "%N Sell",
            5: "%N Strong Sell",
          },
          _earndate: {
            "-30": "%N Days",
            "-15": "%N Days",
            "-1": "After Earnings",
            "+1": "Before Earnings",
            "+15": "%N Days",
            "+30": "%N Days",
          },
        },
        logoBase64: "data:image/png;base64,===",
        worldMapBgBase64: "data:image/png;base64,===",
      };
    event.exports = gradientSettings;
  },
  Support: function (event, target) {
    // getting canvas
    function getScaleRatio(event) {
      return window.devicePixelRatio ?? 1;
    }

    function retinafy(canvas, context, width, height) {
      var ratio = window.devicePixelRatio; // set ratio to devicePixelRatio

      // Resize canvas and set its style to match the original size
      if (ratio !== 1) {
        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        context.scale(ratio, ratio);
      }

      return ratio; // return the ratio used
    }

    function getOffset(event) {
      const { target } = event;
      const offset = target.getBoundingClientRect();

      return {
        offsetX: event.clientX - offset.left,
        offsetY: event.clientY - offset.top,
      };
    }

    function isCanvasSupported() {
      const canvas = document.createElement("canvas");
      return !!(canvas.getContext && canvas.getContext("2d"));
    }

    function isSVGSupported() {
      const svg = document.createElementNS(
        "https://www.w3.org/2000/svg",
        "svg"
      );
      return !!(document.createElementNS && svg.createSVGRect);
    }

    function isMobile() {
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i;
      return mobileRegex.test(navigator.userAgent);
    }

    event.exports = {
      getScaleRatio: getScaleRatio,
      retinafy: retinafy,
      getOffset: getOffset,
      isCanvasSupported: isCanvasSupported,
      isSVGSupported: isSVGSupported,
      isMobile: isMobile,
    };
  },
  Select: function (event, target) {
    var a = React.addons.classSet,
      Select = React.createClass({
        displayName: "Select",
        propTypes: {
          options: React.PropTypes.array,
        },
        getDefaultProps: function () {
          return {
            selectClass: "",
          };
        },
        getInitialState: function () {
          return {
            isOpen: false,
          };
        },
        render: function () {
          var event = this,
            t =
              a({
                "is-open": this.state.isOpen,
              }) +
              " " +
              this.props.selectClass,
            c = this.props.options.filter(function (target) {
              return event.props.selected === target.key;
            })[0];
          return (
            void 0 === c && (c = this.props.options[0]),
            React.createElement(
              "div",
              {
                ref: "wrapper",
                className: t,
              },
              React.createElement(
                "div",
                {
                  className: "control",
                  ref: "control",
                  onClick: this._onMouseDown,
                },
                c.value,
                React.createElement(
                  "div",
                  {
                    style: {
                      width: 0,
                      height: 0,
                      overflow: "hidden",
                    },
                  },
                  React.createElement("input", {
                    ref: "input",
                    onBlur: this._onBlur,
                    readOnly: !0,
                    disabled: !0,
                  })
                )
              ),
              React.createElement(
                "div",
                {
                  ref: "menu",
                  className: "menu",
                },
                this.props.options.map(function (t) {
                  return React.createElement(
                    "div",
                    {
                      key: "option-" + t.key,
                      onMouseDown: event._onSelect.bind(event, t),
                    },
                    t.value
                  );
                })
              )
            )
          );
        },
        componentWillUnmount: function () {
          document.removeEventListener("click", this._onDocumentClick);
        },
        componentDidUpdate: function () {
          if (this.state.isOpen) {
            const menu = this.menuRef.current;
            menu.style.marginTop = "-1px";
            const { height, top } = menu.getBoundingClientRect();
            const spaceBelow = window.innerHeight - top;
            const spaceAbove = top - 33;
            if (height > spaceBelow && height < spaceAbove) {
              menu.style.marginTop = `${-height - 33}px`;
            }
          }
        },
        _onMouseDown: function () {
          const { isOpen } = this.state;
          this.setState({
            isOpen: !isOpen,
          });
          if (isOpen) {
            document.removeEventListener("click", this._onDocumentClick);
          } else {
            document.addEventListener("click", this._onDocumentClick);
          }
        },
        _onSelect: function (event) {
          const { selected, options, onSelect } = this.props;
          const selectedOption =
            selected !== undefined
              ? options.find((option) => option.key === selected)
              : options[0];
          if (event.key !== selectedOption.key) {
            onSelect(event);
          }
        },
        _onDocumentClick: function () {
          this.setState({
            isOpen: false,
          }),
            document.removeEventListener("click", this._onDocumentClick);
        },
      });
    event.exports = Select;
  },
  Datetime: function (e, t) {
    var getDate = function () {
        var e = new Date();
        return (
          e.setTime(e.getTime() + 60 * (e.getTimezoneOffset() + -240) * 1e3), e
        );
      },
      getTimeString = function () {
        var e = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          t = [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC",
          ],
          date = getDate(),
          n = "";
        (n += e[date.getDay()].substring(0, 3) + " "),
          (n += t[date.getMonth()] + " ");
        var d = date.getDate();
        d < 10 && (d = "0" + d),
          (n += d + " "),
          (n += date.getFullYear() + " ");
        var hours = date.getHours(),
          r = "AM";
        hours >= 12 && (r = "PM"),
          hours > 12 && (hours -= 12),
          0 == hours && (hours = 12),
          (n += hours + ":");
        var min = date.getMinutes();
        return (
          min < 10 && (min = "0" + min), (n += min + " " + r), (n += " EST")
        );
      },
      isPremarket = function () {
        const date = getDate();
        const isPremium = FinvizSettings.hasUserPremium;
        const dayOfWeek = date.getDay();
        const min = date.getMinutes();

        if (
          isPremium &&
          dayOfWeek !== 0 &&
          dayOfWeek !== 6 &&
          (date.getHours() === 8 || (date.getHours() === 9 && min < 30))
        ) {
          return true;
        }
        return false;
      };
    e.exports = {
      getTimeString: getTimeString,
      isPremarket: isPremarket,
    };
  },
  20: function (e, t, a) {
    function zoomIn(scale, tx, ty) {
      let targetScale = scale;

      function animate() {
        const currentScale = treemap.getScale() + 0.05;
        const newScale = +currentScale.toFixed(2);

        AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCALE,
          scale: newScale,
          tx,
          ty,
        });

        if (currentScale < targetScale + 1e-5) {
          requestAnimationFrame(animate);
        }
      }

      animate();
    }

    function zoomOut(scale, tx, ty) {
      let targetScale = scale;

      function animate() {
        const currentScale = treemap.getScale() - 0.05;
        const newScale = +currentScale.toFixed(2);

        AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCALE,
          scale: newScale,
          tx,
          ty,
        });

        if (currentScale > targetScale - 1e-5) {
          requestAnimationFrame(animate);
        }
      }

      // console.log("zoom-out: ", scale);
      animate();
    }

    function loadSparklinesStarted(industry) {
      AppDispatcher.handleViewAction({
        type: ActionTypes.LOAD_SPARKLINES_STARTED,
        industry: industry,
      }),
        f.abort();
    }

    var AppDispatcher = a(45),
      ActionTypes = a(32).ActionTypes,
      treemap = a(9),
      _targetScale = 1,
      f = {
        abort: function () {},
      },
      l = {
        abort: function () {},
      };
    e.exports = {
      init: function (
        data,
        width,
        height,
        mapType,
        subtype,
        scaleId,
        countIndustryPerf,
        countSectorPerf
      ) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.INIT_COMPLETED,
          data: data,
          width: width,
          height: height,
          mapType: mapType,
          subtype: subtype,
          scaleId: scaleId,
          countIndustryPerf: !!countIndustryPerf,
          countSectorPerf: !!countSectorPerf,
        });
      },
      updateMap: function (
        data,
        width,
        height,
        mapType,
        subtype,
        scaleId,
        countIndustryPerf,
        countSectorPerf
      ) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.UPDATE_MAP,
          data: data,
          width: width,
          height: height,
          mapType: mapType,
          subtype: subtype,
          scaleId: scaleId,
          countIndustryPerf: !!countIndustryPerf,
          countSectorPerf: !!countSectorPerf,
        });
      },
      setHoveredNode: function (node) {
        var hoveredNode = treemap.getHoveredNode();
        AppDispatcher.handleViewAction({
          type: ActionTypes.SET_HOVERED_NODE,
          node: node,
        }),
          !node ||
            (hoveredNode && node.parent === hoveredNode.parent) ||
            loadSparklinesStarted(node.parent);
      },
      changeScale: function (e, t, a) {
        var d = treemap.getScale();
        if (e == d) return changeTra;
        d < e ? zoomIn(e, t, a) : zoomOut(e, t, a);
      },
      changeTranslate: function (tx, ty) {
        var map = treemap.getTreemap(),
          width = map.w,
          height = map.h;
        (tx = Math.min(0, Math.max(tx, width - width * map.zoom.scale()))),
          (ty = Math.min(0, Math.max(ty, height - height * map.zoom.scale()))),
          AppDispatcher.handleViewAction({
            type: ActionTypes.CHANGE_TRANSLATE,
            tx: tx,
            ty: ty,
          });
      },
      zoom: function (direction, offsetX, offsetY) {
        //console.log("放大或缩小...")
        if (
          (void 0 === offsetX &&
            ((offsetX = treemap.getCenter().x),
            (offsetY = treemap.getCenter().y)),
          direction > 0)
        ) {
          //console.log("getNextZoomLevel...")
          var zoomLevel = treemap.getNextZoomLevel();
          zoomLevel !== treemap.getScale() &&
            zoomIn(zoomLevel, offsetX, offsetY);
        } else {
          //console.log("getPreviousZoomLevel...")
          var zoomLevel = treemap.getPreviousZoomLevel();
          zoomLevel !== treemap.getScale() &&
            zoomOut(zoomLevel, offsetX, offsetY);
        }
      },
      zoomAndTranslate: function (scale, tx, ty) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.CHANGE_SCALE,
          scale: 1,
          tx: tx,
          ty: ty,
        }),
          AppDispatcher.handleViewAction({
            type: ActionTypes.CHANGE_SCALE,
            scale: scale,
            tx: tx,
            ty: ty,
          });
      },
      updateData: function (isFirst) {
        var ignoreAuth = window.ignoreAuth;
        if (!isFirst && window.pollingChanged) {
          window.pollingChanged = false;
          return;
        }

        var url = null;
        var condition = "mkt_idx.cur_chng_pct"; //$('#select-change').val()
        var url =
          "https://api.minli.wang/dpyt/getMapParamDataV2?param=" + condition;

        $.ajax({
          type: "GET",
          //url: "https://11.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=99999&np=1&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048&fields=f4,f12",
          url: "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/cn_px_pct.json",
          dataType: "json",
          async: false,
          success: function (t) {
            var nodes = t.data;
            var priceNodes = new Array();
            var stocks = {};

            stocks = t.data;
            console.log("nodes: ", nodes);
            var additional = {};
            var now = new Date();
            $.each(stocks, function (prop, val) {
              if (condition === "act_date") {
                if (nodes[prop] != null && nodes[prop] !== "") {
                  var date = new Date(nodes[prop]);
                  additional[prop] =
                    date.getFullYear() +
                    "-" +
                    (date.getMonth() + 1) +
                    "-" +
                    date.getDate();
                  nodes[prop] = date > now ? -1 : 1;
                } else {
                  additional[prop] = "--";
                  nodes[prop] = null;
                }
              } else {
                // var val = parseFloat(val);
                var arr = val.split("|");
                nodes[prop] = isNaN(arr[0]) ? null : parseFloat(arr[0]); // isNaN(val) ? null : parseFloat(val);
                priceNodes[prop] = arr[1];
              }
            });
            var data = {
              additional: additional,
              nodes: nodes,
              priceNodes: priceNodes,
            };

            AppDispatcher.handleServerAction({
              type: ActionTypes.UPDATE_DATA,
              data: data,
            });
          },
        });
      },

      publishMap: function (data) {
        AppDispatcher.handleViewAction({
          type: ActionTypes.PUBLISH_MAP_STARTED,
        }),
          d3
            .xhr("/publish_map_submit.ashx")
            .header("Content-Type", "application/x-www-form-urlencoded")
            .post(
              "file=" +
                encodeURIComponent(data.replace("data:image/png;base64,", "")) +
                "&type=" +
                treemap.getType() +
                "&subtype=" +
                treemap.getSubtype(),
              function (e, data) {
                e
                  ? AppDispatcher.handleServerAction({
                      type: ActionTypes.PUBLISH_MAP_FAILED,
                      error: e,
                    })
                  : ((data = JSON.parse(data.responseText)),
                    AppDispatcher.handleServerAction({
                      type: ActionTypes.PUBLISH_MAP_COMPLETED,
                      data: data,
                    }));
              }
            );
      },
      closePublish: function () {
        AppDispatcher.handleViewAction({
          type: ActionTypes.PUBLISH_MAP_CLOSE,
        });
      },
      setupWidget: function () {
        AppDispatcher.handleViewAction({
          type: ActionTypes.SET_WIDGET,
          isWidget: !0,
        });
      },
    };
  },
  21: function (e, t) {
    var Sparkline = React.createClass({
      displayName: "Sparkline",
      propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
      },
      shouldComponentUpdate: function (nextProps) {
        return nextProps.data != this.props.data;
      },
      render: function () {
        var data = [].concat(this.props.data);
        var last = data.pop();
        last && data.push(last);
        var data = data,
          x = d3.scale
            .linear()
            .range([0, this.props.width])
            .domain([0, data.length]),
          y = d3.scale
            .linear()
            .range([this.props.height - 4, 0])
            .domain(
              d3.extent(data, function (d) {
                return d;
              })
            ),
          line = d3.svg
            .line()
            .interpolate("basis")
            .x(function (d, i) {
              return x(i);
            })
            .y(function (d, i) {
              return y(d);
            }),
          className = "sparkline " + this.props.className;
        return React.createElement(
          "svg",
          {
            className: className,
            width: this.props.width,
            height: this.props.height,
          },
          React.createElement(
            "g",
            {
              transform: "translate(0, 2)",
            },
            React.createElement("path", {
              d: line(data),
            })
          )
        );
      },
    });
    e.exports = Sparkline;
  },
  3: function (e, t) {
    function EventEmitter() {
      (this._events = this._events || {}),
        (this._maxListeners = this._maxListeners || void 0);
    }

    function c(handler) {
      return "function" == typeof handler;
    }

    function n(n) {
      return "number" == typeof n;
    }

    function d(Reflect) {
      return "object" == typeof Reflect && null !== Reflect;
    }

    function i(e) {
      return void 0 === e;
    }

    (e.exports = EventEmitter),
      (EventEmitter.EventEmitter = EventEmitter),
      (EventEmitter.prototype._events = void 0),
      (EventEmitter.prototype._maxListeners = void 0),
      (EventEmitter.defaultMaxListeners = 10),
      (EventEmitter.prototype.setMaxListeners = function (e) {
        if (!n(e) || e < 0 || isNaN(e))
          throw TypeError("n must be a positive number");
        return (this._maxListeners = e), this;
      }),
      (EventEmitter.prototype.emit = function (type) {
        var t, a, n, r, o, s;
        if (
          (this._events || (this._events = {}),
          "error" === type &&
            (!this._events.error ||
              (d(this._events.error) && !this._events.error.length)))
        ) {
          if ((t = arguments[1]) instanceof Error) throw t;
          var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
          throw ((f.context = t), f);
        }
        if (((a = this._events[type]), i(a))) return !1;
        if (c(a))
          switch (arguments.length) {
            case 1:
              a.call(this);
              break;
            case 2:
              a.call(this, arguments[1]);
              break;
            case 3:
              a.call(this, arguments[1], arguments[2]);
              break;
            default:
              (r = Array.prototype.slice.call(arguments, 1)), a.apply(this, r);
          }
        else if (d(a))
          for (
            r = Array.prototype.slice.call(arguments, 1),
              s = a.slice(),
              n = s.length,
              o = 0;
            o < n;
            o++
          )
            s[o].apply(this, r);
        return !0;
      }),
      (EventEmitter.prototype.addListener = function (e, t) {
        var n;
        if (!c(t)) throw TypeError("listener must be a function");
        return (
          this._events || (this._events = {}),
          this._events.newListener &&
            this.emit("newListener", e, c(t.listener) ? t.listener : t),
          this._events[e]
            ? d(this._events[e])
              ? this._events[e].push(t)
              : (this._events[e] = [this._events[e], t])
            : (this._events[e] = t),
          d(this._events[e]) &&
            !this._events[e].warned &&
            (n = i(this._maxListeners)
              ? EventEmitter.defaultMaxListeners
              : this._maxListeners) &&
            n > 0 &&
            this._events[e].length > n &&
            ((this._events[e].warned = !0),
            console.error(
              "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
              this._events[e].length
            ),
            "function" == typeof console.trace && console.trace()),
          this
        );
      }),
      (EventEmitter.prototype.on = EventEmitter.prototype.addListener),
      (EventEmitter.prototype.once = function (e, t) {
        function a() {
          this.removeListener(e, a), n || ((n = !0), t.apply(this, arguments));
        }

        if (!c(t)) throw TypeError("listener must be a function");
        var n = !1;
        return (a.listener = t), this.on(e, a), this;
      }),
      (EventEmitter.prototype.removeListener = function (type, t) {
        var a, position, i, r;
        if (!c(t)) throw TypeError("listener must be a function");
        if (!this._events || !this._events[type]) return this;
        if (
          ((a = this._events[type]),
          (i = a.length),
          (position = -1),
          a === t || (c(a.listener) && a.listener === t))
        )
          delete this._events[type],
            this._events.removeListener && this.emit("removeListener", type, t);
        else if (d(a)) {
          for (r = i; r-- > 0; )
            if (a[r] === t || (a[r].listener && a[r].listener === t)) {
              position = r;
              break;
            }
          if (position < 0) return this;
          1 === a.length
            ? ((a.length = 0), delete this._events[type])
            : a.splice(position, 1),
            this._events.removeListener && this.emit("removeListener", type, t);
        }
        return this;
      }),
      (EventEmitter.prototype.removeAllListeners = function (e) {
        var t, a;
        if (!this._events) return this;
        if (!this._events.removeListener)
          return (
            0 === arguments.length
              ? (this._events = {})
              : this._events[e] && delete this._events[e],
            this
          );
        if (0 === arguments.length) {
          for (t in this._events)
            "removeListener" !== t && this.removeAllListeners(t);
          return (
            this.removeAllListeners("removeListener"), (this._events = {}), this
          );
        }
        if (((a = this._events[e]), c(a))) this.removeListener(e, a);
        else if (a) for (; a.length; ) this.removeListener(e, a[a.length - 1]);
        return delete this._events[e], this;
      }),
      (EventEmitter.prototype.listeners = function (e) {
        return this._events && this._events[e]
          ? c(this._events[e])
            ? [this._events[e]]
            : this._events[e].slice()
          : [];
      }),
      (EventEmitter.prototype.listenerCount = function (e) {
        if (this._events) {
          var t = this._events[e];
          if (c(t)) return 1;
          if (t) return t.length;
        }
        return 0;
      }),
      (EventEmitter.listenerCount = function (e, t) {
        return e.listenerCount(t);
      });
  },
  32: function (e, t, a) {
    var c = a(7);
    e.exports = {
      ActionTypes: c({
        CHANGE_SCALE: null,
        CHANGE_TRANSLATE: null,
        SET_HOVERED_NODE: null,
        LOAD_SPARKLINES_STARTED: null,
        LOAD_SPARKLINES_COMPLETED: null,
        LOAD_SPARKLINES_FAILED: null,
        INIT_STARTED: null,
        INIT_COMPLETED: null,
        INIT_FAILED: null,
        UPDATE_DATA: null,
        UPDATA_MAP: null,
        PUBLISH_MAP_STARTED: null,
        PUBLISH_MAP_COMPLETED: null,
        PUBLISH_MAP_FAILED: null,
        PUBLISH_MAP_CLOSE: null,
        SET_WIDGET: null,
      }),
      PayloadSources: c({
        SERVER_ACTION: null,
        VIEW_ACTION: null,
      }),
    };
  },
  4: function (e, t, a) {
    e.exports.Dispatcher = a(5);
  },
  45: function (e, t, a) {
    function c(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }

    function d(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }

    var i = (function () {
        function e(e, t) {
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            (c.enumerable = c.enumerable || !1),
              (c.configurable = !0),
              "value" in c && (c.writable = !0),
              Object.defineProperty(e, c.key, c);
          }
        }

        return function (t, a, c) {
          return a && e(t.prototype, a), c && e(t, c), t;
        };
      })(),
      r = a(32),
      o = a(4).Dispatcher,
      PayloadSources = r.PayloadSources,
      f = (function (e) {
        function t() {
          return (
            c(this, t),
            n(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }

        return (
          d(t, e),
          i(t, [
            {
              key: "handleServerAction",
              value: function (action) {
                var payload = {
                  source: PayloadSources.SERVER_ACTION,
                  action: action,
                };
                this.dispatch(payload);
              },
            },
            {
              key: "handleViewAction",
              value: function (action) {
                var payload = {
                  source: PayloadSources.VIEW_ACTION,
                  action: action,
                };
                this.dispatch(payload);
              },
            },
          ]),
          t
        );
      })(o);
    e.exports = new f();
  },
  46: function (e, t, a) {
    var c = a("Gradient"),
      n = a(9),
      Legend = React.createClass({
        displayName: "Legend",
        getInitialState: function () {
          return {
            colorScale: null,
          };
        },
        componentDidMount: function () {
          n.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
          n.removeChangeListener(this._onChange);
        },
        _onChange: function () {
          n.isInitialized() &&
            this.setState({
              colorScale: n.getColorScale(),
            });
        },
        shouldComponentUpdate: function (e, t) {
          return !this.state.colorScale;
        },
        render: function () {
          var e = this;
          if (!this.state.colorScale) return null;
          for (
            var boxover =
                "cssbody=[tooltip_bdy] cssheader=[tooltip_hdr] header=[" +
                this.props.scale.name +
                "] body=[<table width=300><tr><td class='tooltip_tab'>" +
                this.props.scale.tooltip +
                "</td></tr></table>] offsety=[-70] delay=[500]",
              a = this.state.colorScale,
              steps = [c.scaleMinMax[this.props.scale.id][0]],
              diff = c.scaleMinMax[this.props.scale.id][1] - steps[0],
              step = diff / 6,
              diff = 1;
            diff < 7;
            diff++
          )
            steps.push(Math.round(10 * (steps[0] + step * i)) / 10);
          "_rec" === this.props.scale.id
            ? (steps = [5, 4, 3, 2, 1])
            : "_earndate" === this.props.scale.id &&
              (steps = [-30, -15, -1, 1, 15, 30]);
          var stepWidth =
              -1 !== ["_rec", "_earndate"].indexOf(this.props.scale.id)
                ? 100
                : 50,
            onlyPositive = steps[0] >= 0 && steps[steps.length - 1] >= 0;
          return React.createElement(
            "table",
            {
              width: "100%",
            },
            React.createElement(
              "tbody",
              null,
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "td",
                  {
                    className: "info",
                    width: "100%",
                    style: {
                      display: "none",
                    },
                  },
                  "Use mouse wheel to zoom in and out. Drag zoomed map to pan it. Double‑click a ticker to display detailed information in a new window.",
                  React.createElement("br", null),
                  !n.isWidget() &&
                    "Hover mouse cursor over a ticker to see its main competitors in a stacked view with a 3-month history graph."
                ),
                React.createElement(
                  "td",
                  {
                    className: "scale",
                    width: (stepWidth + 1) * steps.length,
                    align: "right",
                    title: boxover,
                    style: {
                      float: "right",
                      marginRight: 0,
                      display: "none",
                    },
                  },
                  steps.map(function (step) {
                    var n = (step > 0 && !onlyPositive ? "+" : "") + step,
                      format = c.scaleStepFormat[e.props.scale.id];
                    "string" != typeof format && (format = format[n]);
                    var style = {
                      background: a(step),
                      width: stepWidth,
                      paddingLeft: 6,
                      paddingRight: 6,
                    };
                    return React.createElement(
                      "div",
                      {
                        className: "step",
                        style: style,
                        key: step,
                      },
                      format.replace("%N", n)
                    );
                  })
                )
              )
            )
          );
        },
      });
    e.exports = Legend;
  },
  47: function (e, t, a) {
    function c(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }

    var n = (function () {
        function e(e, t) {
          var a = [],
            c = !0,
            n = !1,
            d = void 0;
          try {
            for (
              var i, r = e[Symbol.iterator]();
              !(c = (i = r.next()).done) &&
              (a.push(i.value), !t || a.length !== t);
              c = !0
            );
          } catch (e) {
            (n = !0), (d = e);
          } finally {
            try {
              !c && r.return && r.return();
            } finally {
              if (n) throw d;
            }
          }
          return a;
        }

        return function (t, a) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return e(t, a);
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        };
      })(),
      d = (function () {
        function e(e, t) {
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            (c.enumerable = c.enumerable || !1),
              (c.configurable = !0),
              "value" in c && (c.writable = !0),
              Object.defineProperty(e, c.key, c);
          }
        }

        return function (t, a, c) {
          return a && e(t.prototype, a), c && e(t, c), t;
        };
      })(),
      i = a("Gradient"),
      r = a("Support"),
      o = r.isMobile,
      s = [1, 1.5, 2.25, 3],
      f = [1, 1.5],
      l = o() ? f : s,
      b = (function () {
        function e(
          data,
          width,
          height,
          r,
          scaleId,
          countIndustryPerf,
          countSectorPerf
        ) {
          var l = this;
          if (
            (c(this, e),
            (r = void 0 === r || !!r),
            (this.w = width),
            (this.h = height),
            (this.scaleId = scaleId),
            (this.countIndustryPerf = countIndustryPerf),
            (this.countSectorPerf = countSectorPerf),
            (this.nodes = []),
            (this.sectors = []),
            (this.industries = []),
            r)
          ) {
            var layout,
              type = a(9).getType();
            switch (type) {
              case "sec":
                layout = this._generateSP500(data);
                break;
              case "sec_all":
                layout = this._generateFull(data);
                break;
              case "geo":
                layout = this._generateWorld(data);
                break;
              case "etf":
                layout = this._generateETF(data);
            }
            layout.forEach(function (d) {
              d.dx < 1 ||
                d.dy < 1 ||
                (d.children
                  ? d.parent && "Root" === d.parent.name
                    ? l.sectors.push(d)
                    : d.parent &&
                      "Root" !== d.parent.name &&
                      d.children &&
                      l.industries.push(d)
                  : l.nodes.push(d));
            });
          } else
            data.children.forEach(function (e) {
              l.sectors.push(e),
                (e.children || []).forEach(function (e) {
                  l.industries.push(e),
                    (e.children || []).forEach(function (e) {
                      // e.dx < 1 || e.dy < 1 || l.nodes.push(e)
                      l.nodes.push(e);
                    });
                });
            });
          (this.zoom = d3.behavior
            .zoom()
            .scaleExtent([i.minZoom, i.maxZoom])
            .on("zoom", this.onZoom)),
            (this.colorScale = this.getColorScale()),
            this.countIndustryPerf && this._updateIndustryPerf(),
            this.countSectorPerf && this._updateSectorPerf();
        }

        return (
          d(e, [
            {
              key: "getColorScale",
              value: function () {
                var e = n(i.scaleMinMax[this.scaleId], 2),
                  minDomain = e[0],
                  maxDomain = e[1],
                  gradient = i.gradients[this.scaleId],
                  linearScale = d3.scale
                    .linear()
                    .domain([minDomain, maxDomain])
                    .range([0, gradient.colors.length - 1]);
                return function (value) {
                  if (void 0 === value || null === value)
                    return gradient.nullColor;
                  minDomain < maxDomain
                    ? (value > maxDomain && (value = maxDomain),
                      value < minDomain && (value = minDomain))
                    : (value < maxDomain && (value = maxDomain),
                      value > minDomain && (value = minDomain));
                  var i = Math.round(linearScale(value));
                  return gradient.colors[i];
                };
              },
            },
            {
              key: "getColorScaleSmall",
              value: function () {
                var e = n(i.scaleMinMax[this.scaleId], 2),
                  minDomain = e[0],
                  maxDomain = e[1],
                  gradient = i.gradientSmall,
                  linearScale = d3.scale
                    .linear()
                    .domain([minDomain, maxDomain])
                    .range([0, gradient.colors.length - 1]);
                return function (value) {
                  if (void 0 === value || null === value)
                    return gradient.nullColor;
                  minDomain < maxDomain
                    ? (value > maxDomain && (value = maxDomain),
                      value < minDomain && (value = minDomain))
                    : (value < maxDomain && (value = maxDomain),
                      value > minDomain && (value = minDomain));
                  var i = Math.round(linearScale(value));
                  return gradient.colors[i];
                };
              },
            },
            {
              key: "changeScale",
              value: function (newZoom, mapCenter) {
                var oldZoom = this.zoom.scale();
                newZoom = Math.max(i.minZoom, Math.min(newZoom, i.maxZoom));
                var translate = this.zoom.translate();
                if (
                  mapCenter &&
                  void 0 !== mapCenter.x &&
                  void 0 !== mapCenter.y
                )
                  var mapCenterX = mapCenter.x,
                    mapCenterY = mapCenter.y;
                else
                  var mapCenterX = this.w / 2,
                    mapCenterY = this.h / 2;
                var centerX = (mapCenterX - translate[0]) / oldZoom,
                  centerY = (mapCenterY - translate[1]) / oldZoom;
                this.zoom.scale(newZoom);
                var diff = [
                    centerX * newZoom + translate[0],
                    centerY * newZoom + translate[1],
                  ],
                  tx = Math.min(
                    0,
                    Math.max(
                      translate[0] + mapCenterX - diff[0],
                      this.w - this.w * newZoom
                    )
                  ),
                  ty = Math.min(
                    0,
                    Math.max(
                      translate[1] + mapCenterY - diff[1],
                      this.h - this.h * newZoom
                    )
                  );
                this.zoom.translate([tx, ty]);
              },
            },
            {
              key: "updatePerf",
              value: function (data) {
                var t = data.nodes;
                var priceNodes = data.priceNodes;
                var additional = data.additional;

                this.nodes.forEach(function (e) {
                  void 0 !== t[e.name] &&
                    (e.perf = t[e.name]) & (e.price = priceNodes[e.name]),
                    additional[e.name] && (e.additional = additional[e.name]);
                }),
                  this.countIndustryPerf && this._updateIndustryPerf(),
                  this.countSectorPerf && this._updateSectorPerf();
              },
            },
            {
              key: "_updateIndustryPerf",
              value: function () {
                for (
                  var e, t, a, c, n, d, i = 0;
                  i < this.industries.length;
                  i++
                ) {
                  (e = this.industries[i]), (t = 0), (a = 0), (d = !0);
                  var scale = 0,
                    totalScale = 0,
                    total = 0;
                  if (typeof e.children == "undefined") {
                    e.children = [];
                  }
                  for (var r = 0; r < e.children.length; r++)
                    (c = e.children[r]),
                      (n = c.dx * c.dy),
                      (scale = c.scale),
                      void 0 !== c.perf &&
                        null !== c.perf &&
                        ((t += c.perf * n),
                        (total += c.perf * scale),
                        (d = !1)),
                      (a += n),
                      (totalScale += scale);
                  d ||
                    (e.perf = 0 != a ? t / a : 0) ||
                    (e.perf = 0 != totalScale ? total / totalScale : 0);
                }
              },
            },
            {
              key: "_updateSectorPerf",
              value: function () {
                for (
                  var e, t, a, c, n, d, i = 0;
                  i < this.sectors.length;
                  i++
                ) {
                  (e = this.sectors[i]), (a = 0), (c = 0);
                  for (var r = 0; r < e.children.length; r++) {
                    t = e.children[r];
                    for (var o = 0; o < t.children.length; o++)
                      (n = t.children[o]),
                        (d = n.dx * n.dy),
                        void 0 !== n.perf &&
                          null !== n.perf &&
                          (a += n.perf * d),
                        (c += d);
                  }
                  e.perf = 0 != c ? a / c : 0;
                }
              },
            },
            {
              key: "setIdealFontSize",
              value: function (e, t) {
                var a = e.dx - 1,
                  c = e.dy - 1;
                e.nameFontSize = this.findIdealFontSize(e.dx - 1, e.name, t);
                //如果是chrome則最小字體是1px，計算時最小只能按1px計算——这样可以使放大时显示更多的文字
                if (navigator.userAgent.indexOf("Chrome") > -1) {
                  e.nameFontSize = Math.max(e.nameFontSize, 1);
                }
                e.w = this.getTextWidth(e.nameFontSize, e.name);
                var n =
                  (a * t - e.w * t >= 2 * i.fontSizePadding[e.nameFontSize]
                    ? 1
                    : 0) && (c * t - e.nameFontSize * t > 1 ? 1 : 0);
                // var n = 1;
                if (
                  ((e.nameOpacity = 1 === n ? "block" : "none"),
                  "block" === e.nameOpacity)
                ) {
                  (e.perfFontSize = Math.max(
                    this.findIdealFontSize(e.dx - 1, e.name, t) - 6,
                    i.scaleFontSizes[t][i.scaleFontSizes[t].length - 1]
                  )),
                    (e.wp = this.getTextWidth(e.perfFontSize, e.perfText));
                  var n =
                    (a * t - e.wp * t >= 2 * i.fontSizePadding[e.perfFontSize]
                      ? 1
                      : 0) &&
                    (c * t - (1.5 * e.nameFontSize + e.perfFontSize) * t > 1
                      ? 1
                      : 0);
                  e.perfOpacity = 1 === n ? "block" : "none";
                } else e.perfOpacity = "none";
              },
            },
            {
              key: "getTextWidth",
              value: function (e, t) {
                if (!e) return 1 / 0;
                var a,
                  c,
                  n,
                  d = 0,
                  r = t.length,
                  e = Math.floor(e);
                do {
                  if (((n = i.fontSizesWidths[e]), --e < 0)) throw "err";
                } while (!n);
                for (a = 0; a < r; a++) (c = t[a]), (d += n[c] || n.m);
                return d;
              },
            },
            {
              key: "findIdealFontSize",
              value: function (e, t, a) {
                for (
                  var c = i.scaleFontSizes[a], n = 0, d = c.length;
                  n < d;
                  n++
                ) {
                  var r = c[n],
                    o = e - 2 * i.fontSizePadding[r];
                  if (this.getTextWidth(r, t) <= o) return r;
                }
              },
            },
            {
              key: "getLongestText",
              value: function (e, t, a) {
                for (
                  var c = 0, n = i.fontSizesWidths[t], d = 0, r = e.length;
                  d < r &&
                  (void 0 === n[e[d]] ? (c += n[0]) : (c += n[e[d]]), !(c > a));
                  d++
                );
                return e.substring(0, d);
              },
            },
            {
              key: "getZoomLevels",
              value: function () {
                return l;
              },
            },
            {
              key: "getNextZoomLevel",
              value: function () {
                var e = this.zoom.scale();
                if (l[l.length - 1] == e) return e;
                for (var t = 0; t < l.length; t++) if (l[t] > e) return l[t];
              },
            },
            {
              key: "getPreviousZoomLevel",
              value: function () {
                var e = this.zoom.scale();
                if (l[0] == e) return e;
                for (var t = l.length; t >= 0; t--) if (l[t] < e) return l[t];
              },
            },
            {
              key: "getLastZoomLevel",
              value: function () {
                return l[l.length - 1];
              },
            },
            {
              key: "_getTreemap",
              value: function (e) {
                return d3.layout
                  .treemap()
                  .size([this.w, this.h])
                  .padding(function (e) {
                    return e.parent
                      ? e.parent && "Root" !== e.parent.name && e.children
                        ? e.dx > 40 && e.dy > 12
                          ? [
                              i.padding.top -
                                (i.sectorFontSize - i.industryFontSize),
                              i.padding.right,
                              i.padding.bottom,
                              i.padding.left,
                            ]
                          : [4, 1, 1, 1]
                        : [
                            i.padding.top,
                            i.padding.right,
                            i.padding.bottom,
                            i.padding.left,
                          ]
                      : 0;
                  })
                  .ratio(1)
                  .round(!0)
                  .sort(function (t, a) {
                    return t.parent &&
                      "Root" === t.parent.name &&
                      a.parent &&
                      "Root" === a.parent.name
                      ? e[t.name] - e[a.name]
                      : t.value - a.value;
                  });
              },
            },
            {
              key: "_getIndustriesRoots",
              value: function (e, t) {
                return e.children[0].children.filter(function (e) {
                  return t.some(function (t) {
                    return t === e.name;
                  });
                });
              },
            },
            {
              key: "_getSectorsRoots",
              value: function (e, t) {
                return e.children.filter(function (e) {
                  return t.some(function (t) {
                    return t === e.name;
                  });
                });
              },
            },
            {
              key: "_rootsToRoot",
              value: function (e) {
                return {
                  name: "Root",
                  children: [
                    {
                      name: "World",
                      children: e,
                    },
                  ],
                };
              },
            },
            {
              key: "_generateSP500",
              value: function (e) {
                var t = {
                  Technology: 8,
                  Financial: 7,
                  Services: 6,
                  "Consumer Goods": 5,
                  "Basic Materials": 4,
                  Healthcare: 3,
                  "Industrial Goods": 2,
                  Utilities: 1,
                  Conglomerates: 0,
                };
                return this._getTreemap(t).nodes(e);
              },
            },
            {
              key: "_generateFull",
              value: function (e) {
                var t = {
                    Technology: 8,
                    Financial: 7,
                    Services: 6,
                    "Consumer Goods": 5,
                    "Basic Materials": 3,
                    Healthcare: 4,
                    "Industrial Goods": 2,
                    Utilities: 1,
                    Conglomerates: 0,
                  },
                  a = this._getTreemap(t),
                  c = a.nodes(e),
                  n = this._getSectorsRoots(e, ["Basic Materials"])[0],
                  d = this._getSectorsRoots(e, ["Healthcare"])[0];
                "Basic Materials" !== n.name && alert("bm fail"),
                  "Healthcare" !== d.name && alert("h fail"),
                  console.log(n, d);
                var i = function e(t, a) {
                  (t.y += a),
                    (t.children || []).forEach(function (t) {
                      e(t, a);
                    });
                };
                return i(n, -d.dy), i(d, n.dy), c;
              },
            },
            {
              key: "_generateETF",
              value: function (e) {
                var t = {
                  Commodity: 2,
                  Forex: 3,
                  Strategy: 4,
                  "Fixed Income": 5,
                  Global: 6,
                  International: 7,
                  "US Volatility": 8,
                  "US Small Cap": 9,
                  "US Mid Cap": 10,
                  "US Large Cap": 11,
                  "US Sector": 12,
                  US: 13,
                };
                return this._getTreemap(t).nodes(e);
              },
            },
            {
              key: "_generateWorld",
              value: function (e) {
                var t = this,
                  a = this.w / 1211,
                  c = [
                    {
                      x: 4,
                      y: 10,
                      dx: 240,
                      dy: 216,
                      name: "Canada",
                      countries: ["Canada"],
                    },
                    {
                      x: 4,
                      y: 246,
                      dx: 240,
                      dy: 120,
                      name: "Mexico",
                      countries: ["Cayman Islands", "Bermuda", "Mexico"],
                    },
                    {
                      x: 4,
                      y: 391,
                      dx: 240,
                      dy: 156,
                      name: "South America",
                      countries: [
                        "Netherlands Antilles",
                        "Panama",
                        "Peru",
                        "Argentina",
                        "Colombia",
                        "Chile",
                        "Brazil",
                      ],
                    },
                    {
                      x: 730,
                      y: 395,
                      dx: 108,
                      dy: 66,
                      name: "South Africa",
                      countries: ["South Africa"],
                    },
                    {
                      x: 725,
                      y: 195,
                      dx: 108,
                      dy: 66,
                      name: "Israel",
                      countries: ["Israel"],
                    },
                    {
                      x: 1055,
                      y: 435,
                      dx: 144,
                      dy: 66,
                      name: "Australia",
                      countries: ["Australia"],
                    },
                    {
                      x: 871,
                      y: 10,
                      dx: 336,
                      dy: 386,
                      name: "Asia",
                      countries: [
                        "Malaysia",
                        "Russia",
                        "Philippines",
                        "Indonesia",
                        "Singapore",
                        "South Korea",
                        "Taiwan",
                        "India",
                        "Hong Kong",
                        "Japan",
                        "China",
                      ],
                    },
                    {
                      x: 324,
                      y: 10,
                      dx: 374,
                      dy: 418,
                      name: "Europe",
                      countries: [
                        "Cyprus",
                        "Channel Islands",
                        "Greece",
                        "Luxembourg",
                        "Germany",
                        "Belgium",
                        "Spain",
                        "France",
                        "Ireland",
                        "Switzerland",
                        "Netherlands",
                        "United Kingdom",
                      ],
                    },
                    {
                      x: 697,
                      y: 90,
                      dx: 144,
                      dy: 36,
                      name: "Frozen",
                      countries: ["Finland", "Sweden", "Norway", "Denmark"],
                    },
                    {
                      x: 542,
                      y: 429,
                      dx: 102,
                      dy: 54,
                      name: "Italy",
                      countries: ["Italy"],
                    },
                  ],
                  n = [];
                c.forEach(function (c) {
                  (c.x = Math.round(c.x * a)),
                    (c.y = Math.round(c.y * a)),
                    (c.dx = Math.round(c.dx * a)),
                    (c.dy = Math.round(c.dy * a));
                  var d = t._getIndustriesRoots(e, c.countries),
                    r = t._rootsToRoot(d),
                    o = {
                      Ireland: 20,
                      "United Kingdom": 19,
                      Spain: 18,
                      France: 17,
                      Belgium: 16,
                      Netherlands: 15,
                      Switzerland: 14,
                      India: 19,
                      "Hong Kong": 18,
                      "South Korea": 15,
                      Taiwan: 14,
                      Colombia: 30,
                      Chile: 29,
                      Argentina: 28,
                    },
                    s = d3.layout
                      .treemap()
                      .size([c.dx, c.dy])
                      .padding(function (e) {
                        return !e.parent ||
                          (e.parent && "Root" === e.parent.name)
                          ? 0
                          : e.parent && "Root" !== e.parent.name && e.children
                          ? e.dx > 40 && e.dy > 12
                            ? [
                                i.padding.top -
                                  (i.sectorFontSize - i.industryFontSize),
                                i.padding.right,
                                i.padding.bottom,
                                i.padding.left,
                              ]
                            : [4, 1, 1, 1]
                          : [
                              i.padding.top,
                              i.padding.right,
                              i.padding.bottom,
                              i.padding.left,
                            ];
                      })
                      .ratio(1)
                      .round(!0)
                      .sort(function (e, t) {
                        return o[e.name] && o[t.name]
                          ? o[e.name] - o[t.name]
                          : e.value - t.value;
                      }),
                    f = s.nodes(r);
                  f.forEach(function (e) {
                    (e.x += c.x), (e.y += c.y);
                  }),
                    (n = n.concat(f));
                });
                var d = function e(t, a) {
                    (t.y += a),
                      (t.children || []).forEach(function (t) {
                        e(t, a);
                      });
                  },
                  r = function e(t, a) {
                    (t.x += a),
                      (t.children || []).forEach(function (t) {
                        e(t, a);
                      });
                  },
                  o = function (e, t) {
                    return s(e, [t])[0];
                  },
                  s = function (e, t) {
                    return e.children[0].children.filter(function (e) {
                      return t.some(function (t) {
                        return e.name === t;
                      });
                    });
                  },
                  f = o(e, "Brazil"),
                  l = o(e, "Chile"),
                  b = s(e, [
                    "Chile",
                    "Colombia",
                    "Argentina",
                    "Peru",
                    "Panama",
                    "Netherlands Antilles",
                  ]);
                r(f, l.dx),
                  b.forEach(function (e) {
                    r(e, -f.dx);
                  });
                var u = o(e, "Spain"),
                  h = o(e, "France");
                d(u, h.dy), d(h, -u.dy);
                var p = o(e, "Belgium"),
                  m = o(e, "Netherlands");
                return d(p, m.dy), d(m, -p.dy), n;
              },
            },
          ]),
          e
        );
      })();
    e.exports = b;
  },
  5: function (e, t, a) {
    // dispacher
    "use strict";

    function Dispatcher() {
      (this.$Dispatcher_callbacks = {}),
        (this.$Dispatcher_isPending = {}),
        (this.$Dispatcher_isHandled = {}),
        (this.$Dispatcher_isDispatching = !1),
        (this.$Dispatcher_pendingPayload = null);
    }

    var invariant = a(6),
      _lastID = 1;
    (Dispatcher.prototype.register = function (callback) {
      var id = "ID_" + _lastID++;
      return (this.$Dispatcher_callbacks[id] = callback), id;
    }),
      (Dispatcher.prototype.unregister = function (id) {
        invariant(
          this.$Dispatcher_callbacks[id],
          "Dispatcher.unregister(...): `%s` does not map to a registered callback.",
          id
        ),
          delete this.$Dispatcher_callbacks[id];
      }),
      (Dispatcher.prototype.waitFor = function (ids) {
        invariant(
          this.$Dispatcher_isDispatching,
          "Dispatcher.waitFor(...): Must be invoked while dispatching."
        );
        for (var ii = 0; ii < ids.length; ii++) {
          var id = ids[ii];
          this.$Dispatcher_isPending[id]
            ? invariant(
                this.$Dispatcher_isHandled[id],
                "Dispatcher.waitFor(...): Circular dependency detected while waiting for `%s`.",
                id
              )
            : (invariant(
                this.$Dispatcher_callbacks[id],
                "Dispatcher.waitFor(...): `%s` does not map to a registered callback.",
                id
              ),
              this.$Dispatcher_invokeCallback(id));
        }
      }),
      (Dispatcher.prototype.dispatch = function (payload) {
        invariant(
          !this.$Dispatcher_isDispatching,
          "Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch."
        ),
          this.$Dispatcher_startDispatching(payload);
        try {
          for (var id in this.$Dispatcher_callbacks)
            this.$Dispatcher_isPending[id] ||
              this.$Dispatcher_invokeCallback(id);
        } finally {
          this.$Dispatcher_stopDispatching();
        }
      }),
      (Dispatcher.prototype.isDispatching = function () {
        return this.$Dispatcher_isDispatching;
      }),
      (Dispatcher.prototype.$Dispatcher_invokeCallback = function (id) {
        (this.$Dispatcher_isPending[id] = !0),
          this.$Dispatcher_callbacks[id](this.$Dispatcher_pendingPayload),
          (this.$Dispatcher_isHandled[id] = !0);
      }),
      (Dispatcher.prototype.$Dispatcher_startDispatching = function (e) {
        for (var id in this.$Dispatcher_callbacks)
          (this.$Dispatcher_isPending[id] = !1),
            (this.$Dispatcher_isHandled[id] = !1);
        (this.$Dispatcher_pendingPayload = e),
          (this.$Dispatcher_isDispatching = !0);
      }),
      (Dispatcher.prototype.$Dispatcher_stopDispatching = function () {
        (this.$Dispatcher_pendingPayload = null),
          (this.$Dispatcher_isDispatching = !1);
      }),
      (e.exports = Dispatcher);
  },
  58: function (e, t, a) {
    //final output
    var c = a("Gradient"),
      n = a(90),
      d = a(96),
      i = a(93),
      r = a(91),
      o = a("Select"),
      s = (a(46), a(94)),
      f = a(20),
      l = a(9),
      b = a("Support"), // width
      u = b.isCanvasSupported;

    // initCanvas(e=mapData, t="sec", a="", b=width, h=color, p="", m="", y=true, ignoreAuth);
    (window.initCanvas = function (
      e,
      t,
      a,
      b,
      id,
      name,
      tooltip,
      y,
      ignoreAuth,
      price
    ) {
      window.ignoreAuth = ignoreAuth;
      // if (!u())
      //     return document.getElementById("body").innerHTML = '<h1 style="color: #707990; text-align: center">Your browser is no longer supported. Please, <a href="https://whatbrowser.org/" target="_blank" style="color: #fff">upgrade your browser.</a></h1>',
      //         void (document.getElementById("map").style.width = "100%");
      l.isWidget() ||
        (React.render(
          React.createElement(d, {
            scale: {
              id: id,
              name: name,
              tooltip: tooltip,
            },
          }),
          document.querySelector(".zoom")
        ),
        React.render(
          React.createElement(n, {
            scale: {
              id: id,
              name: name,
              tooltip: tooltip,
            },
          }),
          document.getElementById("body")
        ),
        l.isWidget()) ||
        (React.render(
          React.createElement(r, null),
          document.getElementById("hover-wrapper")
        ),
        React.render(
          React.createElement(s, null),
          document.getElementById("modal")
        ));
      var v =
          (Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0
          ),
          (c.w = b)), // g = c.h = ~~(v / 1.8);
        g = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        );
      g = g - 10;

      try {
        if (l.isWidget()) {
          f.updateMap(e, v, g, t, a, id, y);
        } else {
          f.init(e, v, g, t, a, id, y);
          f.setupWidget();
        }
      } catch (e) {}

      if (window.updatePollingPid) {
        clearInterval(window.updatePollingPid);
      }

      var locale = $(".country.active").get(0).id;

      switch (locale) {
        case "cn":
          f.updateData(true, ignoreAuth);
          break;
      }

      // 只有“涨跌幅”的选项需要轮训，其他的不需要
      var week = new Date().getDay();
      var hour = new Date().getHours();
      var minutes = new Date().getMinutes();
      if (
        hour >= 9 &&
        hour <= 15 &&
        $("#select-change").val() == "mkt_idx.cur_chng_pct"
      ) {
        timingUpdate(10);
      }

      function timingUpdate(m) {
        clearInterval(window.updatePollingPid);
        window.updatePollingPid = setInterval(f.updateData, 1e3 * m);
        window.pollingChanged = true;
      }
    }),
      (window.FinvizMapSetupWidget = function () {
        f.setupWidget();
      });
  },
  59: function (e, t, a) {
    var c = a(47),
      n = a("Gradient"),
      d = a("Support"),
      i = d.retinafy;
    window.FinvizInitSmallCanvas = function (e, t, a) {
      function d() {
        var index,
          node,
          c,
          d,
          i,
          f = treemap.nodes.length;
        if ("geo" === t) {
          context.drawImage(
            m,
            0,
            0,
            401,
            175,
            0,
            20,
            width,
            width / (401 / 175)
          );
        }
        if ("geo" == t)
          for (
            context.strokeStyle = n.background,
              context.textBaseline = "alphabetic",
              context.textAlign = "left",
              context.fillStyle = "#3c404b",
              context.font =
                "normal " + n.industryFontSize + "px Microsoft YaHei",
              index = 0,
              i = treemap.industries.length;
            index < i;
            index++
          )
            (node = treemap.industries[index]),
              (context.fillStyle = "#e0e0e0"),
              node.dx > 40 && node.dy,
              context.fillRect(node.x, node.y + 3, node.dx - 1, node.dy - 4);
        for (index = 0; index < f; index++)
          (node = treemap.nodes[index]),
            (node.perfText = ""),
            void 0 !== node.additional && null !== node.additional
              ? (node.perfText = node.additional)
              : void 0 !== node.perf &&
                null !== node.perf &&
                (node.perfText =
                  (node.perf > 0 ? "+" : "") +
                  node.perf.toFixed(2) +
                  (node.dx > 32 ? "%" : "")),
            (context.fillStyle = h(node.perf)),
            context.fillRect(node.x, node.y, node.dx - 1, node.dy - 1),
            treemap.setIdealFontSize(node, scale);
        for (
          context.textBaseline = "middle",
            context.textAlign = "center",
            context.fillStyle = "rgba(0, 0, 0, 0.5)",
            index = 0;
          index < f;
          index++
        )
          (node = treemap.nodes[index]),
            "block" === node.nameOpacity &&
              ((c = node.x + node.dx / 2 + 1),
              (d = node.y + node.dy / 2 + 1),
              "block" === node.perfOpacity && (d -= 0.5 * node.nameFontSize),
              (context.font =
                "normal " + node.nameFontSize + "px Microsoft YaHei"),
              context.fillText(node.name, c, d));
        for (
          context.fillStyle = "rgba(255, 255, 255, 1)", index = 0;
          index < f;
          index++
        )
          (node = treemap.nodes[index]),
            "block" === node.nameOpacity &&
              ((c = node.x + node.dx / 2),
              (d = node.y + node.dy / 2),
              "block" === node.perfOpacity && (d -= 0.5 * node.nameFontSize),
              (context.font =
                "normal " + node.nameFontSize + "px Microsoft YaHei"),
              context.fillText(node.name, c, d));
        for (
          context.fillStyle = "rgba(0, 0, 0, 0.5)", index = 0;
          index < f;
          index++
        )
          (node = treemap.nodes[index]),
            "block" === node.perfOpacity &&
              ((c = node.x + node.dx / 2 + 1),
              (d = node.y + node.dy / 2 + 1 + 0.5 * node.nameFontSize),
              (context.font =
                "normal " + node.perfFontSize + "px Microsoft YaHei"),
              context.fillText(node.perfText, c, d));
        for (
          context.fillStyle = "rgba(255, 255, 255, 1)", index = 0;
          index < f;
          index++
        )
          (node = treemap.nodes[index]),
            "block" === node.perfOpacity &&
              ((c = node.x + node.dx / 2),
              (d = node.y + node.dy / 2 + 0.5 * node.nameFontSize),
              (context.font =
                "normal " + node.perfFontSize + "px Microsoft YaHei"),
              context.fillText(node.perfText, c, d));
        if (
          ("geo" !== t &&
            ((context.lineWidth = 2),
            (context.strokeStyle = "#e0e0e0"),
            context.beginPath(),
            context.moveTo(-1, -1),
            context.lineTo(width, -1),
            context.moveTo(151, -1),
            context.lineTo(151, height),
            context.moveTo(0, 152),
            context.lineTo(151, 152),
            context.moveTo(151, 159),
            context.lineTo(273, 159),
            context.moveTo(272, -1),
            context.lineTo(272, height),
            context.moveTo(272, 77),
            context.lineTo(width, 77),
            context.moveTo(272, 201),
            context.lineTo(width, 201),
            context.moveTo(362, 201),
            context.lineTo(362, height),
            context.moveTo(0, -1),
            context.lineTo(0, height),
            context.moveTo(width, -1),
            context.lineTo(width, height),
            context.moveTo(0, height - 2),
            context.lineTo(width, height - 2),
            context.stroke()),
          "geo" !== t)
        )
          for (
            context.lineWidth = 1,
              context.fillStyle = "#000",
              context.font = n.sectorFontSize + "px Microsoft YaHei",
              context.textBaseline = "alphabetic",
              context.textAlign = "left",
              context.strokeStyle = "rgba(224, 224, 224, 0.6)",
              index = 0,
              i = treemap.sectors.length;
            index < i;
            index++
          )
            (node = treemap.sectors[index]),
              (context.fillStyle = h(node.perf)),
              context.fillRect(node.x + 1, node.y + 11, node.dx - 2, 1),
              (context.fillStyle = h(node.perf)),
              (context.strokeStyle = "#343842"),
              context.beginPath(),
              context.moveTo(node.x + 1.5, node.y),
              context.lineTo(node.x + 1.5, node.y + n.industryFontSize + 1.5),
              context.lineTo(node.x + 6, node.y + n.industryFontSize + 1.5),
              context.lineTo(
                node.x + 11,
                node.y + n.industryFontSize + 1.5 + 5
              ),
              context.lineTo(node.x + 16, node.y + n.industryFontSize + 1.5),
              context.lineTo(
                node.x + node.dx - 1.5,
                node.y + n.industryFontSize + 1.5
              ),
              context.lineTo(node.x + node.dx - 1.5, node.y),
              context.fill(),
              context.stroke(),
              (context.fillStyle = h(node.perf)),
              context.fillRect(node.x + 1, node.y, node.dx - 2, 11),
              (context.fillStyle = "#fff"),
              context.fillText(
                node.name.toUpperCase(),
                node.x + 2 * n.padding.left + n.sectorPaddingLeft,
                node.y + n.sectorFontSize
              );
        "geo" == t &&
          ((context.fillStyle = "#e0e0e0"),
          (context.font = n.sectorFontSize - 1 + "px Microsoft YaHei"),
          (context.textBaseline = "alphabetic"),
          (context.textAlign = "left"),
          treemap.industries.forEach(function (node) {
            if (node.dx > 40 && node.dy > 12) {
              (context.fillStyle = h(node.perf)),
                (context.strokeStyle = "#e0e0e0"),
                context.beginPath(),
                context.moveTo(node.x + 0.5, node.y + 3.5),
                context.lineTo(node.x + node.dx - 2.5, node.y + 3.5),
                context.moveTo(node.x + 0.5, node.y + 3),
                context.lineTo(node.x + 0.5, node.y + n.industryFontSize + 2.5),
                node.dy > 20 &&
                  (context.lineTo(
                    node.x + 6,
                    node.y + n.industryFontSize + 2.5
                  ),
                  context.lineTo(
                    node.x + 11,
                    node.y + n.industryFontSize + 2.5 + 5
                  ),
                  context.lineTo(
                    node.x + 16,
                    node.y + n.industryFontSize + 2.5
                  )),
                context.lineTo(
                  node.x + node.dx - 1.5,
                  node.y + n.industryFontSize + 2.5
                ),
                context.lineTo(node.x + node.dx - 1.5, node.y + 3),
                context.fill(),
                context.stroke(),
                (context.fillStyle = "#fff");
              var t = treemap.getLongestText(
                node.name.toUpperCase(),
                n.industryFontSize,
                node.dx - 8
              );
              context.fillText(
                t,
                node.x + 2 * n.padding.left + n.sectorPaddingLeft - 1,
                node.y + n.industryFontSize + 1
              );
            }
          })),
          context.restore();
      }

      var width = 401,
        height = "geo" == t ? 235 : 301;
      (n.fontSizePadding = {
        36: 5,
        30: 5,
        24: 5,
        20: 5,
        18: 5,
        14: 5,
        12: 1,
        11: 1,
        8: 1,
        6: 0,
        4: 0,
      }),
        (n.scaleFontSizes = {
          1: [14, 12, 11, 8, 6],
        }),
        (n.sectorFontSize = 9),
        (n.sectorPaddingLeft = 1),
        (n.padding.top = 10);
      var treemap = new c(e, width, height, !1, "", "geo" === t, "geo" !== t),
        f = document.getElementById(a);
      /*f.style.width = r + "px", f.style.height = o + "px";*/
      var treemap = document.createElement("canvas");
      (treemap.width = width),
        (treemap.height = height),
        (treemap.className = "chart");
      var context = treemap.getContext("2d");
      i(treemap, context, width, height);
      var u = document.getElementById(a);
      (u.innerHTML = ""), u.appendChild(treemap), context.save();
      var h = treemap.getColorScaleSmall(),
        scale = treemap.zoom.scale();
      if (
        ((context.fillStyle = "geo" === t ? "#a7c4d3" : "#343842"),
        context.fillRect(0, 0, width * scale, height * scale),
        context.translate(0, 1),
        "geo" === t)
      ) {
        var m = new Image();
        (m.src =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZEAAACvBAMAAADOCP4NAAAAG1BMVEWnxNOnxNPO4OqqxtXI3OevytjC1+O1ztu709+Lqw3PAAAAAXRSTlPtnl1GowAADuJJREFUeNrUm8l66jgQRrsf4f8UYdbVYtgqYGB7FaZli3mLGZKtQ4BscSYeu9s2Y4wJXJQOfRYZnMT2UalK05c//h941b+//J0/8YPI0mw0ruFrJrZs4ig/adJ97w7AHBrga7hKV3CEnzXxaCTqk+Ycp/Aq/uIuYvlZkyRVlJjjNFhOt8oTxPGzJmgylbpxcSKs3r1aEzYTi2SlidNgEvH8sAmsNErv8mTx5xfE8dMmnQxyZ3hTLdb6p01YfCMXx9gjB1ak8uB5ihh8k+uDvXWqE+wx7D5RwAKHuFIT9vqpH/Fuh9aksEv+/iFQvlKTJzHdE2t7RDEmHokBm09xnSZM3WOXAu2QmWCXeVsD9huu06SQlftmDm0QLg5ylSaW6mMXu+vRmrRkOrTbzmLgc5UmttDYklgq2jJgVrYwaQM39xoBfBkE8BpNWPllKwUkaId6UQ39yMxlnsTK4HpjUhQI6X3A4pK/0pahopCyWg8sHVXVAK7R5IlcBDhZzJP3bpJicCGDMkztehPXaMKdSviZsjwDTwwphgEeXl8sj0jRX7gKE0t++r4aXGgR2eXaDcUiuoqECkvaR27y4ybMGnc6uf1L8PnXQXvk0Gmo1J4J/7jPSfy3WM5fjqp91ptK3JCQStGp7JswIlUJlCSWLl8OYEuwJr4PNpuTIMo8rKNSksFllQVXJJslOpW/9kwsIrHIAZat4SyS1OdZazhRLr6Lok0rylU3NAnegykayQb1mVS/Z1Ig4Vq1EU9WUHQGNwuZz9xQvzjCN8G6z7RBaGAOFId6OLSIqP+vScv9TZMG3SWI0k9dIdljKuHCSydo8J7V+CYs2qEC1GVS0ZiE55s5pG8Hzu+Z8KFrjYnogVxYOq8xK7eoTNTP4XuY0YpqmYg0e4BHW2pwxNkx2TIbq2D8BB5TwGM5uGVN4jvgtCabe1JCwpvRlpFMEJ2V8XJvPyknW/67a8DLAsPxsPpMJJ41Qsx3rvIwnHrkdHLk0Q71qXemyXCUA1jPTfabDCiQHwbxgraVBmBLKR+Jqk2YJ+xKmqkwSXi0L51p4oiqre0320kvvfsJuorq3bFETw5HQD4tYXlEfQSYD0kaXPndC0vpEF1o4sfgo6fIRzzLbhchjcwMjawM1gh3ME8j3GBoUWBSSisDJrtogNW1tEuWylb9wRY92SAxlzBM0KuEa5GPqJaIDJvUlu9FEqI89ivHs2/WwW3Qk80SxuIOm8ebNQkpbz6m61MA6L0LRQuYhPWCkEimTJrEk2UAkEzP7grCNR8RSsFsTGJ5m2gAzSSpFObfUIHpl/+FEVJfxERXJ7BoGO6YmS9cdOebZE3I3B03Wdqqqtk05xBlvsUko8Fzms/oMtJl+nXUpAb2zl0AXI1eYZY8BeNHH2DTxEUW8+lcN4U+avICoAuf7phLmCIXHvy6+SDSTNFFSd+Hz7M8ZpIFgDbYqK1hmROxBvCZIhGG5LIsyWDFMZMFQhyzc5WbsQsfzolcQN/SBQiNrUmLYtAbEzExaRI2EX+AIyR4pnFRycKOCWbV14OptFP6M4CEIRppuTrBbrwBFqlL0l3umQDJoyYOUQr8zlhMRJCkPMNKEkjSJQzwyQSdGUUQk+0yQuhEBmaY8lZQSlh1taF9ARVETMBUfFA8InpwhIYJiiQTIrzt/dQeP9AliH5OfjZBniIIJuGTWBduE3gCCVoAdlfR5VTKd+xzTDhFKdd3TQZmTNJwKC2ZQ2bI5COncweLcW07RaI0DMDu21z9a5IgQ2Qbn004p0M8vIE7FDLVuJxgWyDFHskQqYb+ZMKgDjtj89C0hhH4fJogU/QjMWG6FWOyuX5/L2EIh0yxSHyOSdwYJbBpP0UujJB/J2O4yX7EJKah3I0JGTIptsgc+kBMwBUdYLB5brYJIxTIIG4BUZN2ieKpT2fa0jBBdCwRiqjmrL88h4ycyahJYXF0ISyRuIMRkpH3KTk1Fopo67yER1dHTdhHkmIQ9hITeEKbNBFdWvELrbB0pl9wlkkaPhET3Mxjxx9PAHxJCxg8lBNwNquMJ9kJ9t/AnDMXWvKQCR9SDK+hvT0wF5Nsh1xrMzlngBe8WeLcte98esCExf6FQ6RtFwZg7aadJ2rPNVMZdMLOtSmd2bM616vfBI6QURPrWBwLIw0DhG0uAMiS0PB2hql80O9nZ6yzJFBwBueZ1O2lhDmTLACXOSkkVyufnAx/5CJxXrbnLI1zTDLGNryszVyUoaRGTJEQlXZHiY/uU5AoSfoaUV61BsCAs0wWMAUPSxTAK8DNUnvZyfOD2mlofkrJsoQSTfjk9SETpr7fJLm+HVsA1ot8zOBmf99T0VfUFkznUwh4dA+YxN/kTcIUid2ZKNNokV5lxukHKn0ArYyEj6PPMcnAHNbOyGwDyJVlct/k8euYAOjQAD5VHDCJa47qAOZg9uvHyypVOxJAE/CEQ2qzLr2lL2k3gcegfV9Th03yh/uWhkkYwHrv1fJYY4X9YU0L60RZKvqSql6ZJCnGxDqc7hImaUo2JB+NHW7O3dd2PsCePaoAEZPYROnDJFyIMgW4v22yADAF3l8zy8ge5LFE+QWTtGiNjFyOIe6NcsEa/rBJ4fsGk+iYNYpcPusgiw96XAM4bILeoZpnkifa8rAAWverof8sXF9+hIAYk2g1FxKGiN4/o+HRx1uu154RnZso+MLkNv6wxbwJpYNeVaYNVXX6UVYTITEmyZqiDULsVhjju49biayiEDd/komLCBETDBrbpwyaPcesSSFun3ptclrq9xEhatJLbLaSbA0k+jBIUcU0Mn9aj3k9inIsd+NNkq6zuzPPUzCIRzFoazOrPyH7K4gSNbEGhd3/gORZmCO+64yY2rb209elK0rUBAWpdqfyY5gjEZ/DeFy/JHPR/ZjVnJP26xBvwmVi0QpXqCE2zHF7pOf/0965LLUNQ2H4Gf4Rsr0WtpOtmhCyrUvabB1oYYsbLluHS9jGXMJjd5DxfRxLtjL1dPpvCtM09PO56uikNZMEez+o78uTYLpBpnoS8kw98XL9CnY4TPKb88+tOOrVUvv0EGUJkrKOMU5tovWDNMbOc+CidEadsJTlJE/1sQYoU0+EaEpC1m8b6FHDudZfsGKXTN3k9bc8cUv31j7ludFQIwm8OHeRO3Dy9IAOkuzcs+qeTbLuFsm3qTUdFJ5rMwnxYhMHIli0fdDB2ElCVuVVp0VW2M5q0m+jTVZxqvNCCE3etMBYu2vEQXmxbJyVQSvJcIo2EdsEN8fT+D3v6PltOEJ3mTtPTymoU7ChzXM1NYybJzKCLAmEqT0bgMYdNbPh9BTENuCF188gtAzizjFOBnMkaiQBuf99z1xoldFwOF+IdFwkH35yzRY5c5EByqonEW9kX193DRD5qYMjWoAhMtFcjPNpbophOUglQ0LePL3jiFXDfYghZnLF1jnMX7gl3xqSNT4TjXSSNM1Jn027dN00zj1JYgfpEYs+I5MUCaw4e1G0lsJ0zsZp5cdnJDgxRb3OS4EE8eF3S7WECw2aN015iSREoltM06JJIaRC8uubGIgbw/enEJ1l7CZxCO5nBfTcjjbeYaZF0wyVSfD484Z6zpmm7cFot3stv5cOE9EMORIE6YjrGVAlIW/TJbPj2wd01pipHWzH/kOeZIpEo60KSWWtsHuwWI0kfumHL3k64y9O/BVIqi4xOOboJhLJrdRkisK06chB0mOXV0lUCtq8Kwr1xNs8zYO6I3pJ51kX5iRfcBDyu41NFoVJU0dN7OvtO6+tLWG9k2O5+SywIlu3IQl0XgMn1Y/+DGScKyO5xuowNoknDNeCxKqdY+qPfmeHZ4TjQfxF3nBKJKtSbtElU8W5AGNATgCQR2YjlRIJZQXdQJcMtesz6oUTDvgeszc1caLmBIMthx6Nay546jRxxehIDJFfqbCeAkl1FmgzRxPKQvFq1rA/z/M2iB8X+i4kYrlqDR26V1yPId48PnfaoGb5GkGQKDpBViB1R/y3xmrwKpx9gOgKIvhnZMvlSYyaxZHuChQvmS9EuZmcHGK7/hxMjNl3X5akZoF3oz9Qhs3otnCqDfwXQU0/Bg3zZ9V6op9kouZcgOUmzRiBEHn5XBo2uXKNz/Jld1HlRZ8tYh0VeusrkAspmxBvX1t4gXL3MJ6R0+pjDglX7uqzLXAdWiiT0KeXOSe5f5V7ytjc26Rxol6MoUUHLdbIjvyRueZmeBGTPD4yPnFlSWjFJA8AtPcrh5DV0Wh05Ke5mWMVtibh+7CJA2nRkCAnMyVRrig+tMiq1hMCKfHSayVJQIP9kBjV4DtQeGvrxzoETK5AAtPbC8mq6rMKq0vklziZLUIVEiwa+gotWywcoEyaxDfjj7GsLpVIjH1sp5vVPGJKV6rxYBrDBzOekKjH5kxzwGfP50XW3CSwvfhvEtlhe5LNPmwy3wCPsjWX/mSxHhCxTXvv4vsg8QF4so5rzROXDAP2uy3J/Bx6RCqxFzFHNX/bjA1akgw5dCkq96QR+9riHsZVITnYy276l3Ji9+Tena6L+fu1FYkLfTJKz5XKbSdfBOU+ULEy6iehpQJviF/UGg6h8G+TkFLqstiw1cSPDeRJov188iEokpjMaUfCwhYkPjRqVXxAJPjWksTlyiRD7IMkiQ/KW5KwS1mSoHDY1p+G3a6rul9VSWwOnbLamHrViSROfF7yE7WH/CHkZXQhoUzoan0HvVq0cFqzC4mRpG3dslp017RLxH8pxaXuKj/rvMYTSpKsCnGpP1D8Frnb3i4f1Uki8UeTSxftJDOok3y/y480bK5ik68Q0k/icmUSL3aPqRsk80tZm+yNZPK0PfehSjIYxUmUOpFi3/VBfhGiJzrepuz+Lybky5JYwhP7KOrFYSJJQsaMsd6YBNXaOoQsiSEM2EsZnrhplCTBuLfeBZy50SsA+Sx8ib7qlAKQJOERG6LvkiIZBWyA/kphVk9FR9FbvfwApEn6HCdYOIA8iYv+yrgEpLuVPjsXqA/IkaSLrX0tKZAnORMz9NEDeiw5kqOrXptDgYSEp+i75EjAl703iiQJWT+j5/rr/yPrf5J/muSf0R/K7Oi938aazwAAAABJRU5ErkJggg=="),
          (m.onload = function () {
            context.translate(1, 20), d();
          }.bind(this));
      } else d();
    };
  },
  6: function (module, t, a) {
    "use strict";
    var invariant = function (condition, format, a, b, c, d, e, f) {
      if (!condition) {
        var error;
        if (void 0 === format)
          error = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var args = [a, b, c, d, e, f],
            argIndex = 0;
          error = new Error(
            "Invariant Violation: " +
              format.replace(/%s/g, function () {
                return args[argIndex++];
              })
          );
        }
        throw ((error.framesToPop = 1), error);
      }
    };
    module.exports = invariant;
  },
  7: function (module, t, a) {
    "use strict";
    var keyMirror = function (obj) {
      var key,
        ret = {};
      if (!(obj instanceof Object) || Array.isArray(obj))
        throw new Error("keyMirror(...): Argument must be an object.");
      for (key in obj) obj.hasOwnProperty(key) && (ret[key] = key);
      return ret;
    };
    module.exports = keyMirror;
  },
  9: function (e, t, a) {
    function c(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }

    function d(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }

    var treemap,
      r,
      o,
      s,
      scaleId,
      list = (function () {
        function e(e, t) {
          var a = [],
            c = !0,
            n = !1,
            d = void 0;
          try {
            for (
              var i, r = e[Symbol.iterator]();
              !(c = (i = r.next()).done) &&
              (a.push(i.value), !t || a.length !== t);
              c = !0
            );
          } catch (e) {
            (n = !0), (d = e);
          } finally {
            try {
              !c && r.return && r.return();
            } finally {
              if (n) throw d;
            }
          }
          return a;
        }

        return function (t, a) {
          if (Array.isArray(t)) return t;
          if (Symbol.iterator in Object(t)) return e(t, a);
          throw new TypeError(
            "Invalid attempt to destructure non-iterable instance"
          );
        };
      })(),
      b = (function () {
        function e(e, t) {
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            (c.enumerable = c.enumerable || !1),
              (c.configurable = !0),
              "value" in c && (c.writable = !0),
              Object.defineProperty(e, c.key, c);
          }
        }

        return function (t, a, c) {
          return a && e(t.prototype, a), c && e(t, c), t;
        };
      })(),
      u = a(45),
      ActionTypes = a(32).ActionTypes,
      p = a(95),
      m = a(47),
      y = a("Datetime"),
      v = y.getTimeString,
      g = !1,
      A = [],
      S = 1,
      x = "",
      E = {
        shown: !1,
        failed: !1,
        completed: !1,
        imgUrl: "",
        shareUrl: "",
      },
      _isWidget = !1,
      w = (function (e) {
        function t() {
          return (
            c(this, t),
            n(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }

        return (
          d(t, e),
          b(t, [
            {
              key: "isInitialized",
              value: function () {
                return g;
              },
            },
            {
              key: "getTreemap",
              value: function () {
                return treemap;
              },
            },
            {
              key: "getScale",
              value: function () {
                return treemap.zoom.scale();
              },
            },
            {
              key: "getTranslate",
              value: function () {
                return treemap.zoom.translate();
              },
            },
            {
              key: "getZoomLevels",
              value: function () {
                return treemap.getZoomLevels();
              },
            },
            {
              key: "getNextZoomLevel",
              value: function () {
                return treemap.getNextZoomLevel();
              },
            },
            {
              key: "getPreviousZoomLevel",
              value: function () {
                return treemap.getPreviousZoomLevel();
              },
            },
            {
              key: "getCenter",
              value: function () {
                return {
                  x: treemap.w / 2,
                  y: treemap.h / 2,
                };
              },
            },
            {
              key: "getColorScale",
              value: function () {
                return treemap.getColorScale();
              },
            },
            {
              key: "getColorScaleSmall",
              value: function () {
                return treemap.getColorScaleSmall();
              },
            },
            {
              key: "getNodeAtPosition",
              value: function (x, y) {
                for (
                  var scale = treemap.zoom.scale(),
                    translate = treemap.zoom.translate(),
                    n = list(translate, 2),
                    tx = n[0],
                    ty = n[1],
                    i = 0,
                    len = treemap.nodes.length;
                  i < len;
                  i++
                ) {
                  var d = treemap.nodes[i];
                  // console.log("zoom: ", a, d, e, f)
                  if (
                    d.x * scale + tx < x &&
                    x < (d.x + d.dx + 1) * scale + tx &&
                    d.y * scale + ty < y &&
                    y < (d.y + d.dy + 1) * scale + ty
                  )
                    // f.x = f.x - 100
                    // f.y = f.y - 100

                    return d;
                }
              },
            },
            {
              key: "getSectorAtPosition",
              value: function (x, y) {
                for (
                  var scale = treemap.zoom.scale(),
                    translate = treemap.zoom.translate(),
                    n = list(translate, 2),
                    tx = n[0],
                    ty = n[1],
                    i = 0,
                    len = treemap.sectors.length;
                  i < len;
                  i++
                ) {
                  var d = treemap.sectors[i];
                  if (
                    d.x * scale + tx < x &&
                    x < (d.x + d.dx + 1) * scale + tx &&
                    d.y * scale + ty < y &&
                    y < (d.y + d.dy + 1) * scale + ty
                  )
                    return d;
                }
              },
            },
            {
              key: "getIndustryAtPosition",
              value: function (x, y) {
                for (
                  var scale = treemap.zoom.scale(),
                    translate = treemap.zoom.translate(),
                    n = list(translate, 2),
                    tx = n[0],
                    ty = n[1],
                    i = 0,
                    len = treemap.industries.length;
                  i < len;
                  i++
                ) {
                  var d = treemap.industries[i];
                  if (
                    d.x * scale + tx < x &&
                    x < (d.x + d.dx + 1) * scale + tx &&
                    d.y * scale + ty < y &&
                    y < (d.y + d.dy + 1) * scale + ty
                  )
                    return d;
                }
              },
            },
            {
              key: "getHoveredNode",
              value: function () {
                return r;
              },
            },
            {
              key: "getSparklines",
              value: function () {
                // node = treemap.getHoveredNode()
                // console.log("call me", node)
                return A;
              },
            },
            {
              key: "getDataVersion",
              value: function () {
                return S;
              },
            },
            {
              key: "getLastDataUpdateDateString",
              value: function () {
                return x;
              },
            },
            {
              key: "getType",
              value: function () {
                return o;
              },
            },
            {
              key: "getSubtype",
              value: function () {
                return s;
              },
            },
            {
              key: "getScaleId",
              value: function () {
                return scaleId;
              },
            },
            {
              key: "getModal",
              value: function () {
                return E;
              },
            },
            {
              key: "isWidget",
              value: function () {
                return _isWidget;
              },
            },
          ]),
          t
        );
      })(p),
      mapStore = new w();
    (mapStore.dispatchToken = u.register(function (e) {
      var action = e.action;
      switch (action.type) {
        case ActionTypes.INIT_COMPLETED:
          (o = action.mapType),
            (s = action.subtype),
            (scaleId = action.scaleId),
            (treemap = new m(
              action.data,
              action.width,
              action.height,
              !1,
              action.scaleId,
              action.countIndustryPerf,
              action.countSectorPerf
            )),
            (g = !0),
            (x = v()),
            mapStore.emitChange();
          break;
        case ActionTypes.UPDATE_MAP:
          o = action.mapType;
          s = action.subtype;
          scaleId = action.scaleId;
          treemap = new m(
            action.data,
            action.width,
            action.height,
            !1,
            action.scaleId,
            action.countIndustryPerf,
            action.countSectorPerf
          );
          S++;
          mapStore.emitChange();
          break;
        case ActionTypes.SET_HOVERED_NODE:
          action.node !== r && ((r = action.node), mapStore.emitChange());
          break;
        case ActionTypes.CHANGE_SCALE:
          // E.pre
          var a;
          void 0 !== action.tx &&
            (a = {
              x: action.tx,
              y: action.ty,
            }),
            treemap.changeScale(action.scale, a),
            mapStore.emitChange();
          break;
        case ActionTypes.CHANGE_TRANSLATE:
          treemap.zoom.translate([action.tx, action.ty]),
            (r = void 0),
            mapStore.emitChange();
          break;
        case ActionTypes.LOAD_SPARKLINES_STARTED:
          (A = []), mapStore.emitChange();
          break;
        case ActionTypes.LOAD_SPARKLINES_COMPLETED:
          (A = action.data), mapStore.emitChange();
          break;
        case ActionTypes.UPDATE_DATA:
          // console.log("before update:", treemap, t),
          treemap.updatePerf(action.data),
            // console.log("after update:", treemap, t),
            S++,
            (x = v()),
            mapStore.emitChange();
          break;
        case ActionTypes.PUBLISH_MAP_STARTED:
          (E.shown = !0),
            (E.failed = !1),
            (E.completed = !1),
            mapStore.emitChange();
          break;
        case ActionTypes.PUBLISH_MAP_COMPLETED:
          (E.failed = !1),
            (E.completed = !0),
            (E.imgUrl = action.data.imgUrl),
            (E.shareUrl = action.data.shareUrl),
            mapStore.emitChange();
          break;
        case ActionTypes.PUBLISH_MAP_FAILED:
          (E.failed = !0), mapStore.emitChange();
          break;
        case ActionTypes.PUBLISH_MAP_CLOSE:
          (E.shown = !1), mapStore.emitChange();
          break;
        case ActionTypes.SET_WIDGET:
          (_isWidget = action.isWidget), mapStore.emitChange();
      }
    })),
      (e.exports = mapStore);
  },
  90: function (e, t, a) {
    // console.log("o: ", a("Support").getOffset);
    var c = a(9),
      n = a(20),
      d = a("Gradient"),
      i = a(46),
      r = a("Support"),
      o = r.getOffset,
      s = r.retinafy,
      f = r.getScaleRatio,
      Canvas = React.createClass({
        displayName: "Canvas",
        getInitialState: function () {
          return {
            zoom: 1,
            version: c.getDataVersion(),
            initialized: !1,
          };
        },
        componentDidMount: function () {
          //console.log("componentDidMount")
          c.addChangeListener(this._onChange),
            c.isInitialized() && this._initialize();
          var e = new Hammer(this.refs.hoverCanvas.getDOMNode());
          e.get("pinch").set({
            enable: !0,
            threshold: 0.1,
          }),
            e.on("panstart", this._onPanStart),
            e.on("panmove", this._onPanMove),
            e.on("pinch", this._onPinch),
            document
              .getElementById("share-map")
              .addEventListener("click", this._onShareMapClick),
            document
              .getElementById("canvas-chart")
              .addEventListener("wheel", this._onWheel, { passive: false }),
            document
              .getElementById("canvas-hover")
              .addEventListener("wheel", this._onWheel, { passive: false });
        },
        componentDidUpdate: function () {
          this.state.initialized &&
            (this.renderFromCache(
              this._canvasContext,
              this.state.zoom,
              c.getTranslate()[0],
              c.getTranslate()[1]
            ),
            this.renderHover(this._hoverContext));
        },
        componentWillUnmount: function () {
          c.removeChangeListener(this._onChange),
            document
              .getElementById("share-map")
              .removeEventListener("click", this._onShareMapClick),
            document
              .getElementById("canvas-chart")
              .removeEventListener("wheel", this._onWheel, { passive: false }),
            document
              .getElementById("canvas-hover")
              .removeEventListener("wheel", this._onWheel, { passive: false });
        },
        render: function () {
          var e = c.getTreemap(),
            t = e ? e.w : 1,
            a = e ? e.h : 1;
          //解决不全屏有滚动条的问题，2处修改
          if (!$(".narrow").is(":visible")) {
            a -= 280;
          }

          // console.log("starting: ", t, a)
          // console.log("tree: ", e)
          // var A = document.getElementById("body");
          // A.style.width = t + "px", A.style.height = a + "px";
          return React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              null,
              React.createElement("canvas", {
                id: "canvas-chart",
                ref: "canvas",
                className: "chart",
                overflow: "scroll",
                width: t,
                height: a,
                style: {
                  width: t,
                  height: a,
                  position: "absolute",
                },
              }),
              React.createElement("canvas", {
                id: "canvas-hover",
                ref: "hoverCanvas",
                className: "hover-canvas",
                overflow: "scroll",
                width: t,
                height: a,
                style: {
                  width: t,
                  height: a,
                  position: "absolute",
                  // touchAction: "none"
                },
                onWheel: this._onWheel,
                onMouseDown: this._onMouseDown,
                onMouseMove: this._onMouseMove,
                onMouseUp: this._onMouseUp,
                onMouseLeave: this._onMouseLeave,
                onDoubleClick: this._onDoubleClick,
              })
            ),
            React.createElement(
              "div",
              {
                style: {
                  position: "absolute",
                  top: a,
                  left: 13,
                  width: t,
                },
              },
              React.createElement(i, {
                scale: this.props.scale,
              })
            )
          );
        },
        renderFromCache: function (e, t, a, n) {
          var d,
            i = Object.keys(this._cache).map(parseFloat);
          i.sort(function (e, t) {
            return e - t;
          });
          for (var r = 0, o = i.length; r < o; r++)
            if (i[r] >= +t.toFixed(2)) {
              d = this._cache[i[r]];
              break;
            }
          e.save(),
            e.drawImage(
              d,
              ~~a,
              ~~n,
              ~~(c.getTreemap().w * t),
              ~~(c.getTreemap().h * t)
            ),
            e.restore();
        },
        _onChange: function () {
          //console.log("鼠标在行业间切换的时候也会调用该方法111")

          var e = this;
          this.setState({
            zoom: c.getScale(),
          }),
            c.isInitialized() && !this.state.initialized && this._initialize(),
            this.state.version !== c.getDataVersion() &&
              (c.getZoomLevels().forEach(function (t) {
                e._createCache(t);
              }),
              this.setState({
                version: c.getDataVersion(),
              }));
        },
        _onMouseDown: function () {
          this.mouseDown = !0;
        },
        _onMouseMove: function (e) {
          if (!this.mouseDown) {
            var t = o(e),
              a = t.offsetX, // - $("canvas.hover-canvas").offset().left,
              d = t.offsetY, // - $("canvas.hover-canvas").offset().top + 45,
              i = c.getNodeAtPosition(a, d);
            // console.log("a, d: ", a, d, $("#body").offset().left, $("#body").offset().top, e.clientX, e.clientY, i)
            if (i) n.setHoveredNode(i);
            else {
              var r = c.getIndustryAtPosition(a, d) || {
                children: [],
              };
              n.setHoveredNode(r.children[r.children.length - 1]);
            }
          }
        },
        _onMouseUp: function () {
          this.mouseDown = !1;
        },
        _onMouseLeave: function () {
          n.setHoveredNode(void 0);
        },
        _onDoubleClick: function (e) {
          var t = o(e),
            a = t.offsetX,
            n = t.offsetY,
            d = c.getNodeAtPosition(a, n);
          if (d && d.id) {
            var prefix = d.id.substring(7);
            var stockType = prefix == "SZ" ? 0 : 1;
            if (isTdxw()) {
              window.location =
                "https://www.treeid/breed_" + stockType + d.id.substring(0, 6);
            } else {
              window.open(
                "https://xueqiu.com/S/" + prefix + d.id.substring(0, 6)
              );
            }
          }
          if (d) return;
          var i = c.getType(),
            r = c.getIndustryAtPosition(a, n);
          if (r) {
            if ("etf" === i)
              var s =
                "t=" +
                r.children
                  .map(function (e) {
                    return e.name;
                  })
                  .join(",");
            else
              var f = r.name.replace(/[^a-zA-Z]/g, "").toLowerCase(),
                l = "geo" === c.getType() ? "geo" : "ind",
                s = "v=111&f=" + l + "_" + f;
            return;
          }
          var b = c.getSectorAtPosition(a, n);
          if (b) {
            if ("etf" === i) {
              var u = "";
              b.children.forEach(function (e) {
                e.children.forEach(function (e) {
                  u += "," + e.name;
                });
              });
              var s = "t=" + u.substring(1);
              //console.log("s = " + s)
            } else
              var f = b.name.replace(/[^a-zA-Z]/g, "").toLowerCase(),
                s = "f=sec_" + f;
            //console.log("s = " + s)

            return;
          }
        },
        _onWheel: function (e) {
          // console.log("鼠标滚动的时候会调用，但是期间移动鼠标也会调用....")
          // e.preventDefault();
          // e.stopPropagation();
          var t = o(e),
            a = t.offsetX,
            c = t.offsetY;
          n.zoom(-e.deltaY, a, c);
        },

        _onPanStart: function (e) {
          (this.lastPanX = e.pointers[0].clientX),
            (this.lastPanY = e.pointers[0].clientY);
        },
        _onPanMove: function (e) {
          //console.log("_onPanMove....")
          var t = this.lastPanX - e.pointers[0].clientX,
            a = this.lastPanY - e.pointers[0].clientY;
          (this.lastPanX = e.pointers[0].clientX),
            (this.lastPanY = e.pointers[0].clientY);
          var d = c.getTreemap(),
            i = d.zoom.translate()[0] - t,
            r = d.zoom.translate()[1] - a;
          n.changeTranslate(i, r);
        },
        _onPinch: function (e) {
          //console.log("pinch....")
          var t =
              e.pointers[0].clientX -
              e.target.offsetLeft -
              e.target.offsetParent.offsetLeft,
            a =
              e.pointers[0].clientY -
              e.target.offsetTop -
              e.target.offsetParent.offsetTop,
            c =
              e.pointers[1].clientX -
              e.target.offsetLeft -
              e.target.offsetParent.offsetLeft,
            d =
              e.pointers[1].clientY -
              e.target.offsetTop -
              e.target.offsetParent.offsetTop,
            i = (t + c) / 2,
            r = (a + d) / 2,
            o = e.scale >= 1 ? 1 : -1;
          n.zoom(o, i, r);
        },
        _initialize: function () {
          //console.log("_initialize....刷新加载的时候会调用")
          var e = this;
          if (!this.state.initialized) {
            var t = c.getTreemap(),
              a = t.w,
              n = t.h;
            // console.log("this new a:", a)
            (this._cache = {}),
              (this._canvasContext = this.refs.canvas
                .getDOMNode()
                .getContext("2d")),
              (this._hoverContext = this.refs.hoverCanvas
                .getDOMNode()
                .getContext("2d")),
              s(this.refs.canvas.getDOMNode(), this._canvasContext, a, n),
              s(this.refs.hoverCanvas.getDOMNode(), this._hoverContext, a, n);
            var i = function () {
              e.renderCanvas(e._canvasContext, c.getTreemap()),
                setTimeout(function () {
                  for (var t = c.getZoomLevels(), a = 0; a < t.length; a++)
                    e._createCache(t[a]),
                      0 === a &&
                        e.setState({
                          initialized: !0,
                        });
                }, 32);
            };
            "geo" === c.getType()
              ? ((this.worldBackground = new Image()),
                (this.worldBackground.src = d.worldMapBgBase64),
                (this.worldBackground.onload = function () {
                  i();
                }.bind(this)))
              : i();
          }
        },
        _createCache: function (e) {
          var t = c.getTreemap(),
            a = t.w,
            n = t.h,
            d = document.createElement("canvas"),
            i = ~~(a * e),
            r = ~~(n * e);
          (d.width = i), (d.height = r);
          var o = d.getContext("2d");
          s(d, o, i, r);
          var f = t.zoom.scale(),
            l = t.zoom.translate();
          t.zoom.scale(e),
            t.zoom.translate([0, 0]),
            this.renderCanvas(o, t),
            t.zoom.scale(f),
            t.zoom.translate(l),
            (this._cache[e] = d);
        },
        renderHover: function (e) {
          var t = c.getTreemap(),
            a = t.w,
            n = t.h,
            s = c.getSparklines(),
            i = c.getHoveredNode();

          // console.log("sssssss: ", s)

          if (
            (e.save(),
            e.clearRect(0, 0, a, n),
            e.translate.apply(e, t.zoom.translate()),
            e.scale(t.zoom.scale(), t.zoom.scale()),
            i)
          ) {
            var r = i.parent;
            (e.strokeStyle = "#ffd614"),
              (e.fillStyle = "#ffd614"),
              (e.lineWidth = 1),
              e.translate(0.5, 0.5),
              e.beginPath();
            for (var o = 0, s = r.children.length; o < s; o++) {
              var f = r.children[o];
              e.moveTo(f.x - 1, f.y - 1),
                e.lineTo(f.x + f.dx - 1, f.y - 1),
                e.lineTo(f.x + f.dx - 1, f.y + f.dy - 1),
                e.lineTo(f.x - 1, f.y + f.dy - 1),
                e.lineTo(f.x - 1, f.y - 1);
            }
            if (
              (e.stroke(),
              (f = r),
              e.translate(-0.5, -0.5),
              f.dx > 40 &&
                f.dy > 12 &&
                (e.beginPath(),
                e.moveTo(f.x + 0.5, f.y),
                e.lineTo(f.x + 0.5, f.y + d.industryFontSize + 1.5),
                void 0 !== f.perf &&
                  null !== f.perf &&
                  (e.lineTo(f.x + 6, f.y + d.industryFontSize + 1.5),
                  e.lineTo(f.x + 11, f.y + d.industryFontSize + 1.5 + 5),
                  e.lineTo(f.x + 16, f.y + d.industryFontSize + 1.5)),
                e.lineTo(f.x + f.dx - 1.5, f.y + d.industryFontSize + 1.5),
                e.lineTo(f.x + f.dx - 1.5, f.y),
                e.fill(),
                e.stroke()),
              e.translate(0.5, 0.5),
              (e.lineWidth = 3),
              e.strokeRect(
                f.x,
                f.y,
                f.dx - 1,
                f.dy - (f.dx > 40 && f.dy > 12 ? 1 : 4)
              ),
              (e.textBaseline = "alphabetic"),
              (e.textAlign = "left"),
              (e.fillStyle = "#6b5811"),
              (e.font = "normal " + d.industryFontSize + "px Microsoft YaHei"),
              f.dx > 40 && f.dy > 12)
            ) {
              var l = t.getLongestText(
                f.name.toUpperCase(),
                d.industryFontSize,
                f.dx - 8
              );
              e.fillText(
                l,
                f.x + 2 * d.padding.left + d.sectorPaddingLeft,
                f.y + d.industryFontSize - 1
              );
            }
          }
          e.restore();
        },
        renderCanvas: function (e, t) {
          var a = (t.zoom.scale(), t.w),
            n = t.h,
            i = c.getType();
          e.save();
          var r = t.zoom.scale();
          (e.fillStyle = d.background),
            e.fillRect(0, 0, a * r, n * r),
            e.translate.apply(e, t.zoom.translate()),
            e.scale(r, r);
          var o,
            s,
            x,
            y,
            b,
            u = t.nodes.length;
          // console.log("iiiii: ", i)
          if ("geo" === i) {
            e.drawImage(
              this.worldBackground,
              0,
              0,
              3435,
              1497,
              0,
              20,
              a,
              a / (3435 / 1497)
            );
          }
          if ("geo" !== i)
            for (
              e.fillStyle = d.sectorColor,
                e.font = "700 " + d.sectorFontSize + "px Microsoft YaHei",
                o = 0,
                b = t.sectors.length;
              o < b;
              o++
            )
              (s = t.sectors[o]),
                e.fillText(
                  s.name.toUpperCase(),
                  s.x + 2 * d.padding.left + d.sectorPaddingLeft,
                  s.y + d.sectorFontSize - 1
                );
          // console.log("pp = ", p)
          // console.log("wellllll: ", c.getScaleId())
          var h = "%N%", //  ; p =  (2) //d.scaleStepFormat[c.getScaleId()]
            p = [-4, 4], //d.scaleMinMax[c.getScaleId()]
            // console.log("h: ", h, " ; p = ", p)
            m = p[0] >= 0 && p[1] >= 0;
          for (o = 0; o < u; o++)
            (s = t.nodes[o]),
              (s.perfText = ""),
              void 0 !== s.additional && null !== s.additional
                ? (s.perfText = s.additional)
                : void 0 !== s.perf &&
                  null !== s.perf &&
                  (s.perfText =
                    (s.perf > 0 && !m ? "+" : "") +
                    s.perf.toFixed(2) +
                    ("%N%" === h && s.dx > 32 ? "%" : "")),
              (e.fillStyle = t.colorScale(s.perf)),
              e.fillRect(s.x, s.y, s.dx - 1, s.dy - 1),
              t.setIdealFontSize(s, r);
          for (
            e.textBaseline = "middle",
              e.textAlign = "center",
              e.fillStyle = "rgba(0, 0, 0, 0.5)",
              o = 0;
            o < u;
            o++
          )
            (s = t.nodes[o]),
              "block" === s.nameOpacity &&
                ((x = s.x + s.dx / 2 + 1),
                (y = s.y + s.dy / 2 + 1),
                "block" === s.perfOpacity && (y -= 0.5 * s.nameFontSize),
                (e.font = "normal " + s.nameFontSize + "px Microsoft YaHei"),
                e.fillText(s.name, x + 1, y + 1));
          for (e.fillStyle = "rgba(255, 255, 255, 1)", o = 0; o < u; o++)
            (s = t.nodes[o]),
              "block" === s.nameOpacity &&
                ((x = s.x + s.dx / 2),
                (y = s.y + s.dy / 2),
                "block" === s.perfOpacity && (y -= 0.5 * s.nameFontSize),
                (e.font = "normal " + s.nameFontSize + "px Microsoft YaHei"),
                e.fillText(s.name, x, y));
          for (e.fillStyle = "rgba(0, 0, 0, 0.5)", o = 0; o < u; o++)
            (s = t.nodes[o]),
              "block" === s.perfOpacity &&
                ((x = s.x + s.dx / 2 + 1),
                (y = s.y + s.dy / 2 + 1 + 0.5 * s.nameFontSize),
                (e.font = "normal " + s.perfFontSize + "px Microsoft YaHei"),
                e.fillText(s.perfText, x + 1, y + 1));
          for (e.fillStyle = "rgba(255, 255, 255, 1)", o = 0; o < u; o++)
            (s = t.nodes[o]),
              "block" === s.perfOpacity &&
                ((x = s.x + s.dx / 2),
                (y = s.y + s.dy / 2 + 0.5 * s.nameFontSize),
                (e.font = "normal " + s.perfFontSize + "px Microsoft YaHei"),
                e.fillText(s.perfText, x, y));
          for (
            e.strokeStyle = d.background, o = 0, b = t.industries.length;
            o < b;
            o++
          )
            (s = t.industries[o]),
              void 0 !== s.perf &&
                null !== s.perf &&
                "geo" !== i &&
                ((e.fillStyle = t.colorScale(s.perf)),
                e.beginPath(),
                e.moveTo(s.x + 0.5, s.y),
                e.lineTo(s.x + 0.5, s.y + d.industryFontSize + 1.5),
                e.lineTo(s.x + 6, s.y + d.industryFontSize + 1.5),
                s.dx > 20 &&
                  e.lineTo(s.x + 11, s.y + d.industryFontSize + 1.5 + 5),
                e.lineTo(s.x + 16, s.y + d.industryFontSize + 1.5),
                e.lineTo(s.x + s.dx - 1.5, s.y + d.industryFontSize + 1.5),
                e.lineTo(s.x + s.dx - 1.5, s.y),
                e.fill(),
                e.stroke());
          for (
            e.textBaseline = "alphabetic",
              e.textAlign = "left",
              e.fillStyle = d.sectorColor,
              e.font = "normal " + d.industryFontSize + "px Microsoft YaHei",
              o = 0,
              b = t.industries.length;
            o < b;
            o++
          )
            if (((s = t.industries[o]), s.dx > 40 && s.dy > 12)) {
              var y = t.getLongestText(
                s.name.toUpperCase(),
                d.industryFontSize,
                s.dx - 8
              );
              e.fillText(
                y,
                s.x + 2 * d.padding.left + d.sectorPaddingLeft,
                s.y + d.industryFontSize - 1
              );
            }
          e.restore();
        },
        _onShareMapClick: function (e) {
          e.preventDefault();
          var t = c.getTreemap().w,
            a = c.getTreemap().h + 22,
            i = document.createElement("canvas");
          (i.width = t), (i.height = a);
          var r = i.getContext("2d"),
            o = f(r),
            s = new Image();
          (s.src = d.logoBase64),
            (s.onload = function () {
              (r.fillStyle = "#fff"), r.fillRect(0, 0, t, a);
              var e = {
                "": "S&P 500",
                sec: "S&P 500",
                sec_all: "FULL",
                etf: "ETF",
                geo: "WORLD",
              }[c.getType()];
              (r.textBaseline = "middle"),
                (r.textAlign = "right"),
                (r.font = "9pt Microsoft YaHei"),
                (r.fillStyle = "#4c5261"),
                r.drawImage(s, 2, 4);
              var d = t,
                f = "  " + c.getLastDataUpdateDateString();
              r.fillText(f, d, 11),
                (r.fillStyle = "#5faaf4"),
                (d -= Math.round(r.measureText(f).width)),
                (f = "•"),
                r.fillText(f, d, 11),
                (r.fillStyle = "#4c5261"),
                (d -= Math.round(r.measureText(f).width)),
                (f = "  " + this.props.scale.name.toUpperCase() + "  "),
                r.fillText(f, d, 11),
                (r.fillStyle = "#5faaf4"),
                (d -= Math.round(r.measureText(f).width)),
                (f = "•"),
                r.fillText(f, d, 11),
                (r.fillStyle = "#4c5261"),
                (d -= Math.round(r.measureText(f).width)),
                (f = e + "  "),
                r.fillText(f, d, 11),
                r.drawImage(
                  this._cache[1],
                  0,
                  0,
                  t * o,
                  (a - 22) * o,
                  0,
                  22,
                  t,
                  a - 22
                );
              var l = i.toDataURL();
              n.publishMap(l);
            }.bind(this));
        },
      });
    e.exports = Canvas;
  },
  91: function (e, t, a) {
    // create hovered area
    var c = a(9),
      n = a(21),
      d = a("Gradient"),
      mkt_cn = a(100),
      l = a(101),
      //   mkt_us = a(102),
      //   mkt_hk = a(103),
      // console.log("101: ", l)
      i = function (e) {
        var t = "%N%", //d.scaleStepFormat[c.getScaleId()]
          a = [-4, 4], //d.scaleMinMax[c.getScaleId()]
          n = a[0] >= 0 && a[1] >= 0;
        // console.log(e);
        return void 0 !== e.additional && null !== e.additional
          ? e.additional
          : void 0 !== e.perf && null !== e.perf
          ? (e.perf >= 0 && !n ? "▲ " : "▼ ") +
            Math.abs(e.perf).toFixed(2) +
            ("%N%" === t ? "%" : "")
          : "--";
      },
      p = function (e) {
        var locale = $(".country.active").get(0).id;

        switch (locale) {
          case "cn":
            // console.log("this: ", n.priceNodes[e.name]);
            // console.log(e);
            var stockCode = e.id.substr(0, e.id.indexOf("."));
            var brd = e.id.split(".")[1];
            var upOrDown = brd == "SH" ? "SSE" : "SZSE";

            return void 0 !== e.additional && null !== e.additional
              ? e.additional
              : void 0 !== e.price && null !== e.price
              ? Math.abs(e.price).toFixed(2)
              : "--";
            break;
          case "China":
            console.log("this: ", priceNodes);
            var stockCode = e.id.substr(0, e.id.indexOf("."));
            var brd = e.id.split(".")[1];
            var upOrDown = brd == "SH" ? "SSE" : "SZSE";

            return l["price_dict"][upOrDown + ":" + stockCode];
            break;
          case "S&P500":
            var stockCode = e.name;
            // px =
            return mkt_us["dict_us_px"][stockCode].toFixed(2);
            break;
          case "United States Overall":
            var stockCode = e.name;
            px = mkt_us["dict_us_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
          case "ETF":
            var stockCode = e.name;
            px = mkt_us["dict_us_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
          case "Hong Kong":
            var stockCode = e.name;
            px = mkt_hk["dict_hk_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
          case "United Kingdom":
            var stockCode = e.name;
            px = mkt_uk["dict_uk_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
          case "Europe":
            var stockCode = e.name;
            px = mkt_eu["dict_eu_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
          case "Japan":
            var stockCode = e.name;
            px = mkt_jp["dict_jp_px"][stockCode];
            return px ? px.toFixed(2) : "0.00";
            break;
        }
        // console.log(l)
      },
      q = function (e) {
        var locale = $(".country.active").get(0).id;

        switch (locale) {
          case "cn":
            var stockCode = e.id.substr(0, e.id.indexOf("."));
            var brd = e.id.split(".")[1];
            var upOrDown = brd == "SH" ? "SSE" : "SZSE";

            var px = mkt_cn["dict_cn_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "S&P500":
            var stockCode = e.name;
            px = mkt_us["dict_us_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "United States Overall":
            var stockCode = e.name;
            px = mkt_us["dict_us_chg"][stockCode]; //.toFixed(2)

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "ETF":
            var stockCode = e.name;
            px = mkt_us["dict_us_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "Hong Kong":
            var stockCode = e.name;
            px = mkt_hk["dict_hk_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;

          case "United Kingdom":
            var stockCode = e.name;
            px = mkt_uk["dict_uk_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "Europe":
            var stockCode = e.name;
            px = mkt_eu["dict_eu_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
          case "Japan":
            var stockCode = e.name;
            px = mkt_jp["dict_jp_chg"][stockCode];

            return px
              ? (px >= 0 ? "▲ " : "▼ ") + Math.abs(px).toFixed(2)
              : "0.00";
            break;
        }
        // console.log(l)
      },
      //     ,  p = function (e) {
      //       var stockCode = (e.id).substr(0, e.id.indexOf("."));
      //       var brd = (e.id).split(".")[1];
      //       var upOrDown = (brd == "SH")? 1:0;
      //       var prefix = (e.id).substr(e.id.indexOf(".") + 1).toLowerCase();
      //       var price = 0;
      //       function ajaxCall() {
      //       $.ajax({
      //         url: "https://push2.eastmoney.com/api/qt/ulist/get?pn=1&fields=f2&secids="+upOrDown+"."+stockCode,
      //         dataType: 'json',
      //         async: false,
      //         success: function(response) {
      //           result = response.data["diff"]["0"]["f2"] / 100;
      //           // sessionStorage.setItem(price, JSON.stringify(result));
      //           price += result
      //           // xuanran(result)
      //           console.log("result: ", result)
      //           return result
      //       }})}
      //       ajaxCall()
      //         console.log("price: ", price) //stockCode, brd, upOrDown, prefix)
      //     return price //result void 0 !== e.additional && null !== e.additional ? e.additional : void 0 !== e.perf && null !== e.perf ? (e.perf >= 0 && !n ? "▲ " : "▼ ") + Math.abs(e.perf).toFixed(2) + ("%N%" === t ? "%" : "") : "--"
      // }

      CanvasHover = React.createClass({
        displayName: "CanvasHover",
        getInitialState: function () {
          return {
            shown: !1,
          };
        },
        componentDidMount: function () {
          //console.log("第一次加载时会调用到该方法")

          c.addChangeListener(this._onChange),
            document.addEventListener("mousemove", this._onMouseMove),
            document
              .getElementById("canvas-chart")
              .addEventListener("wheel", this._onWheel, { passive: false }),
            document
              .getElementById("canvas-hover")
              .addEventListener("wheel", this._onWheel, { passive: false });
        },
        componentWillUnmount: function () {
          //console.log("111111111111")

          c.removeChangeListener(this._onChange),
            document.removeEventListener("mousemove", this._onMouseMove),
            document
              .getElementById("canvas-chart")
              .removeEventListener("wheel", this._onWheel, { passive: false }),
            document
              .getElementById("canvas-hover")
              .removeEventListener("wheel", this._onWheel, { passive: false });
        },
        _onChange: function () {
          //console.log("鼠标在行业间切换的时候也会调用该方法")
          this.setState({
            shown: !!c.getHoveredNode(),
            sparklinesData: c.getSparklines(),
          });
          // console.log("too damn: ", c.getHoveredNode(), c.getSparklines())
        },
        _onWheel: function (e) {
          // console.log("22鼠标滚动的时候会调用，但是期间移动鼠标也会调用....")
          e.preventDefault();
          // e.stopPropagation();
          // var t = o(e)
          //     , a = t.offsetX
          //     , c = t.offsetY;
          // n.zoom(-e.deltaY, a, c)
        },
        render: function () {
          var e = this,
            t = c.getHoveredNode();
          // console.log("ttttt = ", t)
          if (!this.state.shown) return null;

          var locale = $(".country.active").get(0).id;

          // console.log("locale: ", locale);

          switch (locale) {
            case "cn":
              var stockCode = t.id.substr(0, t.id.indexOf("."));

              var brd = t.id.split(".")[1];
              var upOrDown = brd == "SH" ? 1 : 0;
              var prefix = t.id.substr(t.id.indexOf(".") + 1).toLowerCase();
              var a =
                  this.state.sparklinesData &&
                  this.state.sparklinesData[t.name],
                d =
                  a && a[a.length - 1]
                    ? this.state.sparklinesData[t.name][
                        this.state.sparklinesData[t.name].length - 1
                      ].toFixed(2)
                    : "--",
                r = c.getColorScale(),
                o = c.getType(),
                s = t.parent.children.slice().sort(function (e, t) {
                  return t.dx * t.dy - e.dx * e.dy;
                }),
                f = s.length > 15,
                l =
                  ("geo" !== o ? t.parent.parent.name + " - " : "") +
                  t.parent.name;

              return React.createElement(
                "div",
                {
                  id: "hover",
                  // height: $("#div_map2").height(),
                },
                React.createElement("h4", null, l),
                React.createElement(
                  "table",
                  {
                    className: f ? "is-small" : "",
                    textAlign: "center",
                    width: "100%",
                  },
                  React.createElement(
                    "tbody",
                    null,
                    //   React.createElement("tr", {
                    //       key: t.name + "-hover",
                    //       className: "hovered",
                    //       width: "100%",
                    //       style: {
                    //           backgroundColor: r(t.perf)
                    //       }
                    //   }, React.createElement("td", {colSpan: "2"}, React.createElement("img", {
                    //       className: "smallLine",
                    //       width: "100%",
                    //       //selected stocks
                    //       src: "https://webquotepic.eastmoney.com/GetPic.aspx?nid="+upOrDown+"."+stockCode+"&imageType=RJY"//"https://chart.jrjimg.cn/pngdata/minpic/pic40/" + stockCode + ".png"
                    //
                    //   })), React.createElement("td", {
                    //       className: "ticker",
                    //       colSpan: "2",
                    //   }, stockCode, t.name, i(t)
                    // )),
                    //////////////////////////////////////////////////////

                    // React.createElement("tr", {
                    //     key: t.name + "-hover",
                    //     className: "hovered",
                    //     width: "100%",
                    //     style: {
                    //         backgroundColor: r(t.perf)
                    //     }
                    // }, React.createElement("td", {
                    //   colSpan: "5",
                    //   style: {
                    //       paddingLeft: "10",
                    //       paddingTop: "10",
                    //       paddingRight: "10",
                    //   },
                    //   className: "ticker",
                    //   // paddingTop: "16",
                    //   // paddingRight: "16",
                    // }, stockCode)),

                    React.createElement(
                      "tr",
                      {
                        key: t.name + "-hover",
                        className: "hovered",
                        width: "100%",
                        style: {
                          backgroundColor: r(t.perf),
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          className: "ticker",
                          colSpan: "5",
                          style: {
                            // fontSize: "90%",
                            paddingTop: "10",
                            paddingRight: "10",
                            textAlign: "right",
                          },
                        },
                        stockCode
                      )
                    ),

                    React.createElement(
                      "tr",
                      {
                        className: "hovered",
                        width: "100%",
                        style: {
                          backgroundColor: r(t.perf),
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          colSpan: "3",
                          rowSpan: "4",
                          style: {
                            paddingLeft: "10",
                            paddingTop: "10",
                            paddingRight: "10",
                          },
                          className: "ticker",
                          // paddingTop: "16",
                          // paddingRight: "16",
                        },
                        React.createElement("img", {
                          className: "smallLine",
                          width: "100%",
                          style: {
                            filter:
                              "saturate(0) grayscale(1) brightness(10) contrast(10)",
                          },
                          //selected stocks
                          src:
                            "https://webquotepic.eastmoney.com/GetPic.aspx?nid=" +
                            upOrDown +
                            "." +
                            stockCode +
                            "&imageType=RJY", //"https://chart.jrjimg.cn/pngdata/minpic/pic40/" + stockCode + ".png"
                        })
                      ),
                      React.createElement(
                        "td",
                        {
                          className: "ticker",
                          colSpan: "2",
                          style: {
                            fontSize: "150%",
                            paddingRight: "10",
                            textAlign: "right",
                          },
                        },
                        t.name
                      )
                    ),

                    React.createElement(
                      "tr",
                      {
                        className: "hovered",
                        width: "100%",
                        style: {
                          backgroundColor: r(t.perf),
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          className: "ticker",
                          colSpan: "2",
                          style: {
                            fontSize: "200%",
                            paddingRight: "10",
                            textAlign: "right",
                          },
                        },
                        p(t)
                      )
                    ),

                    React.createElement(
                      "tr",
                      {
                        className: "hovered",
                        width: "100%",
                        style: {
                          backgroundColor: r(t.perf),
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          className: "ticker",
                          colSpan: "2",
                          style: {
                            fontSize: "150%",
                            paddingRight: "10",
                            textAlign: "right",
                          },
                        },
                        q(t)
                      )
                    ),

                    React.createElement(
                      "tr",
                      {
                        className: "hovered",
                        width: "100%",
                        style: {
                          backgroundColor: r(t.perf),
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          className: "ticker",
                          colSpan: "2",
                          style: {
                            // fontSize: "80%",
                            paddingRight: "10",
                            textAlign: "right",
                          },
                        },
                        i(t)
                      )
                    ),

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    ///////////////////////////////////////////////////////

                    React.createElement(
                      "tr",
                      {
                        key: t.name + "-hover-description",
                        className: "hovered is-description",
                        style: {
                          backgroundColor: r(t.perf),
                          height: 10,
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          colSpan: "5",
                        },
                        null
                      )
                    ),
                    React.createElement(
                      "tr",
                      null,
                      React.createElement(
                        "td",
                        {
                          colSpan: "5",
                          style: {
                            paddingTop: "10",
                            paddingBottom: "10",
                          },
                        },
                        React.createElement("img", {
                          className: "smallLine",
                          width: "100%",
                          style: {
                            filter: "invert(1)", //"saturate(0) grayscale(0) brightness(100) contrast(100)"
                          },
                          src:
                            "https://image.sinajs.cn/newchart/daily/n/" +
                            prefix +
                            stockCode +
                            ".gif",
                        })
                      )
                    ),
                    React.createElement(
                      "tr",
                      {
                        className: "hovered is-description",
                        style: {
                          //backgroundColor: r(t.perf),
                          height: 10,
                        },
                      },
                      React.createElement(
                        "td",
                        {
                          colSpan: "5",
                          className: "description",
                        },
                        t.description
                      )
                    ),
                    s.map(function (t, a) {
                      if (a > 40) return null;
                      var c =
                          e.state.sparklinesData &&
                          e.state.sparklinesData[t.name],
                        d = c ? e.state.sparklinesData[t.name] : [];
                      var listStockCode = t.id.substr(0, t.id.indexOf("."));
                      var brd = t.id.split(".")[1];
                      var upOrDown = brd == "SH" ? 1 : 0;
                      return React.createElement(
                        "tr",
                        {
                          key: t.name,
                        },
                        React.createElement(
                          "td",
                          {
                            className: "smallticker",
                            // colSpan: "2",
                          },
                          listStockCode
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "smallticker",
                            // colSpan: "2",
                          },
                          t.name
                        ),
                        React.createElement(
                          "td",
                          null,
                          React.createElement("img", {
                            className: "smallLine",
                            width: 60,
                            style: {
                              filter:
                                t.perf < 0
                                  ? "hue-rotate(-120deg)"
                                  : "hue-rotate(120deg)", //"saturate(0) grayscale(1) brightness(10) contrast(10)"
                            },
                            //适配https://webquotepic.eastmoney.com/GetPic.aspx?nid=0.000651&imageType=RJY
                            src:
                              "https://webquotepic.eastmoney.com/GetPic.aspx?nid=" +
                              upOrDown +
                              "." +
                              listStockCode +
                              "&imageType=RJY", //"https://chart.jrjimg.cn/pngdata/minpic/pic40/" + stockCode + ".png"
                          })
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "change",
                            style: {
                              // fontWeight: 800,
                              color: r(t.perf),
                            },
                          },
                          p(t)
                        ),
                        React.createElement(
                          "td",
                          {
                            className: "change",
                            // colSpan: "2",
                            style: {
                              fontWeight: 900,
                              color: r(t.perf),
                            },
                          },
                          i(t)
                        )
                      );
                    })
                  )
                )
              );

              break;
          }
          //////HERE/////
        },
        _onMouseMove: function (e) {
          //console.log("鼠标在行业间切换的时候也会调用该方法")
          if (this.state.shown) {
            var t = 100,
              a = document.getElementById("hover"),
              c = a.scrollWidth,
              n = a.scrollHeight,
              d = document.documentElement.clientWidth,
              i = document.documentElement.clientHeight;

            e.clientX + c + 1.5 * t < d
              ? (a.style.left = e.clientX + t + 200 + "px")
              : e.clientX - c - t > 0
              ? (a.style.left = e.clientX - t - c + "px")
              : ((t = 20),
                e.clientX + c + t < d
                  ? (a.style.left = e.clientX + t + "px")
                  : (a.style.left = e.clientX - t - c + "px")),
              (a.style.top =
                Math.max(
                  0,
                  e.clientY + 0 - Math.max(0, e.clientY + 0 + n - i)
                ) + "px");
          }
        },
      });
    e.exports = CanvasHover;
  },
  92: function (e, t, a) {
    a(58), a(59);
  },
  93: function (e, t, a) {
    var c = a(20),
      n = a(9),
      Search = React.createClass({
        displayName: "Search",
        getInitialState: function () {
          return {
            stocks: this._filterStocks(this.props.stocks, ""),
            input: "",
          };
        },
        _filterStocks: function (e, t) {
          //if(t == ''){}else{
          return (
            (e = e.slice()),
            (e = e.filter(function (e) {
              return (
                0 === e.id.indexOf(t) ||
                0 === e.name.toUpperCase().indexOf(t) ||
                (e.chiSpel != null && 0 === e.chiSpel.indexOf(t.toUpperCase()))
              );
            })),
            e.sort(function (e, t) {
              return e.id == t.id ? 0 : e.id < t.id ? -1 : 1;
            }),
            e
          );
          //}
        },
        _onChange: function (e, t) {
          var t = e.target.value;
          if (!e.target.isOnComposition) {
            t = t.toUpperCase();
            e.target.value = t;
          }
          if (t === "") {
            $(".bubSearchResult").hide();
          } else {
            $(".bubSearchResult").show();
          }
          this.setState({
            stocks: this._filterStocks(this.props.stocks, t),
            input: t,
          });
        },
        _onCompositionStart: function (e) {
          e.target.isOnComposition = true;
        },
        _onCompositionEnd: function (e) {
          e.target.isOnComposition = false;
        },
        _onClick: function (e, t) {
          t.preventDefault();
          var a = n.getTreemap(),
            d = a.w,
            i = a.h,
            r = (e.x + e.x + e.dx) / 2,
            o = (e.y + e.y + e.dy) / 2,
            s = r - d / 2,
            f = o - i / 2;
          c.zoomAndTranslate(n.getTreemap().getLastZoomLevel(), r + s, o + f),
            c.setHoveredNode(e);
          $(".left_inp1").val(e.id).focus();
          $(".bubSearchResult").hide();
        },
        _onBlur: function (e, t) {
          c.setHoveredNode(void 0);
        },
        _onMouseLeave: function (e) {
          // c.setHoveredNode(vod 0)
        },
        _onMouseEnter: function (e, t) {
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          (scrollLeft =
            window.pageXOffset || document.documentElement.scrollLeft),
            // if any scroll is attempted, set this to the previous value
            (window.onscroll = function () {
              window.scrollTo(scrollLeft, scrollTop);
            });
        },
        /*矩形图搜索列表*/
        render: function () {
          var e = this,
            t = this.state.stocks.map(function (t, a) {
              if (!(a >= 10))
                return React.createElement(
                  "li",
                  {
                    key: t.name,
                    onMouseLeave: e._onMouseLeave,
                    onMouseEnter: e._onMouseEnter.bind(e, t),
                  },
                  React.createElement(
                    "a",
                    {
                      href: "#",
                      onClick: e._onClick.bind(e, t),
                    },
                    React.createElement(
                      "span",
                      {
                        className: "ticker",
                      },
                      t.id
                    ),
                    React.createElement(
                      "span",
                      {
                        className: "company",
                      },
                      t.name
                    )
                  )
                );
            });
          return React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              {
                className: "quick-search",
              },
              React.createElement("span", {
                className: "fa fa-search",
              })
            ),
            React.createElement(
              "ul",
              {
                style: {
                  display: "none",
                },
                className: "bubSearchResult",
              },
              t
            )
          );
        },
      });
    e.exports = Search;
  },
  94: function (e, t, a) {
    "use strict";
    var c = a(9),
      n = a(20),
      PublishModal = React.createClass({
        displayName: "PublishModal",
        getInitialState: function () {
          return c.getModal();
        },
        componentDidMount: function () {
          c.addChangeListener(this._onChange);
        },
        componentWillUnmount: function () {
          c.removeChangeListener(this._onChange);
        },
        render: function () {
          return React.createElement(
            "div",
            {
              className: "overlay modal",
              onClick: this._hideModalOverlay,
              ref: "overlay",
              style: {
                display: this.state.shown ? "block" : "none",
              },
            },
            React.createElement(
              "div",
              {
                className: "content",
              },
              React.createElement(
                "form",
                {
                  id: "modal-form",
                },
                React.createElement(
                  "div",
                  {
                    className: "header",
                  },
                  React.createElement(
                    "h3",
                    {
                      id: "modal-title",
                    },
                    "Publish map"
                  ),
                  React.createElement(
                    "button",
                    {
                      id: "modal-close",
                      type: "button",
                      className: "close",
                      onClick: this._closeModal,
                    },
                    "×"
                  )
                ),
                React.createElement(
                  "div",
                  {
                    className: "body",
                    id: "modal-body",
                  },
                  !(this.state.completed || this.state.failed) &&
                    React.createElement("p", null, "uploading..."),
                  this.state.failed &&
                    React.createElement(
                      "p",
                      null,
                      "Upload failed. Please try again."
                    ),
                  this.state.completed &&
                    React.createElement(
                      "div",
                      null,
                      React.createElement("img", {
                        src: this.state.imgUrl,
                        height: "240",
                      }),
                      React.createElement("br", null),
                      React.createElement(
                        "b",
                        {
                          style: {
                            fontSize: 12,
                            fontFamily: "Verdana",
                            marginTop: 10,
                            display: "block",
                          },
                        },
                        "Copy and paste link in email, website, or forum"
                      ),
                      React.createElement("input", {
                        id: "static",
                        type: "text",
                        value: this.state.imgUrl,
                        style: {
                          fontSize: 10,
                          display: "block",
                          width: "100%",
                          marginBottom: 10,
                        },
                        readOnly: !0,
                        onClick: this._selectImgUrl,
                      }),
                      React.createElement(
                        "div",
                        {
                          style: {
                            float: "left",
                            marginRight: 10,
                          },
                        },
                        React.createElement(
                          "a",
                          {
                            className: "twitter-share-button",
                            href: this.state.shareUrl,
                            "data-url": this.state.shareUrl,
                            "data-via": "FINVIZ_com",
                            "data-count": "none",
                            "data-text": document.title,
                          },
                          "Tweet"
                        )
                      ),
                      React.createElement("div", {
                        className: "fb-share-button",
                        "data-layout": "button",
                        "data-href": this.state.shareUrl,
                      }),
                      React.createElement("div", {
                        id: "fb-root",
                      })
                    )
                ),
                React.createElement(
                  "div",
                  {
                    className: "footer",
                  },
                  React.createElement(
                    "button",
                    {
                      id: "modal-cancel",
                      type: "button",
                      className: "btn btn-default cancel",
                      onClick: this._closeModal,
                    },
                    "Close"
                  )
                )
              )
            )
          );
        },
        componentDidUpdate: function () {
          this.state.completed &&
            ((window.twttr = (function (e, t, a) {
              var c,
                n,
                d = e.getElementsByTagName(t)[0];
              if (!e.getElementById(a))
                return (
                  (n = e.createElement(t)),
                  (n.id = a),
                  (n.src = "https://platform.twitter.com/widgets.js"),
                  d.parentNode.insertBefore(n, d),
                  window.twttr ||
                    (c = {
                      _e: [],
                      ready: function (e) {
                        c._e.push(e);
                      },
                    })
                );
            })(document, "script", "twitter-wjs")),
            (function (e, t, a) {
              var c,
                n = e.getElementsByTagName(t)[0];
              e.getElementById(a) ||
                ((c = e.createElement(t)),
                (c.id = a),
                (c.src =
                  "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0"),
                n.parentNode.insertBefore(c, n));
            })(document, "script", "facebook-jssdk"));
        },
        _closeModal: function (e) {
          e.preventDefault(), n.closePublish();
        },
        _hideModalOverlay: function (e) {
          e.target === this.refs.overlay.getDOMNode() && this._closeModal(e);
        },
        _onChange: function () {
          this.setState(c.getModal());
        },
        _selectImgUrl: function (e) {
          e.target.select();
        },
      });
    e.exports = PublishModal;
  },
  95: function (e, t, a) {
    function c(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }

    function n(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }

    function d(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }

    var i = (function () {
        function e(e, t) {
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            (c.enumerable = c.enumerable || !1),
              (c.configurable = !0),
              "value" in c && (c.writable = !0),
              Object.defineProperty(e, c.key, c);
          }
        }

        return function (t, a, c) {
          return a && e(t.prototype, a), c && e(t, c), t;
        };
      })(),
      r = a(3).EventEmitter,
      o = (function (e) {
        function t() {
          return (
            c(this, t),
            n(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }

        return (
          d(t, e),
          i(t, [
            {
              key: "emitChange",
              value: function () {
                this.emit(t.CHANGE_EVENT);
              },
            },
            {
              key: "addChangeListener",
              value: function (e) {
                this.on(t.CHANGE_EVENT, e);
              },
            },
            {
              key: "removeChangeListener",
              value: function (e) {
                this.removeListener(t.CHANGE_EVENT, e);
              },
            },
          ]),
          t
        );
      })(r);
    (o.CHANGE_EVENT = "change"), (e.exports = o);
  },
  96: function (e, t, a) {
    var c = a(20),
      n =
        (a("Gradient"),
        React.createClass({
          displayName: "Zoom",
          render: function () {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "h4",
                {
                  // href: "javascript:void(0)",
                  className: "is-export pull-left",
                  id: "share-map",
                  style: {
                    // paddingRight: 16,
                    display: "inline",
                    userSelect: "none",
                  },
                },
                "Zoom Out: "
              ),
              React.createElement(
                "a",
                {
                  href: "#",
                  className: "minus",
                  style: {
                    //display:'none'
                    paddingRight: 16,
                    textAlign: "center",
                  },
                  onClick: this._onMinusClick,
                },
                React.createElement(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    opacity: "0.5",
                    fill: "currentcolor",
                    style: {
                      //display:'none'
                    },
                  },
                  React.createElement("rect", {
                    x: "4",
                    y: "10",
                    width: "16",
                    height: "4",
                  })
                )
              ),
              React.createElement(
                "h4",
                {
                  // href: "javascript:void(0)",
                  className: "is-export pull-left",
                  id: "share-map",
                  style: {
                    // paddingRight: 16,
                    display: "inline",
                    userSelect: "none",
                  },
                },
                "In: "
              ),
              React.createElement(
                "a",
                {
                  href: "#",
                  className: "plus",
                  onClick: this._onPlusClick,
                  style: {
                    //display:'none'
                    textAlign: "center",
                  },
                },
                React.createElement(
                  "svg",
                  {
                    width: "24",
                    height: "24",
                    opacity: "0.5",
                    fill: "currentcolor",
                    style: {
                      //display:'none'
                    },
                  },
                  React.createElement("rect", {
                    x: "4",
                    y: "10",
                    width: "16",
                    height: "4",
                  }),
                  React.createElement("rect", {
                    x: "10",
                    y: "4",
                    width: "4",
                    height: "16",
                  })
                )
              )
            );
          },
          _onMinusClick: function (e) {
            //console.log("_onMinusClick");
            //return;
            e.preventDefault(), c.zoom(-1);
          },
          _onPlusClick: function (e) {
            //return;
            e.preventDefault(), c.zoom(1);
          },
        }));
    e.exports = n;
  },
  101: function (e) {
    // get china stock price
    // $.ajax({
    //   type: "POST",
    //   //the url where you want to sent the userName and password to
    //   url: "https://scanner.tradingview.com/china/scan?columns=close",
    //   dataType: "json",
    //   async: false,
    //   //json object to sent to the authentication url
    //   data: JSON.stringify({
    //     columns: ["close|60", "change"],
    //   }),
    //   success: function (response) {
    //     result = response.data;
    //     // console.log("rrrrrrrrrrr: ", result)
    //     var price_dict = {};
    //     var change_dict = {};
    //     for (var i = 0; i < result.length; i++) {
    //       price_dict[result[i]["s"]] = result[i]["d"][0]; //.toFixed(2);
    //       change_dict[result[i]["s"]] = result[i]["d"][1]; //.toFixed(2);
    //     }
    //     e.exports = { price_dict, change_dict };
    //   },
    // });
  },

  100: function (e) {
    $.ajax({
      type: "GET",
      //url: "https://11.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=99999&np=1&fs=m:0+t:6,m:0+t:80,m:1+t:2,m:1+t:23,m:0+t:81+s:2048&fields=f4,f12",
      url: "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/cn_chg.json",
      dataType: "json",
      async: false,
      success: function (response) {
        result = response.data.diff;
        var dict_cn_chg = {};
        for (var i = 0; i < result.length; i++) {
          dict_cn_chg[result[i]["f12"]] = result[i]["f4"] / 100;
        }
        e.exports = { dict_cn_chg };
      },
    });
  },

  102: function (e) {
    $.ajax({
      type: "GET",
      url: "https://11.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=99999&np=1&fs=m:105,m:106,m:107&fields=f2,f3,f4,f12,f13,f14",
      dataType: "json",
      async: false,

      success: function (response) {
        result = response.data.diff;

        var dict_us_mkt = {};
        var dict_us_name = {};
        var dict_us_px = {};
        var dict_us_chg = {};
        var dict_us_pct = {};

        for (var i = 0; i < result.length; i++) {
          dict_us_mkt[result[i]["f12"]] = result[i]["f13"];
          dict_us_name[result[i]["f12"]] = result[i]["f14"];
          dict_us_px[result[i]["f12"]] = result[i]["f2"] / 100;
          dict_us_chg[result[i]["f12"]] = result[i]["f4"] / 100;
          dict_us_pct[result[i]["f12"]] = result[i]["f3"] / 100;
        }

        e.exports = {
          dict_us_mkt,
          dict_us_name,
          dict_us_px,
          dict_us_chg,
          dict_us_pct,
        };
      },
    });
  },

  103: function (e) {
    $.ajax({
      type: "GET",
      url: "https://11.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=99999&np=1&fs=m:128+t:1,m:128+t:3,m:128+t:4&fields=f1,f2,f3,f4,f12,f13,f14",
      dataType: "json",
      async: false,

      success: function (response) {
        result = response.data.diff;

        var dict_hk_mkt = {};
        var dict_hk_name = {};
        var dict_hk_px = {};
        var dict_hk_chg = {};
        var dict_hk_pct = {};
        //
        for (var i = 0; i < result.length; i++) {
          dict_hk_mkt[result[i]["f12"]] = result[i]["f13"];
          dict_hk_name[result[i]["f12"]] = result[i]["f14"];
          dict_hk_px[result[i]["f12"]] =
            result[i]["f2"] / 10 ** result[i]["f1"];
          dict_hk_chg[result[i]["f12"]] = result[i]["f4"] / 100;
          dict_hk_pct[result[i]["f12"]] = result[i]["f3"] / 100;
        }

        e.exports = {
          dict_hk_mkt,
          dict_hk_name,
          dict_hk_px,
          dict_hk_chg,
          dict_hk_pct,
        };
      },
    });
  },
});
