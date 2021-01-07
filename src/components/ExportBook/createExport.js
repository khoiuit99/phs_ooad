import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import Header from "../Common/Header";
import Menu from "../Common/Menu";

export default function CreateExport() {
  const { register, handleSubmit } = useForm();

  const [listClient, setListClient] = useState([]);
  const [ghichu, setGhiChu] = useState("");
  const [khachhang, setKhachHang] = useState(4);
  const [thanhtien, setThanhTien] = useState(0);

  const [unTounch, setUnTouch] = useState(false);

  var listBookExport = JSON.parse(localStorage.getItem("listExportBook"));
  var userInfo = JSON.parse(localStorage.getItem("userLoggedIn"));

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const history = useHistory();

  const onSubmit = async (data) => {
    var res = Object.keys(data).map(function (name) {
      var obj = {};
      obj[name] = data[name];
      return obj;
    });

    var testData = {
      IDTaiKhoan: userInfo.IDTaiKhoan,
      IDKhachHang: khachhang,
      ChiTietSach: res,
      GhiChu: ghichu,
    };

    console.log(testData)

    if (window.confirm("Bạn muốn tạo phiếu xuất?")) {
      setUnTouch(true);
      axios
        .post("http://localhost/phs_ttk/api/phieuxuat", testData)
        .then((response) => {
          if (response.status === 201) {
            window.alert("Tạo phiếu xuất thành công");
            console.log(response);
            localStorage.removeItem("listExportBook");
            setUnTouch(false);
            history.goBack();
          }else if (response.status === 200) {
            window.alert("Số lượng sách không đủ để xuất");
            console.log(response);
            setUnTouch(false);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const getClient = () => {
    axios
      .get("http://localhost/phs_ttk/api/daily")
      .then((response) => setListClient(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getClient();
  }, []);

  return unTounch ? (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div class="spinner-border" role="status"></div>
    </div>
  ) : (
    <div>
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="row mr-1 ml-1 mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h3>Tạo phiếu xuất</h3>
                <div className="card-tools">
                  <div className="col-sm-12">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <Link to="/">Trang chủ</Link>
                      </li>
                      <li className="breadcrumb-item">
                        <Link to="/qlyxuatsach">Quản lý phiếu xuất</Link>
                      </li>
                      <li className="breadcrumb-item active">Tạo phiếu xuất</li>
                    </ol>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div class="card-body">
                  <div
                    id="example2_wrapper"
                    class="dataTables_wrapper dt-bootstrap4"
                  >
                    <div class="row">
                      <div class="col-sm-12 col-md-6"></div>
                      <div class="col-sm-12 col-md-6"></div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <table
                          id="example2"
                          class="table table-bordered table-hover dataTable dtr-inline"
                          role="grid"
                          aria-describedby="example2_info"
                        >
                          <thead>
                            <tr role="row">
                              <th
                                class="sorting_asc"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-sort="ascending"
                                aria-label="Rendering engine: activate to sort column descending"
                              >
                                STT
                              </th>
                              <th
                                class="sorting_asc"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-sort="ascending"
                                aria-label="Rendering engine: activate to sort column descending"
                              >
                                Tên sách
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Browser: activate to sort column ascending"
                              >
                                Tác giả
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Platform(s): activate to sort column ascending"
                              >
                                Còn lại
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                                aria-label="Engine version: activate to sort column ascending"
                              >
                                Giá bán
                              </th>
                              <th
                                class="sorting"
                                tabindex="0"
                                aria-controls="example2"
                                rowspan="1"
                                colspan="1"
                              >
                                Số lượng
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {listBookExport?.map((itemBook, key) => {
                              return (
                                <tr key={key}>
                                  <td>{key + 1}</td>
                                  <td>{itemBook.TenSach}</td>
                                  <td>{itemBook.TacGia}</td>
                                  <td>{itemBook.ConLai}</td>
                                  <td>{itemBook.GiaBan}</td>
                                  <td>
                                    <input
                                      type="text"
                                      name={itemBook.IDSach}
                                      className="form-control"
                                      onKeyDown={(e) => {
                                        setThanhTien(
                                          (presum) =>
                                            presum +
                                            e.target.value * itemBook.GiaBan
                                        );
                                      }}
                                      ref={register({ required: true })}
                                      placeholder="Số lượng"
                                    />
                                    {}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <table
                      id="example2"
                      class="table table-bordered table-hover dataTable dtr-inline"
                      role="grid"
                      aria-describedby="example2_info"
                    >
                      <thead>
                        <tr role="row">
                          <th
                            class="sorting_asc"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Rendering engine: activate to sort column descending"
                          >
                            Tên tài khoản
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="Browser: activate to sort column ascending"
                          >
                            Khách hàng
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="example2"
                            rowspan="1"
                            colspan="1"
                            aria-label="Platform(s): activate to sort column ascending"
                          >
                            Ghi chú
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{userInfo.TenTaiKhoan}</td>
                          <td>
                            <select
                              className="form-control"
                              defaultValue={listClient[0]?.IDKhachHang}
                              onChange={(e) => setKhachHang(e.target.value)}
                            >
                              {listClient ? (
                                listClient.map((itemClient) => {
                                  return (
                                    <option value={itemClient.IDKhachHang}>
                                      {itemClient.TenKhachHang}
                                    </option>
                                  );
                                })
                              ) : (
                                <option>Loading</option>
                              )}
                            </select>
                          </td>
                          <td>
                            <textarea
                              type="text"
                              rows="5"
                              name="GhiChu"
                              onChange={(e) => setGhiChu(e.target.value)}
                              className="form-control"
                              placeholder="Ghi chú"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Xác nhận"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
