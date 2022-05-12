import React, {Fragment, useEffect} from "react";
import { Redirect, Route } from "react-router-dom";

export default function SubscriptionProtection({children, history }) {
  const ngoSubscription = JSON.parse(localStorage.getItem("ngoSubscription"));
  const ngoPlanID = localStorage.getItem("ngoPlanID");

useEffect(()=>{
    if( !ngoSubscription || !ngoPlanID){
        history.push('/not-subscribed')
    }
},[])

  return (
    <Fragment>
      {React.cloneElement(children)}
    </Fragment>
  );


}
