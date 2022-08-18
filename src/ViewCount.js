import React, { useEffect, useState } from 'react'

export default function ViewCount() {

    let [count, setCount] = useState(0)
    
    useEffect( () => {
        let pageView = sessionStorage.getItem('pageView')
        
        if(pageView == null) {
            //Initialize page views count
            pageView = 1
        } else {
            //Increment Count
            pageView ++
        }
        
        // Update Session Storage
        sessionStorage.setItem('pageView', pageView)
        
        //Update the state
        setCount(pageView)
    }, [])

    return (
        <div>
            Page View Count is: {count}
        </div>
    )
}
