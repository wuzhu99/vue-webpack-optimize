/***
 Created by IntelliJ IDEA.
 User: xiexy
 Date: 2019/5/14
 ***/

import Vue from 'vue'
import {Toast} from 'vant'

Vue.use(Toast);

/**
 * 手机号验证
 */
export const mobileValidate = mobile => {
  // const newReg = /^(((13[0-9]{1})|(14[5,6,7,8,9]{1})|(17[0,1,2,3,4,5,6,7,8]{1})|(15[0,1,2,3,5,6,7,8,9]{1})|(18[0-9]{1})|(19[8,9]{1})|(16[5,6]{1}))+\d{8})$/;
  if (mobile) {
    if (mobile.length == 11) {
      return true;
    } else {
      Toast('请输入正确的手机号码');
      return false;
    }
  } else {
    Toast('请输手机号码');
    return false;
  }
};

/**
 * 登录密码验证6-18数字字母组合
 */
export const pwdValidate = pwd => {
  const newReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
  if (pwd) {
    if (pwd.length < 6) {
      Toast('密码长度为6-18位');
      return false;
    } else {
      if (newReg.test(pwd)) {
        return true;
      } else {
        Toast('密码为6-18位数字字母组合');
        return false;
      }
    }
  } else {
    Toast('请输入密码');
    return false;
  }
};

/**
 * 短信验证码验证
 */
export const codeValidate = code => {
  if (code) {
    if (code.length < 6) {
      Toast('请输入6位验证码');
      return false;
    } else {
      return true;
    }
  } else {
    Toast('请输入验证码');
    return false;
  }
};

/**
 * 姓名验证
 */
export const nameValidate = name => {
  const newReg = new RegExp("[`~!@#%$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if (name) {
    if (newReg.test(name)) {
      Toast('不能输入特殊字符');
      return false;
    } else {
      return true;
    }
  } else {
    Toast('请输入姓名');
    return false;
  }
};


/**
 * 身份证号验证
 */
export const certNoValidate = certNo => {
  if (certNo) {
    // 加权因子
    const weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    const check_code = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    let code = certNo + "";
    let last = certNo[17]; //最后一个
    let seventeen = code.substring(0, 17);
    // 判断最后一位校验码是否正确
    let arr = seventeen.split("");
    let len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
      num = num + arr[i] * weight_factor[i];
    }
    // 获取余数
    let resisue = num % 11;
    let last_no = check_code[resisue];
    // 格式的正则
    // 正则思路
    /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
    const newReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    // 判断格式是否正确
    let format = newReg.test(certNo);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    if (last_no && format) {
      return true;
    } else {
      Toast('请输入正确合法的身份证号码');
      return false;
    }
  } else {
    Toast('请输入身份证号码');
    return false;
  }
};

/**
 * 卡号验证
 */
export const cardNoValidate = cardNo => {
  const newReg = /^\d{17}$/;
  if (cardNo) {
    if (newReg.test(cardNo)) {
      return true;
    } else {
      Toast('卡号有误，请核对您的市民卡卡号');
      return false;
    }
  } else {
    Toast('请输入您的市民卡卡号');
    return false;
  }
};


