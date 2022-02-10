import React from 'react'
import './style.css'
// LoaderComponet : It is use to display spinner during the page loading.
const LoaderComponent = () => {
    return(
        <div className="loader-main-div">
            <div className="loader-center-div">
                <span className="loader-span"></span>

            </div>

        </div>
    )

}
export default LoaderComponent;