
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year_count: [0,0,0,0,0,0,0,0,0,0,0,0], //12个月的记录
        month_now: 0 //当前月份
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取当前月份
        var dateTime  =  new Date();
        var month = dateTime.getMonth() +1;
        this.setData({
            month_now: month
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.setStorageSync('year_count', this.data.year_count)
        var tem_year_count = this.data.year_count
        var tem_month_total = wx.getStorageSync('month_total')
        tem_year_count[12-tem_month_total[0]] = tem_month_total[1] //将home中总花费赋给当前月份
        this.setData({
            year_count: tem_year_count
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})