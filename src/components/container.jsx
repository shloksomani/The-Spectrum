import React, { Component } from "react";
import { Media } from "react-bootstrap";
import axios from "axios";

class Container extends Component {
  state = {
    showMore: false,
    isMobile: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.handelBadge);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handelBadge);
  }

  toggle = () => {
    this.setState({ showMore: !this.state.showMore });
  };

  getRenderedItems() {
    if (this.state.showMore) {
      return this.props.news.summary;
    } else if (this.state.isMobile) {
      return;
    }
    if (this.props.news.summary.length > 0) {
      // console.log("here");
      return this.props.news.summary.substring(0, 200);
    }
  }

  showButton = () => {
    return this.props.news.summary.length > 200 ? true : false;
  };
  handelBadge = () => {
    this.setState({
      isMobile: window.innerWidth < 700
    });
  };

  addToHistory = () => {
    console.log("inside addToHistory");

    if (this.props.isLoggedIn) {
      axios
        .post("/user/history", { article: this.props.news })
        .then(res => {
          if (res.status == 200) {
            console.log("Successfully added history to user");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div>
        <div className="col-10 offset-1 d-flex flex-column flex-grow align-items-stretch mb-2">
          <div
            className="row no-gutters bg-light position-relative mt-4"
            id="firstNews"
          >
            <div className="col-md-4 mb-md-0 p-md-4">
              <img
                src={this.props.news.top_image}
                className="w-100 rounded articleImages"
                alt=""
              />
            </div>
            <div className="col-md-8 position-relative p-4 pl-md-0">
              <h5 id="newsTitle" className="mt-0">
                {this.props.news.title}
              </h5>
              <p href="url" className="stretched-link hereContent">
                {this.getRenderedItems()}
              </p>
              <div style={{ position: "relative", zIndex: "5" }}>
                {this.showButton() && (
                  <button
                    onClick={this.toggle}
                    className="btn my-2 my-sm-0 readMoreLess"
                  >
                    {this.state.showMore ? "Read Less" : "Read More"}
                  </button>
                )}
              </div>
              <div>
                <strong>Bias: {this.props.news.bias}</strong>
              </div>
              <div>
                <a
                  href={this.props.news.url}
                  className="stretched-link check history"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={this.addToHistory}
                >
                  Link to news
                </a>

                <p style={{ position: "relative" }}>
                  <a
                    href={this.props.news.mbfc}
                    className="text-warning stretched-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bias Breakdown
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      // <React.Fragment>
      //   <div class="row no-gutters bg-light position-relative">
      //     <div class="col-md-6 mb-md-0 p-md-4">
      //       <img src={this.props.news.top_image} class="w-100" alt="..." />
      //     </div>
      //     <div class="col-md-6 position-static p-4 pl-md-0">
      //       <h5 class="mt-0">Columns with stretched link</h5>
      //       <p>
      //         Cras sit amet nibh libero, in gravida nulla. Nulla vel metus
      //         scelerisque ante sollicitudin. Cras purus odio, vestibulum in
      //         vulputate at, tempus viverra turpis. Fusce condimentum nunc ac
      //         nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
      //       </p>
      //       {/* <a href="#" class="stretched-link">
      //         Go somewhere
      //       </a> */}
      //       <a
      //         href={this.props.news.url}
      //         className="stretched-link check history"
      //         target="_blank"
      //         rel="noopener noreferrer"
      //         onClick={this.addToHistory}
      //       >
      //         Link to news
      //       </a>
      //     </div>
      //   </div>
      // </React.Fragment>
    );
  }
}

export default Container;
