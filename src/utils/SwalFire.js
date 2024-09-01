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
            confirmButtonText : "Continuar",
            showCancelButton : false,
            showCloseButton : false,
        } );
    }
}

export default new SwalFire();