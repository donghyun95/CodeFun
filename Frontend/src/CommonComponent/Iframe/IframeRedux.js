import Iframe from './Iframe';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    htmlSource: state.Project.Htmlvalue,
    cssSource : state.Project.Cssvalue,
    JsSource: state.Project.Jsvalue,
    LibList: state.Project.LibraryList,
    UpdateNumber: state.Project.UpdateNumber,
    isAutoRunChecked: state.Project.AutoRunCheck
});

export default connect(mapStateToProps,null)(Iframe);