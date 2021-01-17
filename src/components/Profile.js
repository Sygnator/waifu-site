import React from 'react';

const Profile = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;
    return (
        <div>{`profil / user id: ${userID}`}</div>
    )
}

export default Profile;