

 export const userType=(type)=>{

    //return an action
    return{
        type:'CHANGE_OF_USER_TYPE',
        payload: type
    };
 }; 

 export const ItemDonation=(data)=>{
     return{
         type:'ADD_DONATION',
         payload: data
     };
 };

 export const NGOStoryAdd=(data)=>{
    return{
        type:'ADD_STORY',
        payload: data
    };
};

