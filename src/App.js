import React from "react";
import Content from "./components/Common/Content";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from "react-router-dom";
import Listbook from "./components/Book/Listbook";
import Addbook from "./components/Book/AddBook";
import DetailBook from "./components/Book/DetailBook";
import EditBook from "./components/Book/EditBook";
import ListBookImport from "./components/ImportBook/listBookImport";
import ListImport from "./components/ImportBook/listImport";
import CreateImport from "./components/ImportBook/createImport";
import LogIn from "./components/LogIn/LogIn";
import DetailImport from "./components/ImportBook/detailImport";
import ListBookExport from "./components/ExportBook/listBookExport";
import CreateExport from "./components/ExportBook/createExport";
import ListExport from "./components/ExportBook/listExport";
import DetailExport from "./components/ExportBook/detailExport";
import ListCategory from "./components/Category/listCategory";
import AddCategory from "./components/Category/addCategory";
import EditCategory from "./components/Category/editCategory";
import ListClient from "./components/Client/listClient";
import AddClient from "./components/Client/addClient";
import EditClient from "./components/Client/editClient";
import ListAccount from "./components/Account/listAccount";
import AddAccount from "./components/Account/addAccount";
import AccountInfo from "./components/Account/accountInfo";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route
          path="/"
          exact
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <Content />;
            }
          }}
        />
        <Route path="/dssach/xemchitiet/:id" exact component={DetailBook} />
        <Route path="/dssach/sua/:id" exact component={EditBook} />
        <Route path="/dskhachhang/sua/:id" exact component={EditClient} />
        <Route path="/dsphieunhap/chitiet/:id" exact component={DetailImport} />
        <Route path="/dsphieuxuat/chitiet/:id" exact component={DetailExport} />
        <Route path="/dstheloai/sua/:id" exact component={EditCategory} />
        <Route
          path="/dssach"
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <Listbook />;
            }
          }}
        />
        <Route
          path="/themsach"
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <Addbook />;
            }
          }}
        />
        <Route
          path="/qlynhapsach"
          component={ListBookImport}
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <ListBookImport />;
            }
          }}
        />
        <Route
          path="/qlyxuatsach"
          component={ListBookExport}
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <ListBookExport />;
            }
          }}
        />

        <Route
          path="/userInfo"
          component={AccountInfo}
          render={() => {
            let user = localStorage.getItem("userLoggedIn");
            if (!user) {
              return <Redirect to="/login" />;
            } else {
              return <AccountInfo />;
            }
          }}
        />
        <Route path="/dsphieunhap" component={ListImport} />
        <Route path="/dsphieuxuat" component={ListExport} />
        <Route path="/taophieunhap" component={CreateImport} />
        <Route path="/taophieuxuat" component={CreateExport} />
        <Route path="/dstheloai" component={ListCategory} />
        <Route path="/themtheloai" component={AddCategory} />
        <Route path="/dskhachhang" component={ListClient} />
        <Route path="/themkhachhang" component={AddClient} />
        <Route path="/dstaikhoan" component={ListAccount} />
        <Route path="/themtaikhoan" component={AddAccount} />
      </Switch>
    </Router>
  );
}

export default App;
