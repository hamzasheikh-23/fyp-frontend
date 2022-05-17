import React from "react";
import "./TablePagination.scss";
import { DropdownButton, Dropdown } from "react-bootstrap";
import _ from "lodash";
import { render } from "@testing-library/react";
import {
    FaArrowLeft,
    FaArrowRight,

  } from "react-icons/fa";

export default class TablePagination extends React.Component {
  state = {
    library: null,
    perPage: 10,
    currentPage: 1,
    maxPage: null,
    search: "",
    filter: "",
  };
  componentDidMount() {
    this.reorganiseLibrary();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.list !== this.props.list) {
      this.reorganiseLibrary();
    }
    if (prevState.currentPage !== this.state.currentPage || prevState.filter !== this.state.filter) {
      this.renderLibrary();
    }
  }

  // Calculates the library
  reorganiseLibrary = () => {
    // console.log("reorganiseLibrary props", this.props.list);
    // debugger;
    const { search, perPage, currentPage, filter } = this.state;
    let library = this.props.list;

    if (search !== "") {
      library = library.filter((book) =>
        book[this.props.searchParam].toLowerCase().includes(search)
      );
    }
    if (filter !== "") {
      library = library.filter(
        (book) => book[this.props.filterParam].toLowerCase() === filter
      );
    }
    // console.log('chunk',_.chunk(library, perPage))

    library = _.chunk(library, perPage);
    // console.log('libarary',library)
    // console.log("reorganiseLibrary library", library);

    this.setState(
      {
        library,
        currentPage: 1,
        maxPage: library.length === 0 ? 1 : library.length,
      },
      () => this.renderLibrary()
    );
  };

  // Previous Page
  previousPage = () =>
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }));

  // Next Page
  nextPage = () =>
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }));

  // handle search
  handleSearch = (evt) =>
    this.setState(
      {
        search: evt.target.value.toLowerCase(),
      },
      () => {
        this.reorganiseLibrary();
      }
    );

  // handle filter
  handleFilter = (value) =>
    this.setState(
      {
        filter: value.toLowerCase(),
      },
      () => {
        this.reorganiseLibrary();
      }
    );

  // handle per page
  handlePerPage = (evt) =>
    this.setState(
      {
        perPage: evt.target.value,
      },
      () => this.reorganiseLibrary()
    );

  // handle render of library
  renderLibrary = () => {
    const { library, currentPage } = this.state;
    // console.log("renderLibrary", this.props.list, library);
    if (!library || (library && library.length === 0)) {
    //   console.log("data", []);
      this.props.getData([]);
      return;
    }
    // console.log("data", library[currentPage - 1]);
    this.props.getData(library[currentPage - 1]);
  };

  render() {
    const { currentPage, maxPage, filter } = this.state;
    return (
      <div className="table-pagination">
        <div className="page-header">
          <div className="form-group mb-2">
            <label htmlFor="status" className="my-donation-label">
              Search By Title:
            </label>
            <input
              name="item-quantity"
              value={this.state.search}
              onChange={this.handleSearch}
              type="search"
              id="search"
              placeholder="Search"
              className="form-control"
            />
          </div>
          <div className="form-group mb-2">
            <DropdownButton className="dd" title={(filter.charAt(0).toUpperCase() + filter.slice(1)) || 'All'}>
              {this.props.filterList.map((item) => (
                <Dropdown.Item onClick={() => this.handleFilter(item)}>
                  {item || 'All'}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        </div>
        {this.props.children}
        <div className="table-pagination">
          {/* <div className="">
                    <label className="library__per-page-label">Per page</label>
                    <input placeholder="per page" value={this.state.perPage} onChange={this.handlePerPage} />
                </div> */}
          <div className="pages-detail">
            {this.state.currentPage} of {this.state.maxPage}
          </div>
          <button className="pagination-btn" onClick={this.previousPage} disabled={currentPage === 1}>
            <FaArrowLeft />
          </button>
          <button className="pagination-btn" onClick={this.nextPage} disabled={currentPage >= maxPage}>
            <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }
}
