import React from 'react';
import { connect } from 'react-redux';
import './Modal.scss';
import Save from '../../component/Header/FeatureList/saveNshare/sNs';
import AddLib from '../../component/Header/FeatureList/AddLibrary/AddLibrary';
import Search from '../../component/Header/FeatureList/Search/Seacrch';
import Actions from '../../actions/actionType';
import Spinner from '../../CommonComponent/Spinner/spinner';
const Modal = ({ closeModal, childComponent, url, pending }) => {
    if (pending) {
        return (
            <div className={'ModalBox'} onClick={closeModal}>
                <Spinner></Spinner>
            </div>
        );
    }
    return (
        <div className={'ModalBox'} onClick={closeModal}>
            {(() => {
                switch (childComponent) {
                    case 'Save': return (<Save>{url}</Save>);
                    case 'AddLib': return (<AddLib closeModal={closeModal} />);
                    case 'Search': return (<Search closeModal={closeModal}/>);
                    default: return null;
                }
            })()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    childComponent: state.Project.Modal.childComponent,
    url: state.Project.Modal.url,
    pending: state.Project.pending
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(Actions.changemodal({ bool: false, component: null }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
