import 'twin.macro';
import { useEffect, useState } from 'react';
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';

export const SignUp = () => {
    const history = useHistory()
    console.log(history)
    return (
        <div>
            <div className="container-signup">
                    SIGN UP!
                </div>
        </div>
    );
}
