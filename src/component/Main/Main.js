import React, { Component } from 'react';
import CodeContainer from './CodeContainer';
import IframeRedux from '../../CommonComponent/Iframe/IframeRedux';

import cx from 'classnames';
import './Main.scss';
class Main extends Component {
    state = {
        Height: 200,
        hidden: false
    }
    heigthResizeStart = (func) => {
        this.setState({ hidden: true });
        document.addEventListener('mousemove', func);

        document.addEventListener('mouseup', (ev) => {
            this.setState({ hidden: false });
            document.removeEventListener('mousemove', func);
        });

    }
    mobileheigthResizeStart = (func) => {
        this.setState({ hidden: true });
        document.addEventListener('touchmove', func);
        document.addEventListener('touchend', (ev) => {
            this.setState({ hidden: false });
            document.removeEventListener('touchmove', func);
        })
    }

    HeightControll = (ev) => {
        if (ev.pageY - 60 > 100 && ev.pageY - 60 < document.body.clientHeight - 200) {
            this.setState({
                Height: ev.pageY - 60
            });
        }
    }
    mobileHeightControll = (ev) => {
        if (ev.changedTouches) {
            if (ev.changedTouches[0].pageY - 60 > 100 && ev.changedTouches[0].pageY - 60 < document.body.clientHeight - 200) {
                this.setState({
                    Height: ev.changedTouches[0].pageY - 60
                });
            }
        }
    }

    render() {
        return (
            <div>
                <div className={cx('CodeContainer-Cover')} style={{ height: `${this.state.Height}px` }}>
                    <CodeContainer />
                </div>
                <div className={cx('heightResizable')} onMouseDown={(ev) => { ev.stopPropagation(); this.heigthResizeStart(this.HeightControll); }} onTouchStart={(ev) => { ev.stopPropagation(); this.mobileheigthResizeStart(this.mobileHeightControll); }}>
                    <div className={cx('heightresizable_svgBox')}>
                        <svg height="10" width="10">
                            <circle cx="3" cy="3" r="3" strokeWidth="3" fill="white" />
                        </svg>
                        <svg height="10" width="10">
                            <circle cx="3" cy="3" r="3" strokeWidth="3" fill="white" />
                        </svg>
                        <svg height="10" width="10">
                            <circle cx="3" cy="3" r="3" strokeWidth="3" fill="white" />
                        </svg>
                    </div>
                </div>
                <div className={cx("IfrContainer",{ hidden: this.state.hidden })} style={{ height: `${document.body.clientHeight - this.state.Height - 68}px` }}>
                    <IframeRedux></IframeRedux>
                </div>
            </div>
        );
    }
}

export default Main;