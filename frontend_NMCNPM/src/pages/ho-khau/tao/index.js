import React, { useState, useEffect } from "react";
import {
  TextField,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import styles from "./styles.module.css";
import moment from "moment";
import { Link,useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { TAO_HO_KHAU } from "../../../api/graphql/mutation/tao_ho_khau";
import PickNhanKhau from "../../../components/PickNhanKhau";
const inputs = [
  {
    name: "maHoKhau",
    label: "Mã hộ khẩu",
    isRequired: true,
    type: "text",
  },
  {
    name: "maKhuVuc",
    label: "Mã khu vực",
    isRequired: true,
    type: "text",
  },
  {
    name: "diaChi",
    label: "Địa chỉ",
    isRequired: true,
    type: "text",
  },
];
export default function TaoHoKhau() {
  const redirect=useHistory();
  const [state, setState] = useState({
    idChuHo: -1,
    maKhuVuc: "",
    diaChi: "",
    ngayChuyenDi: "1111-11-11",
    maHoKhau: "",
  });
  const [nhanKhau, setNhanKhau] = useState([]);
  const [
    createHoKhau,
    { data: responseHoKhau, loading: loadingHoKhau, error: errorHoKHau },
  ] = useMutation(TAO_HO_KHAU);

  const handleChange = (key) => {
    
    return (e) => {
      const text=e.target.value
       setState((old) => ({ ...old, [key]: text}));
    };
  };
  const deleteAdded = (id) => {
    return () => {
      setNhanKhau((old) => old.filter((E) => E.ID !== id));
    };
  };
  const onCreate = () => {
    if(nhanKhau.length===0) return alert("không có nhân khẩu để tạo!");
   
    const input = {
      ...state,
      nhanKhau: nhanKhau.map((e) => ({
        idHoKhau: -1,
        idNhanKhau: e.ID,
        quanHeVoiChuHo: e.ID === state.idChuHo ? "Chủ hộ" : e.quanHeVoiChuHo,
      })),
    };
    createHoKhau({variables:{input}}).catch(e=>{
      console.log(e.message);
    })
  };
  useEffect(()=>{
    if(loadingHoKhau) return;
    if(errorHoKHau) return alert("không thể tạo hộ khẩu mới")
    if(responseHoKhau){
      const {taoHoKhau}=responseHoKhau;
      
      redirect.push(`/app/edit-hk/${taoHoKhau.ID}`)
    }

  },[ responseHoKhau, loadingHoKhau, errorHoKHau])
  return (
    <div>
      <form className={styles.form}>
        {inputs.map((i) => (
          <TextField
            {...i}
         
            value={state[i.name]}
            onChange={handleChange(i.name)}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
          />
        ))}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Chủ Hộ</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.idChuHo}
            label="Age"
            onChange={handleChange("idChuHo")}
          >
            <MenuItem value={-1}>Không có</MenuItem>
            {nhanKhau.map((nk) => (
              <MenuItem value={nk.ID}>{`${nk.ID}-${nk.hoTen}`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
      <div style={{display:'flex',justifyContent:"center"}}>
        <Button onClick={onCreate} variant="contained" color="primary">
          Tạo
        </Button>
      </div>
      <h2 className={styles.center}>Đã thêm</h2>
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell> HoTen</TableCell>
            <TableCell> ngay sinh</TableCell>
            <TableCell>quan hệ với chủ hộ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nhanKhau?.map(({ ID, hoTen, namSinh, quanHeVoiChuHo }) => (
            <TableRow key={ID}>
              <TableCell className="pl-3 fw-normal">
                <Link to={`/app/edit-nk/${ID}`}>{ID}</Link>
              </TableCell>
              <TableCell>
                <Link to={`/app/edit-nk/${ID}`}>{hoTen}</Link>
              </TableCell>
              <TableCell>
                {moment(parseInt(namSinh)).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell>
                <TextField
                  onChange={(event) => {
                    const text = event.target.value;
                    if (state.idChuHo === ID) return;
                    setNhanKhau((old) => {
                      return old.map((e) => {
                        if (ID === e.ID) {
                          return { ...e, quanHeVoiChuHo: text };
                        }
                        return e;
                      });
                    });
                  }}
                  value={state.idChuHo === ID ? "Chủ hộ" : quanHeVoiChuHo}
                ></TextField>
              </TableCell>
              <TableCell>
                <Button
                  onClick={deleteAdded(ID)}
                  variant="contained"
                  color="secondary"
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className={styles.center}>Nhân khẩu</h2>
      <PickNhanKhau setNhanKhau={setNhanKhau} added={nhanKhau} />
    </div>
  );
}
