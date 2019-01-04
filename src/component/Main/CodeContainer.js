import React, { Component, Fragment } from 'react';
import CodeEditor from '../../CommonComponent/codeWrite/codeWrite';
import cx from 'classnames';
import './CodeContainer.scss';
import { connect } from 'react-redux';

import Action from '../../actions/actionType';


class CodeContainer extends Component {

    state = {
        htmlWidth: 33,
        JSWidth: 33,
        CssWidth: 33,
        Height: 300,
        hidden: false,
    }

    resizeStart = (func) => {
        
        document.addEventListener('mousemove', func);
        document.addEventListener('touchmove', func);
        document.addEventListener('mouseup', ()=> {
            document.removeEventListener('mousemove', func);
        });
        document.addEventListener('touchend', ()=> {
            document.removeEventListener('touchmove', func);
        });
    }


    htmlwidthControll = (ev) => {

        if (ev.pageX / window.innerWidth * 100 < 45 && ev.pageX / window.innerWidth * 100 > 10) {
            this.setState((prevState) => ({
                htmlWidth: ev.pageX / window.innerWidth * 100,
                CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
            }));
        }
    }
    mobilehtmlWidthControll = (ev) => {
        if (ev.changedTouches) {
            if (ev.changedTouches[0].pageX / window.innerWidth * 100 < 45 && ev.changedTouches[0].pageX / window.innerWidth * 100 > 10) {
                this.setState((prevState) => ({
                    htmlWidth: ev.changedTouches[0].pageX / window.innerWidth * 100,
                    CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
                }));
            }
        }
    }

    JSwidthControll = (ev) => {
        if (100 - ev.pageX / window.innerWidth * 100 < 45 && 100 - ev.pageX / window.innerWidth * 100 > 10) {
            this.setState((prevState) => ({
                JSWidth: 99.5 - ev.pageX / window.innerWidth * 100,
                CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
            }));
        }
    }
    mobileJSwidthControll = (ev) => {
        if (ev.changedTouches) {
            if (100 - ev.changedTouches[0].pageX / window.innerWidth * 100 < 45 && 100 - ev.changedTouches[0].pageX / window.innerWidth * 100 > 10) {
                this.setState((prevState) => ({
                    JSWidth: 99.5 - ev.changedTouches[0].pageX / window.innerWidth * 100,
                    CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
                }));
            }
        }
    }





    render() {
        return (
            <Fragment>
                <div style={{ width: `${this.state.htmlWidth}%` }} className={cx('CodeContainer_box')}>
                    <CodeEditor change={this.props.changehtml} name={'HTML'} textvalue={this.props.Htmlvalue} mode="text/html"></CodeEditor>
                </div>
                <div className={cx('resizable')} onMouseDown={(ev) => {ev.preventDefault(); this.resizeStart(this.htmlwidthControll) }} onTouchStart={() => { this.resizeStart(this.mobilehtmlWidthControll) }}>
                    <div className={cx('resizable_svgBox')}>
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
                <div style={{ width: `${this.state.CssWidth}%` }} className={cx('CSScontroll', 'CodeContainer_box')}>
                    <CodeEditor change={this.props.changecss} name={'CSS'} textvalue={this.props.Cssvalue} mode="text/css"></CodeEditor>
                </div>
                <div className={cx('resizable')} onMouseDown={(ev) => {ev.preventDefault(); this.resizeStart(this.JSwidthControll) }} onTouchStart={() => { this.resizeStart(this.mobileJSwidthControll) }}>
                    <div className={cx('resizable_svgBox')}>
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
                <div style={{ width: `${this.state.JSWidth}%` }} className={cx('CodeContainer_box')}>
                    <CodeEditor change={this.props.changejs} name={'JS'} textvalue={this.props.Jsvalue} mode="text/javascript"></CodeEditor>
                </div>
            </Fragment>
        );
    }
}


const mapStatetoProps = (state) => ({
    Htmlvalue: state.Project.Htmlvalue,
    Cssvalue: state.Project.Cssvalue,
    Jsvalue: state.Project.Jsvalue
});

const mapDispatchtoProps = (dispatch) => ({
    changehtml: (value) => dispatch(Action.changehtml(value)),
    changecss: (value) => dispatch(Action.changecss(value)),
    changejs: (value) => dispatch(Action.changejs(value))
});



export default connect(mapStatetoProps, mapDispatchtoProps)(CodeContainer);