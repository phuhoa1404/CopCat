
import { Route, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './components/route';
import { Home } from './components/home';
import { LogIn } from './components/login';
import { SignUp } from './components/signup';
import { Post } from './components/post';
import PDF from './components/pdf'
import { useEffect } from 'react';
// import Flask from './api/flask'
import './App.css';

export function App() {
    // useEffect(() => {
    //     connectFlask();
    // },[])

    // const connectFlask = async () => {
    //     const connecting = await Flask.get('/home');
    //     console.log("Return:", connecting)
    // }

  return (
    <div className="App">
      <Switch>
        <PublicRoute path="/signin" exact component={LogIn} />

        <PublicRoute path="/signup" exact component={SignUp}/>

        <PublicRoute path="/pdf" exact component={PDF}/>

        <PublicRoute path="/post" exact component={Post}/>

        <PublicRoute path="/home" exact component={Home}/>
      </Switch>
    </div>
  );
}

export default App;
