//  Desarrollado por: David Sanchez 
var peer = new Peer();

let localStream;

const inputLocalPeerId = document.getElementById('localPeerId');
const inputRemotePeerId = document.getElementById('remotePeerId');
const btnCall = document.getElementById('btn-call');

navigator.mediaDevices.getUserMedia({video: true, audio: true})
 .then(stream => {
    localStream = stream;
    const videoElement = document.getElementById('localVideo');
    videoElement.srcObject = localStream;
    videoElement.onloadedmetadata = () => videoElement.play();
  });

peer.on("open", id => {
    inputLocalPeerId.value = id;
});

btnCall.addEventListener("click", function() {
    const remotePeerId = inputRemotePeerId.value;
    const call = peer.call(remotePeerId, localStream);
    call.on("stream", stream => {
        const remoteVideo = document.getElementById('remoteVideo');
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
    })
})

peer.on("call", call => {
    call.answer(localStream);
    call.on("stream", stream => {
        const remoteVideo = document.getElementById('remoteVideo');
        remoteVideo.srcObject = stream;
        remoteVideo.onloadedmetadata = () => remoteVideo.play();
    });
});


// Finalizar llamada
const endCallButton = document.getElementById('end-call');
endCallButton.addEventListener('click', () => {
    if (localStream) {
        localStream.getTracks().forEach((track) => {
            track.stop();
        });
    }
    if (peer) {
        peer.disconnect();
    }
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    conn = null;
});


// Microfono

const toggleAudioButton = document.getElementById('toggle-audio');
let isAudioEnabled = true;

// Manejar la alternancia del micrófono
toggleAudioButton.addEventListener('click', () => {
    if (localStream) {
        const audioTracks = localStream.getAudioTracks();

        if (audioTracks.length > 0) {
            for (const track of audioTracks) {
                track.enabled = !isAudioEnabled;
            }
           
            isAudioEnabled = !isAudioEnabled;
            toggleAudioButton.textContent = isAudioEnabled ? 'Desactivar Micrófono' : 'Activar Micrófono';
        }
    }
   
});


// Camara 

const toggleVideoButton = document.getElementById('toggle-video');
let isVideoEnabled = true;

// ...

// Manejar la alternancia de la cámara
toggleVideoButton.addEventListener('click', () => {
    if (localStream) {
        const videoTracks = localStream.getVideoTracks();

        if (videoTracks.length > 0) {
            for (const track of videoTracks) {
                track.enabled = !isVideoEnabled;
            }
            isVideoEnabled = !isVideoEnabled;
            toggleVideoButton.textContent = isVideoEnabled ? 'Desactivar Cámara' : 'Activar Cámara';
        }
    }
});



// Pantalla completa

const videoElements = document.getElementById('localVideo');
const fullscreenButton = document.getElementById('fullscreen-button');

fullscreenButton.addEventListener('click', () => {
    alert()
    if (!document.fullscreenElement) {
        videoElements.requestFullscreen().catch(error => {
            console.error('Error al entrar en pantalla completa:', error);
        });
    } else {
        document.exitFullscreen();
    }
});