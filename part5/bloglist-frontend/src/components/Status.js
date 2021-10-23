import React from "react";

const Status = ({ message }) => {

    if(message){
        return (
            <div>
                {message}
            </div>
        )
    
    }else{
        return null
    }


}

export default Status