
Page({

    /**
     * 页面的初始数据
     */
    data: {
        month_total: [0, 0], //本月总支出 [月份, 金额]
        month_now: 0, //当前月份
        records: [], //支出记录
        days_total: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取当前月份
        var dateTime  =  new Date();
        var month = dateTime.getMonth() +1;
        this.setData({
            month_now: month,
            month_total: wx.getStorageSync('month_total') || [0, 0]
        })
        if(this.data.month_now!=this.data.month_total[0]){
            //清空缓存（设置空缓存）
            wx.setStorageSync('records', [])
            wx.setStorageSync('month_total', [this.data.month_now,0])
            wx.setStorageSync('days_total',[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])
        }
        this.setData({
            records: wx.getStorageSync('records'),
            month_total: wx.getStorageSync('month_total'),
            days_total: wx.getStorageSync('days_total')
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
      
    },

    //添加一笔
    addMoney(){
        wx.navigateTo({
          url: '/pages/add/add',
        })
    },

    //长按删除记录
    toDelete(e){
        var that = this;
        wx.showModal({
            title: '删除此条记录？',
            success (res) {
              //确认删除
              if (res.confirm) {
                var del_msg = e.currentTarget.dataset.delmsg
                var del_index = that.data.records.findIndex(value=>value[0][2]==del_msg[0][2]&&
                  value[0][3]==del_msg[0][3]&&value[0][4]==del_msg[0][4]&&value[0][5]==del_msg[0][5]);
                var tem_records = that.data.records
                var tem_month_total = that.data.month_total
                var tem_days_total = that.data.days_total
                tem_days_total[del_msg[0][2]-1] -= del_msg[1]
                tem_days_total[del_msg[0][2]-1]=Number(Number(tem_days_total[del_msg[0][2]-1]).toFixed(2))
                tem_month_total[1] -= del_msg[1]
                tem_month_total[1]=Number(Number(tem_month_total[1]).toFixed(2))
                tem_records.splice(del_index, 1)
                that.setData({
                  records: tem_records,
                  month_total: tem_month_total,
                  days_total: tem_days_total
                })
                wx.setStorageSync('records', that.data.records)
                wx.setStorageSync('month_total',that.data.month_total)
                wx.setStorageSync('days_total',that.data.days_total)
              } 
              //取消删除
              //else if (res.cancel) {}
            }
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