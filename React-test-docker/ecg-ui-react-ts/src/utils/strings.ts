export const Strings = {
    baseUrl : `http://${process.env.API_HOST}:8080/user/`,

    api: {
        login: 'login',
        signup : 'create-user',
        forgotPassword: "reset-password",
        forgotPasswordTokenValidate: "validate-token/",
        updatePassword: "update-password",
        updateUser: 'update-user',
        getUserData: 'user/',
        getAllUsers: 'get-users',
        deleteUser: 'delete-user'
    },

    alertBox: {
        updateProfileTitle: 'Update profile',
        updateProfileMessage: 'Do you want to update profile?',
        logoutTitle: 'Logout',
        logoutMessage : 'Are you sure ?',
        userInfoUpdateTitle: 'Update',
        userInfoUpdateMessage: 'Do you want to update ?',
        linkExpiredTitle: 'Invalid link', 
    },
    succesBox:{
        userInfoUpdateTitle: "Updated User",
        signupTitle: "Signup",
        signupSucessMessage : "Singup Succesfully",
        forgotPassword: "Updated",
        forgotPasswordMessage: "Password Updated Successfully",
    },

    regEx: {
        email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
    },

    error: {
        enterUserName: 'Please enter user name',
        enterPassword : 'Please enter password',
        enterFirstName: 'Please enter First Name',
        enterLastName : 'Please enter Last Name',
        enterEmail : 'Please enter Email Id',
        invalidEmail : 'Invalid email address'
    }
}

