// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    navId: '',
    videoList: [],
    videoId: '',
    videoUpdateTime: [],
    isTriggered: false,
  },

  // 获取视频数据
  async getVideoGroupListData() {
    let videoGroupListData = await request('/video/group/list');
    this.setData({
      videoGroupList: videoGroupListData.data.slice(0, 14),
      navId: videoGroupListData.data[0].id
    })

    this.getVideoList(this.data.navId)
  },

  async getVideoList(navId) {
    let videoListData = await request('/video/group', { id: navId })

    wx.hideLoading();

    let index = 0
    let videoList = videoListData.datas.map(item => {
      item.id = index++
      return item
    })
    this.setData({
      videoList,
      isTriggered: false
    })
  },

  // 改变导航
  changeNav(event) {
    let navId = event.currentTarget.id;
    this.setData({
      navId,
      videoList: []
    })

    wx.showLoading({
      title: '正在加载'
    })
    this.getVideoList(this.data.navId)
  },

  // 播放函数
  handlePlay(event) {
    let vid = event.currentTarget.id
    // this.vid !== vid && this.videoContext && this.videoContext.stop()
    // this.vid = vid
    this.setData({
      videoId: vid
    })
    this.videoContext = wx.createVideoContext(vid)
    let { videoUpdateTime } = this.data
    let videoItem = videoUpdateTime.find(item => item.vid === vid)
    if (videoItem) {
      this.videoContext.seek(videoItem.currentTime)
    }
    this.videoContext.play()
  },

  handleTimeUpdate(event) {
    let videoTimeObj = { vid: event.currentTarget.id, currentTime: event.detail.currentTime };
    let { videoUpdateTime } = this.data;
    let videoItem = videoUpdateTime.find(item => item.vid === videoTimeObj.vid);
    if (videoItem) {
      videoItem.currentTime = event.detail.currentTime;
    } else {
      videoUpdateTime.push(videoTimeObj);
    }
    this.setData({
      videoUpdateTime
    })
  },

  // 播放完毕
  handleEnded(event) {
    let { videoUpdateTime } = this.data
    videoUpdateTime.splice(videoUpdateTime.findIndex(item => item.vid === event.currentTarget.id), 1)
    this.setData({
      videoUpdateTime
    })
  },


  handleRefresher() {
    console.log(this.data.navId)
    this.getVideoList(this.data.navId)
  },

  // 懒加载模拟数据
  handleToLower() {
    let newVideoList = [
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_E903792E9C116009DDFD18B700F8E2BE",
          "coverUrl": "https://p1.music.126.net/hm5GUnmbng3IGqT_jd6RaA==/109951165239625994.jpg",
          "height": 720,
          "width": 1290,
          "title": "《BLACK》-GD权志龙&JENNIE金智妮（我们的公主长大了）",
          "description": null,
          "commentCount": 51,
          "shareCount": 207,
          "resolutions": [
            {
              "resolution": 240,
              "size": 17834400
            },
            {
              "resolution": 480,
              "size": 28680342
            },
            {
              "resolution": 720,
              "size": 38851646
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 350000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/UNL6F62T_IXVBDKfO4-jww==/109951166380225545.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 350600,
            "birthday": 801072000000,
            "userId": 115871143,
            "userType": 204,
            "nickname": "05月22日",
            "signature": "永远赤诚善良",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951166380225550,
            "backgroundImgId": 109951166278383780,
            "backgroundUrl": "http://p1.music.126.net/vY5VZ1DQjc-5M_pxWAaq_g==/109951166278383776.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "影视视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951166380225545",
            "backgroundImgIdStr": "109951166278383776"
          },
          "urlInfo": {
            "id": "E903792E9C116009DDFD18B700F8E2BE",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/PAl8aubJ_3090526509_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=GFxaDqxmEgFKqTzwOwLOZjTfCEzrsywq&sign=ac3cf7df118670f1c69380a2b8d7eb32&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 38851646,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 10114,
              "name": "BIGBANG",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "BLACK [G-DRAGON 2017 WORLD TOUR ＜ACT III, M.O.T.T.E＞ IN JAPAN]",
              "id": 534542524,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 123577,
                  "name": "G-Dragon",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 11,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 37467192,
                "name": "G-DRAGON 2017 WORLD TOUR <ACT III, M.O.T.T.E> IN JAPAN",
                "picUrl": "http://p3.music.126.net/ed9pOr6_FxrMXLmlinFk2w==/109951163134376614.jpg",
                "tns": [],
                "pic_str": "109951163134376614",
                "pic": 109951163134376600
              },
              "dt": 231200,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 9250525,
                "vd": -2
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5550333,
                "vd": -2
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3700236,
                "vd": -2
              },
              "a": null,
              "cd": "01",
              "no": 10,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 0,
              "cp": 457010,
              "publishTime": 1517932800007,
              "privilege": {
                "id": 534542524,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 261,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "E903792E9C116009DDFD18B700F8E2BE",
          "durationms": 205358,
          "playTime": 207400,
          "praisedCount": 2808,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_91A1BFD0099E5511F6B65D54A43DD9F0",
          "coverUrl": "https://p1.music.126.net/QyeDIE94taMHidCexkVQdQ==/109951163572772648.jpg",
          "height": 720,
          "width": 1280,
          "title": "麻辣鸡 Nicki Minaj《Starships》超惹火现场版，现场气氛太棒了！",
          "description": "麻辣鸡 Nicki Minaj《Starships》超惹火现场版，现场气氛太棒了！",
          "commentCount": 562,
          "shareCount": 405,
          "resolutions": [
            {
              "resolution": 240,
              "size": 28307561
            },
            {
              "resolution": 480,
              "size": 40453047
            },
            {
              "resolution": 720,
              "size": 65275993
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 340000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/C6VID_CReqmt8ETsUWaYTQ==/18499283139231828.jpg",
            "accountStatus": 0,
            "gender": 0,
            "city": 340100,
            "birthday": -2209017600000,
            "userId": 479954154,
            "userType": 207,
            "nickname": "音乐诊疗室",
            "signature": "当我坐在那架破旧古钢琴旁边的时候，我对最幸福的国王也不羡慕。（合作推广请私信，或者+V信：mjs927721）",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 18499283139231828,
            "backgroundImgId": 1364493978647983,
            "backgroundUrl": "http://p1.music.126.net/i4J_uvH-pb4sYMsh4fgQAA==/1364493978647983.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "音乐资讯达人"
            },
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "18499283139231828",
            "backgroundImgIdStr": "1364493978647983"
          },
          "urlInfo": {
            "id": "91A1BFD0099E5511F6B65D54A43DD9F0",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/hHrMKIiP_94942341_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=TrptlzxNEcKtWYgVzdYsomtOiRaMWzxW&sign=6149e56bd28a7e311a79724bcedcc921&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFUP%2FlqNtSPUawPH42UnbhS",
            "size": 65275993,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 12100,
              "name": "流行",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 14112,
              "name": "Nicki Minaj",
              "alg": null
            },
            {
              "id": 16131,
              "name": "英文",
              "alg": null
            },
            {
              "id": 13164,
              "name": "快乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "Starships",
              "id": 3203127,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 70183,
                  "name": "Nicki Minaj",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 100,
              "st": 0,
              "rt": "600902000009274290",
              "fee": 1,
              "v": 26,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 324145,
                "name": "Starships",
                "picUrl": "http://p4.music.126.net/Po6_D1P9pr5QSGVKSBCorQ==/18756568860191736.jpg",
                "tns": [],
                "pic_str": "18756568860191736",
                "pic": 18756568860191736
              },
              "dt": 210703,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 8428191,
                "vd": -48072
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 5056932,
                "vd": -45662
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 3371302,
                "vd": -44267
              },
              "a": null,
              "cd": "1",
              "no": 1,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 5428,
              "cp": 7003,
              "publishTime": 1329148800007,
              "privilege": {
                "id": 3203127,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 320000,
                "fl": 0,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "91A1BFD0099E5511F6B65D54A43DD9F0",
          "durationms": 239500,
          "playTime": 954066,
          "praisedCount": 4946,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_D8722FAE87BD9A3DFA32A076EC154DBE",
          "coverUrl": "https://p1.music.126.net/ass76sVxpRggXzcZ6Lzz_Q==/109951164968136745.jpg",
          "height": 1080,
          "width": 1920,
          "title": "韩雪《处处吻》一吻便偷一个心，一吻便颠倒众生",
          "description": "#韩雪#《#处处吻#》一吻便偷一个心，一吻便颠倒众生",
          "commentCount": 549,
          "shareCount": 615,
          "resolutions": [
            {
              "resolution": 240,
              "size": 32513825
            },
            {
              "resolution": 480,
              "size": 59700974
            },
            {
              "resolution": 720,
              "size": 96182918
            },
            {
              "resolution": 1080,
              "size": 276181048
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 440000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/Z7YyrTboPVk7OMvubUg4gw==/109951165952899173.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 440100,
            "birthday": 936115200000,
            "userId": 430150543,
            "userType": 204,
            "nickname": "慕容簧笙",
            "signature": "新媒体│文学│插画│摄影│美食│理科男",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165952899170,
            "backgroundImgId": 109951165952898380,
            "backgroundUrl": "http://p1.music.126.net/pMW6kBdzuQho6ifHX3S6yg==/109951165952898381.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951165952899173",
            "backgroundImgIdStr": "109951165952898381"
          },
          "urlInfo": {
            "id": "D8722FAE87BD9A3DFA32A076EC154DBE",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/x8MZhKEL_2992190969_uhd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=nzNtxILyucjFGWMzwZmlLwvhzpYoDHBp&sign=b8d91c74cdac600a24f005ec7ee904ac&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 276181048,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 57105,
              "name": "粤语现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "处处吻 (Live)",
              "id": 1446233379,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 7894,
                  "name": "韩雪",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 90,
              "st": 0,
              "rt": "",
              "fee": 0,
              "v": 15,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 89092930,
                "name": "聚划算55青春选择之夜晚会Live",
                "picUrl": "http://p3.music.126.net/awQVkO1OmMWoxZL--dikJg==/109951164970741627.jpg",
                "tns": [],
                "pic_str": "109951164970741627",
                "pic": 109951164970741630
              },
              "dt": 186320,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 7455405,
                "vd": -5811
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 4473261,
                "vd": -3167
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 2982189,
                "vd": -1365
              },
              "a": null,
              "cd": "01",
              "no": 4,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 10933522,
              "cp": 1416805,
              "publishTime": 0,
              "privilege": {
                "id": 1446233379,
                "fee": 0,
                "payed": 0,
                "st": 0,
                "pl": 320000,
                "dl": 999000,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 320000,
                "toast": false,
                "flag": 257,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "D8722FAE87BD9A3DFA32A076EC154DBE",
          "durationms": 184551,
          "playTime": 1577686,
          "praisedCount": 7507,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_79099545D6F18E27CE644E841DEA3BC7",
          "coverUrl": "https://p1.music.126.net/AtJgUbUf9xftvp6Ecl0G6A==/109951165156775376.jpg",
          "height": 720,
          "width": 1280,
          "title": "捷克电影交响乐团(FSO) - The Ludlows [James Horner-燃情岁月]",
          "description": "【捷克】电影交响乐团 Film Symphony Orchestra (FSO) \r\nThe Ludlows (Legends of the Fall) (James Horner) [Official Live 2015]\n",
          "commentCount": 331,
          "shareCount": 3590,
          "resolutions": [
            {
              "resolution": 240,
              "size": 43302125
            },
            {
              "resolution": 480,
              "size": 82470795
            },
            {
              "resolution": 720,
              "size": 114588464
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 320000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/kjBkJOdnyR3zBBjQZ31Gkw==/109951164765455157.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 320500,
            "birthday": 526316400000,
            "userId": 1483790375,
            "userType": 0,
            "nickname": "猛猛故人-天地孤影碧海潮生",
            "signature": "君应有语：渺万里层云，千山暮雪，只影向谁去。",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164765455150,
            "backgroundImgId": 109951163381618320,
            "backgroundUrl": "http://p1.music.126.net/CzTTXSlK6HGQlLQQ4Rot3Q==/109951163381618320.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951164765455157",
            "backgroundImgIdStr": "109951163381618320"
          },
          "urlInfo": {
            "id": "79099545D6F18E27CE644E841DEA3BC7",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/e8Cnm0xz_1669040948_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=hKLndOtADqvtJsAPrboSLYiLExzJCtzJ&sign=9799d2753edefb796ea821676c3d5c15&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 114588464,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 58101,
              "name": "听BGM",
              "alg": null
            },
            {
              "id": 57106,
              "name": "欧美现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 4103,
              "name": "演奏",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 16152,
              "name": "交响乐",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [
            {
              "name": "The Ludlows",
              "id": 18618065,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 35353,
                  "name": "James Horner",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [
                "电影《燃情岁月》插曲"
              ],
              "pop": 100,
              "st": 0,
              "rt": "",
              "fee": 1,
              "v": 96,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 1707719,
                "name": "Legends Of The Fall Original Motion Picture Soundtrack",
                "picUrl": "http://p3.music.126.net/_IfCf6yWCK-oZ0LRMGitrw==/109951166092407160.jpg",
                "tns": [],
                "pic_str": "109951166092407160",
                "pic": 109951166092407170
              },
              "dt": 340453,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 13618199,
                "vd": 121793
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 8170937,
                "vd": 124424
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 5447306,
                "vd": 126193
              },
              "a": null,
              "cd": "1",
              "no": 2,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 0,
              "cp": 7001,
              "publishTime": 789667200000,
              "privilege": {
                "id": 18618065,
                "fee": 1,
                "payed": 0,
                "st": 0,
                "pl": 0,
                "dl": 0,
                "sp": 0,
                "cp": 0,
                "subp": 0,
                "cs": false,
                "maxbr": 320000,
                "fl": 0,
                "toast": false,
                "flag": 4,
                "preSell": false
              }
            },
            {
              "name": "The Ludlows",
              "id": 35437870,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 35353,
                  "name": "James Horner",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 95,
              "st": 0,
              "rt": null,
              "fee": 8,
              "v": 9,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 3329090,
                "name": "Shire Music Greatest Hits VOL.7:GO TO HEAVEN",
                "picUrl": "http://p3.music.126.net/9-kYtZWeEK8NHwgmMpfPtQ==/3345813884535322.jpg",
                "tns": [],
                "pic": 3345813884535322
              },
              "dt": 340440,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 13620288,
                "vd": 78722
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 8172190,
                "vd": 82278
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 5448141,
                "vd": 85523
              },
              "a": null,
              "cd": "1",
              "no": 9,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 0,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 0,
              "cp": 7001,
              "publishTime": 1325347200004,
              "privilege": {
                "id": 35437870,
                "fee": 8,
                "payed": 0,
                "st": 0,
                "pl": 128000,
                "dl": 0,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 999000,
                "fl": 128000,
                "toast": false,
                "flag": 0,
                "preSell": false
              }
            },
            {
              "name": "Legends of the Fall: The Ludlows",
              "id": 1484418,
              "pst": 0,
              "t": 0,
              "ar": [
                {
                  "id": 35353,
                  "name": "James Horner",
                  "tns": [],
                  "alias": []
                }
              ],
              "alia": [],
              "pop": 95,
              "st": 0,
              "rt": "",
              "fee": 0,
              "v": 8,
              "crbt": null,
              "cf": "",
              "al": {
                "id": 151572,
                "name": "Titanic - The Essential James Horner Film Music Collection",
                "picUrl": "http://p4.music.126.net/9Y3ve8OwIymr5LeVDF8vew==/6649846324993040.jpg",
                "tns": [],
                "pic": 6649846324993040
              },
              "dt": 439000,
              "h": {
                "br": 320000,
                "fid": 0,
                "size": 17563930,
                "vd": 7976
              },
              "m": {
                "br": 192000,
                "fid": 0,
                "size": 10538454,
                "vd": 10637
              },
              "l": {
                "br": 128000,
                "fid": 0,
                "size": 7025716,
                "vd": 13166
              },
              "a": null,
              "cd": "1",
              "no": 5,
              "rtUrl": null,
              "ftype": 0,
              "rtUrls": [],
              "djId": 0,
              "copyright": 1,
              "s_id": 0,
              "rtype": 0,
              "rurl": null,
              "mst": 9,
              "mv": 0,
              "cp": 5003,
              "publishTime": 903369600007,
              "privilege": {
                "id": 1484418,
                "fee": 0,
                "payed": 0,
                "st": 0,
                "pl": 320000,
                "dl": 320000,
                "sp": 7,
                "cp": 1,
                "subp": 1,
                "cs": false,
                "maxbr": 320000,
                "fl": 320000,
                "toast": false,
                "flag": 128,
                "preSell": false
              }
            }
          ],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "79099545D6F18E27CE644E841DEA3BC7",
          "durationms": 434667,
          "playTime": 477839,
          "praisedCount": 3886,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_F8AF4149E74EA81F1BC38992A9A65073",
          "coverUrl": "https://p1.music.126.net/iJszY9Ky5Wt1EHbSjlwRLw==/109951163992459743.jpg",
          "height": 1080,
          "width": 1920,
          "title": "20190410 BLACKPINK - Kill This Love 三星GALAXY泰国",
          "description": "20190410 BLACKPINK - Kill This Love 三星GALAXY A90 泰国发布会现场",
          "commentCount": 234,
          "shareCount": 484,
          "resolutions": [
            {
              "resolution": 240,
              "size": 42312805
            },
            {
              "resolution": 480,
              "size": 66300303
            },
            {
              "resolution": 720,
              "size": 96529011
            },
            {
              "resolution": 1080,
              "size": 146199452
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 1000000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/SUeqMM8HOIpHv9Nhl9qt9w==/109951165647004069.jpg",
            "accountStatus": 0,
            "gender": 1,
            "city": 1010000,
            "birthday": 631202975999,
            "userId": 85203994,
            "userType": 0,
            "nickname": "用户85203994",
            "signature": "",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165647004060,
            "backgroundImgId": 109951162868126480,
            "backgroundUrl": "http://p1.music.126.net/_f8R60U9mZ42sSNvdPn2sQ==/109951162868126486.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 10,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951165647004069",
            "backgroundImgIdStr": "109951162868126486"
          },
          "urlInfo": {
            "id": "F8AF4149E74EA81F1BC38992A9A65073",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/NMGeNhKf_2438916282_uhd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=JQNYTAvHIyIJybzCIJNTjpSZgzLDcsOH&sign=8e4092dd6050a779885cd1d6c0d24eba&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFUP%2FlqNtSPUawPH42UnbhS",
            "size": 146199452,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 1080
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 92105,
              "name": "BLACKPINK",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "F8AF4149E74EA81F1BC38992A9A65073",
          "durationms": 207773,
          "playTime": 900540,
          "praisedCount": 7251,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_EB2F6D579BE856F97F90DA7242073BB4",
          "coverUrl": "https://p1.music.126.net/9T1gzz4VsJDd3cVGIzPDcQ==/109951164009295248.jpg",
          "height": 1280,
          "width": 720,
          "title": "【BLACKPINK】绝了！LISA洛杉矶演唱会solo舞台",
          "description": "【BLACKPINK】绝了！LISA洛杉矶演唱会solo舞台，我和台下观众一样疯狂哦买嘎",
          "commentCount": 264,
          "shareCount": 1703,
          "resolutions": [
            {
              "resolution": 240,
              "size": 22887019
            },
            {
              "resolution": 480,
              "size": 38636154
            },
            {
              "resolution": 720,
              "size": 45736716
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 310000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/vYHGILLfWWof6ogz1HwxKQ==/109951164491145822.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 310101,
            "birthday": 1262275200000,
            "userId": 1335061865,
            "userType": 204,
            "nickname": "仙宫频道",
            "signature": "plmm爱好者/个人收藏bot",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951164491145820,
            "backgroundImgId": 109951164829202080,
            "backgroundUrl": "http://p1.music.126.net/PNGXsjXd_IYT0vvkXeoonQ==/109951164829202086.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": {
              "1": "音乐视频达人",
              "2": "音乐图文达人"
            },
            "djStatus": 10,
            "vipType": 11,
            "remarkName": null,
            "avatarImgIdStr": "109951164491145822",
            "backgroundImgIdStr": "109951164829202086"
          },
          "urlInfo": {
            "id": "EB2F6D579BE856F97F90DA7242073BB4",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/zzDkmOMR_2453574865_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=NSAACjguWNDQGdtyoYAMFlacFGCIsHUI&sign=528a45c1350a323f95181817766a95ee&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 45736716,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1101,
              "name": "舞蹈",
              "alg": null
            },
            {
              "id": 57107,
              "name": "韩语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 57110,
              "name": "饭拍现场",
              "alg": null
            },
            {
              "id": 58116,
              "name": "韩舞",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 92105,
              "name": "BLACKPINK",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "EB2F6D579BE856F97F90DA7242073BB4",
          "durationms": 101142,
          "playTime": 1354530,
          "praisedCount": 11601,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_3E8D2797DE6020EF88F8FBEF3042298E",
          "coverUrl": "https://p1.music.126.net/XAQpoBVJncTp7ZMEJV55Cw==/109951165061858890.jpg",
          "height": 720,
          "width": 1280,
          "title": "快乐大本营：谢霆锋/王俊凯《谢谢你的爱1999》Live～",
          "description": "快乐大本营：谢霆锋/王俊凯/张恩岱/王北车/刘郡格/杨洋/王迪/郭锐《谢谢你的爱1999》Live～ ",
          "commentCount": 121,
          "shareCount": 338,
          "resolutions": [
            {
              "resolution": 240,
              "size": 35601747
            },
            {
              "resolution": 480,
              "size": 60721361
            },
            {
              "resolution": 720,
              "size": 85874753
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 810000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/RCzksIcMLAbyXgPhJJmvAQ==/109951166008264068.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 810100,
            "birthday": -2209017600000,
            "userId": 452227174,
            "userType": 0,
            "nickname": "Leeyy-李彦媛",
            "signature": "我的Hip-hop现场经历\r中国有嘻哈2017制作人公演现场\r中国新说唱2018总决赛现场\r中国新说唱2019总决赛现场～",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951166008264060,
            "backgroundImgId": 109951165395733630,
            "backgroundUrl": "http://p1.music.126.net/JoV68ORMXbVRqYMDNp28GA==/109951165395733633.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951166008264068",
            "backgroundImgIdStr": "109951165395733633"
          },
          "urlInfo": {
            "id": "3E8D2797DE6020EF88F8FBEF3042298E",
            "url": "http://vodkgeyttp9.vod.126.net/vodkgeyttp8/PDC5UKo4_3030748118_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=VseJDvgdOwRGbTvCSJCTayEvPVriFUqb&sign=4de112aaaf194ecbb743e2b4bd4af969&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 85874753,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 59101,
              "name": "华语现场",
              "alg": null
            },
            {
              "id": 57108,
              "name": "流行现场",
              "alg": null
            },
            {
              "id": 59108,
              "name": "巡演现场",
              "alg": null
            },
            {
              "id": 11137,
              "name": "TFBOYS",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 25108,
              "name": "王俊凯",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "3E8D2797DE6020EF88F8FBEF3042298E",
          "durationms": 200480,
          "playTime": 223227,
          "praisedCount": 1695,
          "praised": false,
          "subscribed": false
        }
      },
      {
        "type": 1,
        "displayed": false,
        "alg": "onlineHotGroup",
        "extAlg": null,
        "data": {
          "alg": "onlineHotGroup",
          "scm": "1.music-video-timeline.video_timeline.video.181017.-295043608",
          "threadId": "R_VI_62_970AB0974CB48D0B63EED104D16A1D88",
          "coverUrl": "https://p1.music.126.net/ywFyF3GeRmQXympuR1zHGg==/109951163572656467.jpg",
          "height": 720,
          "width": 1280,
          "title": "朴灿烈 鬼怪ost 《stay with me》澳大利亚演唱",
          "description": null,
          "commentCount": 927,
          "shareCount": 3309,
          "resolutions": [
            {
              "resolution": 240,
              "size": 19283567
            },
            {
              "resolution": 480,
              "size": 33099320
            },
            {
              "resolution": 720,
              "size": 46547687
            }
          ],
          "creator": {
            "defaultAvatar": false,
            "province": 440000,
            "authStatus": 0,
            "followed": false,
            "avatarUrl": "http://p1.music.126.net/oveuN4Y3oqFhgmcWUIM9Qw==/109951165150724997.jpg",
            "accountStatus": 0,
            "gender": 2,
            "city": 440300,
            "birthday": 790099200000,
            "userId": 362408640,
            "userType": 0,
            "nickname": "Lynn林阳",
            "signature": "YOLO ! LOVEXO !!! BAEK HYUN !!! ChanBaek !!!",
            "description": "",
            "detailDescription": "",
            "avatarImgId": 109951165150725000,
            "backgroundImgId": 18936888765271350,
            "backgroundUrl": "http://p1.music.126.net/Cij4Jy-kYcNMarw5dTRqqQ==/18936888765271350.jpg",
            "authority": 0,
            "mutual": false,
            "expertTags": null,
            "experts": null,
            "djStatus": 0,
            "vipType": 0,
            "remarkName": null,
            "avatarImgIdStr": "109951165150724997",
            "backgroundImgIdStr": "18936888765271350"
          },
          "urlInfo": {
            "id": "970AB0974CB48D0B63EED104D16A1D88",
            "url": "http://vodkgeyttp9.vod.126.net/cloudmusic/pnN7pRSl_3141911777_shd.mp4?ts=1638867455&rid=8A47671ED144D3848D62D5ED3661A22D&rl=3&rs=KCeRNhBhDcPdkRXnodGadqCLdNsbuGTB&sign=7226236cd28f1e93f47e8491518ecd98&ext=F3asbxIbYGmC7QwvndHsArAK%2BU8d1niWITbsuKyqgIhHEt8UsfyEhQ%2BCBsc2dMBS%2BJTc3zKURWDJEhHAK31LUe8ZXweOD2ZZyTkbDKjp5ZEm3M0vELRX%2FEUH35%2FOiIlCtMPzFqAwmWPLKH5xetdFEPK2E8y6owS0RHiLszOmbMNE7MXh4CnFs%2FyP4H9O0nySNO0k1M0kGkEdmXAZwMC%2F7FbL6gtjFMj49MHs7%2FCe0CFIZtHwz8slg9R4w4eULwbg",
            "size": 46547687,
            "validityTime": 1200,
            "needPay": false,
            "payInfo": null,
            "r": 720
          },
          "videoGroup": [
            {
              "id": 58100,
              "name": "现场",
              "alg": null
            },
            {
              "id": 1100,
              "name": "音乐现场",
              "alg": null
            },
            {
              "id": 12100,
              "name": "流行",
              "alg": null
            },
            {
              "id": 5100,
              "name": "音乐",
              "alg": null
            },
            {
              "id": 13139,
              "name": "韩语",
              "alg": null
            },
            {
              "id": 14137,
              "name": "感动",
              "alg": null
            }
          ],
          "previewUrl": null,
          "previewDurationms": 0,
          "hasRelatedGameAd": false,
          "markTypes": null,
          "relateSong": [],
          "relatedInfo": null,
          "videoUserLiveInfo": null,
          "vid": "970AB0974CB48D0B63EED104D16A1D88",
          "durationms": 192214,
          "playTime": 2146835,
          "praisedCount": 25479,
          "praised": false,
          "subscribed": false
        }
      }
    ]
    let videoList = this.data.videoList
    videoList.push(...newVideoList)
    this.setData({
      videoList
    })
  },
  
  // 跳转至搜索页面
  toSearch(){
    wx.navigateTo({
      url:'/pages/search/search'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoGroupListData()

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
  onShareAppMessage: function ({from}) {
    console.log(from)
    return{
      title:'自定义转发内容',
      page:'/pages/video/video',
      imageUrl:'/static/images/nvsheng.jpg'
    }
  }
})