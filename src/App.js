import React, { Component } from "react";

class App extends Component {
  state = {
    categories: [],
    category: "",
    subCategories: [""],
    searchResult: []
  };

  handleChangeSubCategory = (e, index) => {
    let subCategories = [...this.state.subCategories];
    subCategories[index] = e.target.value;
    this.setState({
      subCategories: [...subCategories]
    });
  };
  handleChange = e => {
    let value = e.target.value;
    this.setState({
      category: value
    });
  };
  addSubCategory = e => {
    this.setState({
      subCategories: [...this.state.subCategories, ""]
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      categories: [...this.state.categories, this.state.category]
    });

    console.log(this.state);

    //Api Calls
    //Then empty out the State
    // this.setState({
    //   category: "",
    //   subCategories: [""]
    // });
  };

  removeSubCategory = index => {
    this.setState({
      subCategories: this.state.subCategories.filter((subCat, i) => index !== i)
    });
  };

  filterList = event => {
    let item = event.target.value;
    item.toLowerCase();
    let values = [...this.state.categories, ...this.state.subCategories].filter(
      value => {
        return value.toLowerCase().search(item) !== -1;
      }
    );
    this.setState({
      searchResult: values
    });
  };

  render() {
    return (
      <div className="container main__container">
        <div className="row">
          <div className="col s12">
            <div className="card-panel">
              <h1 className="mainHeader">Categories App</h1>
              <div className="addcategory__btn">
                <button data-target="modal1" className="btn modal-trigger">
                  New Category
                </button>
              </div>
              {/* Modal */}
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h1 className="mainHeader">Add Categories</h1>
                  <form onSubmit={this.handleSubmit}>
                    <div className="input-field col s12">
                      <input
                        placeholder="Add Category"
                        id="category"
                        type="text"
                        value={this.state.category}
                        name="category"
                        className="validate"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.subCategories.map((subCategory, index) => {
                      return (
                        <div key={index} className="input-field col s12">
                          <input
                            placeholder="Add Sub Category"
                            id={`sub${index}`}
                            data-id={index}
                            type="text"
                            name="subCategoryName"
                            className="validate"
                            onChange={e =>
                              this.handleChangeSubCategory(e, index)
                            }
                          />
                          {index > 0 && (
                            <button
                              onClick={() => this.removeSubCategory(index)}
                              className="btn"
                              type="button"
                            >
                              -
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button
                      onClick={e => this.addSubCategory(e)}
                      className="btn"
                      type="button"
                    >
                      Add Sub Category
                    </button>
                    <button
                      style={{ marginLeft: "3em" }}
                      type="submit"
                      className="btn modal-close"
                    >
                      Add
                    </button>
                  </form>
                </div>
              </div>
              <input
                type="text"
                placeholder="Search anything in your categories"
                onChange={this.filterList}
              />
              {this.state.searchResult.map((res, i) => (
                <p key={i}>{res}</p>
              ))}
              <table className="highlight responsive-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Categories</th>
                    <th>Sub Categories</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.categories.map((category, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{category}</td>
                        <td>
                          {this.state.subCategories.map((subcat, i) => (
                            <p key={i}>{subcat}</p>
                          ))}
                        </td>
                        <td>
                          <button>Edit</button>
                          <button>Delete</button>
                        </td>
                      </tr>
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
