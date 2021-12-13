// pages/songDetail/songDetail.js
import request from '../../../utils/request'
import PubSub, { unsubscribe } from 'pubsub-js'
import moment from 'moment'
const appInstance = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay:false,
    song:{},
    musicId:'',
    musicLink:'',
    currentTime:'00:00',
    currentWidth:0,
    durationTime:'00:00',
  },

  handleMusicPlay(){
    let isPlay = !this.data.isPlay
    // this.setData({
    //   isPlay
    // })

    let {musicId,musicLink} = this.data
    this.musicControl(isPlay,musicId,musicLink)
  },

  // 获取音乐信息
  async getMusicInfo(musicId){
    let songData = await request('/song/detail',{ids:musicId})
    let durationTime = moment(songData.songs[0].dt).format('mm:ss')
    this.setData({
      song:songData.songs[0],
      durationTime
    })

    wx.setNavigationBarTitle({
      title:this.data.song.name
    })
  },

  // 音乐控制
  async musicControl(isPlay,musicId,musicLink){
    
    if(isPlay){
      if(!musicLink){
        let musicLinkData = await request('/song/url',{id:musicId})
        musicLink = musicLinkData.data[0].url
        this.setData({
          musicLink
        })
      }
      

      this.backgroundAudioManager.src = musicLink
      this.backgroundAudioManager.title = this.data.song.name
    }else{
      this.backgroundAudioManager.pause()
    }
  },

  // 改变音乐状态
  changePlayState(isPlay){
    this.setData({
      isPlay 
    })
    appInstance.globalData.isMusicPlay = isPlay
  },


  handleSwitch(event){
    let type = event.currentTarget.id;
    this.backgroundAudioManager.stop()
    PubSub.publish('switchType',type)
    PubSub.subscribe('musicId',(msg,musicId)=>{
      this.getMusicInfo(musicId)
      this.musicControl(true,musicId)
      PubSub,unsubscribe('musicId')
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let musicId = options.musicId
    this.setData({
      musicId
    })
    this.getMusicInfo(musicId)

    if(appInstance.globalData.isMusicPlay && appInstance.globalData.musicId===musicId){
      this.setData({
        isPlay:true
      })
    }

    this.backgroundAudioManager = wx.getBackgroundAudioManager();
    this.backgroundAudioManager.onPlay(()=>{
      this.changePlayState(true)
      appInstance.globalData.musicId = musicId
    })
    this.backgroundAudioManager.onPause(()=>{
      this.changePlayState(false)
    })
    this.backgroundAudioManager.onStop(()=>{
      this.changePlayState(false)
    })

    this.backgroundAudioManager.onEnded(()=>{
      PubSub.PubSub('switchType','next')
      this.setData({
        currentWidth:0,
        currentTime:'00:00'
      })
    })

    this.backgroundAudioManager.onTimeUpdate(()=>{
      let currentTime = moment(this.backgroundAudioManager.currentTime*1000).format('mm:ss')
      // console.log(this.backgroundAudioManager.currentTime,this.backgroundAudioManager.duration)
      let currentWidth = this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration * 450
      // console.log(currentWidth)
      this.setData({
        currentTime,
        currentWidth
      })
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