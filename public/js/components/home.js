class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo1">
          <div className="container">
            <h1 className="display-4 jumbo1words">
              Priceless education,
              <br />
              Expensive textbooks
            </h1>
            <div class="container">
              <p className="words">
                Education is priceless but textbooks are expensive, so why not
                share / trade / swap your old textbooks with someone who needs
                it!
              </p>
              <Link to="/signup">
                <button class="btn btn-primary">Sign Up</button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
