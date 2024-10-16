import React, {Component,RefObject, createRef} from 'react';
import {View} from '@tarojs/components';
import {Alert} from '../Alert';
import {noop, returnNull} from "../utils";
import Taro from '@tarojs/taro';
import {modalId} from '../const';

const hookLifeCycleFn = ["onLoad"]

export default class TaroBaseComponents extends Component {
  private readonly alertRef: RefObject<Alert>;

  constructor(props: any) {
    super(props);
    this.alertRef = createRef();
    this.hookLifeCycle();
    this.hookRender();
  }

  hookLifeCycle() {
    hookLifeCycleFn.forEach(fnName => {
      const oldFn = this[fnName] || noop;
      const newFn = (args:any) => {
        this["$" + fnName].call(this, args);
        oldFn.call(this, args);
      }
      this[fnName] = newFn.bind(this);
    });
  }

  $onload() {
    const $instance = Taro.getCurrentInstance();
    //@ts-ignore
    $instance.page.alertRef = this.alertRef;
  }

  hookRender() {
    const originRender = (this.render && this.render.bind(this)) || returnNull;
    this.render = () => {
      return (
          <View>
            <Alert ref={this.alertRef}/>
            <View>{originRender()}</View>
            <View id={modalId} style={{position: "relative", zIndex: 9000}}/>
          </View>
      );
    }
  }
}
