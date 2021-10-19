
import { Route, Switch, Redirect } from 'react-router-dom';
import { PublicRoute } from './components/route';
import { Home } from './components/home';
import { LogIn } from './components/login';
import { SignUp } from './components/signup';
import { Post } from './components/post';
import PDF from './components/pdf'
import { PageNotFound } from './components/PageNotFound';
import { NavBar } from './components/NavBar'
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
      <NavBar />
      <Switch>
        <PublicRoute path="/signin" exact component={LogIn} />

        <PublicRoute path="/signup" exact component={SignUp}/>

        <PublicRoute path="/pdf" exact component={PDF}/>

        <PublicRoute path="/post" exact component={Post}/>

        <PublicRoute path="/home" exact component={Home}/>

        <Route path="/404" component={PageNotFound} />
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
