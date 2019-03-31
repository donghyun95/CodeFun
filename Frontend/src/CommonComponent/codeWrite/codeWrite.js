import React, { Component } from 'react';
import CodeMirror from 'codemirror';
import './codeWrite.scss';
import 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/css/css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/theme/base16-light.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5,faJsSquare,faSass} from '@fortawesome/free-brands-svg-icons';


class codeWrite extends Component {
    editor = null
    codeMirror = null
    Timer = null
    Cursor = null
    html = (<span className={'htmlStyle FaIcon'}>
                <FontAwesomeIcon icon={faHtml5} size={"2x"}/>
            </span>)

    css3 = (<span className={'cssStyle FaIcon'}>
                <FontAwesomeIcon icon={faSass} size={"2x"}/>
            </span>)

    jslang = (
        <span className={'jsStyle FaIcon'}>
                <FontAwesomeIcon icon={faJsSquare} size={"2x"}/>
        </span>
    )

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.textvalue !== nextProps.textvalue){
            return true;
        }
        return false;
    }

    componentDidMount() {
        this.initializeEditor();
    }
    componentDidUpdate(){
        if(!this.codeMirror){
            return;    
        } 
        this.Cursor = this.codeMirror.doc.getCursor();
        this.codeMirror.doc.setValue(`${this.props.textvalue}`);
        this.codeMirror.doc.setCursor(this.Cursor);
    }

    initializeEditor = () => {
        this.codeMirror = CodeMirror(this.editor, {
            mode: this.props.mode,
            extraKeys: { "Ctrl-Space": "autocomplete" },
            lineNumbers: true,
            lineWrapping: true,
            dragDrop: false,
            theme: 'base16-light'
        });
        this.codeMirror.doc.setValue(`${this.props.textvalue}`)
        this.codeMirror.on('change',(doc)=>{
            if(this.Timer){
                clearTimeout(this.Timer);
            }
            this.Timer = setTimeout(()=>{this.props.change(doc.getValue());},500); 
        });
        this.codeMirror.setSize('100%','100%');
    }
    render() {
        return (
            <div className={'codeWrite'}>
                <div className={'codeWrite_nameBox'}>
                    {(()=>{
                        switch(this.props.name) {
                            case "HTML": return this.html;
                            case "SCSS" : return this.css3;
                            case "JS" : return this.jslang;
                            default: return undefined;
                        }
                    })()}
                    <span className={'codeWrite_name'}>
                        {this.props.name}
                    </span>
                </div>
                <div ref={ref => this.editor=ref} className={'Editor'}></div>
            </div>
        );
    }
}

export default codeWrite;