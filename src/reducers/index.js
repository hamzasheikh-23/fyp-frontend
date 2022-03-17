import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';


const userTypeReducer=(userType='donor', action)=>{
    if(action.type === 'CHANGE_OF_USER_TYPE'){
        return action.payload;
    }
    return userType;
};

const makeDonation=(data=null, action)=>{
    if(action.type === 'ADD_DONATION'){
        return action.payload;
    }
    return data;
}

const addStory=(data=null, action)=>{
    if(action.type === 'ADD_STORY'){
        return action.payload;
    }
    return data;
}

const addNGODonation =(data=null, action)=>{
    if(action.type === 'ADD_NGO_Donation'){
        return action.payload;
    }
    return data;
}

export default combineReducers({
    userType: userTypeReducer,
    form: formReducer,
    donation: makeDonation,
    story: addStory,
    ngodonation: addNGODonation,
    
})