import React, { Component } from 'react';
import './Iframe.scss';
class Iframe extends Component {
    Ifr = null;

    componentDidMount() {
        this.IframeContentLoad();
    }

    componentDidUpdate() {
        this.IframeContentLoad();
    }

    IframeContentLoad = () => {
        const {htmlSource,cssSource,JsSource} = this.props;
        const DOMContent = this.Ifr.contentWindow.document;
        DOMContent.open();
        DOMContent.write(htmlSource);
        DOMContent.close();
        const style = document.createElement('style');
        style.textContent = cssSource;
        DOMContent.head.append(style);

        const script = document.createElement('script');
        script.text = JsSource;

        DOMContent.body.append(script);
    }

    render() {
        return (
            <iframe ref={ref => this.Ifr=ref}  frameBorder={0} className={'Iframe'}></iframe> 
        );
    }
}

export default Iframe;