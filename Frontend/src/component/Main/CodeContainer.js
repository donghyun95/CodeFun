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
    }

    constructor(props) {
        super(props);
        this.htmlwidthControll = this.htmlwidthControll.bind(this);
        this.mobilehtmlWidthControll = this.mobilehtmlWidthControll.bind(this);
        this.JSwidthControll = this.JSwidthControll.bind(this);
        this.mobileJSwidthControll = this.mobileJSwidthControll.bind(this);
        this.handleHtmlWebResizableDown = this.handleHtmlWebResizableDown.bind(this);
        this.handleHtmlMobileResizableDown = this.handleHtmlMobileResizableDown.bind(this);
        this.handleJsWebResizableDown = this.handleJsWebResizableDown.bind(this);
        this.hanldeJsMobileResizableDown = this.hanldeJsMobileResizableDown.bind(this);
    }

    resizeStart(func) {
        document.addEventListener('mousemove', func);
        document.addEventListener('touchmove', func);
        document.addEventListener('mouseup', ()=> {
            document.removeEventListener('mousemove', func);
        });
        document.addEventListener('touchend', ()=> {
            document.removeEventListener('touchmove', func);
        });
    }


    htmlwidthControll(ev) {
        if (ev.pageX / window.innerWidth * 100 < 45 && ev.pageX / window.innerWidth * 100 > 10) {
            this.setState((prevState) => ({
                htmlWidth: ev.pageX / window.innerWidth * 100,
                CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
            }));
        }
    }
    mobilehtmlWidthControll(ev) {
        if (ev.changedTouches) {
            if (ev.changedTouches[0].pageX / window.innerWidth * 100 < 45 && ev.changedTouches[0].pageX / window.innerWidth * 100 > 10) {
                this.setState((prevState) => ({
                    htmlWidth: ev.changedTouches[0].pageX / window.innerWidth * 100,
                    CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
                }));
            }
        }
    }

    JSwidthControll(ev) {
        if (100 - ev.pageX / window.innerWidth * 100 < 45 && 100 - ev.pageX / window.innerWidth * 100 > 10) {
            this.setState((prevState) => ({
                JSWidth: 99.5 - ev.pageX / window.innerWidth * 100,
                CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
            }));
        }
    }
    mobileJSwidthControll(ev) {
        if (ev.changedTouches) {
            if (100 - ev.changedTouches[0].pageX / window.innerWidth * 100 < 45 && 100 - ev.changedTouches[0].pageX / window.innerWidth * 100 > 10) {
                this.setState((prevState) => ({
                    JSWidth: 99.5 - ev.changedTouches[0].pageX / window.innerWidth * 100,
                    CssWidth: 90 - prevState.htmlWidth - prevState.JSWidth
                }));
            }
        }
    }

    handleHtmlWebResizableDown(ev) {
        ev.preventDefault(); 
        this.resizeStart(this.htmlwidthControll);
    }

    handleHtmlMobileResizableDown(ev) {
        this.resizeStart(this.mobilehtmlWidthControll);
    }

    handleJsWebResizableDown(ev) {
        ev.preventDefault();
        this.resizeStart(this.JSwidthControll);
    }
    hanldeJsMobileResizableDown(ev) {
        this.resizeStart(this.mobileJSwidthControll);
    }


    render() {
        return (
            <Fragment>
                <div style={{ width: `${this.state.htmlWidth}%` }} className={cx('CodeContainer_box')}>
                    <CodeEditor change={this.props.changehtml} name={'HTML'} textvalue={this.props.Htmlvalue} mode="text/html"></CodeEditor>
                </div>
                <div className={cx('resizable')} onMouseDown={this.handleHtmlWebResizableDown} onTouchStart={this.handleHtmlMobileResizableDown}>
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
                    <CodeEditor change={this.props.changecss} name={'SCSS'} textvalue={this.props.Cssvalue} mode="text/css"></CodeEditor>
                </div>
                <div className={cx('resizable')} onMouseDown={this.handleJsWebResizableDown} onTouchStart={this.hanldeJsMobileResizableDown}>
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


export { CodeContainer };
export default connect(mapStatetoProps, mapDispatchtoProps)(CodeContainer);