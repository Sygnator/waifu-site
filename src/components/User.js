import React from 'react';

const User = (props) => {
    const { match, history } = props;
    const { params } = match;
    const { userID } = params;
    return (
        <div>{`user id: ${userID}`}</div>
    )
}

export default User;