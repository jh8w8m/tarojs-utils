import React from 'react';
import { View } from '@tarojs/components';
import { Mask } from '../Mask';
import './modalAnimatoin.css';

const ANIMATION_DELAY = 300+50; // 动画完成后状态转变定时器，稍微比动画长点

function getAnimationStyle(animationType: string | undefined, visible: boolean) {
    if (animationType === 'slide') {
        return visible ? 'taro-modal-container taro-modal-slideIn' : 'taro-modal-container taro-modal-slideOut';
    }
    if (animationType === 'fade') {
        return visible ? 'taro-modal-container taro-modal-fadeIn' : 'taro-modal-container taro-modal-fadeOut';
    }
    return visible ? 'taro-modal-container' : 'taro-modal-hidden';
}

function ModalAnimation(props) {
    const { animationType, children, onDismiss, visible } = props;

    const [isRendering, setIsRendering] = React.useState(false);
    const wasVisible = React.useRef(false);
    const wasRendering = React.useRef(false);

    const isAnimated = animationType && animationType !== 'none';

    const animationEndCallback = React.useCallback(
        () => {
            if (!visible) {
                setIsRendering(false);
            }
        },
        [visible]
    );

    React.useEffect(() => {
        if (wasRendering.current && !isRendering && onDismiss) {
            onDismiss();
        }
        wasRendering.current = isRendering;
    }, [isRendering, onDismiss]);

    React.useEffect(() => {
        if (visible) {
            setIsRendering(true);
        }
        if (visible !== wasVisible.current) {
            if (!visible) {
                setTimeout(animationEndCallback, ANIMATION_DELAY);
            } else {
                animationEndCallback();
            }
        }
        wasVisible.current = visible;
    }, [isAnimated, visible, animationEndCallback]);

    return (
        <View
            className={isRendering ? getAnimationStyle(animationType, visible) : 'taro-modal-hidden'}
        >
            {(isRendering || visible) ? (
                <Mask visible={true} transparent={false}>
                    {children}
                </Mask>
            ) : null}
        </View>
    );
}

export default ModalAnimation;
