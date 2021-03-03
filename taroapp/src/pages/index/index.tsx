/* eslint-disable jsx-quotes */
/*
 * @Author: your name
 * @Date: 2021-02-19 10:15:27
 * @LastEditTime: 2021-02-19 11:14:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /taroapp/src/pages/index/index.tsx
 */
import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtButton } from "taro-ui";
import "./index.scss";

export default class Index extends Component {
  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  getToken() {
    Taro.login({
      success: (res) => {
        if (res.code) {
          Taro.request({
            url: `http://192.168.1.237:3000/v1/token`,
            method: "POST",
            data: {
              account: res.code,
              type: 100,
            },
            success: (ress) => {
              // 将token 存在 storage中
              const code = ress.statusCode.toString();
              if (code.startsWith("2")) {
                Taro.setStorage({ key: "token", data: ress.data.token });
              }
            },
          });
        }
      },
    });
  }

  // 验证token
  verifyToken(){
    Taro.request({
      url:`http://192.168.1.237:3000/v1/token/verify`,
      method: "POST",
      data:{
        token:Taro.getStorageSync('token')
      },
      success: (res)=>{
        console.log(res)
      }
    })
  }

  render() {
    return (
      <View>
        <Text>hello yukiice</Text>
        <AtButton type="primary" onClick={() => this.getToken()}>
          获取Token
        </AtButton>
        <AtButton className="mt-1" type="secondary" onClick={() => this.verifyToken()}>
          验证Token
        </AtButton>
      </View>
    );
  }
}
