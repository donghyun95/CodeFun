import Iframe from './Iframe';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    htmlSource: state.Htmlvalue,
    cssSource : state.Cssvalue,
    JsSource: state.Jsvalue,
    LibList: state.LibraryList,
    UpdateNumber: state.UpdateNumber,
    isAutoRunChecked: state.AutoRunCheck
});

export default connect(mapStateToProps,null)(Iframe);