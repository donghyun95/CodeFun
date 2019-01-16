import React, { Component } from 'react';
import './Iframe.scss';
class Iframe extends Component {
    IfrBox = null

    componentDidMount() {
        this.IframeContentLoad();
    }

    componentDidUpdate() {
        this.IframeContentLoad();
    }

    shouldComponentUpdate(nextProps,nextState) {
        if(!nextProps.isAutoRunChecked){
            if(this.props.UpdateNumber === nextProps.UpdateNumber){
                return false;
            }
        }
        return true;
    }
    
    IframeContentLoad = () => {
        const {htmlSource,cssSource,JsSource,LibList} = this.props;
        this.IfrBox.innerHTML = '';
        const Ifr = document.createElement('iframe');
        this.IfrBox.append(Ifr);
        Ifr.frameBorder=0;
        const DOMContent = Ifr.contentWindow.document;    
        const style = document.createElement('style');
        style.textContent = cssSource;
        DOMContent.open();
        DOMContent.write('<head>');
        DOMContent.write(`<style>${cssSource}</style>`)
        LibList.forEach((item)=>{    
            DOMContent.write(`<script src=${item.url}></script>`);
        });
        DOMContent.write('</head>');
        DOMContent.write(`<body>${htmlSource}</body>`);
        DOMContent.write(`<script>${JsSource}</script>`);
        DOMContent.close();
    }
    render() {
        return (
            <div ref={ref => this.IfrBox=ref} className={'IfrBox'}>
            
            </div>
        );
    }
}

export default Iframe;