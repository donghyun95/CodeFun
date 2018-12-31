import React from 'react';
import Button from '../../../CommonComponent/Button/button';
import { connect } from 'react-redux';
import Actions from '../../../actions/actionType';
import './FeatureList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faSignInAlt, faUserPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'



const FeatureList = ({ Save, AddLib, Login, Update }) => {
    return (
        <div className={'FeatureList'}>
            <div onClick={Update}>
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSyncAlt} size={'2x'} />
                    </span>
                </Button>
            </div>

            <div onClick={Save}>
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSave} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div onClick={AddLib}>
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faPlus} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div onClick={Login}>
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSignInAlt} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div>
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faUserPlus} size={'2x'} />
                    </span>
                </Button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
    Save: () => dispatch(Actions.changemodal({ bool: true, component: 'Save' })),
    AddLib: () => dispatch(Actions.changemodal({ bool: true, component: 'AddLib' })),
    Login: () => dispatch(Actions.changemodal({ bool: true, component: 'Login' })),
    Update: () => dispatch(Actions.updatenumber())
});

export default connect(null, mapDispatchToProps)(FeatureList);