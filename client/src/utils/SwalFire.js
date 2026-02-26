import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


class SwalFire {
    MySwal = null;

    constructor() {
        this.MySwal =  withReactContent( Swal );
    }

    error(title, text) {
        this.MySwal.fire( {
            icon : "error",
            title : title,
            text : text,
            confirmButtonText : "ENTENDIDO",
            showCancelButton : false,
            showCloseButton : false,
            customClass: {
                container: 'swal-custom-container',
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-text',
                confirmButton: 'swal-custom-confirm-btn',
                icon: 'swal-custom-icon'
            },
            buttonsStyling: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        } );
    }

    success(title, text) {
        this.MySwal.fire( {
            icon : "success",
            title : title,
            text : text,
            confirmButtonText : "FECHAR",
            showCancelButton : false,
            showCloseButton : false,
            customClass: {
                container: 'swal-custom-container',
                popup: 'swal-custom-popup',
                title: 'swal-custom-title',
                htmlContainer: 'swal-custom-text',
                confirmButton: 'swal-custom-confirm-btn',
                icon: 'swal-custom-icon-success' // Custom class for success icon
            },
            buttonsStyling: false,
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        } );
    }
}

export default new SwalFire();