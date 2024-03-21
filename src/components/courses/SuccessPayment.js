import axios from '../../utils/axiosConfig';
import React, { useEffect } from "react";
import { useParams, useSearchParams } from 'react-router-dom';


export default function SuccessPayment() {
  // const {courseId} = props
  const [searchParams, setSearchParams] = useSearchParams();

  const courseId = useParams().courseId

  
  useEffect(() => {
    let checkoutParams = {}
    console.log(courseId)
    for (const p of searchParams) {
      console.log(p);
      checkoutParams[p[0]] = p[1]
    }
    if (courseId) {
      checkoutParams['course_id'] = courseId
      axios.post('/api/checkout/process_checkout_status', checkoutParams)
    }
  },[])
  return (<div>Payment successfully</div>)
}

