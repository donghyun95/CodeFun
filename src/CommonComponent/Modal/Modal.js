import React from 'react';
import { connect } from 'react-redux';
import './Modal.scss';
import Save from '../../component/Header/FeatureList/saveNshare/sNs';
import AddLib from '../../component/Header/FeatureList/AddLibrary/AddLibrary';
import Login from '../../component/Header/FeatureList/Login/Login';
import Actions from '../../actions/actionType';
const Modal = ({ closeModal, childComponent }) => {
    return (
        <div className={'ModalBox'} onClick={closeModal}>
            {(() => {
                switch (childComponent) {
                    case 'Save': return (<Save />);
                    case 'AddLib': return (<AddLib closeModal={closeModal} />);
                    case 'Login': return (<Login />);
                    default: return null;
                }
            })()}
        </div>
    );
};

const mapStateToProps = (state) => ({
    childComponent: state.Modal.childComponent
});

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(Actions.changemodal({ bool: false, component: null }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
