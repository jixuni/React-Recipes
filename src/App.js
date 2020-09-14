import React, { Component } from 'react';
import './App.css';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';

class App extends Component {
  state = {
    recipes: recipes,
    url: `https://forkify-api.herokuapp.com/api/search?q=pizza`,
    base_url: `https://forkify-api.herokuapp.com/api/search?`,
    details_id: 47746,
    pageIndex: 1,
    search: '',
    query: 'q=',
  };

  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(this.state);
      this.setState({
        recipes: jsonData.recipes,
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes();
  }
  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return (
          <RecipeList
            recipes={this.state.recipes}
            handleDetails={this.handleDetails}
            value={this.state.search}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        );
      case 0:
        return (
          <RecipeDetail
            id={this.state.details_id}
            handleIndex={this.handleIndex}
          />
        );
    }
  };

  handleIndex = (index) => {
    this.setState({
      pageIndex: index,
    });
  };

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id,
    });
  };
  handleChange = (e) => {
    this.setState(
      {
        search: e.target.value,
      },
      () => {
        console.log(this.state.search);
      }
    );
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { base_url, query, search } = this.state;

    this.setState(
      () => {
        return { url: `${base_url}${query}${search}`, search: '' };
      },
      () => {
        this.getRecipes();
      }
    );
  };

  render() {
    // console.log(this.state.recipes);

    return (
      <React.Fragment>{this.displayPage(this.state.pageIndex)}</React.Fragment>
    );
  }
}

export default App;
