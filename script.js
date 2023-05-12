const video=document.querySelector("video")
const textElem=document.querySelector("[data-text]")

const playButton=document.getElementById('play-button')
const pauseButton=document.getElementById('pause-button')
const stopButton=document.getElementById('stop-button')
let currentCharacter
const speedInput =document.getElementById('speed')
speedInput.addEventListener('input',()=>{
    stopVideo()
    playVideo(utterance.text.substring(currentCharacter))

})




const utterance=new SpeechSynthesisUtterance()
 utterance.addEventListener('boundary',e=>{
        currentCharacter=e.charIndex
    })

async function setup(){
    const stream= await navigator.mediaDevices.getUserMedia({video:true})
    video.srcObject = stream
    video.addEventListener("playing",async()=>{
        const worker=Tesseract.createWorker()
        await worker.load()
        await worker.loadLanguage("eng")
        await worker.initialize("eng")

        const canvas=document.createElement("canvas")
        canvas.width=video.width
        canvas.height=video.height
        
        document.addEventListener("click", async e=>{
            
            if(e.target.id === "play-button") {
                if(speechSynthesis.paused && speechSynthesis.speaking)
            {
                speechSynthesis.resume()
            }   
                canvas.getContext("2d").drawImage(video,0,0,video.width,video.height)
            const {data:{text}}= await worker.recognize(canvas)
               playVideo(text)
            }
            if(e.target.id === 'pause-button'){
                if(speechSynthesis.speaking) speechSynthesis.pause()
            }
            if(e.target.id === 'stop-button'){
                stopVideo()
            }
        })
        playButton.addEventListener('click',()=>{
            playText(text.value)
        })
        function playText(text){
            const utterance=new SpeechSynthesisUtterance(text)
            utterance.rate=speedInput.value || 1
            speechSynthesis.speak(utterance)
        }

    })
}
function playVideo(text){ 
            utterance.text=text.replace(/\s/g, " ")
            utterance.rate=speedInput.value || 1
            speechSynthesis.speak(utterance)
            
        }
function stopVideo()
{
    if(speechSynthesis.speaking) {
        speechSynthesis.resume()
    speechSynthesis.cancel()}
}
setup()
