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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHtml5,faJsSquare,faCss3Alt } from '@fortawesome/free-brands-svg-icons';



class codeWrite extends Component {
    editor = null
    codeMirror = null

    html = (<span className={'htmlStyle FaIcon'}>
                <FontAwesomeIcon icon={faHtml5} size={"2x"}/>
            </span>)

    css3 = (<span className={'cssStyle FaIcon'}>
                <FontAwesomeIcon icon={faCss3Alt} size={"2x"}/>
            </span>)

    jslang = (
        <span className={'jsStyle FaIcon'}>
                <FontAwesomeIcon icon={faJsSquare} size={"2x"}/>
        </span>
    )

    componentDidMount() {
        this.initializeEditor();
    }

    initializeEditor = () => {
        this.codeMirror = CodeMirror(this.editor, {
            mode: this.props.mode,
            extraKeys: { "Ctrl-Space": "autocomplete" },
            lineNumbers: true,
            lineWrapping: true,
            dragDrop: false,
            theme: 'monokai'
        });
        this.codeMirror.doc.setValue(`${this.props.textvalue}`)
        this.codeMirror.on('change',(doc)=>{this.props.change(doc.getValue())});
        this.codeMirror.setSize('100%','100%');
    }
    render() {
        
        return (
            <div className={'codeWrite'}>
                <div className={'codeWrite_nameBox'}>
                    {(()=>{
                        switch(this.props.name) {
                            case "HTML": return this.html;
                            case "CSS" : return this.css3;
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