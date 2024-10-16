import React from 'react';
import {View} from '@tarojs/components';
import './index.css';

interface MaskPropType {
    children: any,
    visible: boolean,
    transparent?: boolean,
}

export class Mask extends React.Component<MaskPropType, any> {
    constructor(props) {
        super(props);
    }

    // 默认不支持 mask 上的 click，catchmove 阻止 mask 上或者 mask 内部元素的滚动穿透（modal需要用到）
    // catchmove 只有真机或者预览才会展现效果，模拟器不会按照预定效果展现，另外注意只有内部使用 scrollView 才会正常滚动，使用可滚动的 View 不能在内部滚动
    render() {
        const { children, visible, transparent } = this.props;
        return (
            visible ? (
                <View
                    className="taro-page-mask-wrapper"
                    style={{
                        top: 0,
                        left: 0,
                        position: 'fixed',
                        zIndex: '10000',
                        width: '100%',
                        height: '100%',
                        backgroundColor: transparent ? 'transparent' : 'rgba(0,0,0,0.40)'
                    }}
                    catchMove
                >
                    {children}
                </View>
            ) : null
        );
    }
}
