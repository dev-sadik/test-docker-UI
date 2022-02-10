import  React from 'react';
import './styles.css'

// ErrorLabel Components :  It is created for displaying error, reusable component.
//                          It accept the error string. 

type ErrorProps = {
    error : string,
}
 
const ErrorLabel = (props: ErrorProps) => {
    return (
        <div style={{margin: 1}}>
           <label className='error-label'>{props.error}</label>
        </div>
      ); 
}

export default ErrorLabel;