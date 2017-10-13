import React from "react";
import _ from "lodash";
import update from "react/lib/update";
import Promise from "bluebird";
import { connect } from "react-redux";
import services from "../../services";
import request from "../../util/request";
import Navigation from "./Navigation";

const TAB_CHANGED = "TAB_CHANGED";
export function tabChange(payload){
  return (dispatch, store) => {
    request.post(services.login)
      .finish((res)=>{
        dispatch({
          type:TAB_CHANGED,
          payload: res.body ? res.body.tab : ""
        })
      });
  }
}
function handleTabChanged(state,action){
  return update(state,{
    tab:{
      $set:action.payload
    }
  });
}
const NavigationDispatch = {
    tabChange
};
export const ACTION_HANDLERS = {
  TAB_CHANGED:handleTabChanged
};
const mapStateToProps = (state) => ({
    tab: state.tab || "",
    notification: state.notification,
});
const CNavigation = connect(mapStateToProps, NavigationDispatch)(Navigation);
export default CNavigation;