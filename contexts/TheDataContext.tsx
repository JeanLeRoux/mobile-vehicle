import React, {Component, createContext, useEffect} from 'react';

export const DataContext = createContext();

class DataContextProvider extends Component {
  state = {
    carNumber: 0,
    dark: false,
  };

  toggleCar = (num: any) => {
    this.setState({carNumber: num});
  };

  toggleDark = (val: any) => {
    this.setState({dark: val});
  };

  render() {
    return (
      <DataContext.Provider
        value={{
          ...this.state,
          toggleCar: this.toggleCar,
          toggleDark: this.toggleDark,
        }}>
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
