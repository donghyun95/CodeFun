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

    shouldComponentUpdate(nextProps,nextState) {
        if(this.props.UpdateNumber === nextProps.UpdateNumber){
            return false;
        }
        return true;
    }

    IframeContentLoad = () => {
        const {htmlSource,cssSource,JsSource,LibList} = this.props;
        const DOMContent = this.Ifr.contentWindow.document;
        // DOMContent.open();
        // DOMContent.write(htmlSource);
        // DOMContent.close();
        DOMContent.body.append(htmlSource);
        const style = document.createElement('style');
        style.textContent = cssSource;
        DOMContent.head.append(style);

        LibList.forEach((item)=>{
            const CDNScript = document.createElement('script');
            CDNScript.src = item;    
            DOMContent.head.append(CDNScript);
        });

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