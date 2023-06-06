import TIM from 'tim-wx-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import TIMProfanityFilterPlugin from 'tim-profanity-filter-plugin';
import { genTestUserSig }  from '../../TUIKit/debug/GenerateTestUserSig';


Page({
  handleJump() {
    wx.navigateTo({
      url: '../../TUI-CustomerService/pages/index',
    })
  },

    data: {

        config: {
            userID: 'administrator', //User ID
            SDKAPPID: 1400810966, // Your SDKAppID
            SECRETKEY: '978194a37a763022ded308bf795f8b49df7973610b64d0817915a93635407388', // Your secretKey
            EXPIRETIME: 604800,
        }
    },


    onLoad() {
        const userSig = genTestUserSig(this.data.config).userSig 
        wx.$TUIKit = TIM.create({
            SDKAppID: this.data.config.SDKAPPID
        })
        wx.$chat_SDKAppID = this.data.config.SDKAPPID;
        wx.$chat_userID = this.data.config.userID;
        wx.$chat_userSig = userSig;
        wx.$TUIKitTIM = TIM;
        wx.$TUIKit.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
        wx.$TUIKit.registerPlugin({ 'tim-profanity-filter-plugin': TIMProfanityFilterPlugin });
        wx.$TUIKit.login({
            userID: this.data.config.userID,
            userSig
        });
        wx.setStorage({
            key: 'currentUserID',
            data: [],
        });
        wx.$TUIKit.on(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onUnload() {
        wx.$TUIKit.off(wx.$TUIKitTIM.EVENT.SDK_READY, this.onSDKReady,this);
    },
    onSDKReady() {
        const TUIKit = this.selectComponent('#TUIKit');
        TUIKit.init();
    }
  });
