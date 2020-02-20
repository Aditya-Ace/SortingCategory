import React, { Component } from "react";

class App extends Component {
  state = {
    categoryName: "",
    subCategoryName: "",
    categories: [],
    subCategories: [{ name: "" }],
    searchResult: []
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleCategoryNameChange = idx => evt => {
    const newCategory = this.state.subCategories.map((subCat, sidx) => {
      if (idx !== sidx) return subCat;
      return { ...subCat, name: evt.target.value };
    });
    this.setState({ subCategories: newCategory });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      categories: [...this.state.categories, this.state.categoryName]
    });
  };

  handleRemoveCategory = idx => () => {
    this.setState({
      subCategories: this.state.subCategories.filter((s, sidx) => idx !== sidx)
    });
  };

  filterList = event => {
    let item = event.target.value.toLowerCase();
    const values = this.state.categories.concat(this.state.subCategories);
    values.filter(value => {
      return value.name.toLowerCase().search(item) !== -1;
    });

    this.setState({
      searchResult: values
    });
  };

  addSubCategory = () => {
    this.setState({
      subCategories: this.state.subCategories.concat([{ name: "" }])
    });
  };

  render() {
    return (
      <div className="container main__container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
              <h4 className="grey-text">Category</h4>
              <input
                type="text"
                placeholder="Search your way through..."
                onChange={this.filterList}
              />
              <a
                href="#modal1"
                className="btn category__btn modal-trigger"
                type="button"
              >
                New Category
              </a>
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s12">
                      <input
                        id="category"
                        placeholder="Enter Category Name"
                        name="categoryName"
                        type="text"
                        className="validate"
                        value={this.state.categoryName}
                        onChange={this.handleInputChange}
                      />
                      <label htmlFor="category">Category Name</label>
                    </div>
                    {this.state.searchResult.map(value => {
                      return <p>{value}</p>;
                    })}
                    {this.state.subCategories.map((input, i) => {
                      return (
                        <div className="input-field col s12">
                          <input
                            placeholder="Enter Sub Category Name"
                            value={input.name}
                            type="text"
                            className="validate"
                            onChange={this.handleCategoryNameChange(i)}
                          />
                          <button
                            className="btn"
                            onClick={this.handleRemoveCategory(i)}
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                    <button
                      type="button"
                      onClick={this.addSubCategory}
                      className="btn"
                    >
                      Add Category
                    </button>
                    <br />
                    <br />
                    <button type="submit" className="btn modal-close">
                      Add
                    </button>
                  </form>
                </div>
                <div className="modal-footer"></div>
              </div>
              <table className="responsive-table tablebox">
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Category</th>
                    <th>Sub Category</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.categories.length > 0 &&
                    this.state.categories.map((category, i) => {
                      return (
                        <>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{category}</td>
                            <td>
                              {this.state.subCategories.map(subCat => {
                                return <td>{subCat.name}</td>;
                              })}
                            </td>
                            <td>
                              <button>Edit</button>
                            </td>
                            <td>
                              <button>Delete</button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
