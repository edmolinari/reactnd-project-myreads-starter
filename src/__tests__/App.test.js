import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

import * as BooksAPI from '../BooksAPI'


/**
  * Mocking API requests
  */
jest.mock('../BooksAPI', () => {
  //sample list of books
  const books = [
    {id: 1, title:"The Linux Command Line",authors:["William E. Shotts, Jr."],publisher:"No Starch Press"},
    {id: 2, title:"Learning Web Development with React and Bootstrap",authors:["Harmeet Singh","Mehul Bhatt"]},
    {id: 3, title:"The Cuckoo's Calling",authors:["Robert Galbraith"],publisher:"Mulholland Books"},
    {id: 4,title:"Lords of Finance",authors:["Liaquat Ahamed"],publisher:"Penguin"},
    {id: 5,title:"Needful Things",authors:["Stephen King"],publisher:"Simon and Schuster"}
  ]

  //sample book
  const book = {title:"The Linux Command Line",authors:["William E. Shotts, Jr."],publisher:"No Starch Press"}

  return {
    getAll: jest.fn(() => Promise.resolve(books)),
    update: jest.fn(() => Promise.resolve(book)),
    search: jest.fn(() => Promise.resolve(book)),
  };
});


it('renders within a BrowserRouter context', () => {
  const div = document.createElement('div')
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div)
})

describe('App restAPI calls', () => {
  const app = shallow(<App />);

  it('gets list of Books on DidMount stage of lifecycle and stores on state', async () => {
    await app.instance().componentDidMount();
    expect(app.state().books.length).toEqual(5)
  })

  it('lists books', () => {
    app.instance().listBooks();
    expect(BooksAPI.getAll).toHaveBeenCalled();
  })

  it('moves a book between shelves', () => {
    app.instance().moveBook();
    expect(BooksAPI.update).toHaveBeenCalled();
  })

  it('searches for books', () => {
    const query = 'linux'
    app.instance().searchBooks(query);
    expect(BooksAPI.search).toHaveBeenCalledWith(query);
  })

})
