import React, {Component, RefObject} from 'react';
import Taro from '@tarojs/taro';
import {View} from '@tarojs/components'
import {Mask} from '../Mask';
import './index.css';

interface AlertProps {
    ref?: RefObject<unknown>
}

interface AlertState {
    visible: boolean,
    title: string,
    message: string,
    buttons: Array<{ text: string, onPress: () => void}>,
    options: any
}

export class Alert extends Component<AlertProps, AlertState> {
    constructor(props: AlertProps) {
        super(props);
        this.state = {
            visible: false,
            title: "",
            message: "",
            buttons: [],
            options: {} // cancelable & onDismiss not support
        }
    }

    // main method
    setAlertState(visible, title, message, buttons, options) {
        if (visible) {
            this.setState({visible, title, message, buttons, options});
        } else {
            this.clearAlert();
        }
    }

    static alert(title, message, buttons = [], options = {}) {
        const instance = Taro.getCurrentInstance();
        // @ts-ignore
        instance?.page?.alertRef?.current?.setAlertState(true, title, message, buttons, options);
    }

    clearAlert() {
        this.setState({visible: false, title: "", message: "", buttons: [], options: {}});
    }

    handlePress(callback) {
        this.clearAlert();
        if (callback && typeof callback === 'function') {
            // 设定错误边界，保证点击先关闭，内部函数执行不成功也不关心
            // 防止有人异步执行 alert，然后切换页面后执行函数找不到作用域
            try {
                callback();
            } catch (e) {
            }
        }
    }

    renderButtons() {
        if (this.state.buttons && this.state.buttons.length > 0) {
            return this.state.buttons.map((button: any, index: number) => (
                <View
                    className={`taro-page-alert-button-item ${button.style ? `taro-page-alert-button-item-${button.style}` : 'taro-page-alert-button-item-default'}`}
                    key={index}
                    onClick={() => {
                        this.handlePress(button.onPress)
                    }}
                >
                    {button.text}
                </View>
            ))
        } else {
            return (
                <View
                    className={'taro-page-alert-button-item taro-page-alert-button-item-default'}
                    onClick={() => {
                        this.handlePress(null)
                    }}
                >
                    Ok
                </View>
            )
        }
    }


    render() {
        const {visible} = this.state;
        return (
            <Mask visible={visible}>
                <View className="taro-page-alert-container">
                    <View className="taro-page-alert-title">
                        {this.state.title}
                    </View>
                    <View className="taro-page-alert-divider"/>
                    <View className="taro-page-alert-message">
                        {this.state.message}
                    </View>
                    {this.renderButtons()}
                </View>
            </Mask>
        );
    }
}
