function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    } else {
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function(res) {
      callBack(res.data);
    },
    fail: function(error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

// 两日期相减得到相差天数
function getdays(day1, day2) {
  var that = this;
  var d1 = day1;
  var d2 = day2;
  d1 = d1.replace(/\-/g, "/");
  d2 = d2.replace(/\-/g, "/");
  var date1 = new Date(d1);
  var date2 = new Date(d2);
  var days = Math.ceil((date2 - date1) / (24 * 60 * 60 * 1000));
  return days;
}




module.exports = {
  formatTime: formatTime,
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  getdays: getdays
}