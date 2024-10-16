import React, {CSSProperties} from 'react';
import {View} from '@tarojs/components';

interface ModalContentProps {
    children: React.ReactNode,
    transparent?: boolean,
}

const ModalContent = React.forwardRef((props: ModalContentProps, forwardedRef) => {
    const {children, transparent} = props;

    const style = {
        ...styles.modal,
        ...(transparent ? styles.modalTransparent : styles.modalOpaque)
    } as CSSProperties;

    return (
        <View
            ref={forwardedRef}
            style={style}
        >
            <View style={styles.container}>{children}</View>
        </View>
    );
});

const styles = {
    modal: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    modalTransparent: {
        backgroundColor: 'transparent'
    },
    modalOpaque: {
        backgroundColor: 'white'
    },
    container: {
        top: 0,
        flex: 1
    }
};

export default ModalContent;
