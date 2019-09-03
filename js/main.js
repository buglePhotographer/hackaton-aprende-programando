const urlTsa = 'https://tsa2-test.buenosaires.gob.ar/';

let hash = '';

function readURL(input) {
    if (input.files && input.files[0]) {

        let reader = new FileReader();
        let file = event.target.files[0];

        reader.readAsArrayBuffer(file, 'UTF-8');

        reader.onloadend = function (e) {
            $('.image-upload-wrap').hide();
            $('.file-upload-content').show();
            $('#fileName').html('Nombre del archivo: ' + input.files[0].name);

            let contents = e.target.result;
            let hash256 = sha256.create();
            hash256.update(contents);
            hash = hash256.hex();
            $('#hashDisplay').html('Hash del archivo: ' + hash);

        };
    }
}

$('.image-upload-wrap').bind('dragover', function () {
    $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
    $('.image-upload-wrap').removeClass('image-dropping');
});



function sellarDocumento() {
    const hash_array = [];
    hash_array.push(hash);
    req_body = { hashes: hash_array }

    const initStamp = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(req_body)
    };
    fetch(urlTsa + 'Stamp', initStamp)
        .then(function (response) {
            if (response.ok) {
                response.text().then(res => {
                    console.log(res);
                    if (res == 'success') {
                        $('#responseTsa').html('El archivo ha sido sellado en Blockchain.');
                    }
                    else {
                        $('#responseTsa').html('Hubo un error intentando sellar el documento.');
                    }
                }).catch(function (err) {
                    console.log(err);
                    $('#responseTsa').html('Hubo un error deserializando el json');
                });
            }
        })
        .catch(function (err) {
            console.log(err);
            $('#responseTsa').html('Hubo un error, verifique su conexión a internet.');
        });

}

function verificarDocumento() {
    const initVerificar = {
        method: 'GET'
    }
    fetch(urlTsa + 'verify/' + hash, initVerificar)
        .then((response) => {
            if (response.ok) {
                response.json().then(data => ({
                    data: data,
                    status: response.status
                }
                )).then((res) => {
                    if (res.data['stamped']) {
                        $('#responseTsa').html('El archivo se encuentra sellado en Blockchain.');
                    }
                    else {
                        $('#responseTsa').html('El archivo no ha sido encuentrado en Blockchain.');
                    }
                })
                    .catch(function (err) {
                        console.log(err);
                        $('#responseTsa').html('Hubo un error deserializando el json');
                    });
            }
        })
        .catch(function (err) {
            console.log(err);
            $('#responseTsa').html('Hubo un error, verifique su conexión a internet.');
        });

}
