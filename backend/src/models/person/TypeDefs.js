const {gql}=require('apollo-server-express')


module.exports=gql`
# nhan_khau table
type NhanKhau{
    ID:Int!
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    gioiTinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    noiSinh:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    ngayTao:String!
    idNguoiTao:Int!
    ngayXoa:String
    idNguoiXoa:Int
    lyDoXoa:String
    ghichu:String
    daXoa:Boolean!
    tieuSu:[TieuSu!]!
    maNhanKhau:String!
    quanHeVoiChuHo:String
}

type TieuSu{
    ID:Int!
    tuNgay:String!
    denNgay:String!
    diaChi:String!
    ngheNghiep:String!
    noiLamViec:String!
}
input inputTieuSu{
    idNhanKhau:Int!
    tuNgay:String!
    denNgay:String!
    diaChi:String!
    ngheNghiep:String!
    noiLamViec:String!
}
input inputTaoNhanKhau{
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    noiSinh:String!
    gioiTinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    ngayTao:String!
   
    maNhanKhau:String!
}
input inputCapNhatNhanKhau{
    ID:Int!
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    gioiTinh:String!
    noiSinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    maNhanKhau:String!
   
    ngayXoa:String
    idNguoiXoa:Int
    lyDoXoa:String
    ghichu:String
  
}
input inputTimNhanKhau{
    limit:Int!
    offset:Int!
    name:String!
}
extend type Query {
    thongTinNhanKhau(input:Int!):NhanKhau!
    timNhanKhau(input:inputTimNhanKhau!):[NhanKhau!]!
}
extend type Mutation{
    taoNhanKhau(input:inputTaoNhanKhau!):NhanKhau!
    capNhatNhanKhau(input:inputCapNhatNhanKhau!):NhanKhau!
    xoaNhanKHau(input:Int!):Boolean!
    khoiPhucNhanKhau(input:Int!):Boolean!
    taoTieuSu(input:inputTieuSu!):TieuSu!
    xoaTieuSu(input:Int!):Boolean!
}
`