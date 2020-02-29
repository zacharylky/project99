class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo1">
          <div className="container">
            <h1 className="display-4 jumbo1words">
              Find support
              <br />
              For what you love
            </h1>
            <div class="container">
              <p className="words">
                When you have 99 problems, tell us about it and find support for
                your cause
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
