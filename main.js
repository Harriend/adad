leftWristScore = 0;
rightWristScore = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
song1 = "";
song2 = "";
song1Status = "";
song2Status = "";

function preload(){
    song1 = loadSound('The Search.mp3');
    song2 = loadSound('alone.mp3');
}

function setup(){
    canvas = createCanvas(470,370);
    canvas.position(520,300);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded(){
    console.log('pose net works');
}

function draw(){
    image(video , 0 , 0 , 470 , 370);
    fill('red');
    stroke('black');

    song1Status = song1.isPlaying();

    if(leftWristScore > 0.2){
        circle(leftWristX , leftWristY , 20);
        song2.stop();

        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML = "The Search";
        }
    }

    song2Status = song2.isPlaying();

    if(rightWristScore > 0.2){
        circle(rightWristX , rightWristY , 20);
        song1.stop();

        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Alone";
        }
    }

}

function gotPoses(results){
    if(results.length > 0){
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log('leftWristScore = ' + leftWristScore + " rightWristScore" + rightWristScore);

        rightWristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log('right wrist x : ' + rightWristX + " and right wrist y : " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x
        lefttWristY = results[0].pose.leftWrist.y;
        console.log('left wrist x : ' + leftWristX + " and left wrist y : " + leftWristY);
    }
}