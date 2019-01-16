import React, { Fragment } from 'react';
import Button from '../../../CommonComponent/Button/button';
import { connect } from 'react-redux';
import Actions from '../../../actions/actionType';
import './FeatureList.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlus, faUser, faSearch, faSyncAlt, faSignOutAlt, faListUl } from '@fortawesome/free-solid-svg-icons'
import AutoRun from './AutoRun/AutoRun';
import { Link, withRouter } from 'react-router-dom';


const FeatureList = ({ Save, AddLib, Search, Update, isLogin, USER, projectOwner }) => {
    return (
        <div className={'FeatureList'}>
            <Link to="/postedList">
                <div className="FeatureList_Box">
                    <Button>
                        <span className="saveColor">
                            <FontAwesomeIcon icon={faListUl} size={'2x'} />
                        </span>
                    </Button>
                </div>
            </Link>


            <div onClick={Search} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSearch} size={'2x'} />
                    </span>
                </Button>
            </div>

            <AutoRun></AutoRun>

            <div onClick={Update} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faSyncAlt} size={'2x'} />
                    </span>
                </Button>
            </div>


            {USER === projectOwner ?
                <div onClick={() => {
                    if (sessionStorage.getItem('token')) {
                        Save(sessionStorage.getItem('token')).catch((err) => { alert(err); sessionStorage.removeItem('token'); });
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
                : null}
            <div onClick={AddLib} className="FeatureList_Box">
                <Button>
                    <span className="saveColor">
                        <FontAwesomeIcon icon={faPlus} size={'2x'} />
                    </span>
                </Button>
            </div>

            {isLogin ? 
                <div className="FeatureList_Box" onClick={() => { sessionStorage.removeItem('token'); window.location.reload(); }}>
                    <Button>
                        <span className="saveColor">
                            <FontAwesomeIcon icon={faSignOutAlt} size={'2x'} />
                        </span>
                    </Button>
                </div> 
                :
                <Link to='/login'>
                    <div className="FeatureList_Box">
                        <Button>
                            <span className="saveColor">
                                <FontAwesomeIcon icon={faUser} size={'2x'} />
                            </span>
                        </Button>
                    </div>
                </Link>
            }
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLogin: state.UserInfo.isLoggedin,
    USER: state.UserInfo.USER,
    projectOwner: state.Project.userId
});

const mapDispatchToProps = (dispatch) => ({
    Save: (token) => dispatch(Actions.projectSaveThunk(token)),
    AddLib: () => dispatch(Actions.changemodal({ bool: true, component: 'AddLib' })),
    Search: () => dispatch(Actions.changemodal({ bool: true, component: 'Search' })),
    Update: () => dispatch(Actions.updatenumber()),
});

export { FeatureList };
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FeatureList));