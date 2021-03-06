import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      isLoading: false,
      data: []
    };

    this.handleFilter = this.handleFilter.bind(this);
  }

  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

  getPortfolioItems() {
    axios
      .get("https://nathanwag.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        this.setState({
          data: response.data.portfolio_items
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  portfolioItems() {
    // Data that we'll need:
    // -background image: thumb_image_url
    // -logo: logo_url
    // -description: description
    // -id: id
    return this.state.data.map(item => {
      return (
        <PortfolioItem
          key={item.id}
          item = {item}
        />
      );
    });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    return (

      <div className="portfolio-items-wrapper">
          <button className="btn" onClick={() => this.handleFilter("Front-End")}>
            Front-End
          </button>
          <button className="btn"  onClick={() => this.handleFilter("Back-End")}>
            Back-End
          </button>
          <button className="btn" onClick={() => this.handleFilter("Full-Stack")}>
            Full-Stack
          </button>

          {this.portfolioItems()}
      </div>
    );
  }
}