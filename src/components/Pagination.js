import React from 'react';
import _ from 'lodash';
const Library = [
    {
      name: "Star Wars"
    },
    {
      name: "Harry Potter"
    },
    {
      name: "Lord of the Rings"
    },
    {
      name: "Star Trek"
    },
    {
      name: "The Fault in Our Stars"
    },
    {
      name: "Number the Stars"
    },
    {
      name: "Blue"
    },
    {
      name: "Act Da Fool"
    },
    {
      name: "The Gilded Cage"
    },
    {
      name:
        "To Get to Heaven First You Have to Die (Bihisht faqat baroi murdagon)"
    },
    {
      name: "Lebanon"
    },
    {
      name: "Tenderness"
    },
    {
      name: "It"
    },
    {
      name: "Locked Out (Enfermés dehors)"
    },
    {
      name: "Waterloo Bridge"
    },
    {
      name: "Set It Off"
    },
    {
      name: "Nil By Mouth"
    },
    {
      name: "Monte Carlo"
    },
    {
      name: "Treasure of the Four Crowns"
    },
    {
      name: "Donnie Darko"
    },
    {
      name: "Cry-Baby"
    },
    {
      name: "Juan of the Dead (Juan de los Muertos)"
    },
    {
      name: "Constant Nymph, The"
    }
  ];
  
  // Main App Component
  export default class Pagination extends React.Component {
    state = {
      library: null,
      perPage: 3,
      currentPage: 1,
      maxPage: null,
      filter: ""
    };
  
    componentDidMount() {
      this.reorganiseLibrary();
    }
    
    // Calculates the library
    reorganiseLibrary = () => {
      const { filter, perPage } = this.state;
      let library = Library;
  
      if (filter !== "") {
        library = library.filter(book =>
          book.name.toLowerCase().includes(filter)
        );
      }
  
      library = _.chunk(library, perPage);
  
      this.setState({
        library,
        currentPage: 1,
        maxPage: library.length === 0 ? 1 : library.length
      });
    };
  
    // Previous Page
    previousPage = () =>
      this.setState(prevState => ({
        currentPage: prevState.currentPage - 1
      }));
  
    // Next Page
    nextPage = () =>
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1
      }));
      
    // handle filter
    handleFilter = evt =>
      this.setState(
        {
          filter: evt.target.value.toLowerCase()
        },
        () => {
          this.reorganiseLibrary();
        }
      );
      
    // handle per page
    handlePerPage = (evt) =>
      this.setState({
        perPage: evt.target.value 
      }, () => this.reorganiseLibrary());
  
    // handle render of library
    renderLibrary = () => {
      const { library, currentPage } = this.state;
      if (!library || (library && library.length === 0)) {
        return <div>No results</div>;
      }
      return library[currentPage - 1].map(book => (
        <div key={book.name}>{book.name}</div>
      ));
    };
  
    render() {
      const { library, currentPage, perPage, maxPage } = this.state;
      return (
        <div className="library">
            <h1>Library</h1>
            <div className="d-flex">
                <div className="flex-fill">
                    <label className="library__filter-label">Filter</label>
                    <input value={this.state.filter} onChange={this.handleFilter} />
                </div>
                <div className="flex-fill text-right">
                    <label className="library__per-page-label">Per page</label>
                    <input placeholder="per page" value={this.state.perPage} onChange={this.handlePerPage} />
                </div>
            </div>
            <div className="library__book-shelf">
                {this.renderLibrary()}
            </div>
            <div className="d-flex">
                <div className="flex-fill">
                  {currentPage !== 1 && (
                    <button onClick={this.previousPage}>Previous</button>
                  )}
                </div>
                <div className="flex-fill text-right">
                  {(currentPage < maxPage) && (
                    <button onClick={this.nextPage}>Next</button>
                  )}
                </div>
            </div>
            <div className="library__page-info text-right">
                {this.state.currentPage} of {this.state.maxPage}
            </div>
        </div>
      );
    }
  }