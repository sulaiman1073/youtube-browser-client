import React from "react";
import { Switch, Route } from "react-router";
import { Redirect } from "react-router-dom";
import HomePage from "../routes/HomePage";
import SearchPage from "../routes/SearchPage";
import VideoPage from "../routes/VideoPage";
import ErrorPage from "../routes/ErrorPage";
import Header from "../components/Header";
import "./fw.css";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";

function App() {
  return (
    <section className="App--container">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/watch" component={VideoPage} />
        <Route path="/error" component={ErrorPage} />
        <Route path="/" render={() => <Redirect to="/" />} />
      </Switch>
    </section>
  );
}

export default App;
