Webcam.set({
width:'350', height:'300', image_format:'png', png_format:90
});
camera = document.getElementById('camera');
Webcam.attach('#camera');
function capture()
{
    Webcam.snap(function (data_uri){
        document.getElementById('result').innerHTML = "<img id='i1' src="+data_uri+">"
    })
}
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YgZ9UtPm5/model.json",modelLoaded);
function modelLoaded()
{
    console.log("model has been successfully loaded");
}
prediction_1 = '';
prediction_2 = '';
function speak()
{
    var synth = window.speechSynthesis;
    speak_data1 = "The first prediction is "+prediction_1;
    speak_data2 = "And the second prediction is "+prediction_2;
    var ut = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(ut); 
}
function emotion()
{
    img = document.getElementById('i1');
    classifier.classify(img, gotResult)
}
function gotResult(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == 'HAPPY')
        {
            document.getElementById('emoji1').innerHTML = '😊';
        }
        else if(results[0].label == 'ANGRY')
        {
            document.getElementById('emoji1').innerHTML = '😡';
        }
        else if(results[0].label == 'SAD')
        {
            document.getElementById('emoji1').innerHTML = '😞';
        }
        if(results[1].label == 'HAPPY')
        {
            document.getElementById('emoji2').innerHTML = '😊';
        }
        else if(results[1].label == 'ANGRY')
        {
            document.getElementById('emoji2').innerHTML = '😡';
        }
        else if(results[1].label == 'SAD')
        {
            document.getElementById('emoji2').innerHTML = '😞';
        }
    }
}