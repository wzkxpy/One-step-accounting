
Page({

    data: {
        year_count: [0,0,0,0,0,0,0,0,0,0,0,0], //12个月的记录
        month_now: 0 //当前月份
    },

    //生命周期函数--监听页面加载
    onLoad: function (options) {
        //获取当前月份
        var dateTime  =  new Date();
        var month = dateTime.getMonth() + 1;
        this.setData({
            month_now: month
        })
    },

    // 生命周期函数--监听页面显示
    onShow: function () {
        var tem_year_count = wx.getStorageSync('year_count') || [0,0,0,0,0,0,0,0,0,0,0,0]
        var tem_month_total = wx.getStorageSync('month_total')
        tem_year_count[12-tem_month_total[0]] = tem_month_total[1] //将home中总花费赋给当前月份
        wx.setStorageSync('year_count', tem_year_count)
        this.setData({
            year_count: tem_year_count
        })
    }

})