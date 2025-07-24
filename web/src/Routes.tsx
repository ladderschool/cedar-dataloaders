// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@cedarjs/router'

import NavigationLayout from 'src/layouts/NavigationLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={NavigationLayout}>
        <Route path="/" page={HomePage} name="home" />
        <Route path="/books" page={BooksPage} name="books" />
        <Route path="/book:{id:Int}" page={BookPage} name="book" />
        <Route path="/magazines" page={MagazinesPage} name="magazines" />
        <Route path="/magazine:{id:Int}" page={MagazinePage} name="magazine" />
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
