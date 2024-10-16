import React from 'react';
// @ts-ignore
import { createPortal } from "@tarojs/react";
import ModalAnimation from './ModalAnimation';
import ModalContent from './ModalContent';
import {modalId} from '../const';

/**
 * props 仅支持 visible / transparent / animationType
 */
export class Modal extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            dom: null
        };

        this.onDismissCallback = this.onDismissCallback.bind(this);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            dom: document.getElementById(modalId)
        })
    }

    onDismissCallback() {
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    safeRender(){
        const {children, visible, transparent, ref, animationType} = this.props;
        const {dom} = this.state;
        if (children && dom) {
            return createPortal(
                <ModalAnimation
                    animationType={animationType}
                    onDismiss={this.onDismissCallback}
                    visible={visible}
                >
                    <ModalContent
                        ref={ref}
                        transparent={transparent}
                    >
                        {children}
                    </ModalContent>
                </ModalAnimation>, dom)
        } else {
            return null;
        }
    }

    render() {
        return this.safeRender()
    }
}

