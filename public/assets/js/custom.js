// Custom Functions
function showAnimation(json) {
  Swal.fire({
    html: `
      <lottie-player autoplay loop mode="normal" background="transparent"  speed="1" src="${json}" style="width: 100%;"></lottie-player>
    `,
    background: 'transparent',
    showConfirmButton: false,
    allowOutsideClick: false
  });
}

function showGif(gif) {
    Swal.fire({
      html: `
        <img src="${gif}" />
      `,
      showConfirmButton: false,
      allowOutsideClick: false
    });
    $(".swal2-modal").css('background-color', '#000');
    $(".swal2-container").css('background-color', '#000000');
}

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  customClass: 'toastalert'
});

function showAlert(message, type) {
  Toast.fire({
    icon: type,
    html: message,
    customClass: 'toastalert'
  });
}

function moneyfy(x, withPesoSign) {
  if(withPesoSign) {
    return `₱${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

function shake(id) {
  $(`#${id}`).addClass('shakeBtn');
  setTimeout(function() {
    $(`#${id}`).removeClass('shakeBtn');
  }, 1000);
}

function randomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter <= 10) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}