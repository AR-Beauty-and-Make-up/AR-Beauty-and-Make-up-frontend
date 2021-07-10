import { useEffect, useContext, useState } from "react"
import Approved from "./Approved";
import Pending from "./Pending";
import Rejected from "./Rejected";

const Postpayment = () => {

    const params = new URLSearchParams(document.location.search.substring(1));
    const status = params.get("collection_status")

    if(status == 'approved') {
        return <Approved/>
    }
    if(status == 'pending') {
        return <Pending />
    }
    if(status == 'rejected') {
        return <Rejected />
    }
    return(<></>)
}


export default Postpayment