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
              <p
                href="url"
                className="stretched-link hereContent"
                style={{
                  position: "relative"
                }}
              >
                {this.getRenderedItems()}
              </p>
              {this.showButton() && (
                <button
                  onClick={this.toggle}
                  className="btn my-2 my-sm-0 readMoreLess"
                >
                  {this.state.showMore ? "Read Less" : "Read More"}
                </button>
              )}
              <div>
                <strong>Bias: {this.props.news.bias}</strong>
              </div>
              <div>
                <a
                  href={this.props.news.url}
                  className="stretched-link check history"
                  style={{ position: "relative" }}
                  target="_blank"
                  onClick={this.addToHistory}
                >
                  Link to news
                </a>

                <p style={{ transform: "rotate(0)" }}>
                  <a
                    href={this.props.news.mbfc}
                    className="text-warning stretched-link"
                    target="_blank"
                  >
                    Bias Breakdown
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Container;
