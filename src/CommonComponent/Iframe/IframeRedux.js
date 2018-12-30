import Iframe from './Iframe';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    Htmlvalue: state.Htmlvalue,
    Cssvalue : state.Cssvalue,
    Jsvalue: state.Jsvalue
});

export default connect(mapStateToProps)(Iframe);