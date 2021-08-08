/***
 Created by IntelliJ IDEA.
 User: xiexy
 Date: 2019/6/12
 ***/

import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
import hex_sha1 from "js-sha1";
import md5 from "md5";
import { getLocalStore, browser, getUrlString, setLocalStore } from "./index";

//公钥
const publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDQ/DOV4sn6I83QBjAUXmfhD02FtPEepFhWpS1nwzR6WVzRmeYxsX58oVINIVek8SptF3TpVfUq28DCDSGyAuOkCmmPIOP3zjy8q6Rht2KN9fZyCTKdwrHPZaw/h3HHXbUOSkywQE3Y372DdRxXoZN/I/QHDSKRRO8z9ESfxOBrDQIDAQAB";

//渠道
let channel = getUrlString("channel");
if (channel && channel === "07") {//小程序
  channel = "07";
} else {//app
  channel = browser.versions.android ? "02" : "03";
}
setLocalStore("channel", channel);

//公共参数
const commParams = {
  channel: channel
};

//待加密数组
const encryptParams = [
  "login_name",
  "mobile",
  "mobile_no",
  "email",
  "cert_no",
  "certNo",
  "card_no",
  "pwd",
  "pay_pwd",
  "parent_user_id",
  "reply_tel",
  "auth_code"
];

/**
 * 入参加密签名处理
 * @param json
 */
export const commInHandle = {
  filter(json) {
    for (let param1 in commParams) {
      json[param1] = commParams[param1];
    }
    for (let param2 in json) {
      if (!json[param2] && typeof json[param2] != "number") {
        delete json[param2];
      }
    }
    return json;
  },
  encrypt(json) {
    this.filter(json);
    let login = JSON.parse(getLocalStore("login"));
    if (login) {
      json.login_name = login.login_name;
      json.ses_id = login.ses_id;
    }
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    let rand = randomWord(true, 24, 24).toUpperCase();
    let key = encrypt.encrypt(rand);//用于3DES加密的key，并且要传给接口
    encryptParams.forEach(item => {
      if (json[item]) {
        json[item] = encryptByDES(rand, json[item].toString());
      }
    });
    json["dec_key"] = key;
    return json;
  },
  sign(json) {
    this.filter(json);
    let keyArr = Object.keys(json);
    if (!Object.values) Object.values = obj => {//如果要Object.values兼容不支持它的旧环境(比如vivo x7)
      if (obj !== Object(obj))
        throw new TypeError("Object.values called on a non-object");
      let val = [];
      for (let key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          val.push(obj[key]);
        }
      }
      return val;
    };
    let signArr = Object.values(json);
    keyArr.forEach((item, index) => {
      if (item.indexOf("list") > -1) {
        keyArr.splice(index, 1);
        signArr.splice(index, 1);
        let list = JSON.parse(JSON.stringify(json[item]));
        for (let i = 0; i < list.length; i++) {
          let listSign = Object.values(list[i]).join("");
          list[i]["key"] = Object.keys(list[i]).join(",");
          list[i]["sign"] = hex_sha1(md5(listSign + "qhkiG9w0").toUpperCase()).toUpperCase();
        }
        json[item] = list;
      }
    });
    json["key"] = keyArr.join(",");
    json["sign"] = hex_sha1(md5(signArr.join("") + "qhkiG9w0").toUpperCase()).toUpperCase();
    return json;
  }
};

/**
 * randomWord 产生任意长度随机字母数字组合
 * randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 */
export const randomWord = (randomFlag, min, max) => {
  let str = "",
    range = min,
    arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (let i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
};

/**
 *针对3des 模式ECB，填充Pkcs7 的封装加密方法
 *参数含义：key 密钥，，message入参值
 */
const encryptByDES = (key, message) => {
  let keyHex = CryptoJS.enc.Utf8.parse(key),
    encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();
};
