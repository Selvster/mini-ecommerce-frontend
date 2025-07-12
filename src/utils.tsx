import Swal from 'sweetalert2';

type AlertType = 'success' | 'error' | 'info' | 'warning' | 'question';

export const showToastAlert = (
  type: AlertType,
  title: string,
  message: string,
  timer: number = 3000
) => {
  Swal.fire({
    icon: type,
    title,
    text: message,
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer,
    timerProgressBar: true
  });
};

export const toKebabCase = (str: string) => {
  return str.toLowerCase().replace(/\s+/g, '-');
}
