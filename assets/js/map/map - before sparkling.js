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
}

function drawMap(locale, color, ignoreAuth) {
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

  url =
    "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/cn_mkt_val.json";

  $.getJSON(url, function (response) {
    const result = response.data;

    sessionStorage.setItem(tmpCode, JSON.stringify(result));
    render(treemap, result, color, ignoreAuth);
  });

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

function drawMapUS(locale, color, ignoreAuth) {
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
    .sort((d1, d2) => d1.value - d2.value)
    .size([width, height])
    .value((d) => d.value)
    .padding((d) => {
      if (d.depth === 1) {
        return [17, 1, 1, 1];
      } else if (d.depth === 2) {
        return [12, 1, 2, 1];
      }
      return 0;
    });

  url =
    "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/us_mkt_val.json";

  $.getJSON(url, function (response) {
    const result = response;

    sessionStorage.setItem(tmpCode, JSON.stringify(result));
    render(treemap, result, color, ignoreAuth);
  });

  function render(treemap, result, color, ignoreAuth) {
    const nodes = treemap.nodes(result);

    const mapPerf = nodes.reduce((obj, node) => {
      if (node.condition) {
        obj[node.name] = node.condition;
      }
      return obj;
    }, {});

    console.log("aaa: ", result);
    console.log("ooo: ", nodes);
    console.log("maperrf: ", mapPerf);

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
        maxZoom: 5,
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
  Canvas: function (e, t, a) {
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
            // console.log("nodes: ", nodes);
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
      updateDataUS: function (isFirst) {
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
          url: "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/us_pct.json",
          dataType: "json",
          async: false,
          success: function (t) {
            var nodes = t.nodes;
            var stocks = {};

            stocks = t.nodes;
            // console.log("nodes: ", nodes);
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
                var arr = val;
                nodes[prop] = isNaN(val) ? null : parseFloat(val);
              }
            });
            var data = {
              additional: additional,
              nodes: nodes,
            };

            AppDispatcher.handleServerAction({
              type: ActionTypes.UPDATE_DATA_US,
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
  Sparkline: function (e, t) {
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
        UPDATE_DATA_US: null,
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
                console.log(t);
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
              key: "updatePerfUS",
              value: function (data) {
                var t = data.nodes;
                console.log(t);
                var additional = data.additional;

                this.nodes.forEach(function (e) {
                  void 0 !== t[e.name] && (e.perf = t[e.name]),
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
      f = a("Canvas"),
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
        case "us":
          f.updateDataUS(true, ignoreAuth);
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
        case ActionTypes.UPDATE_DATA_US:
          treemap.updatePerfUS(action.data),
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
      n = a("Canvas"),
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
      n = a("Sparkline"),
      d = a("Gradient"),
      mkt_cn = a(100),
      l = a(101),
      mkt_us = a(102),
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
          case "us":
            var stockCode = e.name;
            // px =
            price = mkt_us["dict_us_px"][stockCode];
            return void 0 !== price && null !== price
              ? Math.abs(price).toFixed(2)
              : "--";
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
          case "us":
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

            case "us":
              console.log(t);
              var stockCode = t.name;
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
                        t.description
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
                        React.createElement("svg", {
                          className: "sparkline white",
                          width: "100%",
                        })
                        // React.createElement("img", {
                        //   className: "smallLine",
                        //   width: "100%",
                        //   style: {
                        //     filter:
                        //       "saturate(0) grayscale(1) brightness(10) contrast(10)",
                        //   },
                        //   //selected stocks
                        //   src:
                        //     "https://webquotepic.eastmoney.com/GetPic.aspx?nid=" +
                        //     upOrDown +
                        //     "." +
                        //     stockCode +
                        //     "&imageType=RJY", //"https://chart.jrjimg.cn/pngdata/minpic/pic40/" + stockCode + ".png"
                        // })
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
                      React.createElement("td", {
                        colSpan: "5",
                        className: "description",
                      })
                    ),
                    s.map(function (t, a) {
                      if (a > 40) return null;
                      var c =
                          e.state.sparklinesData &&
                          e.state.sparklinesData[t.name],
                        d = c ? e.state.sparklinesData[t.name] : [];
                      var listStockCode = t.description; //id.substr(0, t.id.indexOf("."));
                      // var brd = t.id.split(".")[1];
                      // var upOrDown = brd == "SH" ? 1 : 0;
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
    var c = a("Canvas"),
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
      n = a("Canvas"),
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
    var c = a("Canvas"),
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
      url: "https://raw.githubusercontent.com/baffinchu/baffinchu.github.io/main/assets/data/us_px_chg_pct.json",
      // url: "https://11.push2.eastmoney.com/api/qt/clist/get?pn=1&pz=99999&np=1&fs=m:105,m:106,m:107&fields=f2,f3,f4,f12,f13,f14",
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