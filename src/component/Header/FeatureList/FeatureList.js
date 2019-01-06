import React from 'react';
import Button from '../../../CommonComponent/Button/button';
import { connect } from 'react-redux';
import Actions from '../../../actions/actionType';
import './FeatureList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faUser, faUserPlus, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import AutoRun from './AutoRun/AutoRun';


const FeatureList = ({ Save, AddLib, Login, Update }) => {
    return (
        <div className={'FeatureList'}>
            
            <AutoRun></AutoRun>

            <div onClick={Update} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSyncAlt} size={'2x'} />
                    </span>
                </Button>
            </div>

            <div onClick={()=>{
                if(sessionStorage.getItem('token')){
                    Save(sessionStorage.getItem('token')).catch((err)=> {alert(err); sessionStorage.removeItem('token');});
                } else {
                    alert('로그인을해주세요');
                }
            }} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSave} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div onClick={AddLib} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faPlus} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div onClick={Login} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faUser} size={'2x'} />
                    </span>
                </Button>
            </div>
            <div className="FeatureList_Box">
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
    Save: (token) => dispatch(Actions.projectSaveThunk(token)),
    AddLib: () => dispatch(Actions.changemodal({ bool: true, component: 'AddLib' })),
    Login: () => dispatch(Actions.changemodal({ bool: true, component: 'Login' })),
    Update: () => dispatch(Actions.updatenumber()),
});

export default connect(null, mapDispatchToProps)(FeatureList);