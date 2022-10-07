const util = require('../../utils/util.js')

Page({

    data: {
        each_money: 0
    },

    //输入
    inputNumber(e) {
        this.data.each_money = Number((Number(e.detail.value)).toFixed(2))
    },

    //输入完成点击确定
    inputOK() {
        if(!this.data.each_money) {
            wx.showToast({
              title: '请输入有效金额',
              icon:'error'
            })
            return
        }
        //修改records缓存
        const records = wx.getStorageSync('records') || [] //获取缓存
        records.unshift([util.formatTime(new Date(Date.now())), this.data.each_money]) //在开头插入新的时间、金额
        wx.setStorageSync('records', records) //放入缓存
        //获取页面栈
        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];
        //修改records
        prevPage.setData({
            records: wx.getStorageSync('records') || []
        })
        //修改dats_total日总支出
        var tem_each_money = this.data.each_money //有用，勿删
        var tem_days_total = prevPage.data.days_total
        tem_days_total[prevPage.data.records[0][0][2]-1] += tem_each_money
        tem_days_total[prevPage.data.records[0][0][2]-1] = Number(Number(tem_days_total[prevPage.data.records[0][0][2]-1]).toFixed(2))
        prevPage.setData({
            days_total: tem_days_total
        })
        wx.setStorageSync('days_total', prevPage.data.days_total) //放入缓存
        //修改month_total月度总支出
        prevPage.setData({
            month_total: [prevPage.data.records[0][0][1], 
                            Number(Number(prevPage.data.month_total[1] + tem_each_money).toFixed(2))]
        })
        wx.setStorageSync('month_total', prevPage.data.month_total) //放入缓存
        wx.navigateBack({
            delta: 1
        })
    }

    
})