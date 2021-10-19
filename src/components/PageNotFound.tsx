import { Link } from 'react-router-dom';
import img from './img/404.png'

export const PageNotFound = () => {
    let message = `The page you're looking for is currently unvailable, please check the URL or comeback later!`;
  
    return (
      <div className="grid-x successNotification">
        <div className="small-4 mgn-auto">
          <div className="notificationContainer">
              <img src={img}/>
            <h1>Page Not Found</h1>
            <h3>{message}</h3>
          </div>
        </div>
      </div>
    );
  };