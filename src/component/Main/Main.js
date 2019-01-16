import React, { Component } from 'react';
import CodeContainer from './CodeContainer';
import IframeRedux from '../../CommonComponent/Iframe/IframeRedux';
import Spinner from '../../CommonComponent/Spinner/spinner';
import cx from 'classnames';
import './Main.scss';
class Main extends Component {
    state = {
        Height: 200,
        hidden: false
    }

    constructor(props) {
        super(props);
        this.heigthResizeStart = this.heigthResizeStart.bind(this);
        this.mobileheigthResizeStart = this.mobileheigthResizeStart.bind(this);
        this.HeightControll = this.HeightControll.bind(this);
        this.mobileHeightControll = this.mobileHeightControll.bind(this);
        this.handleHeightResizable = this.handleHeightResizable.bind(this);
        this.handleMobileHeightResizable = this.handleMobileHeightResizable.bind(this);
    }

    heigthResizeStart(func) {
        this.setState({ hidden: true });
        document.addEventListener('mousemove', func);
        document.addEventListener('mouseup', () => {
            this.setState({ hidden: false });
            document.removeEventListener('mousemove', func);
        });
    }

    mobileheigthResizeStart(func) {
        this.setState({ hidden: true });
        document.addEventListener('touchmove', func);
        document.addEventListener('touchend', () => {
            this.setState({ hidden: false });
            document.removeEventListener('touchmove', func);
        });
    }

    HeightControll(ev){
        if (ev.pageY - 60 > 100 && ev.pageY - 60 < document.body.clientHeight - 200) {
            this.setState({
                Height: ev.pageY - 60
            });
        }
    }
    mobileHeightControll(ev) {
        if (ev.changedTouches) {
            if (ev.changedTouches[0].pageY - 60 > 100 && ev.changedTouches[0].pageY - 60 < document.body.clientHeight - 200) {
                this.setState({
                    Height: ev.changedTouches[0].pageY - 60
                });
            }
        }
    }
    
    handleHeightResizable(ev) {
        ev.preventDefault(); 
        ev.stopPropagation(); 
        this.heigthResizeStart(this.HeightControll); 
    }

    handleMobileHeightResizable(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.mobileheigthResizeStart(this.mobileHeightControll); 
    }

    render() {
        return (
            <div>
                <div className={cx('CodeContainer-Cover')} style={{ height: `${this.state.Height}px` }}>
                    <CodeContainer />
                </div>
                <div className={cx('heightResizable')} onMouseDown={this.handleHeightResizable} onTouchStart={this.handleMobileHeightResizable}>
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
                {this.state.hidden ? 
                    <div className="IframeSpinner" style={{ height: `${window.innerHeight - this.state.Height - 67}px` }}>
                        <Spinner/> 
                    </div>
                    :
                    <div className={cx("IfrContainer",{ hidden: this.state.hidden })} style={{ height: `${window.innerHeight - this.state.Height - 67}px` }}>
                        <IframeRedux/>
                    </div>
                }
            </div>
        );
    }
}

export default Main;