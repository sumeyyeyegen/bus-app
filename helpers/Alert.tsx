import Swal from 'sweetalert2'

export default function Alert() {
  function Success(text: String) {
    Swal.fire({
      position: 'top-right',
      icon: 'success',
      title: text != undefined || text != null ? text : 'İşlem başarılı',
      showConfirmButton: false,
      timer: 1500
    })
  }
  function Error(text: String) {
    Swal.fire({
      position: 'top-right',
      icon: 'error',
      title: text != undefined || text != null ? text : 'Bir sorun oluştu',
      showConfirmButton: false,
      timer: 1500
    })
  }
  function Info(text: String) {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: text != undefined || text != null ? text : 'Girilen puan 80 ile 100 arasında olmalı',
      showConfirmButton: false,
      timer: 2500
    })
  }
  function Question(response: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: 'Silmek istediğinize emin misiniz?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Evet',
      cancelButtonText: "Hayır"
    }).then(res => {
      response(res.isConfirmed)
    })
  }
  return { Success, Error, Info, Question }
}